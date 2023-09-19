using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Models;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; } = null!;
}