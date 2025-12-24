import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-comp',
  standalone: true,
  imports: [],
  templateUrl: './home-comp.component.html',
  styleUrl: './home-comp.component.scss'
})
export class HomeCompComponent implements AfterViewInit{
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  ngAfterViewInit() {
    const video = this.bgVideo.nativeElement;

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {
        console.log('Autoplay blocked, retrying...');
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }

  navigateTo(id: string): void {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
