using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateElapsedTime(this DateTime elapsedTime)
        {
            var today = DateTime.Today;
            var elapsed = today.Year - elapsedTime.Year;
            if (elapsedTime.Date > today.AddYears(-elapsed)) elapsed--;
            return elapsed;
            //this is intended for password resets
        }
    }
}