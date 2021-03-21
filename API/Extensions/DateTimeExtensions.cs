using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime birth)
        {
            var today = DateTime.Today;
            var age = today.Year - birth.Year;
            return age;
        }
    }
}