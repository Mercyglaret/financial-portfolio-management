import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[appHighlightPerformance]",
  standalone: true,
})
export class HighlightPerformanceDirective implements OnChanges {
  @Input("appHighlightPerformance") performance!: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.performance > 0) {
      this.el.nativeElement.style.color = "#10b981";
      this.el.nativeElement.style.backgroundColor = "#ecfdf5";
    } else if (this.performance < 0) {
      this.el.nativeElement.style.color = "#ef4444";
      this.el.nativeElement.style.backgroundColor = "#fef2f2";
    } else {
      this.el.nativeElement.style.color = "#6b7280";
      this.el.nativeElement.style.backgroundColor = "transparent";
    }

    this.el.nativeElement.style.padding = "4px 8px";
    this.el.nativeElement.style.borderRadius = "6px";
    this.el.nativeElement.style.fontWeight = "500";
    this.el.nativeElement.style.transition = "all 0.2s ease";
  }
}
