using System.ComponentModel.DataAnnotations.Schema;
using WebApplication1.Entities;

namespace WebApplication1.Entities

{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

    //navigation properties
    public int ProductId { get; set; } // Foreign key to Product

    public Product Product { get; set; } // Navigation property to access the related Product

        public int BasketId { get; set; }

        public Basket Basket { get; set; }

    }
}