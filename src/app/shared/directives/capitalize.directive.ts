import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Capitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value']) onKeyUp() {
    const inputValue: string = this.el.nativeElement.value;
    this.el.nativeElement.value = this.capitalizeFirstLetter(inputValue);
  }

  private capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
