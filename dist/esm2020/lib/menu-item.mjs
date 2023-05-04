import { Component, TemplateRef, ContentChild, ViewEncapsulation, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function CIcon__svg_svg_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4)(1, "g");
    i0.ɵɵelement(2, "path", 5);
    i0.ɵɵelementEnd()();
} }
function CIcon__svg_svg_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 7)(3, "g");
    i0.ɵɵelement(4, "path", 8);
    i0.ɵɵelementEnd()()()();
} }
function CIcon__svg_svg_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 6)(1, "g")(2, "g", 9)(3, "g");
    i0.ɵɵelement(4, "path", 10);
    i0.ɵɵelementEnd()()()();
} }
function CIcon__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 11)(1, "g")(2, "g")(3, "g", 12)(4, "g");
    i0.ɵɵelement(5, "path", 13);
    i0.ɵɵelementEnd()()()()();
} }
function CIcon__svg_svg_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 14)(1, "g");
    i0.ɵɵelement(2, "path", 15);
    i0.ɵɵelementEnd()();
} }
export class Item {
    constructor() {
    }
}
Item.ɵfac = function Item_Factory(t) { return new (t || Item)(); };
Item.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Item, selectors: [["c-item"]], contentQueries: function Item_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, decls: 0, vars: 0, template: function Item_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Item, [{
        type: Component,
        args: [{
                selector: 'c-item',
                template: ``
            }]
    }], function () { return []; }, { template: [{
            type: ContentChild,
            args: [TemplateRef, { static: true }]
        }] }); })();
export class Badge {
    constructor() {
    }
}
Badge.ɵfac = function Badge_Factory(t) { return new (t || Badge)(); };
Badge.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Badge, selectors: [["c-badge"]], contentQueries: function Badge_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, decls: 0, vars: 0, template: function Badge_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Badge, [{
        type: Component,
        args: [{
                selector: 'c-badge',
                template: ``
            }]
    }], function () { return []; }, { template: [{
            type: ContentChild,
            args: [TemplateRef, { static: true }]
        }] }); })();
export class Search {
    constructor() {
    }
}
Search.ɵfac = function Search_Factory(t) { return new (t || Search)(); };
Search.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Search, selectors: [["c-search"]], contentQueries: function Search_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, decls: 0, vars: 0, template: function Search_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Search, [{
        type: Component,
        args: [{
                selector: 'c-search',
                template: ``
            }]
    }], function () { return []; }, { template: [{
            type: ContentChild,
            args: [TemplateRef, { static: true }]
        }] }); })();
export class TemplateRenderer {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TemplateRenderer, [{
        type: Component,
        args: [{
                selector: 'c-templateRenderer',
                template: ``
            }]
    }], function () { return [{ type: i0.ViewContainerRef }]; }, { data: [{
            type: Input
        }], item: [{
            type: Input
        }] }); })();
export class CIcon {
}
CIcon.ɵfac = function CIcon_Factory(t) { return new (t || CIcon)(); };
CIcon.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CIcon, selectors: [["c-icon"]], inputs: { name: "name" }, decls: 5, vars: 5, consts: [["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", "style", "enable-background:new 0 0 47.971 47.971;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", "style", "enable-background:new 0 0 612 612;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", "style", "enable-background:new 0 0 615.52 615.52;", 0, "xml", "space", "preserve", 4, "ngIf"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", "style", "enable-background:new 0 0 51.976 51.976;", 0, "xml", "space", "preserve", 4, "ngIf"], ["width", "100%", "height", "100%", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 47.971 47.971", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 47.971 47.971"], ["d", "M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88\n                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242\n                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879\n                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 612 612", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 612 612"], ["id", "_x31_0_34_"], ["d", "M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782\n\t\t\t\tc-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296\n\t\t\t\tc6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"], ["id", "_x39__30_"], ["d", "M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27\n\t\t\t\tL7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832\n\t\t\t\tc9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "width", "100%", "height", "100%", "viewBox", "0 0 615.52 615.52", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 615.52 615.52"], ["id", "Search__x28_and_thou_shall_find_x29_"], ["d", "M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0\n\t\t\t\t\tC104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777\n\t\t\t\t\tl184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291\n\t\t\t\t\tC617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174\n\t\t\t\t\tc-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88\n\t\t\t\t\ts152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"], ["version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 51.976 51.976", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 51.976 51.976"], ["d", "M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0\n\t\tC54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778\n\t\tc-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828\n\t\tc0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828\n\t\tl-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"]], template: function CIcon_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CIcon__svg_svg_0_Template, 3, 0, "svg", 0);
        i0.ɵɵtemplate(1, CIcon__svg_svg_1_Template, 5, 0, "svg", 1);
        i0.ɵɵtemplate(2, CIcon__svg_svg_2_Template, 5, 0, "svg", 1);
        i0.ɵɵtemplate(3, CIcon__svg_svg_3_Template, 6, 0, "svg", 2);
        i0.ɵɵtemplate(4, CIcon__svg_svg_4_Template, 3, 0, "svg", 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.name == "remove");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.name == "angle-down");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.name == "angle-up");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.name == "search");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.name == "clear");
    } }, dependencies: [i1.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CIcon, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItbXVsdGlzZWxlY3QtZHJvcGRvd24tbGliL3NyYy9saWIvbWVudS1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLFdBQVcsRUFBRSxZQUFZLEVBQXFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztJQXNFeEksbUJBQzZHO0lBRDdHLDhCQUM2RyxRQUFBO0lBRTlGLDBCQUc4RTtJQUNsRixpQkFBSSxFQUFBOzs7SUFFaEIsbUJBQ3VHO0lBRHZHLDhCQUN1RyxRQUFBLFdBQUEsUUFBQTtJQUloSCwwQkFFdUc7SUFDeEcsaUJBQUksRUFBQSxFQUFBLEVBQUE7OztJQUlOLG1CQUNtSDtJQURuSCw4QkFDbUgsUUFBQSxXQUFBLFFBQUE7SUFJaEgsMkJBRXFGO0lBQ3RGLGlCQUFJLEVBQUEsRUFBQSxFQUFBOzs7SUFLTixtQkFFdUI7SUFGdkIsK0JBRXVCLFFBQUEsUUFBQSxZQUFBLFFBQUE7SUFLbkIsMkJBS2lGO0lBQ2xGLGlCQUFJLEVBQUEsRUFBQSxFQUFBLEVBQUE7OztJQU1QLG1CQUNvRztJQURwRywrQkFDb0csUUFBQTtJQUVuRywyQkFJdUU7SUFDeEUsaUJBQUksRUFBQTs7QUE1SEosTUFBTSxPQUFPLElBQUk7SUFJYjtJQUNBLENBQUM7O3dEQUxRLElBQUk7dURBQUosSUFBSTtvQ0FFQyxXQUFXOzs7Ozt1RkFGaEIsSUFBSTtjQUxoQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7c0NBSThDLFFBQVE7a0JBQWxELFlBQVk7bUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs7QUFZN0MsTUFBTSxPQUFPLEtBQUs7SUFHZDtJQUNBLENBQUM7OzBEQUpRLEtBQUs7d0RBQUwsS0FBSztvQ0FFQSxXQUFXOzs7Ozt1RkFGaEIsS0FBSztjQUxqQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSxFQUFFO2FBQ2I7c0NBSThDLFFBQVE7a0JBQWxELFlBQVk7bUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs7QUFXN0MsTUFBTSxPQUFPLE1BQU07SUFHZjtJQUNBLENBQUM7OzREQUpRLE1BQU07eURBQU4sTUFBTTtvQ0FFRCxXQUFXOzs7Ozt1RkFGaEIsTUFBTTtjQUxsQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7c0NBSThDLFFBQVE7a0JBQWxELFlBQVk7bUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs7QUFVN0MsTUFBTSxPQUFPLGdCQUFnQjtJQU16QixZQUFtQixhQUErQjtRQUEvQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7SUFDbEQsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEUsU0FBUyxFQUFHLElBQUksQ0FBQyxJQUFJO1lBQ3JCLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0ZBbEJRLGdCQUFnQjttRUFBaEIsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FMNUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7bUVBSVksSUFBSTtrQkFBWixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLOztBQXdGVixNQUFNLE9BQU8sS0FBSzs7MERBQUwsS0FBSzt3REFBTCxLQUFLO1FBbkVMLDJEQVFhO1FBQ2QsMkRBV047UUFDTiwyREFZTTtRQUNOLDJEQWtCTTtRQUNOLDJEQVNNOztRQTlEYSwyQ0FBc0I7UUFTdkIsZUFBMEI7UUFBMUIsK0NBQTBCO1FBWXRDLGVBQXdCO1FBQXhCLDZDQUF3QjtRQWF4QixlQUFzQjtRQUF0QiwyQ0FBc0I7UUFtQnRCLGVBQXFCO1FBQXJCLDBDQUFxQjs7dUZBY2QsS0FBSztjQXJFakIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOERMO2dCQUNMLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBRXRDO2dCQUdZLElBQUk7a0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIEVtYmVkZGVkVmlld1JlZiwgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2MtaXRlbScsXG4gIHRlbXBsYXRlOiBgYFxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW0ge1xuXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2MtYmFkZ2UnLFxuICB0ZW1wbGF0ZTogYGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBCYWRnZSB7XG5cbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Mtc2VhcmNoJyxcbiAgdGVtcGxhdGU6IGBgXG59KVxuXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcblxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2MtdGVtcGxhdGVSZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gICAgQElucHV0KCkgaXRlbTogYW55O1xuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmRhdGEudGVtcGxhdGUsIHtcbiAgICAgICAgICAgICRpbXBsaWNpdCA6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGl0ZW0gOiB0aGlzLml0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICB0aGlzLnZpZXcuZGVzdHJveSgpO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjLWljb24nLFxuICB0ZW1wbGF0ZTogYDxzdmcgKm5nSWY9XCJuYW1lID09ICdyZW1vdmUnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQ3Ljk3MSA0Ny45NzFcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuOTcxIDQ3Ljk3MTtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yOC4yMjgsMjMuOTg2TDQ3LjA5Miw1LjEyMmMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBMMjMuOTg2LDE5Ljc0NEw1LjEyMSwwLjg4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMtMS4xNzItMS4xNzItMy4wNy0xLjE3Mi00LjI0MiwwYy0xLjE3MiwxLjE3MS0xLjE3MiwzLjA3MSwwLDQuMjQybDE4Ljg2NSwxOC44NjRMMC44NzksNDIuODVjLTEuMTcyLDEuMTcxLTEuMTcyLDMuMDcxLDAsNC4yNDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzEuNDY1LDQ3LjY3NywyLjIzMyw0Ny45NywzLDQ3Ljk3czEuNTM1LTAuMjkzLDIuMTIxLTAuODc5bDE4Ljg2NS0xOC44NjRMNDIuODUsNDcuMDkxYzAuNTg2LDAuNTg2LDEuMzU0LDAuODc5LDIuMTIxLDAuODc5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyTDI4LjIyOCwyMy45ODZ6XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDxzdmcgKm5nSWY9XCJuYW1lID09ICdhbmdsZS1kb3duJ1wiIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG5cdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA2MTIgNjEyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbjxnPlxuXHQ8ZyBpZD1cIl94MzFfMF8zNF9cIj5cblx0XHQ8Zz5cblx0XHRcdDxwYXRoIGQ9XCJNNjA0LjUwMSwxMzQuNzgyYy05Ljk5OS0xMC4wNS0yNi4yMjItMTAuMDUtMzYuMjIxLDBMMzA2LjAxNCw0MjIuNTU4TDQzLjcyMSwxMzQuNzgyXG5cdFx0XHRcdGMtOS45OTktMTAuMDUtMjYuMjIzLTEwLjA1LTM2LjIyMiwwcy05Ljk5OSwyNi4zNSwwLDM2LjM5OWwyNzkuMTAzLDMwNi4yNDFjNS4zMzEsNS4zNTcsMTIuNDIyLDcuNjUyLDE5LjM4Niw3LjI5NlxuXHRcdFx0XHRjNi45ODgsMC4zNTYsMTQuMDU1LTEuOTM5LDE5LjM4Ni03LjI5NmwyNzkuMTI4LTMwNi4yNjhDNjE0LjUsMTYxLjEwNiw2MTQuNSwxNDQuODMyLDYwNC41MDEsMTM0Ljc4MnpcIi8+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG48L3N2Zz5cbjxzdmcgKm5nSWY9XCJuYW1lID09ICdhbmdsZS11cCdcIiB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHQgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNjEyIDYxMlwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MTIgNjEyO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48Zz5cblx0PGcgaWQ9XCJfeDM5X18zMF9cIj5cblx0XHQ8Zz5cblx0XHRcdDxwYXRoIGQ9XCJNNjA0LjUwMSw0NDAuNTA5TDMyNS4zOTgsMTM0Ljk1NmMtNS4zMzEtNS4zNTctMTIuNDIzLTcuNjI3LTE5LjM4Ni03LjI3Yy02Ljk4OS0wLjM1Ny0xNC4wNTYsMS45MTMtMTkuMzg3LDcuMjdcblx0XHRcdFx0TDcuNDk5LDQ0MC41MDljLTkuOTk5LDEwLjAyNC05Ljk5OSwyNi4yOTgsMCwzNi4zMjNzMjYuMjIzLDEwLjAyNCwzNi4yMjIsMGwyNjIuMjkzLTI4Ny4xNjRMNTY4LjI4LDQ3Ni44MzJcblx0XHRcdFx0YzkuOTk5LDEwLjAyNCwyNi4yMjIsMTAuMDI0LDM2LjIyMSwwQzYxNC41LDQ2Ni44MDksNjE0LjUsNDUwLjUzNCw2MDQuNTAxLDQ0MC41MDl6XCIvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9nPlxuXG48L3N2Zz5cbjxzdmcgKm5nSWY9XCJuYW1lID09ICdzZWFyY2gnXCIgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcblx0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDYxNS41MiA2MTUuNTJcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjE1LjUyIDYxNS41MjtcIlxuXHQgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbjxnPlxuXHQ8Zz5cblx0XHQ8ZyBpZD1cIlNlYXJjaF9feDI4X2FuZF90aG91X3NoYWxsX2ZpbmRfeDI5X1wiPlxuXHRcdFx0PGc+XG5cdFx0XHRcdDxwYXRoIGQ9XCJNNjAyLjUzMSw1NDkuNzM2bC0xODQuMzEtMTg1LjM2OGMyNi42NzktMzcuNzIsNDIuNTI4LTgzLjcyOSw0Mi41MjgtMTMzLjU0OEM0NjAuNzUsMTAzLjM1LDM1Ny45OTcsMCwyMzEuMjU4LDBcblx0XHRcdFx0XHRDMTA0LjUxOCwwLDEuNzY1LDEwMy4zNSwxLjc2NSwyMzAuODJjMCwxMjcuNDcsMTAyLjc1MywyMzAuODIsMjI5LjQ5MywyMzAuODJjNDkuNTMsMCw5NS4yNzEtMTUuOTQ0LDEzMi43OC00Mi43Nzdcblx0XHRcdFx0XHRsMTg0LjMxLDE4NS4zNjZjNy40ODIsNy41MjEsMTcuMjkyLDExLjI5MSwyNy4xMDIsMTEuMjkxYzkuODEyLDAsMTkuNjItMy43NywyNy4wODMtMTEuMjkxXG5cdFx0XHRcdFx0QzYxNy40OTYsNTg5LjE4OCw2MTcuNDk2LDU2NC43NzcsNjAyLjUzMSw1NDkuNzM2eiBNMzU1LjksMzE5Ljc2M2wtMTUuMDQyLDIxLjI3M0wzMTkuNywzNTYuMTc0XG5cdFx0XHRcdFx0Yy0yNi4wODMsMTguNjU4LTU2LjY2NywyOC41MjYtODguNDQyLDI4LjUyNmMtODQuMzY1LDAtMTUyLjk5NS02OS4wMzUtMTUyLjk5NS0xNTMuODhjMC04NC44NDYsNjguNjMtMTUzLjg4LDE1Mi45OTUtMTUzLjg4XG5cdFx0XHRcdFx0czE1Mi45OTYsNjkuMDM0LDE1Mi45OTYsMTUzLjg4QzM4NC4yNzEsMjYyLjc2OSwzNzQuNDYyLDI5My41MjYsMzU1LjksMzE5Ljc2M3pcIi8+XG5cdFx0XHQ8L2c+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG5cbjwvc3ZnPlxuPHN2ZyAqbmdJZj1cIm5hbWUgPT0gJ2NsZWFyJ1wiIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG5cdCB2aWV3Qm94PVwiMCAwIDUxLjk3NiA1MS45NzZcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEuOTc2IDUxLjk3NjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuPGc+XG5cdDxwYXRoIGQ9XCJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwXG5cdFx0QzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43Nzhcblx0XHRjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4XG5cdFx0YzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4XG5cdFx0bC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxelwiLz5cbjwvZz5cbjwvc3ZnPmAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBDSWNvbiB7XG4gICAgQElucHV0KCkgbmFtZTogYW55O1xufVxuIl19