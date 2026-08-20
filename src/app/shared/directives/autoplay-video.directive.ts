import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'video[appAutoplayVideo]',
  standalone: true
})
export class AutoplayVideoDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLVideoElement>) {}

  ngAfterViewInit() {
    const video = this.el.nativeElement;

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
}
