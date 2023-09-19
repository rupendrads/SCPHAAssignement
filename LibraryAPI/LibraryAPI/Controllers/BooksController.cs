using LibraryAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers;

[EnableCors("_myAllowSpecificOrigins")]
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;

    public BooksController(LibraryContext context)
    {
        _context = context;
    }

    // GET: api/Books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooks()
    {
        return await _context.Books
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/Books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BookDTO>> GetBooks(long id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return ItemToDTO(book);
    }

    // POST: api/Books
    [HttpPost]
    public async Task<ActionResult<BookDTO>> PostBooks(BookDTO bookDTO)
    {
        var book = new Book
        {
            Title = bookDTO.Title,
            Author = bookDTO.Author
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, ItemToDTO(book));
    }

    // PUT: api/Books/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBooks(long id, BookDTO bookDTO)
    {
        if (id != bookDTO.Id)
        {
            return BadRequest();
        }

        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        book.Title = bookDTO.Title;
        book.Author = bookDTO.Author;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!BookExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooks(long id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookExists(long id)
    {
        return _context.Books.Any(e => e.Id == id);
    }

    private static BookDTO ItemToDTO(Book book) =>
       new BookDTO
       {
           Id = book.Id,
           Title = book.Title,
           Author = book.Author
       };    
}
