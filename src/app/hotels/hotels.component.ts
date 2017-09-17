import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: any = [];
  minPrice: number;
  maxPrice: number;
  priceRange: {min: number, max: number};

  constructor(public hotelsService: HotelsService) { }

  ngOnInit() {

    // Retrieve hotels from the API
    this.hotelsService.getAllHotels().subscribe(hotels => {
      this.hotels = hotels;

      // Get max hotel price
      this.maxPrice = this.hotels.reduce((max,item)=>{
        return max > item.price ? max : item.price;
      },0);

      // Get min hotel price
      this.minPrice = this.hotels.reduce((min,item)=>{
        return min < item.price ? min : item.price;
      },this.maxPrice);

      this.priceRange = {min: this.minPrice, max: this.maxPrice};

      // Set visible all hotels
      this.hotels = this.hotels.map((hotel)=>{
        hotel["show"] = true;
        return hotel;
      })
    });
  }

}
