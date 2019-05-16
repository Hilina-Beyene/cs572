import { Directive, ElementRef, Renderer2, HostBinding ,OnChanges, Input} from '@angular/core';

@Directive({
    selector: '[makeBigger]'
})
export class MakeBiggerDirective implements OnChanges{
    @Input('bigger') defaultValue = '2px';

    constructor(private e: ElementRef, private r: Renderer2) {

    }

    @HostBinding('style.font-size') font;

    ngOnChanges() {
        this.font = this.defaultValue;
        this.r.setStyle(this.e.nativeElement, 'font-size', this.font);
    }
}