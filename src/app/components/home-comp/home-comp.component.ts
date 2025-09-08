import { Component } from '@angular/core';

@Component({
  selector: 'app-home-comp',
  standalone: true,
  imports: [],
  templateUrl: './home-comp.component.html',
  styleUrl: './home-comp.component.scss'
})
export class HomeCompComponent {


  navigateTo(id: string): void {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
