import {Directive, HostListener, ElementRef, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Directive({
  selector: '[appCatchImageResize],[appImageResize]'
})
export class ResizeCalcDirective implements OnInit{

  @Input() coords: string
  @Input() appImageResize: string

  @Input() set percent(percent :number){
    if(this.appImageResize == null){
      this.catchedResize(percent)
    }
  }

  @Output() imageResized = new EventEmitter<number>()

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(win) {
    this.emitImageResize();
  }

  @HostListener('load', ['$event.target'])
  onImageLoad(img) {
    this.emitImageResize();
  }

  private emitImageResize(): void {
    if(this.appImageResize != null){
      let percent = Math.max(this.el.nativeElement.width / this.el.nativeElement.naturalWidth,
      this.el.nativeElement.height / this.el.nativeElement.naturalHeight);
      this.imageResized.next(percent)
    }
  }

  private catchedResize(percent:number):void{
    if(percent){
      let nel = this.el.nativeElement;
      let sp = this.coords.split(",")
      nel.coords = (+sp[0] * percent) + "," + (+sp[1] * percent) + "," + (+sp[2] * percent)
    }
  }
  constructor(private el: ElementRef) {

  }

}
