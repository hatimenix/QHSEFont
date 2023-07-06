import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-catographie',
  templateUrl: './list-catographie.component.html',
  styleUrls: ['./list-catographie.component.css']
})
export class ListCatographieComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  openFullScreenImage() {
    const imageElement = this.elementRef.nativeElement.querySelector('img');
    if (imageElement.requestFullscreen) {
      imageElement.requestFullscreen();
    } else if (imageElement.mozRequestFullScreen) {
      imageElement.mozRequestFullScreen();
    } else if (imageElement.webkitRequestFullscreen) {
      imageElement.webkitRequestFullscreen();
    } else if (imageElement.msRequestFullscreen) {
      imageElement.msRequestFullscreen();
    }
  }
}
