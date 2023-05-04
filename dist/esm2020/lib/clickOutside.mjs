import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickOutsideDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    onClick(event, targetElement) {
        if (!targetElement) {
            return;
        }
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
ClickOutsideDirective.ɵfac = function ClickOutsideDirective_Factory(t) { return new (t || ClickOutsideDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ClickOutsideDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ClickOutsideDirective, selectors: [["", "clickOutside", ""]], hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function ClickOutsideDirective_click_HostBindingHandler($event) { return ctx.onClick($event, $event.target); }, false, i0.ɵɵresolveDocument)("touchstart", function ClickOutsideDirective_touchstart_HostBindingHandler($event) { return ctx.onClick($event, $event.target); }, false, i0.ɵɵresolveDocument);
    } }, outputs: { clickOutside: "clickOutside" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClickOutsideDirective, [{
        type: Directive,
        args: [{
                selector: '[clickOutside]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { clickOutside: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['document:click', ['$event', '$event.target']]
        }, {
            type: HostListener,
            args: ['document:touchstart', ['$event', '$event.target']]
        }] }); })();
export class ScrollDirective {
    // tslint:disable-next-line:variable-name
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.scroll = new EventEmitter();
    }
    onClick(event, targetElement) {
        this.scroll.emit(event);
    }
}
ScrollDirective.ɵfac = function ScrollDirective_Factory(t) { return new (t || ScrollDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ScrollDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ScrollDirective, selectors: [["", "scroll", ""]], hostBindings: function ScrollDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("scroll", function ScrollDirective_scroll_HostBindingHandler($event) { return ctx.onClick($event); });
    } }, outputs: { scroll: "scroll" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScrollDirective, [{
        type: Directive,
        args: [{
                selector: '[scroll]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { scroll: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['scroll', ['$event']]
        }] }); })();
// tslint:disable-next-line:class-name
export class styleDirective {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        this.el.nativeElement.style.top = this.styleVal;
    }
    ngOnChanges() {
        this.el.nativeElement.style.top = this.styleVal;
    }
}
styleDirective.ɵfac = function styleDirective_Factory(t) { return new (t || styleDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
styleDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: styleDirective, selectors: [["", "styleProp", ""]], inputs: { styleVal: ["styleProp", "styleVal"] }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(styleDirective, [{
        type: Directive,
        args: [{
                selector: '[styleProp]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { styleVal: [{
            type: Input,
            args: ['styleProp']
        }] }); })();
// tslint:disable-next-line:class-name
export class setPosition {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        if (this.height) {
            this.el.nativeElement.style.bottom = parseInt(this.height + 15 + "") + 'px';
        }
    }
    ngOnChanges() {
        if (this.height) {
            this.el.nativeElement.style.bottom = parseInt(this.height + 15 + "") + 'px';
        }
    }
}
setPosition.ɵfac = function setPosition_Factory(t) { return new (t || setPosition)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
setPosition.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: setPosition, selectors: [["", "setPosition", ""]], inputs: { height: ["setPosition", "height"] }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(setPosition, [{
        type: Directive,
        args: [{
                selector: '[setPosition]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { height: [{
            type: Input,
            args: ['setPosition']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2tPdXRzaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItbXVsdGlzZWxlY3QtZHJvcGRvd24tbGliL3NyYy9saWIvY2xpY2tPdXRzaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEgsTUFBTSxPQUFPLHFCQUFxQjtJQUM5QixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUlwQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFIckQsQ0FBQztJQU9NLE9BQU8sQ0FBQyxLQUFpQixFQUFFLGFBQTBCO1FBQ3hELElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDOzswRkFsQlEscUJBQXFCO3dFQUFyQixxQkFBcUI7d0dBQXJCLGtDQUNSLDhIQURRLGtDQUNSOzt1RkFEUSxxQkFBcUI7Y0FIakMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7YUFDN0I7NkRBTVUsWUFBWTtrQkFEbEIsTUFBTTtZQUtBLE9BQU87a0JBRmIsWUFBWTttQkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUM7O2tCQUMxRCxZQUFZO21CQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQzs7QUFnQnBFLE1BQU0sT0FBTyxlQUFlO0lBQzFCLHlDQUF5QztJQUN2QyxZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUlwQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUgvQyxDQUFDO0lBTU0sT0FBTyxDQUFDLEtBQWlCLEVBQUUsYUFBMEI7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7OEVBWFEsZUFBZTtrRUFBZixlQUFlO29HQUFmLG1CQUFlOzt1RkFBZixlQUFlO2NBSDNCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTthQUN2Qjs2REFPVSxNQUFNO2tCQURaLE1BQU07WUFJQSxPQUFPO2tCQURiLFlBQVk7bUJBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDOztBQVF0QyxzQ0FBc0M7QUFDdEMsTUFBTSxPQUFPLGNBQWM7SUFFdkIsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFFbEMsQ0FBQztJQUlELFFBQVE7UUFFSixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEQsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEQsQ0FBQzs7NEVBZFEsY0FBYztpRUFBZCxjQUFjO3VGQUFkLGNBQWM7Y0FKMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2FBQzFCOzZEQVF1QixRQUFRO2tCQUEzQixLQUFLO21CQUFDLFdBQVc7O0FBZXRCLHNDQUFzQztBQUN0QyxNQUFNLE9BQU8sV0FBVztJQUlwQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUVqQyxDQUFDO0lBQ0QsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQy9FO0lBQ0wsQ0FBQzs7c0VBaEJRLFdBQVc7OERBQVgsV0FBVzt1RkFBWCxXQUFXO2NBSnZCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTthQUM1Qjs2REFJeUIsTUFBTTtrQkFBM0IsS0FBSzttQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNsaWNrT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnRhcmdldCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNoc3RhcnQnLCBbJyRldmVudCcsICckZXZlbnQudGFyZ2V0J10pXG4gICAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xpY2tlZEluc2lkZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KTtcbiAgICAgICAgaWYgKCFjbGlja2VkSW5zaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrT3V0c2lkZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbc2Nyb2xsXSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsRGlyZWN0aXZlIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHNjcm9sbCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Nyb2xsLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3N0eWxlUHJvcF0nXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNsYXNzLW5hbWVcbmV4cG9ydCBjbGFzcyBzdHlsZURpcmVjdGl2ZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB9XG5cbiAgICBASW5wdXQoJ3N0eWxlUHJvcCcpIHN0eWxlVmFsOiBudW1iZXI7XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdGhpcy5zdHlsZVZhbDtcbiAgICB9XG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0aGlzLnN0eWxlVmFsO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tzZXRQb3NpdGlvbl0nXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNsYXNzLW5hbWVcbmV4cG9ydCBjbGFzcyBzZXRQb3NpdGlvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgnc2V0UG9zaXRpb24nKSBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge1xuXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5ib3R0b20gPSBwYXJzZUludCh0aGlzLmhlaWdodCArIDE1ICsgXCJcIikgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5ib3R0b20gPSBwYXJzZUludCh0aGlzLmhlaWdodCArIDE1ICsgXCJcIikgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19