using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.DTOs;
using WebApplication1.Entities;

namespace WebApplication1.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
           _context = context;

        }
      

        [HttpGet (Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            //  var basket = await _context.Baskets
            //    .Include(i => i.Items)
            //  .ThenInclude(p => p.Product)
            //.FirstOrDefaultAsync(x => x.BuyerId === Request.Cookies["buyerId"]);


            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();
            return MapBasketToDtos(basket);

        }

        

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId , int quantity)
        {
            //get Basket || Create Basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket();
            //get product
            var product = await _context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails{Title="Product Not Found"});
            //get Item
            basket.AddItem(product, quantity);
            //Save Changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetBasket", MapBasketToDtos(basket));
            }
            return BadRequest(new ProblemDetails { Title = "Problem Saving item to basket"});

            }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();
            //remove quantity and Items
            basket.RemoveItem(productId, quantity);

            //Save Changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem Deleting item to basket" });
          
        }

        private string GetBuyerId()
        {
            return Request.Cookies["buyerId"];
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDtos(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity


                }).ToList()
            };
        }
    }
}
