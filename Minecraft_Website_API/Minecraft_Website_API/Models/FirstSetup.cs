using Minecraft_Website_API.Services;

namespace Minecraft_Website_API.Models
{
    public class FirstSetup
    {
        private readonly AppDbContext _context;

        public FirstSetup(AppDbContext context)
        {
            _context = context;
        }

        public void FillDb()
        {
            var info = new ServerInfo
            {
                IP = "127.0.0.1",
                Port = "25565",
                ServerName = "Your Server",
                GameVersion = "Java Edition 1.21.4",
                DiscordLink = "www.discord.gg",
                ContactEmail = "email@email"
            };

            var admin = new User
            {
                UserName = "admin"
            };
            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword("Test123!");
            admin.PINHash = BCrypt.Net.BCrypt.HashString("12345");

            DateTime date = DateTime.Now;
            var article = new Article
            {
                Title = "Welcome",
                Text = "Thank you so much for installing bla bla bla",
                Datum = date.ToString()
            };

            var aboutPage = new AboutPage
            {
                Text = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            };

            var changeLog = new ChangeLogPage
            {
                Datum = date.ToShortDateString(),
                Text = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            };

            var rules = new RulesPage
            {
                Text = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            };

            _context.Users.Add(admin);
            _context.ServerInfo.Add(info);
            _context.HomePage.Add(article);
            _context.AboutPage.Add(aboutPage);
            _context.ChangeLogPage.Add(changeLog);
            _context.RulesPage.Add(rules);
            _context.SaveChanges();
        }
    }
}
