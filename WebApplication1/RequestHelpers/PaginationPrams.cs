namespace WebApplication1.RequestHelpers
{
    public class PaginationPrams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        public int _PageSize = 6;

        public int pageSize 
        {
            get => _PageSize;
            set => _PageSize = value > MaxPageSize ? MaxPageSize : value;
        }

    }
}
