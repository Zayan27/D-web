import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCompComponent } from './components/home-comp/home-comp.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCompComponent, WhoWeAreComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ fix here
})

export class AppComponent {
  
}
