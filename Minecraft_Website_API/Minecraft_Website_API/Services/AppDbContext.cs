using Microsoft.EntityFrameworkCore;
using Minecraft_Website_API.Models;

namespace Minecraft_Website_API.Services
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Article> HomePage { get; set; }

        public DbSet<AboutPage> AboutPage { get; set; }

        public DbSet<RulesPage> RulesPage { get; set; }

        public DbSet<ChangeLogPage> ChangeLogPage { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AboutPage>();
            modelBuilder.Entity<RulesPage>();
        }
    }
}
