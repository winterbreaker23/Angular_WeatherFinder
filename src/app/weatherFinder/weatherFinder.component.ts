import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  data: CityWeather[];
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {
  cityName: string = '';
  weatherData: CityWeather | null = null;
  noResult: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  searchWeather() {
    const url = `https://jsonmock.hackerrank.com/api/weather?name=${this.cityName}`;
    this.http.get<ApiResponse>(url).subscribe(response => {
      if (response.data.length > 0) {
        this.weatherData = response.data[0];
        this.noResult = false;
      } else {
        this.weatherData = null;
        this.noResult = true;
      }
    });
  }

  isColdWeather(): boolean {
    return this.weatherData ? parseInt(this.weatherData.weather) < 20 : false;
  }
}
