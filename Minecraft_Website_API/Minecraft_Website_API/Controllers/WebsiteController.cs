using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Minecraft_Website_API.Models;
using Minecraft_Website_API.Services;
using System.Linq;

namespace Minecraft_Website_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    [EnableRateLimiting("PerIpLimit")]
    public class WebsiteController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public WebsiteController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        #region Public Methods


        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetHomePagePaged(int page = 1)
        {
            if(page < 1)
            {
                page = 1;
            }
            int articlesCount = _appDbContext.HomePage.Count();
            int itemsPerPage = 2;
            int totalPages = (int)Math.Ceiling(articlesCount / (decimal)itemsPerPage);
            List<Article> homePage = _appDbContext.HomePage.OrderByDescending(d => d.Id).Skip((page - 1) * itemsPerPage).Take(itemsPerPage).ToList();
            if (homePage.Count == 0)
            {
                return NoContent();
            }
            var data =new 
            {
                articles = homePage,
                pagesTotal = totalPages,
                currentPage = page
            };
            return Ok(data);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAboutPage()
        {
            AboutPage about = _appDbContext.AboutPage.FirstOrDefault();
            if(about == null)
            {
                return NoContent();
            }
            return Ok(about);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetRulesPage()
        {
            RulesPage rules = _appDbContext.RulesPage.FirstOrDefault();
            if (rules == null)
            {
                return NoContent();
            }
            return Ok(rules);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetChangeLogPage()
        {
            List<ChangeLogPage> changeLog = _appDbContext.ChangeLogPage.ToList();
            if (changeLog == null)
            {
                return NoContent();
            }
            return Ok(changeLog);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetChangeLogPagePaged(int page = 1)
        {
            if(page < 1)
            {
                page = 1;
            }
            int changelogCount = _appDbContext.ChangeLogPage.Count();
            int itemsPerPage = 5;
            int totalPages = (int)Math.Ceiling(changelogCount / (double)itemsPerPage);
            List<ChangeLogPage> changeLog = _appDbContext.ChangeLogPage.OrderByDescending(d => d.Id).Skip((page - 1) * itemsPerPage).Take(itemsPerPage).ToList();
            if (changeLog.Count == 0)
            {
                return NoContent();
            }
            var data = new
            {
                changelog = changeLog,
                pagesTotal = totalPages,
                cuttentPage = page
            };
            return Ok(data);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetServerInfo()
        {
            ServerInfo info = _appDbContext.ServerInfo.FirstOrDefault();
            if (info == null) {
                return NoContent();
            }
            var infoToShare = new
            {
                IP = info.IP,
                Port = info.Port,
                ServerName = info.ServerName,
                Status = ServerStatusChecker.CurrentStatus,
                Discord = info.DiscordLink,
                Email = info.ContactEmail,
                GameVersion = info.GameVersion
            };
            return Ok(infoToShare);
        }
        #endregion

        #region ServerInfo
        [HttpPut]
        public IActionResult UpdateServerInfo([FromBody] ServerInfo info)
        {
            ServerInfo infoToUpdate = _appDbContext.ServerInfo.FirstOrDefault();
            if (infoToUpdate == null)
            {
                _appDbContext.ServerInfo.Add(info);
                _appDbContext.SaveChanges();
            } else
            {
                infoToUpdate.IP = info.IP;
                infoToUpdate.Port = info.Port;
                infoToUpdate.ServerName = info.ServerName;
                infoToUpdate.GameVersion = info.GameVersion;
                infoToUpdate.DiscordLink = info.DiscordLink;
                infoToUpdate.ContactEmail = info.ContactEmail;
                _appDbContext.Update(infoToUpdate);
                _appDbContext.SaveChanges();
            }
            return Ok("done");
        }
        #endregion

        #region HomePage
        [HttpGet]
        public IActionResult GetHomePage()
        {
            List<Article> homePage = _appDbContext.HomePage.ToList();
            if (homePage.Count == 0)
            {
                return NoContent();
            }
            return Ok(homePage);
        }

        [HttpGet("{id}")]
        public IActionResult GetSpecificArticle(int id)
        {
            Article article = _appDbContext.HomePage.FirstOrDefault(d => d.Id == id);
            if(article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

        [HttpPost]
        public IActionResult AddArticle([FromBody] Article page)
        {
            if (page == null)
            {
                return BadRequest("Something went wrong, no body");
            }

            _appDbContext.HomePage.Add(page);
            _appDbContext.SaveChanges();

            return Ok("Ok");
        }
        [HttpPut]
        public IActionResult EditArticle([FromBody] Article page)
        {
            Article articleToEdit = _appDbContext.HomePage.FirstOrDefault(d => d.Id == page.Id);
            if (articleToEdit == null)
            {
                return NotFound();
            }

            articleToEdit.Title = page.Title;
            articleToEdit.Text = page.Text;

            _appDbContext.HomePage.Update(articleToEdit);
            _appDbContext.SaveChanges();
            return Ok("ok");
        }

        [HttpDelete]
        public IActionResult DeleteArticle(int id)
        {
            Article article = _appDbContext.HomePage.FirstOrDefault(d => d.Id == id);
            if(article == null)
            {
                return BadRequest("Not found");
            }

            _appDbContext.HomePage.Remove(article);
            _appDbContext.SaveChanges();

            return Ok(article);
        }
        #endregion

        #region Rules
        [HttpPut]
        public IActionResult UpdateRulesPage([FromBody] RulesPage page)
        {
            RulesPage rules = _appDbContext.RulesPage.FirstOrDefault();
            if(rules == null)
            {
                _appDbContext.RulesPage.Add(page);
                _appDbContext.SaveChanges();
            } else
            {
                rules.Text = page.Text;
                _appDbContext.Update(rules);
                _appDbContext.SaveChanges();
            }
            return Ok("done");
        }
        #endregion

        #region About
        [HttpPut]
        public IActionResult UpdateAboutPage([FromBody] AboutPage page)
        {
            AboutPage about = _appDbContext.AboutPage.FirstOrDefault();
            if(about == null)
            {
                _appDbContext.AboutPage.Add(page);
                _appDbContext.SaveChanges();
            }
            else
            {
                about.Text = page.Text;
                _appDbContext.Update(about);
                _appDbContext.SaveChanges();
            }
            return Ok("Done");
        }
        #endregion

        #region ChangeLogPage
        [HttpGet("{id}")]
        public IActionResult GetChangeLogPage(int id)
        {
            ChangeLogPage homePage = _appDbContext.ChangeLogPage.FirstOrDefault(d => d.Id == id);
            if(homePage == null)
            {
                return NotFound();
            }
            return Ok(homePage);
        }

        [HttpPost]
        public IActionResult AddChangeLog([FromBody] ChangeLogPage page)
        {
            if (page == null)
            {
                return BadRequest("Something went wrong, object empty");
            }

            _appDbContext.ChangeLogPage.Add(page);
            _appDbContext.SaveChanges();

            return Ok("OK");
        }

        [HttpPut]
        public IActionResult UpdateChangeLog([FromBody] ChangeLogPage page)
        {
            ChangeLogPage pageToUpdate = _appDbContext.ChangeLogPage.FirstOrDefault(d => d.Id == page.Id);
            if(pageToUpdate == null)
            {
                return BadRequest("Something went wrong, page not found");
            }

            pageToUpdate.Text = page.Text;

            _appDbContext.ChangeLogPage.Update(pageToUpdate);
            _appDbContext.SaveChanges();
            return Ok("Ok");
        }

        [HttpDelete]
        public IActionResult DeleteChangeLog(int id)
        {
            ChangeLogPage page = _appDbContext.ChangeLogPage.FirstOrDefault(d => d.Id == id);
            if(page == null)
            {
                return BadRequest("Somehting went wrong, page not foudn");
            }

            _appDbContext.ChangeLogPage.Remove(page);
            _appDbContext.SaveChanges();

            return Ok("Something deleted");
        }
        #endregion
    }
}
