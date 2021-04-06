using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize); 
            //if the total count is 20 for example and the page size is 8 then this calculates that the total pages will be 3 (count of 20 devided by page size 8 but the ceiling will make it an integer and round up the number) 
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }  
        public int TotalPages { get; set; } //total number of pages
         public int PageSize { get; set; } 
          public int TotalCount { get; set; } //how many items will be in this query 
          
          public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, 
          int pageNumber, int pageSize)
          {
              var count = await source.CountAsync();
              var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
              return new PagedList<T>(items, count, pageNumber, pageSize);
       }

    }

}