import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCompComponent } from './components/home-comp/home-comp.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import 'primeicons/primeicons.css'; 
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { OurServicesComponent } from './components/our-services/our-services.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCompComponent, WhoWeAreComponent, WhyUsComponent, ComingsoonComponent, OurServicesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ fix here
})

export class AppComponent {
  
}
