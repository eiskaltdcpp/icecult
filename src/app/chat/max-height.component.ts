import { Directive, ElementRef, HostListener, Input, Renderer, AfterViewChecked } from '@angular/core';


@Directive({
  selector: '[iceMaxHeight]',
})
export class MaxHeightDirective implements AfterViewChecked {
  @Input() iceMaxHeight: string[];

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('window:resize')
  ngAfterViewChecked() {
    let space2leave = this.iceMaxHeight
      .map(selector => document.querySelector(selector).clientHeight)
      .reduce((a, b) => a + b);
    let targetHeight = window.innerHeight - space2leave - 1;
    this.renderer.setElementStyle(this.el.nativeElement, 'height', `${targetHeight}px`);
  }
}
