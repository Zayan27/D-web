import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCompComponent } from '../../components/home-comp/home-comp.component';
import { WhoWeAreComponent } from '../../components/who-we-are/who-we-are.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { ComingsoonComponent } from '../../components/comingsoon/comingsoon.component';
import { OurServicesComponent } from '../../components/our-services/our-services.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { TestimonialCompComponent } from '../../components/testimonial-comp/testimonial-comp.component';
import { ContactComponent } from '../../components/contact-form/contact-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FullPageMenuComponent } from '../../components/full-page-menu/full-page-menu.component';
import { OurClientsComponent } from '../../components/our-clients/our-clients.component';
import { OurTeamComponent } from '../../components/our-team/our-team.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HomeCompComponent, 
      WhoWeAreComponent, WhyUsComponent, OurServicesComponent,
      ProjectsComponent, TestimonialCompComponent,ContactComponent,
    FooterComponent
  , OurTeamComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {

}
