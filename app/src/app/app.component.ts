import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationServiceService } from './services/location-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  constructor(private router:Router,private locationService:LocationServiceService) {}
  
  ngOnInit(){
    this.router.navigate(['/home']);
    this.getposition();
  }

  getposition(){
    this.locationService.getPosition().then(pos=>
      {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
      });
  }

  refresh(){
    
  }

}
