using WebApplication1.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace WebApplication1.Extensions
{
    public static class ProductExtensions
    {
         public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) 
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                 _ => query.OrderBy(p => p.Name)
            };
            return  query;

        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearch = searchTerm.Trim().ToLower();


            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearch));   
        }
    }
}
