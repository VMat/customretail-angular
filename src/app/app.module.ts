import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HotelsService } from './hotels.service';
import { HotelFiltersComponent } from './hotel-filters/hotel-filters.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { TestHotelPipe } from './test-hotel.pipe';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'hotels',
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    component: HotelsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    NavBarComponent,
    HotelFiltersComponent,
    HotelListComponent,
    TestHotelPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [HotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
