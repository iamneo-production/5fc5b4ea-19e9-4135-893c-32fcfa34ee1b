<<<<<<< HEAD
using System;
=======
<<<<<<< HEAD
=======
using System;
>>>>>>> de84ed2f8599b644dae39e85d05552d813bd3955
>>>>>>> 66333332c2a70abbaf29c5d27173eb1a4eec7640
namespace dotnetapp;

public class WeatherForecast
{
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}
