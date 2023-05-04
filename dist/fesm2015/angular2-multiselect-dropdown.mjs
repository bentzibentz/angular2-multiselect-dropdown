import * as i0 from '@angular/core';
import { EventEmitter, Directive, Output, HostListener, Input, Injectable, Pipe, TemplateRef, Component, ContentChild, ViewEncapsulation, PLATFORM_ID, ElementRef, Inject, Optional, ViewChild, NgModule, forwardRef } from '@angular/core';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { isPlatformServer, CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import * as tween from '@tweenjs/tween.js';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

class MyException {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

class ClickOutsideDirective {
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
ClickOutsideDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ClickOutsideDirective, selectors: [["", "clickOutside", ""]], hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵlistener("click", function ClickOutsideDirective_click_HostBindingHandler($event) { return ctx.onClick($event, $event.target); }, false, i0.ɵɵresolveDocument)("touchstart", function ClickOutsideDirective_touchstart_HostBindingHandler($event) { return ctx.onClick($event, $event.target); }, false, i0.ɵɵresolveDocument);
        }
    }, outputs: { clickOutside: "clickOutside" } });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClickOutsideDirective, [{
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
            }] });
})();
class ScrollDirective {
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
ScrollDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ScrollDirective, selectors: [["", "scroll", ""]], hostBindings: function ScrollDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵlistener("scroll", function ScrollDirective_scroll_HostBindingHandler($event) { return ctx.onClick($event); });
        }
    }, outputs: { scroll: "scroll" } });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScrollDirective, [{
            type: Directive,
            args: [{
                    selector: '[scroll]'
                }]
        }], function () { return [{ type: i0.ElementRef }]; }, { scroll: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['scroll', ['$event']]
            }] });
})();
// tslint:disable-next-line:class-name
class styleDirective {
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
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(styleDirective, [{
            type: Directive,
            args: [{
                    selector: '[styleProp]'
                }]
        }], function () { return [{ type: i0.ElementRef }]; }, { styleVal: [{
                type: Input,
                args: ['styleProp']
            }] });
})();
// tslint:disable-next-line:class-name
class setPosition {
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
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(setPosition, [{
            type: Directive,
            args: [{
                    selector: '[setPosition]'
                }]
        }], function () { return [{ type: i0.ElementRef }]; }, { height: [{
                type: Input,
                args: ['setPosition']
            }] });
})();

class DataService {
    constructor() {
        this.filteredData = [];
        this.subject = new Subject();
    }
    setData(data) {
        this.filteredData = data;
        this.subject.next(data);
    }
    getData() {
        return this.subject.asObservable();
    }
    getFilteredData() {
        if (this.filteredData && this.filteredData.length > 0) {
            return this.filteredData;
        }
        else {
            return [];
        }
    }
}
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(); };
DataService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DataService, factory: DataService.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataService, [{
            type: Injectable
        }], null, null);
})();

class ListFilterPipe {
    constructor(ds) {
        this.ds = ds;
        this.filteredList = [];
    }
    transform(items, filter, searchBy) {
        if (!items || !filter || filter == "") {
            return items;
        }
        this.filteredList = items.filter((item) => this.applyFilter(item, filter, searchBy));
        return this.filteredList;
    }
    applyFilter(item, filter, searchBy) {
        let found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (var t = 0; t < searchBy.length; t++) {
                    if (filter && item[searchBy[t]] && item[searchBy[t]] != "") {
                        if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        else {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (var prop in item) {
                    if (filter && item[prop]) {
                        if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        return found;
    }
}
ListFilterPipe.ɵfac = function ListFilterPipe_Factory(t) { return new (t || ListFilterPipe)(i0.ɵɵdirectiveInject(DataService, 16)); };
ListFilterPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "listFilter", type: ListFilterPipe, pure: true });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListFilterPipe, [{
            type: Pipe,
            args: [{
                    name: 'listFilter',
                    pure: true
                }]
        }], function () { return [{ type: DataService }]; }, null);
})();

function CIcon__svg_svg_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 4)(1, "g");
        i0.ɵɵelement(2, "path", 5);
        i0.ɵɵelementEnd()();
    }
}
function CIcon__svg_svg_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 7)(3, "g");
        i0.ɵɵelement(4, "path", 8);
        i0.ɵɵelementEnd()()()();
    }
}
function CIcon__svg_svg_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 9)(3, "g");
        i0.ɵɵelement(4, "path", 10);
        i0.ɵɵelementEnd()()()();
    }
}
function CIcon__svg_svg_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 11)(1, "g")(2, "g")(3, "g", 12)(4, "g");
        i0.ɵɵelement(5, "path", 13);
        i0.ɵɵelementEnd()()()()();
    }
}
function CIcon__svg_svg_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 14)(1, "g");
        i0.ɵɵelement(2, "path", 15);
        i0.ɵɵelementEnd()();
    }
}
class Item {
    constructor() {
    }
}
Item.ɵfac = function Item_Factory(t) { return new (t || Item)(); };
Item.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Item, selectors: [["c-item"]], contentQueries: function Item_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
        }
    }, decls: 0, vars: 0, template: function Item_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Item, [{
            type: Component,
            args: [{
                    selector: 'c-item',
                    template: ``
                }]
        }], function () { return []; }, { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] });
})();
class Badge {
    constructor() {
    }
}
Badge.ɵfac = function Badge_Factory(t) { return new (t || Badge)(); };
Badge.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Badge, selectors: [["c-badge"]], contentQueries: function Badge_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
        }
    }, decls: 0, vars: 0, template: function Badge_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Badge, [{
            type: Component,
            args: [{
                    selector: 'c-badge',
                    template: ``
                }]
        }], function () { return []; }, { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] });
})();
class Search {
    constructor() {
    }
}
Search.ɵfac = function Search_Factory(t) { return new (t || Search)(); };
Search.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Search, selectors: [["c-search"]], contentQueries: function Search_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
        }
    }, decls: 0, vars: 0, template: function Search_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Search, [{
            type: Component,
            args: [{
                    selector: 'c-search',
                    template: ``
                }]
        }], function () { return []; }, { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] });
})();
class TemplateRenderer {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.data.template, {
            $implicit: this.data,
            item: this.item
        });
    }
    ngOnDestroy() {
        this.view.destroy();
    }
}
TemplateRenderer.ɵfac = function TemplateRenderer_Factory(t) { return new (t || TemplateRenderer)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
TemplateRenderer.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TemplateRenderer, selectors: [["c-templateRenderer"]], inputs: { data: "data", item: "item" }, decls: 0, vars: 0, template: function TemplateRenderer_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TemplateRenderer, [{
            type: Component,
            args: [{
                    selector: 'c-templateRenderer',
                    template: ``
                }]
        }], function () { return [{ type: i0.ViewContainerRef }]; }, { data: [{
                type: Input
            }], item: [{
                type: Input
            }] });
})();
class CIcon {
}
CIcon.ɵfac = function CIcon_Factory(t) { return new (t || CIcon)(); };
CIcon.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CIcon, selectors: [["c-icon"]], inputs: { name: "name" }, decls: 5, vars: 5, consts: [["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", "style", "enable-background:new 0 0 47.971 47.971;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", "style", "enable-background:new 0 0 612 612;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", "style", "enable-background:new 0 0 615.52 615.52;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", "style", "enable-background:new 0 0 51.976 51.976;", 0, "xml", "space", "preserve", 4, "ngIf"], ["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 47.971 47.971"], ["d", "M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88\n                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242\n                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879\n                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 612 612"], ["id", "_x31_0_34_"], ["d", "M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782\n\t\t\t\tc-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296\n\t\t\t\tc6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"], ["id", "_x39__30_"], ["d", "M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27\n\t\t\t\tL7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832\n\t\t\t\tc9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 615.52 615.52"], ["id", "Search__x28_and_thou_shall_find_x29_"], ["d", "M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0\n\t\t\t\t\tC104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777\n\t\t\t\t\tl184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291\n\t\t\t\t\tC617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174\n\t\t\t\t\tc-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88\n\t\t\t\t\ts152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 51.976 51.976"], ["d", "M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0\n\t\tC54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778\n\t\tc-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828\n\t\tc0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828\n\t\tl-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"]], template: function CIcon_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, CIcon__svg_svg_0_Template, 3, 0, "svg", 0);
            i0.ɵɵtemplate(1, CIcon__svg_svg_1_Template, 5, 0, "svg", 1);
            i0.ɵɵtemplate(2, CIcon__svg_svg_2_Template, 5, 0, "svg", 1);
            i0.ɵɵtemplate(3, CIcon__svg_svg_3_Template, 6, 0, "svg", 2);
            i0.ɵɵtemplate(4, CIcon__svg_svg_4_Template, 3, 0, "svg", 3);
        }
        if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.name == "remove");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.name == "angle-down");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.name == "angle-up");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.name == "search");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.name == "clear");
        }
    }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CIcon, [{
            type: Component,
            args: [{
                    selector: 'c-icon',
                    template: `<svg *ngIf="name == 'remove'" width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve">
                        <g>
                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                        </g>
                    </svg>
            <svg *ngIf="name == 'angle-down'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
<g>
	<g id="_x31_0_34_">
		<g>
			<path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782
				c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296
				c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"/>
		</g>
	</g>
</g>
</svg>
<svg *ngIf="name == 'angle-up'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
<g>
	<g id="_x39__30_">
		<g>
			<path d="M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27
				L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832
				c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"/>
		</g>
	</g>
</g>

</svg>
<svg *ngIf="name == 'search'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" height="100%" viewBox="0 0 615.52 615.52" style="enable-background:new 0 0 615.52 615.52;"
	 xml:space="preserve">
<g>
	<g>
		<g id="Search__x28_and_thou_shall_find_x29_">
			<g>
				<path d="M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0
					C104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777
					l184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291
					C617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174
					c-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88
					s152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"/>
			</g>
		</g>
	</g>
</g>

</svg>
<svg *ngIf="name == 'clear'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 51.976 51.976" style="enable-background:new 0 0 51.976 51.976;" xml:space="preserve">
<g>
	<path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
		C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
		c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
		c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
		l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
</g>
</svg>`,
                    encapsulation: ViewEncapsulation.None,
                }]
        }], null, { name: [{
                type: Input
            }] });
})();

const _c0$1 = ["header"];
const _c1$1 = ["container"];
const _c2$1 = ["content"];
const _c3$1 = ["invisiblePadding"];
const _c4$1 = ["*"];
function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY() {
    return {
        scrollThrottlingTime: 0,
        scrollDebounceTime: 0,
        scrollAnimationTime: 750,
        checkResizeInterval: 1000,
        resizeBypassRefreshThreshold: 5,
        modifyOverflowStyleOfParentScroll: true,
        stripedTable: false
    };
}
class VirtualScrollerComponent {
    get viewPortInfo() {
        let pageInfo = this.previousViewPort || {};
        return {
            startIndex: pageInfo.startIndex || 0,
            endIndex: pageInfo.endIndex || 0,
            scrollStartPosition: pageInfo.scrollStartPosition || 0,
            scrollEndPosition: pageInfo.scrollEndPosition || 0,
            maxScrollPosition: pageInfo.maxScrollPosition || 0,
            startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
            endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
        };
    }
    get enableUnequalChildrenSizes() {
        return this._enableUnequalChildrenSizes;
    }
    set enableUnequalChildrenSizes(value) {
        if (this._enableUnequalChildrenSizes === value) {
            return;
        }
        this._enableUnequalChildrenSizes = value;
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
    }
    get bufferAmount() {
        if (typeof (this._bufferAmount) === 'number' && this._bufferAmount >= 0) {
            return this._bufferAmount;
        }
        else {
            return this.enableUnequalChildrenSizes ? 5 : 0;
        }
    }
    set bufferAmount(value) {
        this._bufferAmount = value;
    }
    get scrollThrottlingTime() {
        return this._scrollThrottlingTime;
    }
    set scrollThrottlingTime(value) {
        this._scrollThrottlingTime = value;
        this.updateOnScrollFunction();
    }
    get scrollDebounceTime() {
        return this._scrollDebounceTime;
    }
    set scrollDebounceTime(value) {
        this._scrollDebounceTime = value;
        this.updateOnScrollFunction();
    }
    updateOnScrollFunction() {
        if (this.scrollDebounceTime) {
            this.onScroll = this.debounce(() => {
                this.refresh_internal(false);
            }, this.scrollDebounceTime);
        }
        else if (this.scrollThrottlingTime) {
            this.onScroll = this.throttleTrailing(() => {
                this.refresh_internal(false);
            }, this.scrollThrottlingTime);
        }
        else {
            this.onScroll = () => {
                this.refresh_internal(false);
            };
        }
    }
    get checkResizeInterval() {
        return this._checkResizeInterval;
    }
    set checkResizeInterval(value) {
        if (this._checkResizeInterval === value) {
            return;
        }
        this._checkResizeInterval = value;
        this.addScrollEventHandlers();
    }
    get items() {
        return this._items;
    }
    set items(value) {
        if (value === this._items) {
            return;
        }
        this._items = value || [];
        this.refresh_internal(true);
    }
    get horizontal() {
        return this._horizontal;
    }
    set horizontal(value) {
        this._horizontal = value;
        this.updateDirection();
    }
    revertParentOverscroll() {
        const scrollElement = this.getScrollElement();
        if (scrollElement && this.oldParentScrollOverflow) {
            scrollElement.style['overflow-y'] = this.oldParentScrollOverflow.y;
            scrollElement.style['overflow-x'] = this.oldParentScrollOverflow.x;
        }
        this.oldParentScrollOverflow = undefined;
    }
    get parentScroll() {
        return this._parentScroll;
    }
    set parentScroll(value) {
        if (this._parentScroll === value) {
            return;
        }
        this.revertParentOverscroll();
        this._parentScroll = value;
        this.addScrollEventHandlers();
        const scrollElement = this.getScrollElement();
        if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
            this.oldParentScrollOverflow = { x: scrollElement.style['overflow-x'], y: scrollElement.style['overflow-y'] };
            scrollElement.style['overflow-y'] = this.horizontal ? 'visible' : 'auto';
            scrollElement.style['overflow-x'] = this.horizontal ? 'auto' : 'visible';
        }
    }
    ngOnInit() {
        this.addScrollEventHandlers();
    }
    ngOnDestroy() {
        this.removeScrollEventHandlers();
        this.revertParentOverscroll();
    }
    ngOnChanges(changes) {
        let indexLengthChanged = this.cachedItemsLength !== this.items.length;
        this.cachedItemsLength = this.items.length;
        const firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
        this.refresh_internal(indexLengthChanged || firstRun);
    }
    ngDoCheck() {
        if (this.cachedItemsLength !== this.items.length) {
            this.cachedItemsLength = this.items.length;
            this.refresh_internal(true);
            return;
        }
        if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
            let itemsArrayChanged = false;
            for (let i = 0; i < this.viewPortItems.length; ++i) {
                if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
                    itemsArrayChanged = true;
                    break;
                }
            }
            if (itemsArrayChanged) {
                this.refresh_internal(true);
            }
        }
    }
    refresh() {
        this.refresh_internal(true);
    }
    invalidateAllCachedMeasurements() {
        this.wrapGroupDimensions = {
            maxChildSizePerWrapGroup: [],
            numberOfKnownWrapGroupChildSizes: 0,
            sumOfKnownWrapGroupChildWidths: 0,
            sumOfKnownWrapGroupChildHeights: 0
        };
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementForItem(item) {
        if (this.enableUnequalChildrenSizes) {
            let index = this.items && this.items.indexOf(item);
            if (index >= 0) {
                this.invalidateCachedMeasurementAtIndex(index);
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementAtIndex(index) {
        if (this.enableUnequalChildrenSizes) {
            let cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
            if (cachedMeasurement) {
                this.wrapGroupDimensions.maxChildSizePerWrapGroup[index] = undefined;
                --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= cachedMeasurement.childWidth || 0;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= cachedMeasurement.childHeight || 0;
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    }
    scrollInto(item, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let index = this.items.indexOf(item);
        if (index === -1) {
            return;
        }
        this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
    }
    scrollToIndex(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let maxRetries = 5;
        let retryIfNeeded = () => {
            --maxRetries;
            if (maxRetries <= 0) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            let dimensions = this.calculateDimensions();
            let desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
            if (this.previousViewPort.startIndex === desiredStartIndex) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
        };
        this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
    }
    scrollToIndex_internal(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let dimensions = this.calculateDimensions();
        let scroll = this.calculatePadding(index, dimensions) + additionalOffset;
        if (!alignToBeginning) {
            scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
        }
        this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
    }
    scrollToPosition(scrollPosition, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        scrollPosition += this.getElementsOffset();
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let scrollElement = this.getScrollElement();
        let animationRequest;
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = undefined;
        }
        if (!animationMilliseconds) {
            this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
            this.refresh_internal(false, animationCompletedCallback);
            return;
        }
        const tweenConfigObj = { scrollPosition: scrollElement[this._scrollType] };
        let newTween = new tween.Tween(tweenConfigObj)
            .to({ scrollPosition }, animationMilliseconds)
            .easing(tween.Easing.Quadratic.Out)
            .onUpdate((data) => {
            if (isNaN(data.scrollPosition)) {
                return;
            }
            this.renderer.setProperty(scrollElement, this._scrollType, data.scrollPosition);
            this.refresh_internal(false);
        })
            .onStop(() => {
            cancelAnimationFrame(animationRequest);
        })
            .start();
        const animate = (time) => {
            if (!newTween["isPlaying"]()) {
                return;
            }
            newTween.update(time);
            if (tweenConfigObj.scrollPosition === scrollPosition) {
                this.refresh_internal(false, animationCompletedCallback);
                return;
            }
            this.zone.runOutsideAngular(() => {
                animationRequest = requestAnimationFrame(animate);
            });
        };
        animate();
        this.currentTween = newTween;
    }
    constructor(element, renderer, zone, changeDetectorRef, platformId, options) {
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.window = window;
        this.executeRefreshOutsideAngularZone = false;
        this._enableUnequalChildrenSizes = false;
        this.useMarginInsteadOfTranslate = false;
        this.ssrViewportWidth = 1920;
        this.ssrViewportHeight = 1080;
        this._bufferAmount = 0;
        this._items = [];
        this.compareItems = (item1, item2) => item1 === item2;
        this.vsUpdate = new EventEmitter();
        this.vsChange = new EventEmitter();
        this.vsStart = new EventEmitter();
        this.vsEnd = new EventEmitter();
        this.calculatedScrollbarWidth = 0;
        this.calculatedScrollbarHeight = 0;
        this.padding = 0;
        this.previousViewPort = {};
        this.cachedPageSize = 0;
        this.previousScrollNumberElements = 0;
        this.isAngularUniversalSSR = isPlatformServer(platformId);
        this.scrollThrottlingTime = options.scrollThrottlingTime;
        this.scrollDebounceTime = options.scrollDebounceTime;
        this.scrollAnimationTime = options.scrollAnimationTime;
        this.scrollbarWidth = options.scrollbarWidth;
        this.scrollbarHeight = options.scrollbarHeight;
        this.checkResizeInterval = options.checkResizeInterval;
        this.resizeBypassRefreshThreshold = options.resizeBypassRefreshThreshold;
        this.modifyOverflowStyleOfParentScroll = options.modifyOverflowStyleOfParentScroll;
        this.stripedTable = options.stripedTable;
        this.horizontal = false;
        this.resetWrapGroupDimensions();
    }
    getElementSize(element) {
        let result = element.getBoundingClientRect();
        let styles = getComputedStyle(element);
        let marginTop = parseInt(styles['margin-top'], 10) || 0;
        let marginBottom = parseInt(styles['margin-bottom'], 10) || 0;
        let marginLeft = parseInt(styles['margin-left'], 10) || 0;
        let marginRight = parseInt(styles['margin-right'], 10) || 0;
        return {
            top: result.top + marginTop,
            bottom: result.bottom + marginBottom,
            left: result.left + marginLeft,
            right: result.right + marginRight,
            width: result.width + marginLeft + marginRight,
            height: result.height + marginTop + marginBottom,
            y: result.top + marginTop,
            x: result.left + marginLeft,
            toJSON() {
                result.toJSON();
            }
        };
    }
    checkScrollElementResized() {
        let boundingRect = this.getElementSize(this.getScrollElement());
        let sizeChanged;
        if (!this.previousScrollBoundingRect) {
            sizeChanged = true;
        }
        else {
            let widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
            let heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
            sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
        }
        if (sizeChanged) {
            this.previousScrollBoundingRect = boundingRect;
            if (boundingRect.width > 0 && boundingRect.height > 0) {
                this.refresh_internal(false);
            }
        }
    }
    updateDirection() {
        if (this.horizontal) {
            this._invisiblePaddingProperty = 'width';
            this._offsetType = 'offsetLeft';
            this._pageOffsetType = 'pageXOffset';
            this._childScrollDim = 'childWidth';
            this._marginDir = 'margin-left';
            this._translateDir = 'translateX';
            this._scrollType = 'scrollLeft';
        }
        else {
            this._invisiblePaddingProperty = 'height';
            this._offsetType = 'offsetTop';
            this._pageOffsetType = 'pageYOffset';
            this._childScrollDim = 'childHeight';
            this._marginDir = 'margin-top';
            this._translateDir = 'translateY';
            this._scrollType = 'scrollTop';
        }
    }
    debounce(func, wait) {
        const throttled = this.throttleTrailing(func, wait);
        const result = function () {
            throttled['cancel']();
            throttled.apply(this, arguments);
        };
        result['cancel'] = function () {
            throttled['cancel']();
        };
        return result;
    }
    throttleTrailing(func, wait) {
        let timeout = undefined;
        let _arguments = arguments;
        const result = function () {
            const _this = this;
            _arguments = arguments;
            if (timeout) {
                return;
            }
            if (wait <= 0) {
                func.apply(_this, _arguments);
            }
            else {
                timeout = setTimeout(function () {
                    timeout = undefined;
                    func.apply(_this, _arguments);
                }, wait);
            }
        };
        result['cancel'] = function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
        };
        return result;
    }
    refresh_internal(itemsArrayModified, refreshCompletedCallback = undefined, maxRunTimes = 2) {
        //note: maxRunTimes is to force it to keep recalculating if the previous iteration caused a re-render (different sliced items in viewport or scrollPosition changed).
        //The default of 2x max will probably be accurate enough without causing too large a performance bottleneck
        //The code would typically quit out on the 2nd iteration anyways. The main time it'd think more than 2 runs would be necessary would be for vastly different sized child items or if this is the 1st time the items array was initialized.
        //Without maxRunTimes, If the user is actively scrolling this code would become an infinite loop until they stopped scrolling. This would be okay, except each scroll event would start an additional infinte loop. We want to short-circuit it to prevent this.
        if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
            //if items were prepended, scroll forward to keep same items visible
            let oldViewPort = this.previousViewPort;
            let oldViewPortItems = this.viewPortItems;
            let oldRefreshCompletedCallback = refreshCompletedCallback;
            refreshCompletedCallback = () => {
                let scrollLengthDelta = this.previousViewPort.scrollLength - oldViewPort.scrollLength;
                if (scrollLengthDelta > 0 && this.viewPortItems) {
                    let oldStartItem = oldViewPortItems[0];
                    let oldStartItemIndex = this.items.findIndex(x => this.compareItems(oldStartItem, x));
                    if (oldStartItemIndex > this.previousViewPort.startIndexWithBuffer) {
                        let itemOrderChanged = false;
                        for (let i = 1; i < this.viewPortItems.length; ++i) {
                            if (!this.compareItems(this.items[oldStartItemIndex + i], oldViewPortItems[i])) {
                                itemOrderChanged = true;
                                break;
                            }
                        }
                        if (!itemOrderChanged) {
                            this.scrollToPosition(this.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback);
                            return;
                        }
                    }
                }
                if (oldRefreshCompletedCallback) {
                    oldRefreshCompletedCallback();
                }
            };
        }
        this.zone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                if (itemsArrayModified) {
                    this.resetWrapGroupDimensions();
                }
                let viewport = this.calculateViewport();
                let startChanged = itemsArrayModified || viewport.startIndex !== this.previousViewPort.startIndex;
                let endChanged = itemsArrayModified || viewport.endIndex !== this.previousViewPort.endIndex;
                let scrollLengthChanged = viewport.scrollLength !== this.previousViewPort.scrollLength;
                let paddingChanged = viewport.padding !== this.previousViewPort.padding;
                let scrollPositionChanged = viewport.scrollStartPosition !== this.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== this.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== this.previousViewPort.maxScrollPosition;
                this.previousViewPort = viewport;
                if (scrollLengthChanged) {
                    this.renderer.setStyle(this.invisiblePaddingElementRef.nativeElement, this._invisiblePaddingProperty, `${viewport.scrollLength}px`);
                }
                if (paddingChanged) {
                    if (this.useMarginInsteadOfTranslate) {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, this._marginDir, `${viewport.padding}px`);
                    }
                    else {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'transform', `${this._translateDir}(${viewport.padding}px)`);
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${viewport.padding}px)`);
                    }
                }
                if (this.headerElementRef) {
                    let scrollPosition = this.getScrollElement()[this._scrollType];
                    let containerOffset = this.getElementsOffset();
                    let offset = Math.max(scrollPosition - viewport.padding - containerOffset + this.headerElementRef.nativeElement.clientHeight, 0);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'transform', `${this._translateDir}(${offset}px)`);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${offset}px)`);
                }
                const changeEventArg = (startChanged || endChanged) ? {
                    startIndex: viewport.startIndex,
                    endIndex: viewport.endIndex,
                    scrollStartPosition: viewport.scrollStartPosition,
                    scrollEndPosition: viewport.scrollEndPosition,
                    startIndexWithBuffer: viewport.startIndexWithBuffer,
                    endIndexWithBuffer: viewport.endIndexWithBuffer,
                    maxScrollPosition: viewport.maxScrollPosition
                } : undefined;
                if (startChanged || endChanged || scrollPositionChanged) {
                    const handleChanged = () => {
                        // update the scroll list to trigger re-render of components in viewport
                        this.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? this.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
                        this.vsUpdate.emit(this.viewPortItems);
                        if (startChanged) {
                            this.vsStart.emit(changeEventArg);
                        }
                        if (endChanged) {
                            this.vsEnd.emit(changeEventArg);
                        }
                        if (startChanged || endChanged) {
                            this.changeDetectorRef.markForCheck();
                            this.vsChange.emit(changeEventArg);
                        }
                        if (maxRunTimes > 0) {
                            this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                            return;
                        }
                        if (refreshCompletedCallback) {
                            refreshCompletedCallback();
                        }
                    };
                    if (this.executeRefreshOutsideAngularZone) {
                        handleChanged();
                    }
                    else {
                        this.zone.run(handleChanged);
                    }
                }
                else {
                    if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
                        this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                        return;
                    }
                    if (refreshCompletedCallback) {
                        refreshCompletedCallback();
                    }
                }
            });
        });
    }
    getScrollElement() {
        return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
    }
    addScrollEventHandlers() {
        if (this.isAngularUniversalSSR) {
            return;
        }
        let scrollElement = this.getScrollElement();
        this.removeScrollEventHandlers();
        this.zone.runOutsideAngular(() => {
            if (this.parentScroll instanceof Window) {
                this.disposeScrollHandler = this.renderer.listen('window', 'scroll', this.onScroll);
                this.disposeResizeHandler = this.renderer.listen('window', 'resize', this.onScroll);
            }
            else {
                this.disposeScrollHandler = this.renderer.listen(scrollElement, 'scroll', this.onScroll);
                if (this._checkResizeInterval > 0) {
                    this.checkScrollElementResizedTimer = setInterval(() => { this.checkScrollElementResized(); }, this._checkResizeInterval);
                }
            }
        });
    }
    removeScrollEventHandlers() {
        if (this.checkScrollElementResizedTimer) {
            clearInterval(this.checkScrollElementResizedTimer);
        }
        if (this.disposeScrollHandler) {
            this.disposeScrollHandler();
            this.disposeScrollHandler = undefined;
        }
        if (this.disposeResizeHandler) {
            this.disposeResizeHandler();
            this.disposeResizeHandler = undefined;
        }
    }
    getElementsOffset() {
        if (this.isAngularUniversalSSR) {
            return 0;
        }
        let offset = 0;
        if (this.containerElementRef && this.containerElementRef.nativeElement) {
            offset += this.containerElementRef.nativeElement[this._offsetType];
        }
        if (this.parentScroll) {
            let scrollElement = this.getScrollElement();
            let elementClientRect = this.getElementSize(this.element.nativeElement);
            let scrollClientRect = this.getElementSize(scrollElement);
            if (this.horizontal) {
                offset += elementClientRect.left - scrollClientRect.left;
            }
            else {
                offset += elementClientRect.top - scrollClientRect.top;
            }
            if (!(this.parentScroll instanceof Window)) {
                offset += scrollElement[this._scrollType];
            }
        }
        return offset;
    }
    countItemsPerWrapGroup() {
        if (this.isAngularUniversalSSR) {
            return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
        }
        let propertyName = this.horizontal ? 'offsetLeft' : 'offsetTop';
        let children = ((this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement).children;
        let childrenLength = children ? children.length : 0;
        if (childrenLength === 0) {
            return 1;
        }
        let firstOffset = children[0][propertyName];
        let result = 1;
        while (result < childrenLength && firstOffset === children[result][propertyName]) {
            ++result;
        }
        return result;
    }
    getScrollStartPosition() {
        let windowScrollValue = undefined;
        if (this.parentScroll instanceof Window) {
            windowScrollValue = window[this._pageOffsetType];
        }
        return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
    }
    resetWrapGroupDimensions() {
        const oldWrapGroupDimensions = this.wrapGroupDimensions;
        this.invalidateAllCachedMeasurements();
        if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
            return;
        }
        const itemsPerWrapGroup = this.countItemsPerWrapGroup();
        for (let wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
            const oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
            if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
                continue;
            }
            if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
                return;
            }
            let itemsChanged = false;
            let arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
            for (let i = 0; i < itemsPerWrapGroup; ++i) {
                if (!this.compareItems(oldWrapGroupDimension.items[i], this.items[arrayStartIndex + i])) {
                    itemsChanged = true;
                    break;
                }
            }
            if (!itemsChanged) {
                ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += oldWrapGroupDimension.childWidth || 0;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += oldWrapGroupDimension.childHeight || 0;
                this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = oldWrapGroupDimension;
            }
        }
    }
    calculateDimensions() {
        let scrollElement = this.getScrollElement();
        const maxCalculatedScrollBarSize = 25; // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
        this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
        this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
        let viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
        let viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
        let content = (this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement;
        let itemsPerWrapGroup = this.countItemsPerWrapGroup();
        let wrapGroupsPerPage;
        let defaultChildWidth;
        let defaultChildHeight;
        if (this.isAngularUniversalSSR) {
            viewportWidth = this.ssrViewportWidth;
            viewportHeight = this.ssrViewportHeight;
            defaultChildWidth = this.ssrChildWidth;
            defaultChildHeight = this.ssrChildHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else if (!this.enableUnequalChildrenSizes) {
            if (content.children.length > 0) {
                if (!this.childWidth || !this.childHeight) {
                    if (!this.minMeasuredChildWidth && viewportWidth > 0) {
                        this.minMeasuredChildWidth = viewportWidth;
                    }
                    if (!this.minMeasuredChildHeight && viewportHeight > 0) {
                        this.minMeasuredChildHeight = viewportHeight;
                    }
                }
                let child = content.children[0];
                let clientRect = this.getElementSize(child);
                this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
                this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
            }
            defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else {
            let scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
            let arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
            let wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
            let maxWidthForWrapGroup = 0;
            let maxHeightForWrapGroup = 0;
            let sumOfVisibleMaxWidths = 0;
            let sumOfVisibleMaxHeights = 0;
            wrapGroupsPerPage = 0;
            for (let i = 0; i < content.children.length; ++i) {
                ++arrayStartIndex;
                let child = content.children[i];
                let clientRect = this.getElementSize(child);
                maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
                maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
                if (arrayStartIndex % itemsPerWrapGroup === 0) {
                    let oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                    if (oldValue) {
                        --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
                    }
                    ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    const items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
                        childWidth: maxWidthForWrapGroup,
                        childHeight: maxHeightForWrapGroup,
                        items: items
                    };
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
                    if (this.horizontal) {
                        let maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
                            maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
                        if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    else {
                        let maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
                            maxVisibleHeightForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxHeights += maxVisibleHeightForWrapGroup;
                        if (maxVisibleHeightForWrapGroup > 0 && viewportHeight >= sumOfVisibleMaxHeights) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    ++wrapGroupIndex;
                    maxWidthForWrapGroup = 0;
                    maxHeightForWrapGroup = 0;
                }
            }
            let averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            let averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            defaultChildWidth = this.childWidth || averageChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || averageChildHeight || viewportHeight;
            if (this.horizontal) {
                if (viewportWidth > sumOfVisibleMaxWidths) {
                    wrapGroupsPerPage += Math.ceil((viewportWidth - sumOfVisibleMaxWidths) / defaultChildWidth);
                }
            }
            else {
                if (viewportHeight > sumOfVisibleMaxHeights) {
                    wrapGroupsPerPage += Math.ceil((viewportHeight - sumOfVisibleMaxHeights) / defaultChildHeight);
                }
            }
        }
        let itemCount = this.items.length;
        let itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
        let pageCount_fractional = itemCount / itemsPerPage;
        let numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
        let scrollLength = 0;
        let defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
        if (this.enableUnequalChildrenSizes) {
            let numUnknownChildSizes = 0;
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                if (childSize) {
                    scrollLength += childSize;
                }
                else {
                    ++numUnknownChildSizes;
                }
            }
            scrollLength += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        }
        else {
            scrollLength = numberOfWrapGroups * defaultScrollLengthPerWrapGroup;
        }
        if (this.headerElementRef) {
            scrollLength += this.headerElementRef.nativeElement.clientHeight;
        }
        let viewportLength = this.horizontal ? viewportWidth : viewportHeight;
        let maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
        return {
            itemCount: itemCount,
            itemsPerWrapGroup: itemsPerWrapGroup,
            wrapGroupsPerPage: wrapGroupsPerPage,
            itemsPerPage: itemsPerPage,
            pageCount_fractional: pageCount_fractional,
            childWidth: defaultChildWidth,
            childHeight: defaultChildHeight,
            scrollLength: scrollLength,
            viewportLength: viewportLength,
            maxScrollPosition: maxScrollPosition
        };
    }
    calculatePadding(arrayStartIndexWithBuffer, dimensions) {
        if (dimensions.itemCount === 0) {
            return 0;
        }
        let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
        let startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
        if (!this.enableUnequalChildrenSizes) {
            return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
        }
        let numUnknownChildSizes = 0;
        let result = 0;
        for (let i = 0; i < startingWrapGroupIndex; ++i) {
            let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
            if (childSize) {
                result += childSize;
            }
            else {
                ++numUnknownChildSizes;
            }
        }
        result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        return result;
    }
    calculatePageInfo(scrollPosition, dimensions) {
        let scrollPercentage = 0;
        if (this.enableUnequalChildrenSizes) {
            const numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
            let totalScrolledLength = 0;
            let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                if (childSize) {
                    totalScrolledLength += childSize;
                }
                else {
                    totalScrolledLength += defaultScrollLengthPerWrapGroup;
                }
                if (scrollPosition < totalScrolledLength) {
                    scrollPercentage = i / numberOfWrapGroups;
                    break;
                }
            }
        }
        else {
            scrollPercentage = scrollPosition / dimensions.scrollLength;
        }
        let startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
        let maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
        let arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
        arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup; // round down to start of wrapGroup
        if (this.stripedTable) {
            let bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
            if (arrayStartIndex % bufferBoundary !== 0) {
                arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
            }
        }
        let arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
        let endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
        if (endIndexWithinWrapGroup > 0) {
            arrayEndIndex += dimensions.itemsPerWrapGroup - endIndexWithinWrapGroup; // round up to end of wrapGroup
        }
        if (isNaN(arrayStartIndex)) {
            arrayStartIndex = 0;
        }
        if (isNaN(arrayEndIndex)) {
            arrayEndIndex = 0;
        }
        arrayStartIndex = Math.min(Math.max(arrayStartIndex, 0), dimensions.itemCount - 1);
        arrayEndIndex = Math.min(Math.max(arrayEndIndex, 0), dimensions.itemCount - 1);
        let bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
        let startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
        let endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
        return {
            startIndex: arrayStartIndex,
            endIndex: arrayEndIndex,
            startIndexWithBuffer: startIndexWithBuffer,
            endIndexWithBuffer: endIndexWithBuffer,
            scrollStartPosition: scrollPosition,
            scrollEndPosition: scrollPosition + dimensions.viewportLength,
            maxScrollPosition: dimensions.maxScrollPosition
        };
    }
    calculateViewport() {
        let dimensions = this.calculateDimensions();
        let offset = this.getElementsOffset();
        let scrollStartPosition = this.getScrollStartPosition();
        if (scrollStartPosition > (dimensions.scrollLength + offset) && !(this.parentScroll instanceof Window)) {
            scrollStartPosition = dimensions.scrollLength;
        }
        else {
            scrollStartPosition -= offset;
        }
        scrollStartPosition = Math.max(0, scrollStartPosition);
        let pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
        let newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
        let newScrollLength = dimensions.scrollLength;
        return {
            startIndex: pageInfo.startIndex,
            endIndex: pageInfo.endIndex,
            startIndexWithBuffer: pageInfo.startIndexWithBuffer,
            endIndexWithBuffer: pageInfo.endIndexWithBuffer,
            padding: Math.round(newPadding),
            scrollLength: Math.round(newScrollLength),
            scrollStartPosition: pageInfo.scrollStartPosition,
            scrollEndPosition: pageInfo.scrollEndPosition,
            maxScrollPosition: pageInfo.maxScrollPosition
        };
    }
}
VirtualScrollerComponent.ɵfac = function VirtualScrollerComponent_Factory(t) { return new (t || VirtualScrollerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(PLATFORM_ID), i0.ɵɵdirectiveInject('virtual-scroller-default-options', 8)); };
VirtualScrollerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VirtualScrollerComponent, selectors: [["virtual-scroller"], ["", "virtualScroller", ""]], contentQueries: function VirtualScrollerComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, _c0$1, 5, ElementRef);
            i0.ɵɵcontentQuery(dirIndex, _c1$1, 5, ElementRef);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.headerElementRef = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.containerElementRef = _t.first);
        }
    }, viewQuery: function VirtualScrollerComponent_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(_c2$1, 5, ElementRef);
            i0.ɵɵviewQuery(_c3$1, 5, ElementRef);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.contentElementRef = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.invisiblePaddingElementRef = _t.first);
        }
    }, hostVars: 6, hostBindings: function VirtualScrollerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
            i0.ɵɵclassProp("horizontal", ctx.horizontal)("vertical", !ctx.horizontal)("selfScroll", !ctx.parentScroll);
        }
    }, inputs: { executeRefreshOutsideAngularZone: "executeRefreshOutsideAngularZone", enableUnequalChildrenSizes: "enableUnequalChildrenSizes", useMarginInsteadOfTranslate: "useMarginInsteadOfTranslate", modifyOverflowStyleOfParentScroll: "modifyOverflowStyleOfParentScroll", stripedTable: "stripedTable", scrollbarWidth: "scrollbarWidth", scrollbarHeight: "scrollbarHeight", childWidth: "childWidth", childHeight: "childHeight", ssrChildWidth: "ssrChildWidth", ssrChildHeight: "ssrChildHeight", ssrViewportWidth: "ssrViewportWidth", ssrViewportHeight: "ssrViewportHeight", bufferAmount: "bufferAmount", scrollAnimationTime: "scrollAnimationTime", resizeBypassRefreshThreshold: "resizeBypassRefreshThreshold", scrollThrottlingTime: "scrollThrottlingTime", scrollDebounceTime: "scrollDebounceTime", checkResizeInterval: "checkResizeInterval", items: "items", compareItems: "compareItems", horizontal: "horizontal", parentScroll: "parentScroll" }, outputs: { vsUpdate: "vsUpdate", vsChange: "vsChange", vsStart: "vsStart", vsEnd: "vsEnd" }, exportAs: ["virtualScroller"], features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c4$1, decls: 5, vars: 0, consts: [[1, "total-padding"], ["invisiblePadding", ""], [1, "scrollable-content"], ["content", ""]], template: function VirtualScrollerComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelement(0, "div", 0, 1);
            i0.ɵɵelementStart(2, "div", 2, 3);
            i0.ɵɵprojection(4);
            i0.ɵɵelementEnd();
        }
    }, styles: ["[_nghost-%COMP%]{position:relative;display:block;-webkit-overflow-scrolling:touch}.horizontal.selfScroll[_nghost-%COMP%]{overflow-y:visible;overflow-x:auto}.vertical.selfScroll[_nghost-%COMP%]{overflow-y:auto;overflow-x:visible}.scrollable-content[_ngcontent-%COMP%]{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content[_ngcontent-%COMP%]    >*{box-sizing:border-box}.horizontal[_nghost-%COMP%]{white-space:nowrap}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]{display:flex}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]    >*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding[_ngcontent-%COMP%]{width:1px;opacity:0}.horizontal[_nghost-%COMP%]   .total-padding[_ngcontent-%COMP%]{height:100%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VirtualScrollerComponent, [{
            type: Component,
            args: [{ selector: 'virtual-scroller,[virtualScroller]', exportAs: 'virtualScroller', template: `
    <div class="total-padding" #invisiblePadding></div>
    <div class="scrollable-content" #content>
      <ng-content></ng-content>
    </div>
  `, host: {
                        '[class.horizontal]': "horizontal",
                        '[class.vertical]': "!horizontal",
                        '[class.selfScroll]': "!parentScroll"
                    }, styles: [":host{position:relative;display:block;-webkit-overflow-scrolling:touch}:host.horizontal.selfScroll{overflow-y:visible;overflow-x:auto}:host.vertical.selfScroll{overflow-y:auto;overflow-x:visible}.scrollable-content{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content ::ng-deep>*{box-sizing:border-box}:host.horizontal{white-space:nowrap}:host.horizontal .scrollable-content{display:flex}:host.horizontal .scrollable-content ::ng-deep>*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding{width:1px;opacity:0}:host.horizontal .total-padding{height:100%}\n"] }]
        }], function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: ['virtual-scroller-default-options']
                    }] }];
    }, { executeRefreshOutsideAngularZone: [{
                type: Input
            }], enableUnequalChildrenSizes: [{
                type: Input
            }], useMarginInsteadOfTranslate: [{
                type: Input
            }], modifyOverflowStyleOfParentScroll: [{
                type: Input
            }], stripedTable: [{
                type: Input
            }], scrollbarWidth: [{
                type: Input
            }], scrollbarHeight: [{
                type: Input
            }], childWidth: [{
                type: Input
            }], childHeight: [{
                type: Input
            }], ssrChildWidth: [{
                type: Input
            }], ssrChildHeight: [{
                type: Input
            }], ssrViewportWidth: [{
                type: Input
            }], ssrViewportHeight: [{
                type: Input
            }], bufferAmount: [{
                type: Input
            }], scrollAnimationTime: [{
                type: Input
            }], resizeBypassRefreshThreshold: [{
                type: Input
            }], scrollThrottlingTime: [{
                type: Input
            }], scrollDebounceTime: [{
                type: Input
            }], checkResizeInterval: [{
                type: Input
            }], items: [{
                type: Input
            }], compareItems: [{
                type: Input
            }], horizontal: [{
                type: Input
            }], parentScroll: [{
                type: Input
            }], vsUpdate: [{
                type: Output
            }], vsChange: [{
                type: Output
            }], vsStart: [{
                type: Output
            }], vsEnd: [{
                type: Output
            }], contentElementRef: [{
                type: ViewChild,
                args: ['content', { read: ElementRef, static: false }]
            }], invisiblePaddingElementRef: [{
                type: ViewChild,
                args: ['invisiblePadding', { read: ElementRef, static: false }]
            }], headerElementRef: [{
                type: ContentChild,
                args: ['header', { read: ElementRef, static: false }]
            }], containerElementRef: [{
                type: ContentChild,
                args: ['container', { read: ElementRef, static: false }]
            }] });
})();
class VirtualScrollerModule {
}
VirtualScrollerModule.ɵfac = function VirtualScrollerModule_Factory(t) { return new (t || VirtualScrollerModule)(); };
VirtualScrollerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VirtualScrollerModule });
VirtualScrollerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        {
            provide: 'virtual-scroller-default-options',
            useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
        }
    ], imports: [CommonModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VirtualScrollerModule, [{
            type: NgModule,
            args: [{
                    exports: [VirtualScrollerComponent],
                    declarations: [VirtualScrollerComponent],
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: 'virtual-scroller-default-options',
                            useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
                        }
                    ]
                }]
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VirtualScrollerModule, { declarations: [VirtualScrollerComponent], imports: [CommonModule], exports: [VirtualScrollerComponent] }); })();

const _c0 = ["searchInput"];
const _c1 = ["selectedList"];
const _c2 = ["dropdownList"];
const _c3 = ["cuppaDropdown"];
function AngularMultiSelect_span_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r2.settings.text);
    }
}
function AngularMultiSelect_span_6_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r27 = ctx.$implicit;
        const ctx_r26 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", item_r27[ctx_r26.settings.labelKey], " ");
    }
}
function AngularMultiSelect_span_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtemplate(1, AngularMultiSelect_span_6_span_1_Template, 2, 1, "span", 22);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r3.selectedItems)("ngForTrackBy", ctx_r3.trackByFn.bind(ctx_r3));
    }
}
function AngularMultiSelect_span_7_div_1_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 29);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r30 = i0.ɵɵnextContext().$implicit;
        const ctx_r32 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(item_r30[ctx_r32.settings.labelKey]);
    }
}
function AngularMultiSelect_span_7_div_1_span_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 29);
        i0.ɵɵelement(1, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r30 = i0.ɵɵnextContext().$implicit;
        const ctx_r33 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("data", ctx_r33.badgeTempl)("item", item_r30);
    }
}
function AngularMultiSelect_span_7_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r37 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 25);
        i0.ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_span_1_Template, 2, 1, "span", 26);
        i0.ɵɵtemplate(2, AngularMultiSelect_span_7_div_1_span_2_Template, 2, 2, "span", 26);
        i0.ɵɵelementStart(3, "span", 27);
        i0.ɵɵlistener("click", function AngularMultiSelect_span_7_div_1_Template_span_click_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r37); const item_r30 = restoredCtx.$implicit; const k_r31 = restoredCtx.index; const ctx_r36 = i0.ɵɵnextContext(2); ctx_r36.onItemClick(item_r30, k_r31, $event); return i0.ɵɵresetView($event.stopPropagation()); });
        i0.ɵɵelement(4, "c-icon", 28);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r29 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx_r29.badgeTempl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r29.badgeTempl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("name", "remove");
    }
}
function AngularMultiSelect_span_7_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 23);
        i0.ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_Template, 5, 3, "div", 24);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r4.selectedItems)("ngForTrackBy", ctx_r4.trackByFn.bind(ctx_r4));
    }
}
function AngularMultiSelect_div_8_div_1_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 29);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r39 = i0.ɵɵnextContext().$implicit;
        const ctx_r41 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(item_r39[ctx_r41.settings.labelKey]);
    }
}
function AngularMultiSelect_div_8_div_1_span_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 29);
        i0.ɵɵelement(1, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r39 = i0.ɵɵnextContext().$implicit;
        const ctx_r42 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("data", ctx_r42.badgeTempl)("item", item_r39);
    }
}
function AngularMultiSelect_div_8_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r46 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 32);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_span_1_Template, 2, 1, "span", 26);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_8_div_1_span_2_Template, 2, 2, "span", 26);
        i0.ɵɵelementStart(3, "span", 27);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_8_div_1_Template_span_click_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r46); const item_r39 = restoredCtx.$implicit; const k_r40 = restoredCtx.index; const ctx_r45 = i0.ɵɵnextContext(2); ctx_r45.onItemClick(item_r39, k_r40, $event); return i0.ɵɵresetView($event.stopPropagation()); });
        i0.ɵɵelement(4, "c-icon", 28);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const k_r40 = ctx.index;
        const ctx_r38 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("hidden", k_r40 > ctx_r38.settings.badgeShowLimit - 1);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx_r38.badgeTempl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r38.badgeTempl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("name", "remove");
    }
}
function AngularMultiSelect_div_8_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 23);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_Template, 5, 4, "div", 31);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r5.selectedItems)("ngForTrackBy", ctx_r5.trackByFn.bind(ctx_r5));
    }
}
function AngularMultiSelect_span_9_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 33);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1("+", (ctx_r6.selectedItems == null ? null : ctx_r6.selectedItems.length) - ctx_r6.settings.badgeShowLimit, "");
    }
}
function AngularMultiSelect_span_10_Template(rf, ctx) {
    if (rf & 1) {
        const _r48 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span", 34);
        i0.ɵɵlistener("click", function AngularMultiSelect_span_10_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r47 = i0.ɵɵnextContext(); ctx_r47.clearSelection($event); return i0.ɵɵresetView($event.stopPropagation()); });
        i0.ɵɵelement(1, "c-icon", 28);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", "remove");
    }
}
function AngularMultiSelect_span_11_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 35);
        i0.ɵɵelement(1, "c-icon", 28);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", "angle-down");
    }
}
function AngularMultiSelect_span_12_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 36);
        i0.ɵɵelement(1, "c-icon", 28);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", "angle-up");
    }
}
function AngularMultiSelect_div_18_input_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r51 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 41);
        i0.ɵɵlistener("change", function AngularMultiSelect_div_18_input_1_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r50.toggleSelectAll($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r49 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r49.isSelectAll)("disabled", ctx_r49.settings.limitSelection == (ctx_r49.selectedItems == null ? null : ctx_r49.selectedItems.length))("id", ctx_r49.id);
    }
}
function AngularMultiSelect_div_18_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 37);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_18_input_1_Template, 1, 3, "input", 38);
        i0.ɵɵelementStart(2, "label", 39)(3, "span", 40);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 40);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const ctx_r11 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r11.settings.showCheckbox);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx_r11.id);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", ctx_r11.isSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r11.settings.selectAllText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx_r11.isSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r11.settings.unSelectAllText);
    }
}
function AngularMultiSelect_img_19_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "img", 42);
    }
}
function AngularMultiSelect_div_20_span_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r59 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span", 48);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_20_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r58.clearSearch()); });
        i0.ɵɵelement(1, "c-icon", 28);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r52 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("hidden", ctx_r52.filter == undefined || (ctx_r52.filter == null ? null : ctx_r52.filter.length) == 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", "clear");
    }
}
function AngularMultiSelect_div_20_span_4_Template(rf, ctx) {
    if (rf & 1) {
        const _r61 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span", 48);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_20_span_4_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r60.resetInfiniteSearch()); });
        i0.ɵɵelement(1, "c-icon", 28);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r53 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("hidden", ctx_r53.filter == undefined || (ctx_r53.filter == null ? null : ctx_r53.filter.length) == 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", "clear");
    }
}
function AngularMultiSelect_div_20_input_5_Template(rf, ctx) {
    if (rf & 1) {
        const _r64 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 49, 50);
        i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_5_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r63.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_5_Template_input_keyup_0_listener() { i0.ɵɵrestoreView(_r64); const ctx_r65 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r65.filterGroupedList()); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r54 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("placeholder", ctx_r54.settings.searchPlaceholderText)("ngModel", ctx_r54.filter);
    }
}
function AngularMultiSelect_div_20_input_6_Template(rf, ctx) {
    if (rf & 1) {
        const _r68 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 49, 50);
        i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_6_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r67 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r67.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_6_Template_input_keyup_0_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r69 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r69.filteritems($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r55 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("placeholder", ctx_r55.settings.searchPlaceholderText)("ngModel", ctx_r55.filter);
    }
}
function AngularMultiSelect_div_20_input_7_Template(rf, ctx) {
    if (rf & 1) {
        const _r72 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 49, 50);
        i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_7_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r71 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r71.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_7_Template_input_keyup_0_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r73 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r73.onKeyUp($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r56 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("placeholder", ctx_r56.settings.searchPlaceholderText)("ngModel", ctx_r56.filter);
    }
}
function AngularMultiSelect_div_20_c_templateRenderer_8_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "c-templateRenderer", 30);
    }
    if (rf & 2) {
        const ctx_r57 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("data", ctx_r57.searchTempl)("item", ctx_r57.item);
    }
}
function AngularMultiSelect_div_20_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 43)(1, "span", 44);
        i0.ɵɵelement(2, "c-icon", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, AngularMultiSelect_div_20_span_3_Template, 2, 2, "span", 45);
        i0.ɵɵtemplate(4, AngularMultiSelect_div_20_span_4_Template, 2, 2, "span", 45);
        i0.ɵɵtemplate(5, AngularMultiSelect_div_20_input_5_Template, 2, 2, "input", 46);
        i0.ɵɵtemplate(6, AngularMultiSelect_div_20_input_6_Template, 2, 2, "input", 46);
        i0.ɵɵtemplate(7, AngularMultiSelect_div_20_input_7_Template, 2, 2, "input", 46);
        i0.ɵɵtemplate(8, AngularMultiSelect_div_20_c_templateRenderer_8_Template, 1, 2, "c-templateRenderer", 47);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r13 = i0.ɵɵnextContext();
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("name", "search");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx_r13.settings.lazyLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r13.settings.lazyLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r13.settings.groupBy && !ctx_r13.settings.lazyLoading && !ctx_r13.searchTempl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx_r13.settings.groupBy && !ctx_r13.settings.lazyLoading && !ctx_r13.searchTempl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r13.settings.lazyLoading && !ctx_r13.searchTempl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r13.searchTempl);
    }
}
function AngularMultiSelect_div_21_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r77 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 53);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_21_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r77); const ctx_r76 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r76.toggleFilterSelectAll()); });
        i0.ɵɵelement(1, "input", 54);
        i0.ɵɵelementStart(2, "label")(3, "span", 40);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 40);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const ctx_r74 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("checked", ctx_r74.isFilterSelectAll)("disabled", ctx_r74.settings.limitSelection == (ctx_r74.selectedItems == null ? null : ctx_r74.selectedItems.length));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("hidden", ctx_r74.isFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r74.settings.filterSelectAllText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx_r74.isFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r74.settings.filterUnSelectAllText);
    }
}
function AngularMultiSelect_div_21_div_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r79 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 53);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_21_div_2_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r79); const ctx_r78 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r78.toggleFilterSelectAll()); });
        i0.ɵɵelement(1, "input", 55);
        i0.ɵɵelementStart(2, "label")(3, "span", 40);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 40);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const ctx_r75 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("checked", ctx_r75.isFilterSelectAll && (ctx_r75.filter == null ? null : ctx_r75.filter.length) > 0)("disabled", ctx_r75.settings.limitSelection == (ctx_r75.selectedItems == null ? null : ctx_r75.selectedItems.length));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("hidden", ctx_r75.isFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r75.settings.filterSelectAllText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx_r75.isFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r75.settings.filterUnSelectAllText);
    }
}
function AngularMultiSelect_div_21_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 51);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_21_div_1_Template, 7, 6, "div", 52);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_21_div_2_Template, 7, 6, "div", 52);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r14 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx_r14.settings.groupBy && (ctx_r14.filter == null ? null : ctx_r14.filter.length) > 0 && ctx_r14.filterLength > 0 && !ctx_r14.settings.singleSelection);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r14.settings.groupBy && (ctx_r14.filter == null ? null : ctx_r14.filter.length) > 0 && (ctx_r14.groupedData == null ? null : ctx_r14.groupedData.length) > 0 && !ctx_r14.settings.singleSelection);
    }
}
function AngularMultiSelect_div_22_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r82 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 53);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_22_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r82); const ctx_r81 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r81.toggleInfiniteFilterSelectAll()); });
        i0.ɵɵelement(1, "input", 55);
        i0.ɵɵelementStart(2, "label")(3, "span", 40);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 40);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const ctx_r80 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("checked", ctx_r80.isInfiniteFilterSelectAll)("disabled", ctx_r80.settings.limitSelection == (ctx_r80.selectedItems == null ? null : ctx_r80.selectedItems.length));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("hidden", ctx_r80.isInfiniteFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r80.settings.filterSelectAllText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx_r80.isInfiniteFilterSelectAll);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r80.settings.filterUnSelectAllText);
    }
}
function AngularMultiSelect_div_22_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 51);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_22_div_1_Template, 7, 6, "div", 52);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r15 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx_r15.filter == null ? null : ctx_r15.filter.length) > 0 && ctx_r15.infiniteFilterLength > 0);
    }
}
function AngularMultiSelect_div_23_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r85 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 57)(1, "button", 58);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_23_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r85); const ctx_r84 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r84.addFilterNewItem()); });
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r83 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx_r83.settings.addNewButtonText);
    }
}
function AngularMultiSelect_div_23_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 51);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_23_div_1_Template, 3, 1, "div", 56);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r16 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r16.settings.addNewItemOnFilter);
    }
}
function AngularMultiSelect_div_24_li_2_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 55);
    }
    if (rf & 2) {
        const item_r87 = i0.ɵɵnextContext().$implicit;
        const ctx_r89 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r89.isSelected(item_r87))("disabled", ctx_r89.settings.limitSelection == (ctx_r89.selectedItems == null ? null : ctx_r89.selectedItems.length) && !ctx_r89.isSelected(item_r87) || item_r87.disabled);
    }
}
const _c4 = function (a0) { return { "selected-item": a0 }; };
function AngularMultiSelect_div_24_li_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r92 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_24_li_2_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r92); const item_r87 = restoredCtx.$implicit; const i_r88 = restoredCtx.index; const ctx_r91 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r91.onItemClick(item_r87, i_r88, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_24_li_2_input_1_Template, 1, 2, "input", 63);
        i0.ɵɵelementStart(2, "label");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const item_r87 = ctx.$implicit;
        const ctx_r86 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c4, ctx_r86.isSelected(item_r87) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r86.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r87[ctx_r86.settings.labelKey]);
    }
}
function AngularMultiSelect_div_24_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_24_li_2_Template, 4, 5, "li", 61);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r17 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r17.settings.maxHeight + "px");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx_r17.data);
    }
}
function AngularMultiSelect_div_25_li_3_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r95 = i0.ɵɵnextContext().$implicit;
        const ctx_r97 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r97.isSelected(item_r95))("disabled", ctx_r97.settings.limitSelection == (ctx_r97.selectedItems == null ? null : ctx_r97.selectedItems.length) && !ctx_r97.isSelected(item_r95) || item_r95.disabled);
    }
}
function AngularMultiSelect_div_25_li_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r100 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_25_li_3_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r100); const item_r95 = restoredCtx.$implicit; const i_r96 = restoredCtx.index; const ctx_r99 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r99.onItemClick(item_r95, i_r96, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_25_li_3_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(2, "label");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const item_r95 = ctx.$implicit;
        const ctx_r94 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c4, ctx_r94.isSelected(item_r95) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r94.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r95[ctx_r94.settings.labelKey]);
    }
}
const _c5 = function (a0) { return { "height": a0 }; };
function AngularMultiSelect_div_25_Template(rf, ctx) {
    if (rf & 1) {
        const _r102 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 65);
        i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_25_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r102); const ctx_r101 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r101.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_25_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r102); const ctx_r103 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r103.onScrollEnd($event)); });
        i0.ɵɵtemplate(3, AngularMultiSelect_div_25_li_3_Template, 4, 5, "li", 61);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const _r93 = i0.ɵɵreference(2);
        const ctx_r18 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r18.settings.maxHeight + "px");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r18.randomSize)("items", ctx_r18.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r18.settings.maxHeight + "px"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", _r93.viewPortItems);
    }
}
function AngularMultiSelect_div_26_li_2_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r105 = i0.ɵɵnextContext().$implicit;
        const ctx_r107 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r107.isSelected(item_r105))("disabled", ctx_r107.settings.limitSelection == (ctx_r107.selectedItems == null ? null : ctx_r107.selectedItems.length) && !ctx_r107.isSelected(item_r105) || item_r105.disabled);
    }
}
function AngularMultiSelect_div_26_li_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r110 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_26_li_2_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r110); const item_r105 = restoredCtx.$implicit; const i_r106 = restoredCtx.index; const ctx_r109 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r109.onItemClick(item_r105, i_r106, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_26_li_2_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r105 = ctx.$implicit;
        const ctx_r104 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c4, ctx_r104.isSelected(item_r105) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r104.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("data", ctx_r104.itemTempl)("item", item_r105);
    }
}
function AngularMultiSelect_div_26_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_26_li_2_Template, 4, 6, "li", 61);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r19 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r19.settings.maxHeight + "px");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx_r19.data);
    }
}
function AngularMultiSelect_div_27_li_3_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r113 = i0.ɵɵnextContext().$implicit;
        const ctx_r115 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r115.isSelected(item_r113))("disabled", ctx_r115.settings.limitSelection == (ctx_r115.selectedItems == null ? null : ctx_r115.selectedItems.length) && !ctx_r115.isSelected(item_r113) || item_r113.disabled);
    }
}
function AngularMultiSelect_div_27_li_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r118 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_27_li_3_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r118); const item_r113 = restoredCtx.$implicit; const i_r114 = restoredCtx.index; const ctx_r117 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r117.onItemClick(item_r113, i_r114, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_27_li_3_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r113 = ctx.$implicit;
        const ctx_r112 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c4, ctx_r112.isSelected(item_r113) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r112.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("data", ctx_r112.itemTempl)("item", item_r113);
    }
}
function AngularMultiSelect_div_27_Template(rf, ctx) {
    if (rf & 1) {
        const _r120 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 68);
        i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_27_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r120); const ctx_r119 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r119.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_27_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r120); const ctx_r121 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r121.onScrollEnd($event)); });
        i0.ɵɵtemplate(3, AngularMultiSelect_div_27_li_3_Template, 4, 6, "li", 61);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const _r111 = i0.ɵɵreference(2);
        const ctx_r20 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r20.settings.maxHeight + "px");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r20.randomSize)("items", ctx_r20.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r20.settings.maxHeight + "px"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", _r111.viewPortItems);
    }
}
function AngularMultiSelect_div_28_span_3_li_1_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r124 = i0.ɵɵnextContext(2).$implicit;
        const ctx_r128 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r128.isSelected(item_r124))("disabled", ctx_r128.settings.limitSelection == (ctx_r128.selectedItems == null ? null : ctx_r128.selectedItems.length) && !ctx_r128.isSelected(item_r124) || item_r124.disabled);
    }
}
const _c6 = function (a0, a1) { return { "grp-title": a0, "grp-item": a1 }; };
function AngularMultiSelect_div_28_span_3_li_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r132 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_28_span_3_li_1_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r132); const ctx_r131 = i0.ɵɵnextContext(); const item_r124 = ctx_r131.$implicit; const i_r125 = ctx_r131.index; const ctx_r130 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r130.onItemClick(item_r124, i_r125, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r124 = i0.ɵɵnextContext().$implicit;
        const ctx_r126 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r124.grpTitle, !item_r124.grpTitle && !ctx_r126.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r126.settings.showCheckbox && !ctx_r126.settings.singleSelection);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("data", ctx_r126.itemTempl)("item", item_r124);
    }
}
function AngularMultiSelect_div_28_span_3_li_2_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r124 = i0.ɵɵnextContext(2).$implicit;
        const ctx_r134 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r134.isSelected(item_r124))("disabled", ctx_r134.settings.limitSelection == (ctx_r134.selectedItems == null ? null : ctx_r134.selectedItems.length) && !ctx_r134.isSelected(item_r124) || item_r124.disabled);
    }
}
function AngularMultiSelect_div_28_span_3_li_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "li", 73);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_2_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r124 = i0.ɵɵnextContext().$implicit;
        const ctx_r127 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r124.grpTitle, !item_r124.grpTitle && !ctx_r127.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r127.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("data", ctx_r127.itemTempl)("item", item_r124);
    }
}
function AngularMultiSelect_div_28_span_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_Template, 4, 7, "li", 71);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_28_span_3_li_2_Template, 4, 7, "li", 72);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r124 = ctx.$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !item_r124.grpTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", item_r124.grpTitle);
    }
}
function AngularMultiSelect_div_28_Template(rf, ctx) {
    if (rf & 1) {
        const _r138 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 69);
        i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_28_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r138); const ctx_r137 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r137.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_28_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r138); const ctx_r139 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r139.onScrollEnd($event)); });
        i0.ɵɵtemplate(3, AngularMultiSelect_div_28_span_3_Template, 3, 2, "span", 70);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const _r122 = i0.ɵɵreference(2);
        const ctx_r21 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r21.settings.maxHeight + "px");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r21.randomSize)("items", ctx_r21.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r21.settings.maxHeight + "px"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", _r122.viewPortItems);
    }
}
function AngularMultiSelect_div_29_span_2_input_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r141 = i0.ɵɵnextContext().$implicit;
        const ctx_r143 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", item_r141.selected)("disabled", ctx_r143.settings.limitSelection == (ctx_r143.selectedItems == null ? null : ctx_r143.selectedItems.length) && !ctx_r143.isSelected(item_r141) || item_r141.disabled);
    }
}
function AngularMultiSelect_div_29_span_2_span_6_input_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const val_r146 = i0.ɵɵnextContext().$implicit;
        const ctx_r148 = i0.ɵɵnextContext(3);
        i0.ɵɵproperty("checked", ctx_r148.isSelected(val_r146))("disabled", ctx_r148.settings.limitSelection == (ctx_r148.selectedItems == null ? null : ctx_r148.selectedItems.length) && !ctx_r148.isSelected(val_r146) || val_r146.disabled);
    }
}
function AngularMultiSelect_div_29_span_2_span_6_Template(rf, ctx) {
    if (rf & 1) {
        const _r151 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span")(1, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_29_span_2_span_6_Template_li_click_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r151); const val_r146 = restoredCtx.$implicit; const j_r147 = restoredCtx.index; const ctx_r150 = i0.ɵɵnextContext(3); ctx_r150.onItemClick(val_r146, j_r147, $event); return i0.ɵɵresetView($event.stopPropagation()); });
        i0.ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_span_6_input_2_Template, 1, 2, "input", 66);
        i0.ɵɵelement(3, "label")(4, "c-templateRenderer", 30);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const val_r146 = ctx.$implicit;
        const ctx_r144 = i0.ɵɵnextContext(3);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, val_r146.grpTitle, !val_r146.grpTitle && !ctx_r144.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r144.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("data", ctx_r144.itemTempl)("item", val_r146);
    }
}
function AngularMultiSelect_div_29_span_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r153 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span")(1, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_29_span_2_Template_li_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r153); const item_r141 = restoredCtx.$implicit; const ctx_r152 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r152.selectGroup(item_r141)); });
        i0.ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_input_2_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(3, "label");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "ul", 60);
        i0.ɵɵtemplate(6, AngularMultiSelect_div_29_span_2_span_6_Template, 5, 7, "span", 70);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const item_r141 = ctx.$implicit;
        const ctx_r140 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r141.grpTitle, !item_r141.grpTitle && !ctx_r140.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r140.settings.showCheckbox && !ctx_r140.settings.singleSelection);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r141[ctx_r140.settings.labelKey]);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", item_r141.list);
    }
}
function AngularMultiSelect_div_29_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_Template, 7, 7, "span", 70);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r22 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r22.settings.maxHeight + "px");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx_r22.groupedData);
    }
}
function AngularMultiSelect_div_30_span_4_li_1_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r156 = i0.ɵɵnextContext(2).$implicit;
        const ctx_r160 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r160.isSelected(item_r156))("disabled", ctx_r160.settings.limitSelection == (ctx_r160.selectedItems == null ? null : ctx_r160.selectedItems.length) && !ctx_r160.isSelected(item_r156) || item_r156.disabled);
    }
}
const _c7 = function (a0, a1, a2) { return { "grp-title": a0, "grp-item": a1, "selected-item": a2 }; };
function AngularMultiSelect_div_30_span_4_li_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "li", 73);
        i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(2, "label");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const item_r156 = i0.ɵɵnextContext().$implicit;
        const ctx_r158 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c7, item_r156.grpTitle, !item_r156.grpTitle && !ctx_r158.settings.singleSelection, ctx_r158.isSelected(item_r156) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r158.settings.showCheckbox && !item_r156.grpTitle && !ctx_r158.settings.singleSelection);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r156[ctx_r158.settings.labelKey]);
    }
}
function AngularMultiSelect_div_30_span_4_li_2_input_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r156 = i0.ɵɵnextContext(2).$implicit;
        const ctx_r163 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", ctx_r163.isSelected(item_r156))("disabled", ctx_r163.settings.limitSelection == (ctx_r163.selectedItems == null ? null : ctx_r163.selectedItems.length) && !ctx_r163.isSelected(item_r156) || item_r156.disabled);
    }
}
function AngularMultiSelect_div_30_span_4_li_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r167 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_30_span_4_li_2_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r167); const ctx_r166 = i0.ɵɵnextContext(); const item_r156 = ctx_r166.$implicit; const i_r157 = ctx_r166.index; const ctx_r165 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r165.onItemClick(item_r156, i_r157, $event)); });
        i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_2_input_1_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(2, "label");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const item_r156 = i0.ɵɵnextContext().$implicit;
        const ctx_r159 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c7, item_r156.grpTitle, !item_r156.grpTitle && !ctx_r159.settings.singleSelection, ctx_r159.isSelected(item_r156) == true));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r159.settings.showCheckbox && !item_r156.grpTitle);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r156[ctx_r159.settings.labelKey]);
    }
}
function AngularMultiSelect_div_30_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_Template, 4, 7, "li", 72);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_30_span_4_li_2_Template, 4, 7, "li", 71);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r156 = ctx.$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", item_r156.grpTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !item_r156.grpTitle);
    }
}
function AngularMultiSelect_div_30_Template(rf, ctx) {
    if (rf & 1) {
        const _r170 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 59)(1, "virtual-scroller", 74);
        i0.ɵɵlistener("vsUpdate", function AngularMultiSelect_div_30_Template_virtual_scroller_vsUpdate_1_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r169 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r169.viewPortItems = $event); })("vsEnd", function AngularMultiSelect_div_30_Template_virtual_scroller_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r171 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r171.onScrollEnd($event)); });
        i0.ɵɵelementStart(2, "ul", 64, 75);
        i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_30_Template_ul_vsStart_2_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r172 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r172.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_30_Template_ul_vsEnd_2_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r173 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r173.onScrollEnd($event)); });
        i0.ɵɵtemplate(4, AngularMultiSelect_div_30_span_4_Template, 3, 2, "span", 70);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const _r154 = i0.ɵɵreference(3);
        const ctx_r23 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r23.settings.maxHeight + "px");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("items", ctx_r23.groupedData)("ngStyle", i0.ɵɵpureFunction1(8, _c5, ctx_r23.settings.maxHeight + "px"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r23.randomSize)("items", ctx_r23.virtualdata)("ngStyle", i0.ɵɵpureFunction1(10, _c5, ctx_r23.settings.maxHeight + "px"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", _r154.viewPortItems);
    }
}
function AngularMultiSelect_div_31_span_2_input_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const item_r175 = i0.ɵɵnextContext().$implicit;
        const ctx_r177 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("checked", item_r175.selected)("disabled", ctx_r177.settings.limitSelection == (ctx_r177.selectedItems == null ? null : ctx_r177.selectedItems.length) && !ctx_r177.isSelected(item_r175) || item_r175.disabled);
    }
}
function AngularMultiSelect_div_31_span_2_span_6_input_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "input", 67);
    }
    if (rf & 2) {
        const val_r180 = i0.ɵɵnextContext().$implicit;
        const ctx_r182 = i0.ɵɵnextContext(3);
        i0.ɵɵproperty("checked", ctx_r182.isSelected(val_r180))("disabled", ctx_r182.settings.limitSelection == (ctx_r182.selectedItems == null ? null : ctx_r182.selectedItems.length) && !ctx_r182.isSelected(val_r180) || val_r180.disabled);
    }
}
const _c8 = function (a0, a1, a2) { return { "selected-item": a0, "grp-title": a1, "grp-item": a2 }; };
function AngularMultiSelect_div_31_span_2_span_6_Template(rf, ctx) {
    if (rf & 1) {
        const _r185 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span")(1, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_31_span_2_span_6_Template_li_click_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r185); const val_r180 = restoredCtx.$implicit; const j_r181 = restoredCtx.index; const ctx_r184 = i0.ɵɵnextContext(3); ctx_r184.onItemClick(val_r180, j_r181, $event); return i0.ɵɵresetView($event.stopPropagation()); });
        i0.ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_span_6_input_2_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(3, "label");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const val_r180 = ctx.$implicit;
        const ctx_r178 = i0.ɵɵnextContext(3);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c8, ctx_r178.isSelected(val_r180) == true, val_r180.grpTitle, !val_r180.grpTitle && !ctx_r178.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r178.settings.showCheckbox);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(val_r180[ctx_r178.settings.labelKey]);
    }
}
function AngularMultiSelect_div_31_span_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r187 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "span")(1, "li", 62);
        i0.ɵɵlistener("click", function AngularMultiSelect_div_31_span_2_Template_li_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r187); const item_r175 = restoredCtx.$implicit; const ctx_r186 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r186.selectGroup(item_r175)); });
        i0.ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_input_2_Template, 1, 2, "input", 66);
        i0.ɵɵelementStart(3, "label");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "ul", 60);
        i0.ɵɵtemplate(6, AngularMultiSelect_div_31_span_2_span_6_Template, 5, 7, "span", 70);
        i0.ɵɵelementEnd()()();
    }
    if (rf & 2) {
        const item_r175 = ctx.$implicit;
        const ctx_r174 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r175.grpTitle, !item_r175.grpTitle && !ctx_r174.settings.singleSelection));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r174.settings.showCheckbox && !ctx_r174.settings.singleSelection);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r175[ctx_r174.settings.labelKey]);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", item_r175.list);
    }
}
function AngularMultiSelect_div_31_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
        i0.ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_Template, 7, 7, "span", 70);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r24 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("max-height", ctx_r24.settings.maxHeight + "px");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx_r24.groupedData);
    }
}
function AngularMultiSelect_h5_32_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "h5", 76);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r25 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r25.settings.noDataLabel);
    }
}
const _c9 = function (a0) { return { "disabled": a0 }; };
const _c10 = function (a0) { return { "tagToBody": a0 }; };
const _c11 = function (a0, a1) { return { "arrow-up": a0, "arrow-down": a1 }; };
const _c12 = function (a0) { return { "single-select-mode": a0 }; };
const DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularMultiSelect),
    multi: true
};
const DROPDOWN_CONTROL_VALIDATION = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AngularMultiSelect),
    multi: true,
};
const noop = () => {
};
class AngularMultiSelect {
    onEscapeDown(event) {
        if (this.settings.escapeToClose) {
            this.closeDropdown();
        }
    }
    onScroll(event) {
        if (this.isActive && this.settings.tagToBody) {
            this.closeDropdown();
            /*             const elem = this.cuppaDropdown.nativeElement;
                        if(this.settings.autoPosition){
                            this.dropDownTop = elem.getBoundingClientRect().y + elem.clientHeight + 1;
                        }
                        this.dropDownLeft = elem.getBoundingClientRect().x; */
        }
    }
    constructor(_elementRef, cdr, filterPipe) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this.filterPipe = filterPipe;
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onScrollToEnd = new EventEmitter();
        this.onFilterSelectAll = new EventEmitter();
        this.onFilterDeSelectAll = new EventEmitter();
        this.onAddFilterNewItem = new EventEmitter();
        this.onGroupSelect = new EventEmitter();
        this.onGroupDeSelect = new EventEmitter();
        this.pubvirtualdata = [];
        this.searchTerm$ = new Subject();
        this.isActive = false;
        this.isSelectAll = false;
        this.isFilterSelectAll = false;
        this.isInfiniteFilterSelectAll = false;
        this.chunkIndex = [];
        this.cachedItems = [];
        this.groupCachedItems = [];
        this.itemHeight = 41.6;
        this.filterLength = 0;
        this.infiniteFilterLength = 0;
        this.dropdownListYOffset = 0;
        this.dropDownWidth = 0;
        this.dropDownTop = '';
        this.dropDownBottom = 'unset';
        this.dropDownLeft = 0;
        this.id = Math.random().toString(36).substring(2);
        this.defaultSettings = {
            singleSelection: false,
            text: 'Select',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            filterSelectAllText: 'Select all filtered results',
            filterUnSelectAllText: 'UnSelect all filtered results',
            enableSearchFilter: false,
            searchBy: [],
            maxHeight: 300,
            badgeShowLimit: 999999999999,
            classes: '',
            disabled: false,
            searchPlaceholderText: 'Search',
            showCheckbox: true,
            noDataLabel: 'No Data Available',
            searchAutofocus: true,
            lazyLoading: false,
            labelKey: 'itemName',
            primaryKey: 'id',
            position: 'bottom',
            autoPosition: true,
            enableFilterSelectAll: true,
            selectGroup: false,
            addNewItemOnFilter: false,
            addNewButtonText: "Add",
            escapeToClose: true,
            clearAll: true,
            tagToBody: true
        };
        this.randomSize = true;
        this.filteredList = [];
        this.virtualScroollInit = false;
        this.isDisabledItemPresent = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.searchTerm$.asObservable().pipe(debounceTime(1000), distinctUntilChanged(), tap(term => term)).subscribe(val => {
            this.filterInfiniteList(val);
        });
    }
    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.cachedItems = this.cloneArray(this.data);
        if (this.settings.position == 'top') {
            setTimeout(() => {
                this.selectedListHeight = { val: 0 };
                this.selectedListHeight.val = this.selectedListElem.nativeElement.clientHeight;
            });
        }
        setTimeout(() => {
            this.calculateDropdownDirection();
        });
        this.virtualScroollInit = false;
    }
    onKeyUp(evt) {
        this.searchTerm$.next(evt.target.value);
    }
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            if (this.settings.groupBy) {
                this.groupedData = this.transformData(this.data, this.settings.groupBy);
                if (this.data.length == 0) {
                    this.selectedItems = [];
                }
                this.groupCachedItems = this.cloneArray(this.groupedData);
            }
            this.cachedItems = this.cloneArray(this.data);
        }
        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }
        if (changes.loading) {
        }
        if (this.settings.lazyLoading && this.virtualScroollInit && changes.data) {
            this.virtualdata = changes.data.currentValue;
        }
    }
    ngDoCheck() {
        if (this.selectedItems) {
            if (this.selectedItems.length == 0 || this.data.length == 0 || this.selectedItems.length < this.data.length) {
                this.isSelectAll = false;
            }
        }
    }
    ngAfterViewInit() {
        if (this.settings.lazyLoading) {
            // this._elementRef.nativeElement.getElementsByClassName("lazyContainer")[0].addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    ngAfterViewChecked() {
        if (this.selectedListElem.nativeElement.clientHeight && this.settings.position == 'top' && this.selectedListHeight) {
            this.selectedListHeight.val = this.selectedListElem.nativeElement.clientHeight;
            this.cdr.detectChanges();
        }
        //this.calculateDropdownDirection();
    }
    onItemClick(item, index, evt) {
        if (item.disabled) {
            return;
        }
        if (this.settings.disabled) {
            return;
        }
        let found = this.isSelected(item);
        let limit = this.selectedItems.length < this.settings.limitSelection ? true : false;
        if (!found) {
            if (this.settings.limitSelection) {
                if (limit) {
                    this.addSelected(item);
                    this.onSelect.emit(item);
                }
            }
            else {
                this.addSelected(item);
                this.onSelect.emit(item);
            }
        }
        else {
            this.removeSelected(item);
            this.onDeSelect.emit(item);
        }
        if (this.isSelectAll || this.data.length > this.selectedItems.length) {
            this.isSelectAll = false;
        }
        if (this.data.length == this.selectedItems.length) {
            this.isSelectAll = true;
        }
        if (this.settings.groupBy) {
            this.updateGroupInfo(item);
        }
    }
    validate(c) {
        return null;
    }
    writeValue(value) {
        if (value !== undefined && value !== null && value !== '') {
            if (this.settings.singleSelection) {
                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    this.groupCachedItems = this.cloneArray(this.groupedData);
                    this.selectedItems = [value[0]];
                }
                else {
                    try {
                        if (value.length > 1) {
                            this.selectedItems = [value[0]];
                            throw new MyException(404, { "msg": "Single Selection Mode, Selected Items cannot have more than one item." });
                        }
                        else {
                            this.selectedItems = value;
                        }
                    }
                    catch (e) {
                        console.error(e.body.msg);
                    }
                }
            }
            else {
                if (this.settings.limitSelection) {
                    this.selectedItems = value.slice(0, this.settings.limitSelection);
                }
                else {
                    this.selectedItems = value;
                }
                if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                    this.isSelectAll = true;
                }
                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    this.groupCachedItems = this.cloneArray(this.groupedData);
                }
            }
        }
        else {
            this.selectedItems = [];
        }
    }
    //From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    //From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    trackByFn(index, item) {
        return item[this.settings.primaryKey];
    }
    isSelected(clickedItem) {
        if (clickedItem.disabled) {
            return false;
        }
        let found = false;
        this.selectedItems && this.selectedItems.forEach(item => {
            if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                found = true;
            }
        });
        return found;
    }
    addSelected(item) {
        if (item.disabled) {
            return;
        }
        if (this.settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
            this.closeDropdown();
        }
        else
            this.selectedItems.push(item);
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
    }
    removeSelected(clickedItem) {
        this.selectedItems && this.selectedItems.forEach(item => {
            if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
    }
    toggleDropdown(evt) {
        if (this.settings.disabled) {
            return;
        }
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.openDropdown();
        }
        else {
            this.closeDropdown();
        }
        if (this.settings.lazyLoading) {
            this.virtualdata = this.data;
            this.virtualScroollInit = true;
        }
        evt.preventDefault();
    }
    openDropdown() {
        if (this.settings.disabled) {
            return;
        }
        this.isActive = true;
        this.calculateDropdownDirection();
        if (this.settings.searchAutofocus && this.searchInput && this.settings.enableSearchFilter && !this.searchTempl) {
            setTimeout(() => {
                this.searchInput.nativeElement.focus();
            }, 0);
        }
        this.onOpen.emit(true);
    }
    closeDropdown() {
        if (this.searchInput && this.settings.lazyLoading) {
            this.searchInput.nativeElement.value = "";
        }
        if (this.searchInput) {
            this.searchInput.nativeElement.value = "";
        }
        this.filter = "";
        this.isActive = false;
        this.searchTerm$.next('');
        this.onClose.emit(false);
    }
    closeDropdownOnClickOut() {
        if (this.isActive) {
            if (this.searchInput && this.settings.lazyLoading) {
                this.searchInput.nativeElement.value = "";
            }
            if (this.searchInput) {
                this.searchInput.nativeElement.value = "";
            }
            this.filter = "";
            this.isActive = false;
            this.clearSearch();
            this.searchTerm$.next('');
            this.onClose.emit(false);
        }
    }
    toggleSelectAll(event) {
        if (!this.isSelectAll) {
            this.selectedItems = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = !obj.disabled;
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = !obj.disabled;
                });
            }
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter((individualData) => !individualData.disabled);
            this.isSelectAll = true;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = false;
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = false;
                });
            }
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onDeSelectAll.emit(this.selectedItems);
        }
        setTimeout(() => {
            this.calculateDropdownDirection();
        });
        event.stopPropagation();
    }
    filterGroupedList() {
        if (this.filter == "" || this.filter == null) {
            this.clearSearch();
            return;
        }
        this.groupedData = this.cloneArray(this.groupCachedItems);
        this.groupedData = this.groupedData.filter(obj => {
            let arr = [];
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                arr = obj.list;
            }
            else {
                arr = obj.list.filter(t => {
                    return t[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }
            obj.list = arr;
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                return arr;
            }
            else {
                return arr.some(cat => {
                    return cat[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }
        });
    }
    toggleFilterSelectAll() {
        if (!this.isFilterSelectAll) {
            let added = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach((item) => {
                    item.sele;
                    if (item.list) {
                        item.list.forEach((el) => {
                            if (!this.isSelected(el)) {
                                this.addSelected(el);
                                added.push(el);
                            }
                        });
                    }
                    this.updateGroupInfo(item);
                });
                this.filteredList.forEach((el) => {
                    if (!this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                        this.addSelected(el);
                        added.push(el);
                    }
                });
            }
            else {
                this.filteredList.forEach((item) => {
                    if (!this.isSelected(item)) {
                        this.addSelected(item);
                        added.push(item);
                    }
                });
            }
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
            let removed = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach((item) => {
                    if (item.list) {
                        item.list.forEach((el) => {
                            if (this.isSelected(el)) {
                                this.removeSelected(el);
                                removed.push(el);
                            }
                        });
                    }
                    this.updateGroupInfo(item);
                });
                this.filteredList.forEach((el) => {
                    if (this.isSelected(el)) {
                        this.removeSelected(el);
                        removed.push(el);
                    }
                });
            }
            else {
                this.filteredList.forEach((item) => {
                    if (this.isSelected(item)) {
                        this.removeSelected(item);
                        removed.push(item);
                    }
                });
            }
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
    }
    toggleInfiniteFilterSelectAll() {
        if (!this.isInfiniteFilterSelectAll) {
            this.virtualdata.forEach((item) => {
                if (!this.isSelected(item)) {
                    this.addSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = true;
        }
        else {
            this.virtualdata.forEach((item) => {
                if (this.isSelected(item)) {
                    this.removeSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = false;
        }
    }
    clearSearch() {
        if (this.settings.groupBy) {
            this.groupedData = [];
            this.groupedData = this.cloneArray(this.groupCachedItems);
        }
        this.filter = "";
        this.isFilterSelectAll = false;
        this.searchTerm$.next('');
        this.data = this.cachedItems;
    }
    onFilterChange(data) {
        if (this.filter && this.filter == "" || data.length == 0) {
            this.isFilterSelectAll = false;
            this.data = this.cachedItems.slice();
        }
        let cnt = 0;
        data.forEach((item) => {
            if (!item.hasOwnProperty('grpTitle') && this.isSelected(item)) {
                cnt++;
            }
        });
        if (cnt > 0 && this.filterLength == cnt) {
            this.isFilterSelectAll = true;
        }
        else if (cnt > 0 && this.filterLength != cnt) {
            this.isFilterSelectAll = false;
        }
        this.data = data;
    }
    cloneArray(arr) {
        let i, copy;
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        }
        else {
            return arr;
        }
    }
    updateGroupInfo(item) {
        if (item.disabled) {
            return;
        }
        let key = this.settings.groupBy;
        this.groupedData.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] == obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] == obj[key])) {
                obj.selected = true;
            }
            else if (obj.list && (cnt != obj.list.length) && (item[key] == obj[key])) {
                obj.selected = false;
            }
        });
        this.groupCachedItems.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] == obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] == obj[key])) {
                obj.selected = true;
            }
            else if (obj.list && (cnt != obj.list.length) && (item[key] == obj[key])) {
                obj.selected = false;
            }
        });
    }
    transformData(arr, field) {
        const groupedObj = arr.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        const tempArr = [];
        Object.keys(groupedObj).map((x) => {
            let obj = {};
            let disabledChildrens = [];
            obj["grpTitle"] = true;
            obj[this.settings.labelKey] = x;
            obj[this.settings.groupBy] = x;
            obj['selected'] = false;
            obj['list'] = [];
            let cnt = 0;
            groupedObj[x].forEach((item) => {
                item['list'] = [];
                if (item.disabled) {
                    this.isDisabledItemPresent = true;
                    disabledChildrens.push(item);
                }
                obj.list.push(item);
                if (this.isSelected(item)) {
                    cnt++;
                }
            });
            if (cnt == obj.list.length) {
                obj.selected = true;
            }
            else {
                obj.selected = false;
            }
            // Check if current group item's all childrens are disabled or not
            obj['disabled'] = disabledChildrens.length === groupedObj[x].length;
            tempArr.push(obj);
            // obj.list.forEach((item: any) => {
            //     tempArr.push(item);
            // });
        });
        return tempArr;
    }
    filterInfiniteList(evt) {
        let filteredElems = [];
        if (this.settings.groupBy) {
            this.groupedData = this.groupCachedItems.slice();
        }
        else {
            this.data = this.cachedItems.slice();
            this.virtualdata = this.cachedItems.slice();
        }
        if ((evt != null || evt != '') && !this.settings.groupBy) {
            if (this.settings.searchBy.length > 0) {
                for (let t = 0; t < this.settings.searchBy.length; t++) {
                    this.virtualdata.filter((el) => {
                        if (el[this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                        }
                    });
                }
            }
            else {
                this.virtualdata.filter(function (el) {
                    for (let prop in el) {
                        if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                            break;
                        }
                    }
                });
            }
            this.virtualdata = [];
            this.virtualdata = filteredElems;
            this.infiniteFilterLength = this.virtualdata.length;
        }
        if (evt.toString() != '' && this.settings.groupBy) {
            this.groupedData.filter(function (el) {
                if (el.hasOwnProperty('grpTitle')) {
                    filteredElems.push(el);
                }
                else {
                    for (let prop in el) {
                        if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                            break;
                        }
                    }
                }
            });
            this.groupedData = [];
            this.groupedData = filteredElems;
            this.infiniteFilterLength = this.groupedData.length;
        }
        else if (evt.toString() == '' && this.cachedItems.length > 0) {
            this.virtualdata = [];
            this.virtualdata = this.cachedItems;
            this.infiniteFilterLength = 0;
        }
        if (this.virtualScroller) {
            this.virtualScroller.refresh();
        }
    }
    resetInfiniteSearch() {
        this.filter = "";
        this.isInfiniteFilterSelectAll = false;
        this.virtualdata = [];
        this.virtualdata = this.cachedItems;
        this.groupedData = this.groupCachedItems;
        this.searchTerm$.next('');
        this.infiniteFilterLength = 0;
    }
    onScrollEnd(e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    selectGroup(item) {
        if (item.disabled) {
            return;
        }
        if (item.selected) {
            item.selected = false;
            item.list.forEach((obj) => {
                this.removeSelected(obj);
            });
            this.onGroupDeSelect.emit(item);
            this.updateGroupInfo(item);
        }
        else {
            item.selected = true;
            item.list.forEach((obj) => {
                if (!this.isSelected(obj)) {
                    this.addSelected(obj);
                }
            });
            this.onGroupSelect.emit(item);
            this.updateGroupInfo(item);
        }
    }
    addFilterNewItem() {
        this.onAddFilterNewItem.emit(this.filter);
        this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
    }
    calculateDropdownDirection() {
        let shouldOpenTowardsTop = this.settings.position == 'top';
        const elem = this.cuppaDropdown.nativeElement;
        const dropdownWidth = elem.clientWidth;
        this.dropDownWidth = dropdownWidth;
        this.dropDownLeft = this.settings.tagToBody ? elem.getBoundingClientRect().x : 'unset';
        if (this.settings.position == 'top' && !this.settings.autoPosition) {
            this.openTowardsTop(true);
        }
        else if (this.settings.position == 'bottom' && !this.settings.autoPosition) {
            this.openTowardsTop(false);
        }
        if (this.settings.autoPosition) {
            const dropdownHeight = this.defaultSettings.maxHeight;
            const viewportHeight = document.documentElement.clientHeight;
            const selectedListBounds = this.selectedListElem.nativeElement.getBoundingClientRect();
            const spaceOnTop = selectedListBounds.top;
            const spaceOnBottom = viewportHeight - selectedListBounds.top;
            if (spaceOnBottom < spaceOnTop && dropdownHeight < spaceOnTop) {
                this.openTowardsTop(true);
            }
            else {
                this.openTowardsTop(false);
            }
            // Keep preference if there is not enough space on either the top or bottom
            /* 			if (spaceOnTop || spaceOnBottom) {
                            if (shouldOpenTowardsTop) {
                                shouldOpenTowardsTop = spaceOnTop;
                            } else {
                                shouldOpenTowardsTop = !spaceOnBottom;
                            }
                        } */
        }
    }
    openTowardsTop(value) {
        const elem = this.cuppaDropdown.nativeElement;
        if (value && this.selectedListElem.nativeElement.clientHeight) {
            this.dropdownListYOffset = 15 - this.selectedListElem.nativeElement.clientHeight;
            if (this.settings.tagToBody) {
                this.dropDownTop = (elem.getBoundingClientRect().y - this.selectedListElem.nativeElement.clientHeight * 2 - 15 - this.defaultSettings.maxHeight) + 'px';
            }
            else {
                this.dropDownBottom = (this.selectedListElem.nativeElement.clientHeight + 15) + 'px';
            }
            this.settings.position = 'top';
        }
        else {
            if (this.settings.tagToBody) {
                this.dropDownTop = (elem.getBoundingClientRect().y + elem.clientHeight + 1) + 'px';
            }
            else {
                this.dropDownTop = 'unset';
                this.dropDownBottom = 'unset';
            }
            this.dropdownListYOffset = 0;
            this.settings.position = 'bottom';
        }
    }
    clearSelection(e) {
        if (this.settings.groupBy) {
            this.groupCachedItems.forEach((obj) => {
                obj.selected = false;
            });
        }
        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
        this.onDeSelectAll.emit(this.selectedItems);
    }
    filteritems(evt) {
        this.filteredList = this.filterPipe.transform(this.cachedItems, evt.target.value, this.settings.searchBy);
        if (this.filteredList) {
            let len = 0;
            this.filteredList.forEach((obj, i) => {
                if (obj.disabled) {
                    this.isDisabledItemPresent = true;
                }
                if (!obj.hasOwnProperty('grpTitle')) {
                    len++;
                }
            });
            this.filterLength = len;
        }
        this.onFilterChange(this.filteredList);
    }
}
AngularMultiSelect.ɵfac = function AngularMultiSelect_Factory(t) { return new (t || AngularMultiSelect)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(ListFilterPipe)); };
AngularMultiSelect.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AngularMultiSelect, selectors: [["angular2-multiselect"]], contentQueries: function AngularMultiSelect_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, Item, 5);
            i0.ɵɵcontentQuery(dirIndex, Badge, 5);
            i0.ɵɵcontentQuery(dirIndex, Search, 5);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemTempl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.badgeTempl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchTempl = _t.first);
        }
    }, viewQuery: function AngularMultiSelect_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
            i0.ɵɵviewQuery(_c2, 5);
            i0.ɵɵviewQuery(_c3, 5);
            i0.ɵɵviewQuery(VirtualScrollerComponent, 5);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchInput = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selectedListElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dropdownListElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.cuppaDropdown = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.virtualScroller = _t.first);
        }
    }, hostVars: 2, hostBindings: function AngularMultiSelect_HostBindings(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵlistener("keyup.escape", function AngularMultiSelect_keyup_escape_HostBindingHandler($event) { return ctx.onEscapeDown($event); }, false, i0.ɵɵresolveDocument)("scroll", function AngularMultiSelect_scroll_HostBindingHandler($event) { return ctx.onScroll($event); }, false, i0.ɵɵresolveWindow);
        }
        if (rf & 2) {
            i0.ɵɵclassMap(ctx.defaultSettings.classes);
        }
    }, inputs: { data: "data", settings: "settings", loading: "loading" }, outputs: { onSelect: "onSelect", onDeSelect: "onDeSelect", onSelectAll: "onSelectAll", onDeSelectAll: "onDeSelectAll", onOpen: "onOpen", onClose: "onClose", onScrollToEnd: "onScrollToEnd", onFilterSelectAll: "onFilterSelectAll", onFilterDeSelectAll: "onFilterDeSelectAll", onAddFilterNewItem: "onAddFilterNewItem", onGroupSelect: "onGroupSelect", onGroupDeSelect: "onGroupDeSelect" }, features: [i0.ɵɵProvidersFeature([DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION]), i0.ɵɵNgOnChangesFeature], decls: 33, vars: 50, consts: [[1, "cuppa-dropdown", 3, "clickOutside"], ["cuppaDropdown", ""], [1, "selected-list"], ["selectedList", ""], [1, "c-btn", 3, "ngClass", "click"], [4, "ngIf"], ["class", "c-list", 4, "ngIf"], ["class", "countplaceholder", 4, "ngIf"], ["class", "c-remove clear-all", 3, "click", 4, "ngIf"], ["class", "c-angle-down", 4, "ngIf"], ["class", "c-angle-up", 4, "ngIf"], [1, "dropdown-list", "animated", "fadeIn", 3, "ngClass", "hidden"], ["dropdownList", ""], [1, "arrow-2", 3, "ngClass"], [3, "ngClass"], [1, "list-area", 3, "ngClass"], ["class", "pure-checkbox select-all", 4, "ngIf"], ["class", "loading-icon", "src", "assets/img/loading.gif", 4, "ngIf"], ["class", "list-filter", 4, "ngIf"], ["class", "filter-select-all", 4, "ngIf"], ["style", "overflow: auto;", 3, "maxHeight", 4, "ngIf"], ["class", "list-message", 4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-list"], ["class", "c-token", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token"], ["class", "c-label", 4, "ngIf"], [1, "c-remove", 3, "click"], [3, "name"], [1, "c-label"], [3, "data", "item"], ["class", "c-token", 3, "hidden", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token", 3, "hidden"], [1, "countplaceholder"], [1, "c-remove", "clear-all", 3, "click"], [1, "c-angle-down"], [1, "c-angle-up"], [1, "pure-checkbox", "select-all"], ["type", "checkbox", 3, "checked", "disabled", "id", "change", 4, "ngIf"], [3, "for"], [3, "hidden"], ["type", "checkbox", 3, "checked", "disabled", "id", "change"], ["src", "assets/img/loading.gif", 1, "loading-icon"], [1, "list-filter"], ["id", "searchIcon", 1, "c-search"], ["class", "c-clear", 3, "hidden", "click", 4, "ngIf"], ["class", "c-input", "type", "text", "aria-labelledby", "searchIcon", 3, "placeholder", "ngModel", "ngModelChange", "keyup", 4, "ngIf"], [3, "data", "item", 4, "ngIf"], [1, "c-clear", 3, "hidden", "click"], ["type", "text", "aria-labelledby", "searchIcon", 1, "c-input", 3, "placeholder", "ngModel", "ngModelChange", "keyup"], ["searchInput", ""], [1, "filter-select-all"], ["class", "pure-checkbox select-all", 3, "click", 4, "ngIf"], [1, "pure-checkbox", "select-all", 3, "click"], ["type", "checkbox", "aria-labelledby", "optionName", "aria-label", "option", 3, "checked", "disabled"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled"], ["class", "btn-container", 4, "ngIf"], [1, "btn-container"], [1, "c-btn", "btn-iceblue", 3, "click"], [2, "overflow", "auto"], [1, "lazyContainer"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "pure-checkbox", 3, "ngClass", "click"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled", 4, "ngIf"], ["virtualScroller", "", 1, "lazyContainer", 3, "enableUnequalChildrenSizes", "items", "ngStyle", "vsStart", "vsEnd"], ["scroll", ""], ["type", "checkbox", 3, "checked", "disabled", 4, "ngIf"], ["type", "checkbox", 3, "checked", "disabled"], ["scroll2", ""], ["scroll3", ""], [4, "ngFor", "ngForOf"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngIf"], ["class", "pure-checkbox", 3, "ngClass", 4, "ngIf"], [1, "pure-checkbox", 3, "ngClass"], [3, "items", "ngStyle", "vsUpdate", "vsEnd"], ["scroll4", ""], [1, "list-message"]], template: function AngularMultiSelect_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵlistener("clickOutside", function AngularMultiSelect_Template_div_clickOutside_0_listener() { return ctx.closeDropdownOnClickOut(); });
            i0.ɵɵelementStart(2, "div", 2, 3)(4, "div", 4);
            i0.ɵɵlistener("click", function AngularMultiSelect_Template_div_click_4_listener($event) { return ctx.toggleDropdown($event); });
            i0.ɵɵtemplate(5, AngularMultiSelect_span_5_Template, 2, 1, "span", 5);
            i0.ɵɵtemplate(6, AngularMultiSelect_span_6_Template, 2, 2, "span", 5);
            i0.ɵɵtemplate(7, AngularMultiSelect_span_7_Template, 2, 2, "span", 6);
            i0.ɵɵtemplate(8, AngularMultiSelect_div_8_Template, 2, 2, "div", 6);
            i0.ɵɵtemplate(9, AngularMultiSelect_span_9_Template, 2, 1, "span", 7);
            i0.ɵɵtemplate(10, AngularMultiSelect_span_10_Template, 2, 1, "span", 8);
            i0.ɵɵtemplate(11, AngularMultiSelect_span_11_Template, 2, 1, "span", 9);
            i0.ɵɵtemplate(12, AngularMultiSelect_span_12_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 11, 12);
            i0.ɵɵelement(15, "div", 13)(16, "div", 14);
            i0.ɵɵelementStart(17, "div", 15);
            i0.ɵɵtemplate(18, AngularMultiSelect_div_18_Template, 7, 6, "div", 16);
            i0.ɵɵtemplate(19, AngularMultiSelect_img_19_Template, 1, 0, "img", 17);
            i0.ɵɵtemplate(20, AngularMultiSelect_div_20_Template, 9, 7, "div", 18);
            i0.ɵɵtemplate(21, AngularMultiSelect_div_21_Template, 3, 2, "div", 19);
            i0.ɵɵtemplate(22, AngularMultiSelect_div_22_Template, 2, 1, "div", 19);
            i0.ɵɵtemplate(23, AngularMultiSelect_div_23_Template, 2, 1, "div", 19);
            i0.ɵɵtemplate(24, AngularMultiSelect_div_24_Template, 3, 3, "div", 20);
            i0.ɵɵtemplate(25, AngularMultiSelect_div_25_Template, 4, 8, "div", 20);
            i0.ɵɵtemplate(26, AngularMultiSelect_div_26_Template, 3, 3, "div", 20);
            i0.ɵɵtemplate(27, AngularMultiSelect_div_27_Template, 4, 8, "div", 20);
            i0.ɵɵtemplate(28, AngularMultiSelect_div_28_Template, 4, 8, "div", 20);
            i0.ɵɵtemplate(29, AngularMultiSelect_div_29_Template, 3, 3, "div", 20);
            i0.ɵɵtemplate(30, AngularMultiSelect_div_30_Template, 5, 12, "div", 20);
            i0.ɵɵtemplate(31, AngularMultiSelect_div_31_Template, 3, 3, "div", 20);
            i0.ɵɵtemplate(32, AngularMultiSelect_h5_32_Template, 2, 1, "h5", 21);
            i0.ɵɵelementEnd()()();
        }
        if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(38, _c9, ctx.settings.disabled));
            i0.ɵɵattribute("tabindex", 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) == 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.singleSelection && !ctx.badgeTempl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && ctx.settings.singleSelection && ctx.badgeTempl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && !ctx.settings.singleSelection);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.selectedItems == null ? null : ctx.selectedItems.length) > ctx.settings.badgeShowLimit);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.clearAll && (ctx.selectedItems == null ? null : ctx.selectedItems.length) > 0 && !ctx.settings.disabled);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.isActive);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.isActive);
            i0.ɵɵadvance(1);
            i0.ɵɵstyleProp("width", ctx.dropDownWidth, "px")("top", ctx.dropDownTop)("bottom", ctx.dropDownBottom)("left", ctx.dropDownLeft, "px");
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(40, _c10, ctx.settings.tagToBody))("hidden", !ctx.isActive);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(42, _c11, ctx.settings.position == "bottom", ctx.settings.position == "top"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(45, _c11, ctx.settings.position == "bottom", ctx.settings.position == "top"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(48, _c12, ctx.settings.singleSelection));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.enableCheckAll && !ctx.settings.singleSelection && !ctx.settings.limitSelection && (ctx.data == null ? null : ctx.data.length) > 0 && !ctx.isDisabledItemPresent);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.enableSearchFilter);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.settings.lazyLoading && ctx.settings.enableFilterSelectAll && !ctx.isDisabledItemPresent);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.lazyLoading && ctx.settings.enableFilterSelectAll && !ctx.isDisabledItemPresent && !ctx.settings.singleSelection);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.filter == null ? null : ctx.filter.length);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl == undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl == undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl != undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl != undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl != undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl != undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.groupBy && ctx.settings.lazyLoading && ctx.itemTempl == undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.settings.groupBy && !ctx.settings.lazyLoading && ctx.itemTempl == undefined);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.data == null ? null : ctx.data.length) == 0);
        }
    }, dependencies: function () { return [i2.NgClass, i2.NgForOf, i2.NgIf, i2.NgStyle, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, VirtualScrollerComponent, ClickOutsideDirective, TemplateRenderer, CIcon]; }, styles: ["virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#cccccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:\"\";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n"], encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularMultiSelect, [{
            type: Component,
            args: [{ selector: 'angular2-multiselect', host: { '[class]': 'defaultSettings.classes' }, providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION], encapsulation: ViewEncapsulation.None, template: "<div class=\"cuppa-dropdown\" (clickOutside)=\"closeDropdownOnClickOut()\" #cuppaDropdown>\n    <div class=\"selected-list\" #selectedList>\n        <div class=\"c-btn\" (click)=\"toggleDropdown($event)\" [ngClass]=\"{'disabled': settings.disabled}\" [attr.tabindex]=\"0\">\n\n            <span *ngIf=\"selectedItems?.length == 0\">{{settings.text}}</span>\n            <span *ngIf=\"settings.singleSelection && !badgeTempl\">\n                <span *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\n                    {{item[settings.labelKey]}}\n                </span>\n            </span>\n            <span class=\"c-list\" *ngIf=\"selectedItems?.length > 0 && settings.singleSelection && badgeTempl \">\n                <div class=\"c-token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\n                    <span *ngIf=\"!badgeTempl\" class=\"c-label\">{{item[settings.labelKey]}}</span>\n\n                    <span *ngIf=\"badgeTempl\" class=\"c-label\">\n                        <c-templateRenderer [data]=\"badgeTempl\" [item]=\"item\"></c-templateRenderer>\n                    </span>\n                    <span class=\"c-remove\" (click)=\"onItemClick(item,k,$event);$event.stopPropagation()\">\n                        <c-icon [name]=\"'remove'\"></c-icon>\n                    </span>\n                </div>\n            </span>\n            <div class=\"c-list\" *ngIf=\"selectedItems?.length > 0 && !settings.singleSelection\">\n                <div class=\"c-token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\" [hidden]=\"k > settings.badgeShowLimit-1\">\n                    <span *ngIf=\"!badgeTempl\" class=\"c-label\">{{item[settings.labelKey]}}</span>\n                    <span *ngIf=\"badgeTempl\" class=\"c-label\">\n                        <c-templateRenderer [data]=\"badgeTempl\" [item]=\"item\"></c-templateRenderer>\n                    </span>\n                    <span class=\"c-remove\" (click)=\"onItemClick(item,k,$event);$event.stopPropagation()\">\n                        <c-icon [name]=\"'remove'\"></c-icon>\n                    </span>\n                </div>\n            </div>\n            <span class=\"countplaceholder\" *ngIf=\"selectedItems?.length > settings.badgeShowLimit\">+{{selectedItems?.length - settings.badgeShowLimit }}</span>\n            <span class=\"c-remove clear-all\" *ngIf=\"settings.clearAll && selectedItems?.length > 0 && !settings.disabled\" (click)=\"clearSelection($event);$event.stopPropagation()\">\n                <c-icon [name]=\"'remove'\"></c-icon>\n            </span>\n            <span *ngIf=\"!isActive\" class=\"c-angle-down\">\n                <c-icon [name]=\"'angle-down'\"></c-icon>\n            </span>\n            <span *ngIf=\"isActive\" class=\"c-angle-up\">\n                <c-icon [name]=\"'angle-up'\"></c-icon>\n\n            </span>\n        </div>\n    </div>\n    <div #dropdownList class=\"dropdown-list animated fadeIn\" \n    [ngClass]=\"{'tagToBody': settings.tagToBody}\"\n    [style.width.px]=\"dropDownWidth\" \n    [style.top]=\"dropDownTop\" \n    [style.bottom]=\"dropDownBottom\"\n    [style.left.px]=\"dropDownLeft\" \n        [hidden]=\"!isActive\">\n        <div [ngClass]=\"{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}\" class=\"arrow-2\"></div>\n        <div [ngClass]=\"{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}\"></div>\n        <div class=\"list-area\" [ngClass]=\"{'single-select-mode': settings.singleSelection }\">\n            <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent\"\n                >\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                [id]=\"id\" (change)=\"toggleSelectAll($event)\"/>\n                <label [for]=\"id\">\n                    <span [hidden]=\"isSelectAll\">{{settings.selectAllText}}</span>\n                    <span [hidden]=\"!isSelectAll\">{{settings.unSelectAllText}}</span>\n                </label>\n            </div>\n            <img class=\"loading-icon\" *ngIf=\"loading\" src=\"assets/img/loading.gif\" />\n            <div class=\"list-filter\" *ngIf=\"settings.enableSearchFilter\">\n                <span class=\"c-search\" id=\"searchIcon\">\n                    <c-icon [name]=\"'search'\"></c-icon>\n                </span>\n                <span *ngIf=\"!settings.lazyLoading\" [hidden]=\"filter == undefined || filter?.length == 0\" class=\"c-clear\" (click)=\"clearSearch()\">\n                    <c-icon [name]=\"'clear'\"></c-icon>\n                </span>\n                <span *ngIf=\"settings.lazyLoading\" [hidden]=\"filter == undefined || filter?.length == 0\" class=\"c-clear\" (click)=\"resetInfiniteSearch()\">\n                    <c-icon [name]=\"'clear'\"></c-icon>\n                </span>\n\n                <input class=\"c-input\" *ngIf=\"settings.groupBy && !settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"filterGroupedList()\" aria-labelledby=\"searchIcon\">\n                <input class=\"c-input\" *ngIf=\"!settings.groupBy && !settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"filteritems($event)\" aria-labelledby=\"searchIcon\">\n                <input class=\"c-input\" *ngIf=\"settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"onKeyUp($event)\" aria-labelledby=\"searchIcon\">\n                <!--            <input class=\"c-input\" *ngIf=\"!settings.lazyLoading && !searchTempl && settings.groupBy\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                [(ngModel)]=\"filter\" (keyup)=\"filterGroupList($event)\">-->\n                <c-templateRenderer *ngIf=\"searchTempl\" [data]=\"searchTempl\" [item]=\"item\"></c-templateRenderer>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\n                <div class=\"pure-checkbox select-all\" *ngIf=\"!settings.groupBy && filter?.length > 0 && filterLength > 0  && !settings.singleSelection\" (click)=\"toggleFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" aria-labelledby=\"optionName\"\n                    aria-label=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n                <div class=\"pure-checkbox select-all\" *ngIf=\"settings.groupBy && filter?.length > 0 && groupedData?.length > 0  && !settings.singleSelection\" (click)=\"toggleFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isFilterSelectAll && filter?.length > 0\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                    aria-labelledby=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent && !settings.singleSelection\">\n                <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && infiniteFilterLength > 0\" (click)=\"toggleInfiniteFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isInfiniteFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                    aria-labelledby=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isInfiniteFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isInfiniteFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"filter?.length\">\n                <div class=\"btn-container\" *ngIf=\"settings.addNewItemOnFilter\">\n                    <button class=\"c-btn btn-iceblue\" (click)=\"addFilterNewItem()\">{{settings.addNewButtonText}}</button>\n                </div>\n            </div>\n\n            <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <li *ngFor=\"let item of data; let i = index;\" (click)=\"onItemClick(item,i,$event)\"\n                        class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        aria-labelledby=\"option\"/>\n                        <label>{{item[settings.labelKey]}}</label>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading -->\n            <div *ngIf=\"!settings.groupBy && settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                    <li *ngFor=\"let item of scroll.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\"\n                        [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label>{{item[settings.labelKey]}}</label>\n                    </li>\n                </ul>\n            </div>\n            <!-- custom template -->\n            <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <li *ngFor=\"let item of data; let i = index;\" (click)=\"onItemClick(item,i,$event)\"\n                        class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label></label>\n                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading and custom template -->\n            <div *ngIf=\"!settings.groupBy && settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" class=\"lazyContainer\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\n                    <li *ngFor=\"let item of scroll2.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\"\n                        [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label></label>\n                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading, group By and custom template -->\n            <div *ngIf=\"settings.groupBy && settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                    <span *ngFor=\"let item of scroll3.viewPortItems; let i = index;\">\n                        <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label></label>\n                            <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                        </li>\n                        <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label></label>\n                            <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                        </li>\n                    </span>\n                </ul>\n            </div>\n            <!-- group By and custom template -->\n            <div *ngIf=\"settings.groupBy && !settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <span *ngFor=\"let item of groupedData; let i = index;\">\n                        <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label>{{item[settings.labelKey]}}</label>\n                            <ul class=\"lazyContainer\">\n                                <span *ngFor=\"let val of item.list ; let j = index;\">\n                                    <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\n                                        class=\"pure-checkbox\">\n                                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled\"\n                                        />\n                                        <label></label>\n                                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"val\"></c-templateRenderer>\n                                    </li>\n                                </span>\n                            </ul>\n\n                        </li>\n                    </span>\n                </ul>\n            </div>\n            <!-- lazy loading, group By -->\n            <div *ngIf=\"settings.groupBy && settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <virtual-scroller [items]=\"groupedData\" (vsUpdate)=\"viewPortItems = $event\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\n                    <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                        (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                        <span *ngFor=\"let item of scroll4.viewPortItems; let i = index;\">\n                            <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }\"\n                                class=\"pure-checkbox\">\n                                <input *ngIf=\"settings.showCheckbox && !item.grpTitle && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\"\n                                    [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                                />\n                                <label>{{item[settings.labelKey]}}</label>\n                            </li>\n                            <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }\"\n                                class=\"pure-checkbox\">\n                                <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                                />\n                                <label>{{item[settings.labelKey]}}</label>\n                            </li>\n                        </span>\n                    </ul>\n                </virtual-scroller>\n            </div>\n            <!-- group By -->\n            <div *ngIf=\"settings.groupBy && !settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <span *ngFor=\"let item of groupedData ; let i = index;\">\n                        <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label>{{item[settings.labelKey]}}</label>\n                            <ul class=\"lazyContainer\">\n                                <span *ngFor=\"let val of item.list ; let j = index;\">\n                                    <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\n                                        class=\"pure-checkbox\">\n                                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled\"\n                                        />\n                                        <label>{{val[settings.labelKey]}}</label>\n                                    </li>\n                                </span>\n                            </ul>\n                        </li>\n                    </span>\n                    <!-- <span *ngFor=\"let item of groupedData ; let i = index;\">\n                    <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                <li *ngIf=\"item.grpTitle && !settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                 <li  (click)=\"selectGroup(item)\" *ngIf=\"item.grpTitle && settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                </span> -->\n                </ul>\n            </div>\n            <h5 class=\"list-message\" *ngIf=\"data?.length == 0\">{{settings.noDataLabel}}</h5>\n        </div>\n    </div>\n</div>", styles: ["virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#cccccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:\"\";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n"] }]
        }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: ListFilterPipe }]; }, { data: [{
                type: Input
            }], settings: [{
                type: Input
            }], loading: [{
                type: Input
            }], onSelect: [{
                type: Output,
                args: ['onSelect']
            }], onDeSelect: [{
                type: Output,
                args: ['onDeSelect']
            }], onSelectAll: [{
                type: Output,
                args: ['onSelectAll']
            }], onDeSelectAll: [{
                type: Output,
                args: ['onDeSelectAll']
            }], onOpen: [{
                type: Output,
                args: ['onOpen']
            }], onClose: [{
                type: Output,
                args: ['onClose']
            }], onScrollToEnd: [{
                type: Output,
                args: ['onScrollToEnd']
            }], onFilterSelectAll: [{
                type: Output,
                args: ['onFilterSelectAll']
            }], onFilterDeSelectAll: [{
                type: Output,
                args: ['onFilterDeSelectAll']
            }], onAddFilterNewItem: [{
                type: Output,
                args: ['onAddFilterNewItem']
            }], onGroupSelect: [{
                type: Output,
                args: ['onGroupSelect']
            }], onGroupDeSelect: [{
                type: Output,
                args: ['onGroupDeSelect']
            }], itemTempl: [{
                type: ContentChild,
                args: [Item, { static: false }]
            }], badgeTempl: [{
                type: ContentChild,
                args: [Badge, { static: false }]
            }], searchTempl: [{
                type: ContentChild,
                args: [Search, { static: false }]
            }], searchInput: [{
                type: ViewChild,
                args: ['searchInput', { static: false }]
            }], selectedListElem: [{
                type: ViewChild,
                args: ['selectedList', { static: false }]
            }], dropdownListElem: [{
                type: ViewChild,
                args: ['dropdownList', { static: false }]
            }], cuppaDropdown: [{
                type: ViewChild,
                args: ['cuppaDropdown', { static: false }]
            }], onEscapeDown: [{
                type: HostListener,
                args: ['document:keyup.escape', ['$event']]
            }], onScroll: [{
                type: HostListener,
                args: ['window:scroll', ['$event']]
            }], virtualScroller: [{
                type: ViewChild,
                args: [VirtualScrollerComponent, { static: false }]
            }] });
})();
class AngularMultiSelectModule {
}
AngularMultiSelectModule.ɵfac = function AngularMultiSelectModule_Factory(t) { return new (t || AngularMultiSelectModule)(); };
AngularMultiSelectModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AngularMultiSelectModule });
AngularMultiSelectModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [DataService, ListFilterPipe], imports: [CommonModule, FormsModule, VirtualScrollerModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularMultiSelectModule, [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, VirtualScrollerModule],
                    declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
                    exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
                    providers: [DataService, ListFilterPipe]
                }]
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AngularMultiSelectModule, { declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon], imports: [CommonModule, FormsModule, VirtualScrollerModule], exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon] }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AngularMultiSelect, AngularMultiSelectModule, Badge, CIcon, ClickOutsideDirective, Item, ListFilterPipe, ScrollDirective, Search, TemplateRenderer, setPosition, styleDirective };
//# sourceMappingURL=angular2-multiselect-dropdown.mjs.map
