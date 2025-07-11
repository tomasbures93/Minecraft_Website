using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Minecraft_Website_API.Models;
using Minecraft_Website_API.Services;

namespace Minecraft_Website_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class WebsiteController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public WebsiteController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetHomePage()
        {
            List<Article> homePage = _appDbContext.HomePage.ToList();
            if(homePage.Count == 0)
            {
                return Ok("Nothing here");
            }
            return Ok(homePage);
        }
        
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAboutPage()
        {
            AboutPage about = _appDbContext.AboutPage.FirstOrDefault();
            if(about == null)
            {
                return Ok("Nothing");
            }
            return Ok(about);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetRulesPage()
        {
            RulesPage about = _appDbContext.RulesPage.FirstOrDefault();
            if (about == null)
            {
                return Ok("Nothing");
            }
            return Ok(about);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetChangeLogPage()
        {
            List<ChangeLogPage> about = _appDbContext.ChangeLogPage.ToList();
            if (about == null)
            {
                return Ok("Nothing");
            }
            return Ok(about);
        }

        #region HomePage
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
        public IActionResult AddArticle(Article page)
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
        public IActionResult EditArticle(Article page)
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
        public IActionResult UpdateRulesPage(RulesPage page)
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
        public IActionResult UpdateAboutPage(AboutPage page)
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
        public IActionResult AddChangeLog(ChangeLogPage page)
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
        public IActionResult UpdateChangeLog(ChangeLogPage page)
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
