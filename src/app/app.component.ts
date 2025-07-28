import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCompComponent } from './components/home-comp/home-comp.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import 'primeicons/primeicons.css'; 
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component'; // ✅ fix here
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCompComponent, WhoWeAreComponent, WhyUsComponent, ComingsoonComponent, OurServicesComponent,ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ fix here
})

export class AppComponent {
  
}
