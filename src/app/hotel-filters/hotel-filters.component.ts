import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-filters',
  templateUrl: './hotel-filters.component.html',
  styleUrls: ['./hotel-filters.component.css']
})
export class HotelFiltersComponent implements OnInit {

  @Input() hotels: any = [];

  // NAME FILTER
  inputName: string = null;

  // PRICE RANGE FILTER
  stepPrice: number = 1;
  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Input() priceRange = {min: null, max: null};

  // STARS FILTER
  STARS = {ALL: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5};
  inputStars = {0: true, 1: false, 2: false, 3: false, 4: false, 5: false};

  constructor() {
  }

  ngOnInit() {
  }

  noStarsSelected() {

    let noStarsSelected = true;

    for (let i in this.inputStars) {
      noStarsSelected = noStarsSelected && (!this.inputStars[i] || (i == this.STARS.ALL.toString()));
    }

    return noStarsSelected;
  }

  setAllStars() {
    this.inputStars[this.STARS.ONE] = false;
    this.inputStars[this.STARS.TWO] = false;
    this.inputStars[this.STARS.THREE] = false;
    this.inputStars[this.STARS.FOUR] = false;
    this.inputStars[this.STARS.FIVE] = false;
  }

  runFilters() {

    this.hotels = this.hotels.map((hotel)=>{
      hotel["show"] = this.nameFilter(hotel) && this.priceFilter(hotel) && this.starsFilter(hotel);
      return hotel;
    })
  }

  nameFilter(hotel){

    return Boolean(this.inputName) ? hotel.name.toLowerCase().includes(this.inputName.toLowerCase()) : true;
  }

  priceFilter(hotel){
    return hotel.price >= this.priceRange.min && hotel.price <= this.priceRange.max;
  }

  starsFilter(hotel){
    return !this.noStarsSelected() ? this.inputStars[hotel.stars] : true;
  }

}
