using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Entities;

namespace WebApplication1.Data
{
    public static class DbInitailizer
    {
        public static void Initialize(StoreContext context) {
            if (context.Products.Any()) return;

            var products  = new List<Product>
            {
                new Product
                {
                    Name ="Product Name",
                    Description ="Product Description",
                    Price=500,
                   PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };
              foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
        
    }
}