using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Entities;
using WebApplication1.Extensions;

namespace WebApplication1.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {   
            _context = context;
        }
        [HttpGet ]
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy)
        {
            // here i made it async so it will wait untill result is found
            /*var products = await _context.Products.ToListAsync();
            return Ok(products);*/

            var querry = _context.Products
                .Sort(orderBy)
                .AsQueryable();

            /*querry = orderBy switch
            {
                "price" => querry.OrderBy(p => p.Price),
                "priceDesc" => querry.OrderByDescending(p => p.Price),
                _ => querry.OrderBy(p => p.Name)
            };*/

            return await querry.ToListAsync();
         }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product= await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            return (product);   
            
        }
    }
}
