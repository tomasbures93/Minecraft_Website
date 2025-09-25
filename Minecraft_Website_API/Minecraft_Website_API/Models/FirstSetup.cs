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
                Title = "Welcome to Minecraft Website! 🎉",
                Text = "Thank you for installing **Minecraft Website**!  \r\nWe’re excited to have you on board and can’t wait for you to start exploring.\r\n\r\n### Getting Started:\r\n- **Login** with the default credentials provided.\r\n- **Explore the Web App** to get familiar with its features and layout.\r\n- **Change your Password and PIN immediately** to secure your account.\r\n- **Update your server information**, such as the **Server Name**, **Server IP**, and other settings.\r\n___\r\n### How To get in AdminPanel:\r\nYou can access the Admin Panel in two ways:\r\n1) **Direct URL:** Type the following into your browser’s address bar: *\"yourwebsiteurl.com/AdminPage\"*\r\n2) **Via Footer Link:** Click the **server name** (default: *Your Name*) in the bottom-right corner of the website’s footer.\r\n___\r\n### How To use Markdown\r\nWhen creating an Article, Changelog, or editing the About or Rules sections, you can use Markdown to style your text.  \r\nYou’ll find Markdown formatting buttons above the text area in the Admin Panel.\r\n\r\n##### Steps to Use Markdown:\r\n1) Write your text in the editor.\r\n2) Click the **Preview** button at the bottom to see how it will look.\r\n3) Highlight the text you want to format.\r\n4) Click one of the Markdown buttons above the text area.\r\n5) Check the Preview window to confirm the formatting.\r\n\r\n##### Supported Markdowns:  \r\nB - **Bold Text**  \r\nI - *Italic Text*  \r\nLink - [GitHub](https://github.com/tomasbures93)  \r\nHeadings - from H1 to H6\r\n###### H6\r\n##### H5\r\n#### H4\r\n### H3\r\n## H2\r\n# H1\r\n___\r\n### Need Help?\r\nIf you need assistance or run into any issues, feel free to reach out to me on GitHub: [https://github.com/tomasbures93](https://github.com/tomasbures93)",
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
