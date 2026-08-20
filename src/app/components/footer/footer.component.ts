import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  constructor(private scrollService: ScrollService) { }

  navigateTo(id: string): void {
    this.scrollService.scrollTo(id);
  }

}
