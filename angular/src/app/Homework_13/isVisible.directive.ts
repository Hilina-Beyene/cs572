import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[isVisible]'
})

export class IsVisibleDirective {
    @Input('isvisible') defalutValue = false;

    constructor(private e: ElementRef, private r: Renderer2) {} 
        
    /*@HostListener('click', ['$event.target']) onClick(event) {
        const parent = this.e.nativeElement.parentNode;
        const children = this.e.nativeElement;
        if(this.visibility){
            this.r.appendChild(parent, children);
        }else{
            this.r.removeChild(parent, children);
        }
    }*/

    @HostBinding('class.hidden') visibility; 

    ngOnInit() { 
        this.visibility = this.defalutValue;
        const parent = this.e.nativeElement.parentNode;
        const children = this.e.nativeElement;
        if(this.visibility){
            this.r.appendChild(parent, children);
        }else{
            this.r.removeChild(parent, children);
        }
    }
}