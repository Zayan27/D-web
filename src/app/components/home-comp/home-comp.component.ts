import { Component } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';
import { AutoplayVideoDirective } from '../../shared/directives/autoplay-video.directive';

@Component({
  selector: 'app-home-comp',
  standalone: true,
  imports: [AutoplayVideoDirective],
  templateUrl: './home-comp.component.html',
  styleUrl: './home-comp.component.scss'
})
export class HomeCompComponent {
  
  constructor(private scrollService: ScrollService) {}

  navigateTo(id: string): void {
    this.scrollService.scrollTo(id);
  }
}
