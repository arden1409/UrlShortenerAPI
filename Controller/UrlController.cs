using Microsoft.AspNetCore.Mvc;
using UrlShortenerAPI.Data;
using UrlShortenerAPI.Models;
using System.Linq;

namespace UrlShortenerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UrlController(AppDbContext context)
        {
            _context = context;
        }

        // Rút gọn URL
        [HttpPost("shorten")]
        public IActionResult ShortenUrl([FromBody] UrlRequest request)
        {
            if (string.IsNullOrEmpty(request.Url) || !Uri.IsWellFormedUriString(request.Url, UriKind.Absolute))
            {
                return BadRequest(new { message = "Invalid URL" });
            }

            var shortCode = Guid.NewGuid().ToString("N").Substring(0, 6);
            var url = new UrlModel { OriginalUrl = request.Url, ShortCode = shortCode };
            _context.Urls.Add(url);
            _context.SaveChanges();

            var shortenedUrl = $"http://localhost:5000/{shortCode}";
            return Ok(new { shortenedUrl });
        }

        // Chuyển hướng URL
        [HttpGet("{shortCode}")]
        public IActionResult RedirectToUrl(string shortCode)
        {
            var url = _context.Urls.FirstOrDefault(u => u.ShortCode == shortCode);
            if (url == null)
            {
                return NotFound(new { message = "Short URL not found" });
            }

            return Redirect(url.OriginalUrl);
        }
    }

    // Yêu cầu cho rút gọn URL
    public class UrlRequest
    {
        public string Url { get; set; }
    }
}
