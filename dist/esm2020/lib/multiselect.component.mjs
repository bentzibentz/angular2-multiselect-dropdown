import { Component, HostListener, NgModule, ViewEncapsulation, ContentChild, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyException } from './multiselect.model';
import { ClickOutsideDirective, ScrollDirective, styleDirective, setPosition } from './clickOutside';
import { ListFilterPipe } from './list-filter';
import { Item, Badge, Search, TemplateRenderer, CIcon } from './menu-item';
import { DataService } from './multiselect.service';
import { Subject } from 'rxjs';
import { VirtualScrollerModule, VirtualScrollerComponent } from './virtual-scroll/virtual-scroll';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./list-filter";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "./virtual-scroll/virtual-scroll";
const _c0 = ["searchInput"];
const _c1 = ["selectedList"];
const _c2 = ["dropdownList"];
const _c3 = ["cuppaDropdown"];
function AngularMultiSelect_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.settings.text);
} }
function AngularMultiSelect_span_6_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r27 = ctx.$implicit;
    const ctx_r26 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r27[ctx_r26.settings.labelKey], " ");
} }
function AngularMultiSelect_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, AngularMultiSelect_span_6_span_1_Template, 2, 1, "span", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.selectedItems)("ngForTrackBy", ctx_r3.trackByFn.bind(ctx_r3));
} }
function AngularMultiSelect_span_7_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r30 = i0.ɵɵnextContext().$implicit;
    const ctx_r32 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r30[ctx_r32.settings.labelKey]);
} }
function AngularMultiSelect_span_7_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵelement(1, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r30 = i0.ɵɵnextContext().$implicit;
    const ctx_r33 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("data", ctx_r33.badgeTempl)("item", item_r30);
} }
function AngularMultiSelect_span_7_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_span_1_Template, 2, 1, "span", 26);
    i0.ɵɵtemplate(2, AngularMultiSelect_span_7_div_1_span_2_Template, 2, 2, "span", 26);
    i0.ɵɵelementStart(3, "span", 27);
    i0.ɵɵlistener("click", function AngularMultiSelect_span_7_div_1_Template_span_click_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r37); const item_r30 = restoredCtx.$implicit; const k_r31 = restoredCtx.index; const ctx_r36 = i0.ɵɵnextContext(2); ctx_r36.onItemClick(item_r30, k_r31, $event); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(4, "c-icon", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r29.badgeTempl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r29.badgeTempl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "remove");
} }
function AngularMultiSelect_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtemplate(1, AngularMultiSelect_span_7_div_1_Template, 5, 3, "div", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.selectedItems)("ngForTrackBy", ctx_r4.trackByFn.bind(ctx_r4));
} }
function AngularMultiSelect_div_8_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r39 = i0.ɵɵnextContext().$implicit;
    const ctx_r41 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r39[ctx_r41.settings.labelKey]);
} }
function AngularMultiSelect_div_8_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵelement(1, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r39 = i0.ɵɵnextContext().$implicit;
    const ctx_r42 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("data", ctx_r42.badgeTempl)("item", item_r39);
} }
function AngularMultiSelect_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_span_1_Template, 2, 1, "span", 26);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_8_div_1_span_2_Template, 2, 2, "span", 26);
    i0.ɵɵelementStart(3, "span", 27);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_8_div_1_Template_span_click_3_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r46); const item_r39 = restoredCtx.$implicit; const k_r40 = restoredCtx.index; const ctx_r45 = i0.ɵɵnextContext(2); ctx_r45.onItemClick(item_r39, k_r40, $event); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(4, "c-icon", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const k_r40 = ctx.index;
    const ctx_r38 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("hidden", k_r40 > ctx_r38.settings.badgeShowLimit - 1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r38.badgeTempl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r38.badgeTempl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "remove");
} }
function AngularMultiSelect_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_8_div_1_Template, 5, 4, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.selectedItems)("ngForTrackBy", ctx_r5.trackByFn.bind(ctx_r5));
} }
function AngularMultiSelect_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("+", (ctx_r6.selectedItems == null ? null : ctx_r6.selectedItems.length) - ctx_r6.settings.badgeShowLimit, "");
} }
function AngularMultiSelect_span_10_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵlistener("click", function AngularMultiSelect_span_10_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r47 = i0.ɵɵnextContext(); ctx_r47.clearSelection($event); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(1, "c-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", "remove");
} }
function AngularMultiSelect_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵelement(1, "c-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", "angle-down");
} }
function AngularMultiSelect_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵelement(1, "c-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", "angle-up");
} }
function AngularMultiSelect_div_18_input_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 41);
    i0.ɵɵlistener("change", function AngularMultiSelect_div_18_input_1_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r50 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r50.toggleSelectAll($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r49 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r49.isSelectAll)("disabled", ctx_r49.settings.limitSelection == (ctx_r49.selectedItems == null ? null : ctx_r49.selectedItems.length))("id", ctx_r49.id);
} }
function AngularMultiSelect_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_18_input_1_Template, 1, 3, "input", 38);
    i0.ɵɵelementStart(2, "label", 39)(3, "span", 40);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 40);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
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
} }
function AngularMultiSelect_img_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 42);
} }
function AngularMultiSelect_div_20_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 48);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_20_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r58.clearSearch()); });
    i0.ɵɵelement(1, "c-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r52 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("hidden", ctx_r52.filter == undefined || (ctx_r52.filter == null ? null : ctx_r52.filter.length) == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", "clear");
} }
function AngularMultiSelect_div_20_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 48);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_20_span_4_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r61); const ctx_r60 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r60.resetInfiniteSearch()); });
    i0.ɵɵelement(1, "c-icon", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r53 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("hidden", ctx_r53.filter == undefined || (ctx_r53.filter == null ? null : ctx_r53.filter.length) == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", "clear");
} }
function AngularMultiSelect_div_20_input_5_Template(rf, ctx) { if (rf & 1) {
    const _r64 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 49, 50);
    i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_5_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r64); const ctx_r63 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r63.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_5_Template_input_keyup_0_listener() { i0.ɵɵrestoreView(_r64); const ctx_r65 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r65.filterGroupedList()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r54 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("placeholder", ctx_r54.settings.searchPlaceholderText)("ngModel", ctx_r54.filter);
} }
function AngularMultiSelect_div_20_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 49, 50);
    i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_6_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r67 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r67.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_6_Template_input_keyup_0_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r69 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r69.filteritems($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r55 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("placeholder", ctx_r55.settings.searchPlaceholderText)("ngModel", ctx_r55.filter);
} }
function AngularMultiSelect_div_20_input_7_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 49, 50);
    i0.ɵɵlistener("ngModelChange", function AngularMultiSelect_div_20_input_7_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r71 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r71.filter = $event); })("keyup", function AngularMultiSelect_div_20_input_7_Template_input_keyup_0_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r73 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r73.onKeyUp($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r56 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("placeholder", ctx_r56.settings.searchPlaceholderText)("ngModel", ctx_r56.filter);
} }
function AngularMultiSelect_div_20_c_templateRenderer_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "c-templateRenderer", 30);
} if (rf & 2) {
    const ctx_r57 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("data", ctx_r57.searchTempl)("item", ctx_r57.item);
} }
function AngularMultiSelect_div_20_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_21_div_1_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_21_div_2_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_21_div_1_Template, 7, 6, "div", 52);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_21_div_2_Template, 7, 6, "div", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r14.settings.groupBy && (ctx_r14.filter == null ? null : ctx_r14.filter.length) > 0 && ctx_r14.filterLength > 0 && !ctx_r14.settings.singleSelection);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r14.settings.groupBy && (ctx_r14.filter == null ? null : ctx_r14.filter.length) > 0 && (ctx_r14.groupedData == null ? null : ctx_r14.groupedData.length) > 0 && !ctx_r14.settings.singleSelection);
} }
function AngularMultiSelect_div_22_div_1_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_22_div_1_Template, 7, 6, "div", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r15.filter == null ? null : ctx_r15.filter.length) > 0 && ctx_r15.infiniteFilterLength > 0);
} }
function AngularMultiSelect_div_23_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57)(1, "button", 58);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_23_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r85); const ctx_r84 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r84.addFilterNewItem()); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r83 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r83.settings.addNewButtonText);
} }
function AngularMultiSelect_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_23_div_1_Template, 3, 1, "div", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.settings.addNewItemOnFilter);
} }
function AngularMultiSelect_div_24_li_2_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 55);
} if (rf & 2) {
    const item_r87 = i0.ɵɵnextContext().$implicit;
    const ctx_r89 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r89.isSelected(item_r87))("disabled", ctx_r89.settings.limitSelection == (ctx_r89.selectedItems == null ? null : ctx_r89.selectedItems.length) && !ctx_r89.isSelected(item_r87) || item_r87.disabled);
} }
const _c4 = function (a0) { return { "selected-item": a0 }; };
function AngularMultiSelect_div_24_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r92 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_24_li_2_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r92); const item_r87 = restoredCtx.$implicit; const i_r88 = restoredCtx.index; const ctx_r91 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r91.onItemClick(item_r87, i_r88, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_24_li_2_input_1_Template, 1, 2, "input", 63);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r87 = ctx.$implicit;
    const ctx_r86 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c4, ctx_r86.isSelected(item_r87) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r86.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r87[ctx_r86.settings.labelKey]);
} }
function AngularMultiSelect_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_24_li_2_Template, 4, 5, "li", 61);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r17.settings.maxHeight + "px");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r17.data);
} }
function AngularMultiSelect_div_25_li_3_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r95 = i0.ɵɵnextContext().$implicit;
    const ctx_r97 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r97.isSelected(item_r95))("disabled", ctx_r97.settings.limitSelection == (ctx_r97.selectedItems == null ? null : ctx_r97.selectedItems.length) && !ctx_r97.isSelected(item_r95) || item_r95.disabled);
} }
function AngularMultiSelect_div_25_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r100 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_25_li_3_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r100); const item_r95 = restoredCtx.$implicit; const i_r96 = restoredCtx.index; const ctx_r99 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r99.onItemClick(item_r95, i_r96, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_25_li_3_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r95 = ctx.$implicit;
    const ctx_r94 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c4, ctx_r94.isSelected(item_r95) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r94.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r95[ctx_r94.settings.labelKey]);
} }
const _c5 = function (a0) { return { "height": a0 }; };
function AngularMultiSelect_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r102 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 65);
    i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_25_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r102); const ctx_r101 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r101.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_25_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r102); const ctx_r103 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r103.onScrollEnd($event)); });
    i0.ɵɵtemplate(3, AngularMultiSelect_div_25_li_3_Template, 4, 5, "li", 61);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const _r93 = i0.ɵɵreference(2);
    const ctx_r18 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r18.settings.maxHeight + "px");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r18.randomSize)("items", ctx_r18.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r18.settings.maxHeight + "px"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", _r93.viewPortItems);
} }
function AngularMultiSelect_div_26_li_2_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r105 = i0.ɵɵnextContext().$implicit;
    const ctx_r107 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r107.isSelected(item_r105))("disabled", ctx_r107.settings.limitSelection == (ctx_r107.selectedItems == null ? null : ctx_r107.selectedItems.length) && !ctx_r107.isSelected(item_r105) || item_r105.disabled);
} }
function AngularMultiSelect_div_26_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r110 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_26_li_2_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r110); const item_r105 = restoredCtx.$implicit; const i_r106 = restoredCtx.index; const ctx_r109 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r109.onItemClick(item_r105, i_r106, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_26_li_2_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r105 = ctx.$implicit;
    const ctx_r104 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c4, ctx_r104.isSelected(item_r105) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r104.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r104.itemTempl)("item", item_r105);
} }
function AngularMultiSelect_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_26_li_2_Template, 4, 6, "li", 61);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r19.settings.maxHeight + "px");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r19.data);
} }
function AngularMultiSelect_div_27_li_3_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r113 = i0.ɵɵnextContext().$implicit;
    const ctx_r115 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r115.isSelected(item_r113))("disabled", ctx_r115.settings.limitSelection == (ctx_r115.selectedItems == null ? null : ctx_r115.selectedItems.length) && !ctx_r115.isSelected(item_r113) || item_r113.disabled);
} }
function AngularMultiSelect_div_27_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r118 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_27_li_3_Template_li_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r118); const item_r113 = restoredCtx.$implicit; const i_r114 = restoredCtx.index; const ctx_r117 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r117.onItemClick(item_r113, i_r114, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_27_li_3_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r113 = ctx.$implicit;
    const ctx_r112 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c4, ctx_r112.isSelected(item_r113) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r112.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r112.itemTempl)("item", item_r113);
} }
function AngularMultiSelect_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r120 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 68);
    i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_27_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r120); const ctx_r119 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r119.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_27_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r120); const ctx_r121 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r121.onScrollEnd($event)); });
    i0.ɵɵtemplate(3, AngularMultiSelect_div_27_li_3_Template, 4, 6, "li", 61);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const _r111 = i0.ɵɵreference(2);
    const ctx_r20 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r20.settings.maxHeight + "px");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r20.randomSize)("items", ctx_r20.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r20.settings.maxHeight + "px"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", _r111.viewPortItems);
} }
function AngularMultiSelect_div_28_span_3_li_1_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r124 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r128 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r128.isSelected(item_r124))("disabled", ctx_r128.settings.limitSelection == (ctx_r128.selectedItems == null ? null : ctx_r128.selectedItems.length) && !ctx_r128.isSelected(item_r124) || item_r124.disabled);
} }
const _c6 = function (a0, a1) { return { "grp-title": a0, "grp-item": a1 }; };
function AngularMultiSelect_div_28_span_3_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r132 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_28_span_3_li_1_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r132); const ctx_r131 = i0.ɵɵnextContext(); const item_r124 = ctx_r131.$implicit; const i_r125 = ctx_r131.index; const ctx_r130 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r130.onItemClick(item_r124, i_r125, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r124 = i0.ɵɵnextContext().$implicit;
    const ctx_r126 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r124.grpTitle, !item_r124.grpTitle && !ctx_r126.settings.singleSelection));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r126.settings.showCheckbox && !ctx_r126.settings.singleSelection);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r126.itemTempl)("item", item_r124);
} }
function AngularMultiSelect_div_28_span_3_li_2_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r124 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r134 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r134.isSelected(item_r124))("disabled", ctx_r134.settings.limitSelection == (ctx_r134.selectedItems == null ? null : ctx_r134.selectedItems.length) && !ctx_r134.isSelected(item_r124) || item_r124.disabled);
} }
function AngularMultiSelect_div_28_span_3_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 73);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_2_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelement(2, "label")(3, "c-templateRenderer", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r124 = i0.ɵɵnextContext().$implicit;
    const ctx_r127 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, item_r124.grpTitle, !item_r124.grpTitle && !ctx_r127.settings.singleSelection));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r127.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r127.itemTempl)("item", item_r124);
} }
function AngularMultiSelect_div_28_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, AngularMultiSelect_div_28_span_3_li_1_Template, 4, 7, "li", 71);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_28_span_3_li_2_Template, 4, 7, "li", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r124 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r124.grpTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r124.grpTitle);
} }
function AngularMultiSelect_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r138 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 64, 69);
    i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_28_Template_ul_vsStart_1_listener($event) { i0.ɵɵrestoreView(_r138); const ctx_r137 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r137.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_28_Template_ul_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r138); const ctx_r139 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r139.onScrollEnd($event)); });
    i0.ɵɵtemplate(3, AngularMultiSelect_div_28_span_3_Template, 3, 2, "span", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const _r122 = i0.ɵɵreference(2);
    const ctx_r21 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r21.settings.maxHeight + "px");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r21.randomSize)("items", ctx_r21.virtualdata)("ngStyle", i0.ɵɵpureFunction1(6, _c5, ctx_r21.settings.maxHeight + "px"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", _r122.viewPortItems);
} }
function AngularMultiSelect_div_29_span_2_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r141 = i0.ɵɵnextContext().$implicit;
    const ctx_r143 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", item_r141.selected)("disabled", ctx_r143.settings.limitSelection == (ctx_r143.selectedItems == null ? null : ctx_r143.selectedItems.length) && !ctx_r143.isSelected(item_r141) || item_r141.disabled);
} }
function AngularMultiSelect_div_29_span_2_span_6_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const val_r146 = i0.ɵɵnextContext().$implicit;
    const ctx_r148 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("checked", ctx_r148.isSelected(val_r146))("disabled", ctx_r148.settings.limitSelection == (ctx_r148.selectedItems == null ? null : ctx_r148.selectedItems.length) && !ctx_r148.isSelected(val_r146) || val_r146.disabled);
} }
function AngularMultiSelect_div_29_span_2_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r151 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span")(1, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_29_span_2_span_6_Template_li_click_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r151); const val_r146 = restoredCtx.$implicit; const j_r147 = restoredCtx.index; const ctx_r150 = i0.ɵɵnextContext(3); ctx_r150.onItemClick(val_r146, j_r147, $event); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_span_6_input_2_Template, 1, 2, "input", 66);
    i0.ɵɵelement(3, "label")(4, "c-templateRenderer", 30);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const val_r146 = ctx.$implicit;
    const ctx_r144 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c6, val_r146.grpTitle, !val_r146.grpTitle && !ctx_r144.settings.singleSelection));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r144.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r144.itemTempl)("item", val_r146);
} }
function AngularMultiSelect_div_29_span_2_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_29_span_2_Template, 7, 7, "span", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r22.settings.maxHeight + "px");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r22.groupedData);
} }
function AngularMultiSelect_div_30_span_4_li_1_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r156 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r160 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r160.isSelected(item_r156))("disabled", ctx_r160.settings.limitSelection == (ctx_r160.selectedItems == null ? null : ctx_r160.selectedItems.length) && !ctx_r160.isSelected(item_r156) || item_r156.disabled);
} }
const _c7 = function (a0, a1, a2) { return { "grp-title": a0, "grp-item": a1, "selected-item": a2 }; };
function AngularMultiSelect_div_30_span_4_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 73);
    i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r156 = i0.ɵɵnextContext().$implicit;
    const ctx_r158 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c7, item_r156.grpTitle, !item_r156.grpTitle && !ctx_r158.settings.singleSelection, ctx_r158.isSelected(item_r156) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r158.settings.showCheckbox && !item_r156.grpTitle && !ctx_r158.settings.singleSelection);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r156[ctx_r158.settings.labelKey]);
} }
function AngularMultiSelect_div_30_span_4_li_2_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r156 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r163 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r163.isSelected(item_r156))("disabled", ctx_r163.settings.limitSelection == (ctx_r163.selectedItems == null ? null : ctx_r163.selectedItems.length) && !ctx_r163.isSelected(item_r156) || item_r156.disabled);
} }
function AngularMultiSelect_div_30_span_4_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r167 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_30_span_4_li_2_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r167); const ctx_r166 = i0.ɵɵnextContext(); const item_r156 = ctx_r166.$implicit; const i_r157 = ctx_r166.index; const ctx_r165 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r165.onItemClick(item_r156, i_r157, $event)); });
    i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_2_input_1_Template, 1, 2, "input", 66);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r156 = i0.ɵɵnextContext().$implicit;
    const ctx_r159 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c7, item_r156.grpTitle, !item_r156.grpTitle && !ctx_r159.settings.singleSelection, ctx_r159.isSelected(item_r156) == true));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r159.settings.showCheckbox && !item_r156.grpTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r156[ctx_r159.settings.labelKey]);
} }
function AngularMultiSelect_div_30_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, AngularMultiSelect_div_30_span_4_li_1_Template, 4, 7, "li", 72);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_30_span_4_li_2_Template, 4, 7, "li", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r156 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r156.grpTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r156.grpTitle);
} }
function AngularMultiSelect_div_30_Template(rf, ctx) { if (rf & 1) {
    const _r170 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59)(1, "virtual-scroller", 74);
    i0.ɵɵlistener("vsUpdate", function AngularMultiSelect_div_30_Template_virtual_scroller_vsUpdate_1_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r169 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r169.viewPortItems = $event); })("vsEnd", function AngularMultiSelect_div_30_Template_virtual_scroller_vsEnd_1_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r171 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r171.onScrollEnd($event)); });
    i0.ɵɵelementStart(2, "ul", 64, 75);
    i0.ɵɵlistener("vsStart", function AngularMultiSelect_div_30_Template_ul_vsStart_2_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r172 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r172.onScrollEnd($event)); })("vsEnd", function AngularMultiSelect_div_30_Template_ul_vsEnd_2_listener($event) { i0.ɵɵrestoreView(_r170); const ctx_r173 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r173.onScrollEnd($event)); });
    i0.ɵɵtemplate(4, AngularMultiSelect_div_30_span_4_Template, 3, 2, "span", 70);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const _r154 = i0.ɵɵreference(3);
    const ctx_r23 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r23.settings.maxHeight + "px");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("items", ctx_r23.groupedData)("ngStyle", i0.ɵɵpureFunction1(8, _c5, ctx_r23.settings.maxHeight + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("enableUnequalChildrenSizes", ctx_r23.randomSize)("items", ctx_r23.virtualdata)("ngStyle", i0.ɵɵpureFunction1(10, _c5, ctx_r23.settings.maxHeight + "px"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", _r154.viewPortItems);
} }
function AngularMultiSelect_div_31_span_2_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const item_r175 = i0.ɵɵnextContext().$implicit;
    const ctx_r177 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", item_r175.selected)("disabled", ctx_r177.settings.limitSelection == (ctx_r177.selectedItems == null ? null : ctx_r177.selectedItems.length) && !ctx_r177.isSelected(item_r175) || item_r175.disabled);
} }
function AngularMultiSelect_div_31_span_2_span_6_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 67);
} if (rf & 2) {
    const val_r180 = i0.ɵɵnextContext().$implicit;
    const ctx_r182 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("checked", ctx_r182.isSelected(val_r180))("disabled", ctx_r182.settings.limitSelection == (ctx_r182.selectedItems == null ? null : ctx_r182.selectedItems.length) && !ctx_r182.isSelected(val_r180) || val_r180.disabled);
} }
const _c8 = function (a0, a1, a2) { return { "selected-item": a0, "grp-title": a1, "grp-item": a2 }; };
function AngularMultiSelect_div_31_span_2_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r185 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span")(1, "li", 62);
    i0.ɵɵlistener("click", function AngularMultiSelect_div_31_span_2_span_6_Template_li_click_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r185); const val_r180 = restoredCtx.$implicit; const j_r181 = restoredCtx.index; const ctx_r184 = i0.ɵɵnextContext(3); ctx_r184.onItemClick(val_r180, j_r181, $event); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_span_6_input_2_Template, 1, 2, "input", 66);
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const val_r180 = ctx.$implicit;
    const ctx_r178 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c8, ctx_r178.isSelected(val_r180) == true, val_r180.grpTitle, !val_r180.grpTitle && !ctx_r178.settings.singleSelection));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r178.settings.showCheckbox);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(val_r180[ctx_r178.settings.labelKey]);
} }
function AngularMultiSelect_div_31_span_2_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
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
} }
function AngularMultiSelect_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "ul", 60);
    i0.ɵɵtemplate(2, AngularMultiSelect_div_31_span_2_Template, 7, 7, "span", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r24 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r24.settings.maxHeight + "px");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r24.groupedData);
} }
function AngularMultiSelect_h5_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r25 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r25.settings.noDataLabel);
} }
const _c9 = function (a0) { return { "disabled": a0 }; };
const _c10 = function (a0) { return { "tagToBody": a0 }; };
const _c11 = function (a0, a1) { return { "arrow-up": a0, "arrow-down": a1 }; };
const _c12 = function (a0) { return { "single-select-mode": a0 }; };
export const DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularMultiSelect),
    multi: true
};
export const DROPDOWN_CONTROL_VALIDATION = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AngularMultiSelect),
    multi: true,
};
const noop = () => {
};
export class AngularMultiSelect {
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
AngularMultiSelect.ɵfac = function AngularMultiSelect_Factory(t) { return new (t || AngularMultiSelect)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.ListFilterPipe)); };
AngularMultiSelect.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AngularMultiSelect, selectors: [["angular2-multiselect"]], contentQueries: function AngularMultiSelect_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, Item, 5);
        i0.ɵɵcontentQuery(dirIndex, Badge, 5);
        i0.ɵɵcontentQuery(dirIndex, Search, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemTempl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.badgeTempl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchTempl = _t.first);
    } }, viewQuery: function AngularMultiSelect_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
        i0.ɵɵviewQuery(_c2, 5);
        i0.ɵɵviewQuery(_c3, 5);
        i0.ɵɵviewQuery(VirtualScrollerComponent, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchInput = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selectedListElem = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dropdownListElem = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.cuppaDropdown = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.virtualScroller = _t.first);
    } }, hostVars: 2, hostBindings: function AngularMultiSelect_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keyup.escape", function AngularMultiSelect_keyup_escape_HostBindingHandler($event) { return ctx.onEscapeDown($event); }, false, i0.ɵɵresolveDocument)("scroll", function AngularMultiSelect_scroll_HostBindingHandler($event) { return ctx.onScroll($event); }, false, i0.ɵɵresolveWindow);
    } if (rf & 2) {
        i0.ɵɵclassMap(ctx.defaultSettings.classes);
    } }, inputs: { data: "data", settings: "settings", loading: "loading" }, outputs: { onSelect: "onSelect", onDeSelect: "onDeSelect", onSelectAll: "onSelectAll", onDeSelectAll: "onDeSelectAll", onOpen: "onOpen", onClose: "onClose", onScrollToEnd: "onScrollToEnd", onFilterSelectAll: "onFilterSelectAll", onFilterDeSelectAll: "onFilterDeSelectAll", onAddFilterNewItem: "onAddFilterNewItem", onGroupSelect: "onGroupSelect", onGroupDeSelect: "onGroupDeSelect" }, features: [i0.ɵɵProvidersFeature([DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION]), i0.ɵɵNgOnChangesFeature], decls: 33, vars: 50, consts: [[1, "cuppa-dropdown", 3, "clickOutside"], ["cuppaDropdown", ""], [1, "selected-list"], ["selectedList", ""], [1, "c-btn", 3, "ngClass", "click"], [4, "ngIf"], ["class", "c-list", 4, "ngIf"], ["class", "countplaceholder", 4, "ngIf"], ["class", "c-remove clear-all", 3, "click", 4, "ngIf"], ["class", "c-angle-down", 4, "ngIf"], ["class", "c-angle-up", 4, "ngIf"], [1, "dropdown-list", "animated", "fadeIn", 3, "ngClass", "hidden"], ["dropdownList", ""], [1, "arrow-2", 3, "ngClass"], [3, "ngClass"], [1, "list-area", 3, "ngClass"], ["class", "pure-checkbox select-all", 4, "ngIf"], ["class", "loading-icon", "src", "assets/img/loading.gif", 4, "ngIf"], ["class", "list-filter", 4, "ngIf"], ["class", "filter-select-all", 4, "ngIf"], ["style", "overflow: auto;", 3, "maxHeight", 4, "ngIf"], ["class", "list-message", 4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-list"], ["class", "c-token", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token"], ["class", "c-label", 4, "ngIf"], [1, "c-remove", 3, "click"], [3, "name"], [1, "c-label"], [3, "data", "item"], ["class", "c-token", 3, "hidden", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "c-token", 3, "hidden"], [1, "countplaceholder"], [1, "c-remove", "clear-all", 3, "click"], [1, "c-angle-down"], [1, "c-angle-up"], [1, "pure-checkbox", "select-all"], ["type", "checkbox", 3, "checked", "disabled", "id", "change", 4, "ngIf"], [3, "for"], [3, "hidden"], ["type", "checkbox", 3, "checked", "disabled", "id", "change"], ["src", "assets/img/loading.gif", 1, "loading-icon"], [1, "list-filter"], ["id", "searchIcon", 1, "c-search"], ["class", "c-clear", 3, "hidden", "click", 4, "ngIf"], ["class", "c-input", "type", "text", "aria-labelledby", "searchIcon", 3, "placeholder", "ngModel", "ngModelChange", "keyup", 4, "ngIf"], [3, "data", "item", 4, "ngIf"], [1, "c-clear", 3, "hidden", "click"], ["type", "text", "aria-labelledby", "searchIcon", 1, "c-input", 3, "placeholder", "ngModel", "ngModelChange", "keyup"], ["searchInput", ""], [1, "filter-select-all"], ["class", "pure-checkbox select-all", 3, "click", 4, "ngIf"], [1, "pure-checkbox", "select-all", 3, "click"], ["type", "checkbox", "aria-labelledby", "optionName", "aria-label", "option", 3, "checked", "disabled"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled"], ["class", "btn-container", 4, "ngIf"], [1, "btn-container"], [1, "c-btn", "btn-iceblue", 3, "click"], [2, "overflow", "auto"], [1, "lazyContainer"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "pure-checkbox", 3, "ngClass", "click"], ["type", "checkbox", "aria-labelledby", "option", 3, "checked", "disabled", 4, "ngIf"], ["virtualScroller", "", 1, "lazyContainer", 3, "enableUnequalChildrenSizes", "items", "ngStyle", "vsStart", "vsEnd"], ["scroll", ""], ["type", "checkbox", 3, "checked", "disabled", 4, "ngIf"], ["type", "checkbox", 3, "checked", "disabled"], ["scroll2", ""], ["scroll3", ""], [4, "ngFor", "ngForOf"], ["class", "pure-checkbox", 3, "ngClass", "click", 4, "ngIf"], ["class", "pure-checkbox", 3, "ngClass", 4, "ngIf"], [1, "pure-checkbox", 3, "ngClass"], [3, "items", "ngStyle", "vsUpdate", "vsEnd"], ["scroll4", ""], [1, "list-message"]], template: function AngularMultiSelect_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
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
    } }, dependencies: function () { return [i2.NgClass, i2.NgForOf, i2.NgIf, i2.NgStyle, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i4.VirtualScrollerComponent, ClickOutsideDirective, TemplateRenderer, CIcon]; }, styles: ["virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#cccccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:\"\";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularMultiSelect, [{
        type: Component,
        args: [{ selector: 'angular2-multiselect', host: { '[class]': 'defaultSettings.classes' }, providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION], encapsulation: ViewEncapsulation.None, template: "<div class=\"cuppa-dropdown\" (clickOutside)=\"closeDropdownOnClickOut()\" #cuppaDropdown>\n    <div class=\"selected-list\" #selectedList>\n        <div class=\"c-btn\" (click)=\"toggleDropdown($event)\" [ngClass]=\"{'disabled': settings.disabled}\" [attr.tabindex]=\"0\">\n\n            <span *ngIf=\"selectedItems?.length == 0\">{{settings.text}}</span>\n            <span *ngIf=\"settings.singleSelection && !badgeTempl\">\n                <span *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\n                    {{item[settings.labelKey]}}\n                </span>\n            </span>\n            <span class=\"c-list\" *ngIf=\"selectedItems?.length > 0 && settings.singleSelection && badgeTempl \">\n                <div class=\"c-token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\n                    <span *ngIf=\"!badgeTempl\" class=\"c-label\">{{item[settings.labelKey]}}</span>\n\n                    <span *ngIf=\"badgeTempl\" class=\"c-label\">\n                        <c-templateRenderer [data]=\"badgeTempl\" [item]=\"item\"></c-templateRenderer>\n                    </span>\n                    <span class=\"c-remove\" (click)=\"onItemClick(item,k,$event);$event.stopPropagation()\">\n                        <c-icon [name]=\"'remove'\"></c-icon>\n                    </span>\n                </div>\n            </span>\n            <div class=\"c-list\" *ngIf=\"selectedItems?.length > 0 && !settings.singleSelection\">\n                <div class=\"c-token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\" [hidden]=\"k > settings.badgeShowLimit-1\">\n                    <span *ngIf=\"!badgeTempl\" class=\"c-label\">{{item[settings.labelKey]}}</span>\n                    <span *ngIf=\"badgeTempl\" class=\"c-label\">\n                        <c-templateRenderer [data]=\"badgeTempl\" [item]=\"item\"></c-templateRenderer>\n                    </span>\n                    <span class=\"c-remove\" (click)=\"onItemClick(item,k,$event);$event.stopPropagation()\">\n                        <c-icon [name]=\"'remove'\"></c-icon>\n                    </span>\n                </div>\n            </div>\n            <span class=\"countplaceholder\" *ngIf=\"selectedItems?.length > settings.badgeShowLimit\">+{{selectedItems?.length - settings.badgeShowLimit }}</span>\n            <span class=\"c-remove clear-all\" *ngIf=\"settings.clearAll && selectedItems?.length > 0 && !settings.disabled\" (click)=\"clearSelection($event);$event.stopPropagation()\">\n                <c-icon [name]=\"'remove'\"></c-icon>\n            </span>\n            <span *ngIf=\"!isActive\" class=\"c-angle-down\">\n                <c-icon [name]=\"'angle-down'\"></c-icon>\n            </span>\n            <span *ngIf=\"isActive\" class=\"c-angle-up\">\n                <c-icon [name]=\"'angle-up'\"></c-icon>\n\n            </span>\n        </div>\n    </div>\n    <div #dropdownList class=\"dropdown-list animated fadeIn\" \n    [ngClass]=\"{'tagToBody': settings.tagToBody}\"\n    [style.width.px]=\"dropDownWidth\" \n    [style.top]=\"dropDownTop\" \n    [style.bottom]=\"dropDownBottom\"\n    [style.left.px]=\"dropDownLeft\" \n        [hidden]=\"!isActive\">\n        <div [ngClass]=\"{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}\" class=\"arrow-2\"></div>\n        <div [ngClass]=\"{'arrow-up': settings.position == 'bottom', 'arrow-down': settings.position == 'top'}\"></div>\n        <div class=\"list-area\" [ngClass]=\"{'single-select-mode': settings.singleSelection }\">\n            <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent\"\n                >\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                [id]=\"id\" (change)=\"toggleSelectAll($event)\"/>\n                <label [for]=\"id\">\n                    <span [hidden]=\"isSelectAll\">{{settings.selectAllText}}</span>\n                    <span [hidden]=\"!isSelectAll\">{{settings.unSelectAllText}}</span>\n                </label>\n            </div>\n            <img class=\"loading-icon\" *ngIf=\"loading\" src=\"assets/img/loading.gif\" />\n            <div class=\"list-filter\" *ngIf=\"settings.enableSearchFilter\">\n                <span class=\"c-search\" id=\"searchIcon\">\n                    <c-icon [name]=\"'search'\"></c-icon>\n                </span>\n                <span *ngIf=\"!settings.lazyLoading\" [hidden]=\"filter == undefined || filter?.length == 0\" class=\"c-clear\" (click)=\"clearSearch()\">\n                    <c-icon [name]=\"'clear'\"></c-icon>\n                </span>\n                <span *ngIf=\"settings.lazyLoading\" [hidden]=\"filter == undefined || filter?.length == 0\" class=\"c-clear\" (click)=\"resetInfiniteSearch()\">\n                    <c-icon [name]=\"'clear'\"></c-icon>\n                </span>\n\n                <input class=\"c-input\" *ngIf=\"settings.groupBy && !settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"filterGroupedList()\" aria-labelledby=\"searchIcon\">\n                <input class=\"c-input\" *ngIf=\"!settings.groupBy && !settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"filteritems($event)\" aria-labelledby=\"searchIcon\">\n                <input class=\"c-input\" *ngIf=\"settings.lazyLoading && !searchTempl\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                    [(ngModel)]=\"filter\" (keyup)=\"onKeyUp($event)\" aria-labelledby=\"searchIcon\">\n                <!--            <input class=\"c-input\" *ngIf=\"!settings.lazyLoading && !searchTempl && settings.groupBy\" #searchInput type=\"text\" [placeholder]=\"settings.searchPlaceholderText\"\n                [(ngModel)]=\"filter\" (keyup)=\"filterGroupList($event)\">-->\n                <c-templateRenderer *ngIf=\"searchTempl\" [data]=\"searchTempl\" [item]=\"item\"></c-templateRenderer>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\n                <div class=\"pure-checkbox select-all\" *ngIf=\"!settings.groupBy && filter?.length > 0 && filterLength > 0  && !settings.singleSelection\" (click)=\"toggleFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" aria-labelledby=\"optionName\"\n                    aria-label=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n                <div class=\"pure-checkbox select-all\" *ngIf=\"settings.groupBy && filter?.length > 0 && groupedData?.length > 0  && !settings.singleSelection\" (click)=\"toggleFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isFilterSelectAll && filter?.length > 0\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                    aria-labelledby=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent && !settings.singleSelection\">\n                <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && infiniteFilterLength > 0\" (click)=\"toggleInfiniteFilterSelectAll()\">\n                    <input type=\"checkbox\" [checked]=\"isInfiniteFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\"\n                    aria-labelledby=\"option\"/>\n                    <label>\n                        <span [hidden]=\"isInfiniteFilterSelectAll\">{{settings.filterSelectAllText}}</span>\n                        <span [hidden]=\"!isInfiniteFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"filter-select-all\" *ngIf=\"filter?.length\">\n                <div class=\"btn-container\" *ngIf=\"settings.addNewItemOnFilter\">\n                    <button class=\"c-btn btn-iceblue\" (click)=\"addFilterNewItem()\">{{settings.addNewButtonText}}</button>\n                </div>\n            </div>\n\n            <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <li *ngFor=\"let item of data; let i = index;\" (click)=\"onItemClick(item,i,$event)\"\n                        class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        aria-labelledby=\"option\"/>\n                        <label>{{item[settings.labelKey]}}</label>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading -->\n            <div *ngIf=\"!settings.groupBy && settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                    <li *ngFor=\"let item of scroll.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\"\n                        [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label>{{item[settings.labelKey]}}</label>\n                    </li>\n                </ul>\n            </div>\n            <!-- custom template -->\n            <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <li *ngFor=\"let item of data; let i = index;\" (click)=\"onItemClick(item,i,$event)\"\n                        class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label></label>\n                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading and custom template -->\n            <div *ngIf=\"!settings.groupBy && settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" class=\"lazyContainer\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\n                    <li *ngFor=\"let item of scroll2.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\"\n                        [ngClass]=\"{'selected-item': isSelected(item) == true }\">\n                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                        />\n                        <label></label>\n                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                    </li>\n                </ul>\n            </div>\n            <!-- lazy loading, group By and custom template -->\n            <div *ngIf=\"settings.groupBy && settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                    (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                    <span *ngFor=\"let item of scroll3.viewPortItems; let i = index;\">\n                        <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label></label>\n                            <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                        </li>\n                        <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label></label>\n                            <c-templateRenderer [data]=\"itemTempl\" [item]=\"item\"></c-templateRenderer>\n                        </li>\n                    </span>\n                </ul>\n            </div>\n            <!-- group By and custom template -->\n            <div *ngIf=\"settings.groupBy && !settings.lazyLoading && itemTempl != undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <span *ngFor=\"let item of groupedData; let i = index;\">\n                        <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label>{{item[settings.labelKey]}}</label>\n                            <ul class=\"lazyContainer\">\n                                <span *ngFor=\"let val of item.list ; let j = index;\">\n                                    <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\n                                        class=\"pure-checkbox\">\n                                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled\"\n                                        />\n                                        <label></label>\n                                        <c-templateRenderer [data]=\"itemTempl\" [item]=\"val\"></c-templateRenderer>\n                                    </li>\n                                </span>\n                            </ul>\n\n                        </li>\n                    </span>\n                </ul>\n            </div>\n            <!-- lazy loading, group By -->\n            <div *ngIf=\"settings.groupBy && settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <virtual-scroller [items]=\"groupedData\" (vsUpdate)=\"viewPortItems = $event\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\n                    <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\n                        (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\n                        <span *ngFor=\"let item of scroll4.viewPortItems; let i = index;\">\n                            <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }\"\n                                class=\"pure-checkbox\">\n                                <input *ngIf=\"settings.showCheckbox && !item.grpTitle && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\"\n                                    [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                                />\n                                <label>{{item[settings.labelKey]}}</label>\n                            </li>\n                            <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) == true }\"\n                                class=\"pure-checkbox\">\n                                <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                                />\n                                <label>{{item[settings.labelKey]}}</label>\n                            </li>\n                        </span>\n                    </ul>\n                </virtual-scroller>\n            </div>\n            <!-- group By -->\n            <div *ngIf=\"settings.groupBy && !settings.lazyLoading && itemTempl == undefined\" [style.maxHeight]=\"settings.maxHeight+'px'\"\n                style=\"overflow: auto;\">\n                <ul class=\"lazyContainer\">\n                    <span *ngFor=\"let item of groupedData ; let i = index;\">\n                        <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\n                            class=\"pure-checkbox\">\n                            <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item.disabled\"\n                            />\n                            <label>{{item[settings.labelKey]}}</label>\n                            <ul class=\"lazyContainer\">\n                                <span *ngFor=\"let val of item.list ; let j = index;\">\n                                    <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\n                                        class=\"pure-checkbox\">\n                                        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val.disabled\"\n                                        />\n                                        <label>{{val[settings.labelKey]}}</label>\n                                    </li>\n                                </span>\n                            </ul>\n                        </li>\n                    </span>\n                    <!-- <span *ngFor=\"let item of groupedData ; let i = index;\">\n                    <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                <li *ngIf=\"item.grpTitle && !settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                 <li  (click)=\"selectGroup(item)\" *ngIf=\"item.grpTitle && settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\n                    <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\n                    />\n                    <label>{{item[settings.labelKey]}}</label>\n                </li>\n                </span> -->\n                </ul>\n            </div>\n            <h5 class=\"list-message\" *ngIf=\"data?.length == 0\">{{settings.noDataLabel}}</h5>\n        </div>\n    </div>\n</div>", styles: ["virtual-scroll{display:block;width:100%}.cuppa-dropdown{position:relative}.c-btn{display:inline-block;border-width:1px;line-height:1.25;border-radius:3px;font-size:.85rem;padding:5px 10px;cursor:pointer;align-items:center;min-height:38px}.c-btn.disabled{background:#ccc}.selected-list .c-list{float:left;padding:0;margin:0;width:calc(100% - 20px)}.selected-list .c-list .c-token{list-style:none;padding:4px 22px 4px 8px;border-radius:2px;margin-right:4px;margin-top:2px;float:left;position:relative}.selected-list .c-list .c-token .c-label{display:block;float:left}.selected-list .c-list .c-token .c-remove{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:8px}.selected-list .c-list .c-token .c-remove svg{fill:#fff}.selected-list .fa-angle-down,.selected-list .fa-angle-up{font-size:15pt;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.selected-list .c-angle-down,.selected-list .c-angle-up{width:12px;height:12px;position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.selected-list .c-angle-down svg,.selected-list .c-angle-up svg{fill:#333}.selected-list .countplaceholder{position:absolute;right:45px;top:50%;transform:translateY(-50%)}.selected-list .c-btn{width:100%;padding:5px 10px;cursor:pointer;display:flex;position:relative}.selected-list .c-btn .c-icon{position:absolute;right:5px;top:50%;transform:translateY(-50%)}.dropdown-list.tagToBody{position:fixed}.dropdown-list{position:absolute;padding-top:14px;width:100%;z-index:99999}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list ul li{padding:10px;cursor:pointer;text-align:left}.dropdown-list ul li:first-child{padding-top:10px}.dropdown-list ul li:last-child{padding-bottom:10px}.dropdown-list ::-webkit-scrollbar{width:8px}.dropdown-list ::-webkit-scrollbar-thumb{background:#cccccc;border-radius:5px}.dropdown-list ::-webkit-scrollbar-track{background:#f2f2f2}.arrow-up,.arrow-down{width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:15px solid #fff;margin-left:15px;position:absolute;top:0}.arrow-down{bottom:-14px;top:unset;transform:rotate(180deg)}.arrow-2{border-bottom:15px solid #ccc;top:-1px}.arrow-down.arrow-2{top:unset;bottom:-16px}.list-area{border:1px solid #ccc;border-radius:3px;background:#fff;margin:0}.select-all{padding:10px;border-bottom:1px solid #ccc;text-align:left}.list-filter{border-bottom:1px solid #ccc;position:relative;padding-left:35px;height:35px}.list-filter input{border:0px;width:100%;height:100%;padding:0}.list-filter input:focus{outline:none}.list-filter .c-search{position:absolute;top:4px;left:10px;width:15px;height:15px}.list-filter .c-search svg{fill:#888}.list-filter .c-clear{position:absolute;top:4px;right:10px;width:15px;height:15px}.list-filter .c-clear svg{fill:#888}.pure-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.pure-checkbox input[type=checkbox]:focus+label:before,.pure-checkbox input[type=checkbox]:hover+label:before{background-color:none}.pure-checkbox input[type=checkbox]:active+label:before{transition-duration:0s}.pure-checkbox input[type=checkbox]:disabled+label{color:#ccc}.pure-checkbox input[type=checkbox]+label{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0;font-weight:300}.pure-checkbox input[type=checkbox]+label:before{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;text-align:center;transition:all .4s ease;border-radius:3px}.pure-checkbox input[type=checkbox]+label:after{box-sizing:content-box;content:\"\";position:absolute;top:50%;left:0;width:15px;height:15px;margin-top:-9px;transform:scale(0);transform-origin:50%;transition:transform .2s ease-out}.pure-checkbox input[type=checkbox]:disabled+label:before{border-color:#ccc}.pure-checkbox input[type=checkbox]:disabled:focus+label:before .pure-checkbox input[type=checkbox]:disabled:hover+label:before{background-color:inherit}.pure-checkbox input[type=checkbox]:disabled:checked+label:before{background-color:#ccc}.pure-checkbox input[type=checkbox]+label:after{background-color:transparent;top:50%;left:3px;width:9px;height:4px;margin-top:-5px;border-style:solid;border-width:0 0 2px 2px;border-image:none;transform:rotate(-45deg) scale(0)}.pure-checkbox input[type=checkbox]:checked+label:after{content:\"\";transform:rotate(-45deg) scale(1);transition:transform .2s ease-out}.pure-checkbox input[type=radio]:checked+label:before{background-color:#fff}.pure-checkbox input[type=radio]:checked+label:after{transform:scale(1)}.pure-checkbox input[type=radio]+label:before{border-radius:50%}.pure-checkbox input[type=checkbox]:checked+label:after{transform:rotate(-45deg) scale(1)}.list-message{text-align:center;margin:0;padding:15px 0;font-size:initial}.list-grp{padding:0 15px!important}.list-grp h4{text-transform:capitalize;margin:15px 0 0;font-size:14px;font-weight:700}.list-grp>li{padding-left:15px!important}.grp-item{padding-left:30px!important}.grp-title{padding-bottom:0!important}.grp-title label{margin-bottom:0!important;font-weight:800;text-transform:capitalize}.grp-title:hover{background:none!important}.loading-icon{width:20px;position:absolute;right:10px;top:23px;z-index:1}.nodata-label{width:100%;text-align:center;padding:10px 0 0}.btn-container{text-align:center;padding:5px}.clear-all{width:8px;position:absolute;top:50%;right:30px;transform:translateY(-50%)}\n"] }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ListFilterPipe }]; }, { data: [{
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
        }] }); })();
export class AngularMultiSelectModule {
}
AngularMultiSelectModule.ɵfac = function AngularMultiSelectModule_Factory(t) { return new (t || AngularMultiSelectModule)(); };
AngularMultiSelectModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AngularMultiSelectModule });
AngularMultiSelectModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [DataService, ListFilterPipe], imports: [CommonModule, FormsModule, VirtualScrollerModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularMultiSelectModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, VirtualScrollerModule],
                declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
                exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon],
                providers: [DataService, ListFilterPipe]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AngularMultiSelectModule, { declarations: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon], imports: [CommonModule, FormsModule, VirtualScrollerModule], exports: [AngularMultiSelect, ClickOutsideDirective, ScrollDirective, styleDirective, ListFilterPipe, Item, TemplateRenderer, Badge, Search, setPosition, CIcon] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItbXVsdGlzZWxlY3QtZHJvcGRvd24tbGliL3NyYy9saWIvbXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItbXVsdGlzZWxlY3QtZHJvcGRvd24tbGliL3NyYy9saWIvbXVsdGlzZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBRVosUUFBUSxFQUtSLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUF3QixhQUFhLEVBQWlDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFD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LEVBQUUsS0FBSyxDQUFDO2dCQUNySyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDO2dCQUNoSyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDO2FBQzNDOzt3RkFDWSx3QkFBd0IsbUJBMzVCeEIsa0JBQWtCLEVBdTVCUSxxQkFBcUIsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxhQUQxSixZQUFZLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixhQXQ1QmpELGtCQUFrQixFQXc1QkcscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIE5nTW9kdWxlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ29udGVudENoaWxkLFxuICBWaWV3Q2hpbGQsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE15RXhjZXB0aW9uIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5pbXBvcnQgeyBEcm9wZG93blNldHRpbmdzIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLCBTY3JvbGxEaXJlY3RpdmUsIHN0eWxlRGlyZWN0aXZlLCBzZXRQb3NpdGlvbiB9IGZyb20gJy4vY2xpY2tPdXRzaWRlJztcbmltcG9ydCB7IExpc3RGaWx0ZXJQaXBlIH0gZnJvbSAnLi9saXN0LWZpbHRlcic7XG5pbXBvcnQgeyBJdGVtLCBCYWRnZSwgU2VhcmNoLCBUZW1wbGF0ZVJlbmRlcmVyLCBDSWNvbiB9IGZyb20gJy4vbWVudS1pdGVtJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyTW9kdWxlLCBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IERST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBbmd1bGFyTXVsdGlTZWxlY3QpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuZXhwb3J0IGNvbnN0IERST1BET1dOX0NPTlRST0xfVkFMSURBVElPTjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQW5ndWxhck11bHRpU2VsZWN0KSxcbiAgICBtdWx0aTogdHJ1ZSxcbn1cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FuZ3VsYXIyLW11bHRpc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbXVsdGlzZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHsgJ1tjbGFzc10nOiAnZGVmYXVsdFNldHRpbmdzLmNsYXNzZXMnIH0sXG4gICAgc3R5bGVVcmxzOiBbJy4vbXVsdGlzZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLCBEUk9QRE9XTl9DT05UUk9MX1ZBTElEQVRJT05dLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuXG5leHBvcnQgY2xhc3MgQW5ndWxhck11bHRpU2VsZWN0IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBWYWxpZGF0b3IsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIGRhdGE6IEFycmF5PGFueT47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldHRpbmdzOiBEcm9wZG93blNldHRpbmdzO1xuXG4gICAgQElucHV0KClcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25TZWxlY3QnKVxuICAgIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgnb25EZVNlbGVjdCcpXG4gICAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcbiAgICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gICAgQE91dHB1dCgnb25EZVNlbGVjdEFsbCcpXG4gICAgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gICAgQE91dHB1dCgnb25PcGVuJylcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCdvbkNsb3NlJylcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgnb25TY3JvbGxUb0VuZCcpXG4gICAgb25TY3JvbGxUb0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoJ29uRmlsdGVyU2VsZWN0QWxsJylcbiAgICBvbkZpbHRlclNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gICAgQE91dHB1dCgnb25GaWx0ZXJEZVNlbGVjdEFsbCcpXG4gICAgb25GaWx0ZXJEZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gICAgQE91dHB1dCgnb25BZGRGaWx0ZXJOZXdJdGVtJylcbiAgICBvbkFkZEZpbHRlck5ld0l0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCdvbkdyb3VwU2VsZWN0JylcbiAgICBvbkdyb3VwU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgnb25Hcm91cERlU2VsZWN0JylcbiAgICBvbkdyb3VwRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKEl0ZW0sIHsgc3RhdGljOiBmYWxzZSB9KSBpdGVtVGVtcGw6IEl0ZW07XG4gICAgQENvbnRlbnRDaGlsZChCYWRnZSwgeyBzdGF0aWM6IGZhbHNlIH0pIGJhZGdlVGVtcGw6IEJhZGdlO1xuICAgIEBDb250ZW50Q2hpbGQoU2VhcmNoLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoVGVtcGw6IFNlYXJjaDtcblxuXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0ZWRMaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlbGVjdGVkTGlzdEVsZW06IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZHJvcGRvd25MaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGRyb3Bkb3duTGlzdEVsZW06IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY3VwcGFEcm9wZG93bicsIHsgc3RhdGljOiBmYWxzZSB9KSBjdXBwYURyb3Bkb3duOiBFbGVtZW50UmVmO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5dXAuZXNjYXBlJywgWyckZXZlbnQnXSlcbiAgICBvbkVzY2FwZURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZXNjYXBlVG9DbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSlcbiAgICBvblNjcm9sbChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmIHRoaXMuc2V0dGluZ3MudGFnVG9Cb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIC8qICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmN1cHBhRHJvcGRvd24ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2V0dGluZ3MuYXV0b1Bvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duVG9wID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgZWxlbS5jbGllbnRIZWlnaHQgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkxlZnQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7ICovXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJ2aXJ0dWFsZGF0YTogYW55ID0gW107XG4gICAgc2VhcmNoVGVybSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNTZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNGaWx0ZXJTZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBncm91cGVkRGF0YTogQXJyYXk8YW55PjtcbiAgICBmaWx0ZXI6IGFueTtcbiAgICBwdWJsaWMgY2h1bmtBcnJheTogYW55W107XG4gICAgcHVibGljIHNjcm9sbFRvcDogYW55O1xuICAgIHB1YmxpYyBjaHVua0luZGV4OiBhbnlbXSA9IFtdO1xuICAgIHB1YmxpYyBjYWNoZWRJdGVtczogYW55W10gPSBbXTtcbiAgICBwdWJsaWMgZ3JvdXBDYWNoZWRJdGVtczogYW55W10gPSBbXTtcbiAgICBwdWJsaWMgdG90YWxSb3dzOiBhbnk7XG4gICAgcHVibGljIGl0ZW1IZWlnaHQ6IGFueSA9IDQxLjY7XG4gICAgcHVibGljIHNjcmVlbkl0ZW1zTGVuOiBhbnk7XG4gICAgcHVibGljIGNhY2hlZEl0ZW1zTGVuOiBhbnk7XG4gICAgcHVibGljIHRvdGFsSGVpZ2h0OiBhbnk7XG4gICAgcHVibGljIHNjcm9sbGVyOiBhbnk7XG4gICAgcHVibGljIG1heEJ1ZmZlcjogYW55O1xuICAgIHB1YmxpYyBsYXN0U2Nyb2xsZWQ6IGFueTtcbiAgICBwdWJsaWMgbGFzdFJlcGFpbnRZOiBhbnk7XG4gICAgcHVibGljIHNlbGVjdGVkTGlzdEhlaWdodDogYW55O1xuICAgIHB1YmxpYyBmaWx0ZXJMZW5ndGg6IGFueSA9IDA7XG4gICAgcHVibGljIGluZmluaXRlRmlsdGVyTGVuZ3RoOiBhbnkgPSAwO1xuICAgIHB1YmxpYyB2aWV3UG9ydEl0ZW1zOiBhbnk7XG4gICAgcHVibGljIGl0ZW06IGFueTtcbiAgICBwdWJsaWMgZHJvcGRvd25MaXN0WU9mZnNldDogbnVtYmVyID0gMDtcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwdWJsaWMgZHJvcERvd25XaWR0aDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgZHJvcERvd25Ub3A6IGFueSA9ICcnO1xuICAgIHB1YmxpYyBkcm9wRG93bkJvdHRvbTogYW55ID0gJ3Vuc2V0JztcbiAgICBwdWJsaWMgZHJvcERvd25MZWZ0OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpZDogYW55ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xuICAgIHB1YmxpYyB2aXJ0dWFsZGF0YTogYW55O1xuICAgIGRlZmF1bHRTZXR0aW5nczogRHJvcGRvd25TZXR0aW5ncyA9IHtcbiAgICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgdGV4dDogJ1NlbGVjdCcsXG4gICAgICAgIGVuYWJsZUNoZWNrQWxsOiB0cnVlLFxuICAgICAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IEFsbCcsXG4gICAgICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgICAgIGZpbHRlclNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgYWxsIGZpbHRlcmVkIHJlc3VsdHMnLFxuICAgICAgICBmaWx0ZXJVblNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBhbGwgZmlsdGVyZWQgcmVzdWx0cycsXG4gICAgICAgIGVuYWJsZVNlYXJjaEZpbHRlcjogZmFsc2UsXG4gICAgICAgIHNlYXJjaEJ5OiBbXSxcbiAgICAgICAgbWF4SGVpZ2h0OiAzMDAsXG4gICAgICAgIGJhZGdlU2hvd0xpbWl0OiA5OTk5OTk5OTk5OTksXG4gICAgICAgIGNsYXNzZXM6ICcnLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXG4gICAgICAgIHNob3dDaGVja2JveDogdHJ1ZSxcbiAgICAgICAgbm9EYXRhTGFiZWw6ICdObyBEYXRhIEF2YWlsYWJsZScsXG4gICAgICAgIHNlYXJjaEF1dG9mb2N1czogdHJ1ZSxcbiAgICAgICAgbGF6eUxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBsYWJlbEtleTogJ2l0ZW1OYW1lJyxcbiAgICAgICAgcHJpbWFyeUtleTogJ2lkJyxcbiAgICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgICBhdXRvUG9zaXRpb246IHRydWUsXG4gICAgICAgIGVuYWJsZUZpbHRlclNlbGVjdEFsbDogdHJ1ZSxcbiAgICAgICAgc2VsZWN0R3JvdXA6IGZhbHNlLFxuICAgICAgICBhZGROZXdJdGVtT25GaWx0ZXI6IGZhbHNlLFxuICAgICAgICBhZGROZXdCdXR0b25UZXh0OiBcIkFkZFwiLFxuICAgICAgICBlc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICBjbGVhckFsbDogdHJ1ZSxcbiAgICAgICAgdGFnVG9Cb2R5OiB0cnVlXG4gICAgfVxuICAgIHJhbmRvbVNpemU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBwYXJzZUVycm9yOiBib29sZWFuO1xuICAgIHB1YmxpYyBmaWx0ZXJlZExpc3Q6IGFueSA9IFtdO1xuICAgIHZpcnR1YWxTY3Jvb2xsSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBWaWV3Q2hpbGQoVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgICBwcml2YXRlIHZpcnR1YWxTY3JvbGxlcjogVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50O1xuICAgIHB1YmxpYyBpc0Rpc2FibGVkSXRlbVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGZpbHRlclBpcGU6IExpc3RGaWx0ZXJQaXBlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSQuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgxMDAwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgICB0YXAodGVybSA9PiB0ZXJtKVxuICAgICAgICApLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbmZpbml0ZUxpc3QodmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdGhpcy5zZXR0aW5ncyk7XG5cbiAgICAgICAgdGhpcy5jYWNoZWRJdGVtcyA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmRhdGEpO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA9PSAndG9wJykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RIZWlnaHQgPSB7IHZhbDogMCB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SGVpZ2h0LnZhbCA9IHRoaXMuc2VsZWN0ZWRMaXN0RWxlbS5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVEcm9wZG93bkRpcmVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb29sbEluaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgb25LZXlVcChldnQ6IGFueSl7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSQubmV4dCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZ0LnRhcmdldCkudmFsdWUpO1xuICAgIH1cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLnRyYW5zZm9ybURhdGEodGhpcy5kYXRhLCB0aGlzLnNldHRpbmdzLmdyb3VwQnkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcyA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmdyb3VwZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5zZXR0aW5ncyAmJiAhY2hhbmdlcy5zZXR0aW5ncy5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzLmxvYWRpbmcpIHtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZyAmJiB0aGlzLnZpcnR1YWxTY3Jvb2xsSW5pdCAmJiBjaGFuZ2VzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT0gMCB8fCB0aGlzLmRhdGEubGVuZ3RoID09IDAgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgLy8gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYXp5Q29udGFpbmVyXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZExpc3RFbGVtLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ICYmIHRoaXMuc2V0dGluZ3MucG9zaXRpb24gPT0gJ3RvcCcgJiYgdGhpcy5zZWxlY3RlZExpc3RIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SGVpZ2h0LnZhbCA9IHRoaXMuc2VsZWN0ZWRMaXN0RWxlbS5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuY2FsY3VsYXRlRHJvcGRvd25EaXJlY3Rpb24oKTtcbiAgICB9XG4gICAgb25JdGVtQ2xpY2soaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBldnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvdW5kID0gdGhpcy5pc1NlbGVjdGVkKGl0ZW0pO1xuICAgICAgICBsZXQgbGltaXQgPSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XG4gICAgICAgICAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdEFsbCB8fCB0aGlzLmRhdGEubGVuZ3RoID4gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHcm91cEluZm8oaXRlbSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBVbnR5cGVkRm9ybUNvbnRyb2wpOiBhbnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSh0aGlzLmRhdGEsIHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcyA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmdyb3VwZWREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW3ZhbHVlWzBdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFt2YWx1ZVswXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE15RXhjZXB0aW9uKDQwNCwgeyBcIm1zZ1wiOiBcIlNpbmdsZSBTZWxlY3Rpb24gTW9kZSwgU2VsZWN0ZWQgSXRlbXMgY2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBpdGVtLlwiIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5ib2R5Lm1zZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxpbWl0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHZhbHVlLnNsaWNlKDAsIHRoaXMuc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID09PSB0aGlzLmRhdGEubGVuZ3RoICYmIHRoaXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLnRyYW5zZm9ybURhdGEodGhpcy5kYXRhLCB0aGlzLnNldHRpbmdzLmdyb3VwQnkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cGVkRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL0Zyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIC8vRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG4gICAgdHJhY2tCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldO1xuICAgIH1cbiAgICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKGNsaWNrZWRJdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyAmJiB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldID09PSBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIGFkZFNlbGVjdGVkKGl0ZW06IGFueSkge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cbiAgICByZW1vdmVTZWxlY3RlZChjbGlja2VkSXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyAmJiB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldID09PSBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuICAgIHRvZ2dsZURyb3Bkb3duKGV2dDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9ICF0aGlzLmlzQWN0aXZlO1xuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9vbGxJbml0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgcHVibGljIG9wZW5Ecm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVEcm9wZG93bkRpcmVjdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zZWFyY2hBdXRvZm9jdXMgJiYgdGhpcy5zZWFyY2hJbnB1dCAmJiB0aGlzLnNldHRpbmdzLmVuYWJsZVNlYXJjaEZpbHRlciAmJiAhdGhpcy5zZWFyY2hUZW1wbCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRydWUpO1xuICAgIH1cbiAgICBwdWJsaWMgY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQgJiYgdGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbHRlciA9IFwiXCI7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtJC5uZXh0KCcnKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgICBwdWJsaWMgY2xvc2VEcm9wZG93bk9uQ2xpY2tPdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCAmJiB0aGlzLnNldHRpbmdzLmxhenlMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlsdGVyID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSQubmV4dCgnJyk7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9nZ2xlU2VsZWN0QWxsKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdEFsbCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gIW9iai5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gIW9iai5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5kYXRhLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLmRhdGEuZmlsdGVyKChpbmRpdmlkdWFsRGF0YSkgPT4gIWluZGl2aWR1YWxEYXRhLmRpc2FibGVkKTtcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZURyb3Bkb3duRGlyZWN0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgZmlsdGVyR3JvdXBlZExpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlciA9PSBcIlwiIHx8IHRoaXMuZmlsdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBDYWNoZWRJdGVtcyk7XG4gICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLmdyb3VwZWREYXRhLmZpbHRlcihvYmogPT4ge1xuICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xuICAgICAgICAgICAgaWYgKG9ialt0aGlzLnNldHRpbmdzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGFyciA9IG9iai5saXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyID0gb2JqLmxpc3QuZmlsdGVyKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdFt0aGlzLnNldHRpbmdzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqLmxpc3QgPSBhcnI7XG4gICAgICAgICAgICBpZiAob2JqW3RoaXMuc2V0dGluZ3MubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnIuc29tZShjYXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2F0W3RoaXMuc2V0dGluZ3MubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvZ2dsZUZpbHRlclNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyU2VsZWN0QWxsKSB7XG4gICAgICAgICAgICBsZXQgYWRkZWQgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5saXN0LmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGVsKSAmJiAhZWwuaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZExpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbkZpbHRlclNlbGVjdEFsbC5lbWl0KGFkZGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5saXN0LmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdyb3VwSW5mbyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRMaXN0LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub25GaWx0ZXJEZVNlbGVjdEFsbC5lbWl0KHJlbW92ZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvZ2dsZUluZmluaXRlRmlsdGVyU2VsZWN0QWxsKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbCkge1xuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmlzSW5maW5pdGVGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclNlYXJjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xuICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmdyb3VwQ2FjaGVkSXRlbXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyID0gXCJcIjtcbiAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLm5leHQoJycpO1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmNhY2hlZEl0ZW1zO1xuICAgIH1cbiAgICBvbkZpbHRlckNoYW5nZShkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyID09IFwiXCIgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5jYWNoZWRJdGVtcy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjbnQgPSAwO1xuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykgJiYgdGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjbnQgPiAwICYmIHRoaXMuZmlsdGVyTGVuZ3RoID09IGNudCkge1xuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY250ID4gMCAmJiB0aGlzLmZpbHRlckxlbmd0aCAhPSBjbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBjbG9uZUFycmF5KGFycjogYW55KSB7XG4gICAgICAgIGxldCBpLCBjb3B5O1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFycikpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcnIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyAnQ2Fubm90IGNsb25lIGFycmF5IGNvbnRhaW5pbmcgYW4gb2JqZWN0ISc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZUdyb3VwSW5mbyhpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5ID0gdGhpcy5zZXR0aW5ncy5ncm91cEJ5O1xuICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKG9iajogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgY250ID0gMDtcbiAgICAgICAgICAgIGlmIChvYmouZ3JwVGl0bGUgJiYgKGl0ZW1ba2V5XSA9PSBvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iai5saXN0ICYmIChjbnQgPT09IG9iai5saXN0Lmxlbmd0aCkgJiYgKGl0ZW1ba2V5XSA9PSBvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLmxpc3QgJiYgKGNudCAhPSBvYmoubGlzdC5sZW5ndGgpICYmIChpdGVtW2tleV0gPT0gb2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xuICAgICAgICAgICAgaWYgKG9iai5ncnBUaXRsZSAmJiAoaXRlbVtrZXldID09IG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGlmIChvYmoubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBvYmoubGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqLmxpc3QgJiYgKGNudCA9PT0gb2JqLmxpc3QubGVuZ3RoKSAmJiAoaXRlbVtrZXldID09IG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvYmoubGlzdCAmJiAoY250ICE9IG9iai5saXN0Lmxlbmd0aCkgJiYgKGl0ZW1ba2V5XSA9PSBvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRyYW5zZm9ybURhdGEoYXJyOiBBcnJheTxhbnk+LCBmaWVsZDogYW55KTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRPYmo6IGFueSA9IGFyci5yZWR1Y2UoKHByZXY6IGFueSwgY3VyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJldltjdXJbZmllbGRdXSkge1xuICAgICAgICAgICAgICAgIHByZXZbY3VyW2ZpZWxkXV0gPSBbY3VyXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJldltjdXJbZmllbGRdXS5wdXNoKGN1cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBjb25zdCB0ZW1wQXJyOiBhbnkgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXBlZE9iaikubWFwKCh4OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkQ2hpbGRyZW5zID0gW107XG4gICAgICAgICAgICBvYmpbXCJncnBUaXRsZVwiXSA9IHRydWU7XG4gICAgICAgICAgICBvYmpbdGhpcy5zZXR0aW5ncy5sYWJlbEtleV0gPSB4O1xuICAgICAgICAgICAgb2JqW3RoaXMuc2V0dGluZ3MuZ3JvdXBCeV0gPSB4O1xuICAgICAgICAgICAgb2JqWydzZWxlY3RlZCddID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpbJ2xpc3QnXSA9IFtdO1xuICAgICAgICAgICAgbGV0IGNudCA9IDA7XG4gICAgICAgICAgICBncm91cGVkT2JqW3hdLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1bJ2xpc3QnXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaXNhYmxlZEl0ZW1QcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRDaGlsZHJlbnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqLmxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNudCA9PSBvYmoubGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgZ3JvdXAgaXRlbSdzIGFsbCBjaGlsZHJlbnMgYXJlIGRpc2FibGVkIG9yIG5vdFxuICAgICAgICAgICAgb2JqWydkaXNhYmxlZCddID0gZGlzYWJsZWRDaGlsZHJlbnMubGVuZ3RoID09PSBncm91cGVkT2JqW3hdLmxlbmd0aDtcbiAgICAgICAgICAgIHRlbXBBcnIucHVzaChvYmopO1xuICAgICAgICAgICAgLy8gb2JqLmxpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgdGVtcEFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGVtcEFycjtcbiAgICB9XG4gICAgcHVibGljIGZpbHRlckluZmluaXRlTGlzdChldnQ6IGFueSkge1xuICAgICAgICBsZXQgZmlsdGVyZWRFbGVtczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5ncm91cENhY2hlZEl0ZW1zLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmNhY2hlZEl0ZW1zLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gdGhpcy5jYWNoZWRJdGVtcy5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChldnQgIT0gbnVsbCB8fCBldnQgIT0gJycpICYmICF0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNlYXJjaEJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuc2V0dGluZ3Muc2VhcmNoQnkubGVuZ3RoOyB0KyspIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhLmZpbHRlcigoZWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsW3RoaXMuc2V0dGluZ3Muc2VhcmNoQnlbdF0udG9TdHJpbmcoKV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZXZ0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkRWxlbXMucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGVsOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsW3Byb3BdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGV2dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gZmlsdGVyZWRFbGVtcztcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVGaWx0ZXJMZW5ndGggPSB0aGlzLnZpcnR1YWxkYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZ0LnRvU3RyaW5nKCkgIT0gJycgJiYgdGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZpbHRlcihmdW5jdGlvbiAoZWw6IGFueSkge1xuICAgICAgICAgICAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnZ3JwVGl0bGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsW3Byb3BdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGV2dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gZmlsdGVyZWRFbGVtcztcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVGaWx0ZXJMZW5ndGggPSB0aGlzLmdyb3VwZWREYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldnQudG9TdHJpbmcoKSA9PSAnJyAmJiB0aGlzLmNhY2hlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSB0aGlzLmNhY2hlZEl0ZW1zO1xuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZUZpbHRlckxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy52aXJ0dWFsU2Nyb2xsZXIpe1xuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsZXIucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0SW5maW5pdGVTZWFyY2goKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gXCJcIjtcbiAgICAgICAgdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuY2FjaGVkSXRlbXM7XG4gICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLmdyb3VwQ2FjaGVkSXRlbXM7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSQubmV4dCgnJyk7XG4gICAgICAgIHRoaXMuaW5maW5pdGVGaWx0ZXJMZW5ndGggPSAwO1xuICAgIH1cbiAgICBvblNjcm9sbEVuZChlOiBhbnkpIHtcbiAgICAgICAgaWYgKGUuZW5kSW5kZXggPT09IHRoaXMuZGF0YS5sZW5ndGggLSAxIHx8IGUuc3RhcnRJbmRleCA9PT0gMCkge1xuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblNjcm9sbFRvRW5kLmVtaXQoZSk7XG5cbiAgICB9XG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHNlbGVjdEdyb3VwKGl0ZW06IGFueSkge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpdGVtLmxpc3QuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKG9iaik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5vbkdyb3VwRGVTZWxlY3QuZW1pdChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGl0ZW0ubGlzdC5mb3JFYWNoKChvYmo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChvYmopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uR3JvdXBTZWxlY3QuZW1pdChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIGFkZEZpbHRlck5ld0l0ZW0oKSB7XG4gICAgICAgIHRoaXMub25BZGRGaWx0ZXJOZXdJdGVtLmVtaXQodGhpcy5maWx0ZXIpO1xuICAgICAgICB0aGlzLmZpbHRlclBpcGUudHJhbnNmb3JtKHRoaXMuZGF0YSwgdGhpcy5maWx0ZXIsIHRoaXMuc2V0dGluZ3Muc2VhcmNoQnkpO1xuICAgIH1cbiAgICBjYWxjdWxhdGVEcm9wZG93bkRpcmVjdGlvbigpIHtcbiAgICAgICAgbGV0IHNob3VsZE9wZW5Ub3dhcmRzVG9wID0gdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA9PSAndG9wJztcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuY3VwcGFEcm9wZG93bi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBkcm9wZG93bldpZHRoID0gZWxlbS5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5kcm9wRG93bldpZHRoID0gZHJvcGRvd25XaWR0aDtcbiAgICAgICAgdGhpcy5kcm9wRG93bkxlZnQgPSB0aGlzLnNldHRpbmdzLnRhZ1RvQm9keSA/IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCA6ICd1bnNldCc7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnBvc2l0aW9uID09ICd0b3AnICYmICF0aGlzLnNldHRpbmdzLmF1dG9Qb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuVG93YXJkc1RvcCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnBvc2l0aW9uID09ICdib3R0b20nICYmICF0aGlzLnNldHRpbmdzLmF1dG9Qb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuVG93YXJkc1RvcChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBkcm9wZG93bkhlaWdodCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLm1heEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTGlzdEJvdW5kcyA9IHRoaXMuc2VsZWN0ZWRMaXN0RWxlbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBzcGFjZU9uVG9wOiBudW1iZXIgPSBzZWxlY3RlZExpc3RCb3VuZHMudG9wO1xuICAgICAgICAgICAgY29uc3Qgc3BhY2VPbkJvdHRvbTogbnVtYmVyID0gdmlld3BvcnRIZWlnaHQgLSBzZWxlY3RlZExpc3RCb3VuZHMudG9wO1xuICAgICAgICAgICAgaWYgKHNwYWNlT25Cb3R0b20gPCBzcGFjZU9uVG9wICYmIGRyb3Bkb3duSGVpZ2h0IDwgc3BhY2VPblRvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblRvd2FyZHNUb3AodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ub3dhcmRzVG9wKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEtlZXAgcHJlZmVyZW5jZSBpZiB0aGVyZSBpcyBub3QgZW5vdWdoIHNwYWNlIG9uIGVpdGhlciB0aGUgdG9wIG9yIGJvdHRvbVxuICAgICAgICAgICAgLyogXHRcdFx0aWYgKHNwYWNlT25Ub3AgfHwgc3BhY2VPbkJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRPcGVuVG93YXJkc1RvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRPcGVuVG93YXJkc1RvcCA9IHNwYWNlT25Ub3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkT3BlblRvd2FyZHNUb3AgPSAhc3BhY2VPbkJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvcGVuVG93YXJkc1RvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5jdXBwYURyb3Bkb3duLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0aGlzLnNlbGVjdGVkTGlzdEVsZW0ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25MaXN0WU9mZnNldCA9IDE1IC0gdGhpcy5zZWxlY3RlZExpc3RFbGVtLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgaWYodGhpcy5zZXR0aW5ncy50YWdUb0JvZHkpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25Ub3AgPSAoZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55IC0gdGhpcy5zZWxlY3RlZExpc3RFbGVtLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KjIgLSAxNSAtIHRoaXMuZGVmYXVsdFNldHRpbmdzLm1heEhlaWdodCkrJ3B4JztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkJvdHRvbSA9ICh0aGlzLnNlbGVjdGVkTGlzdEVsZW0ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgKyAxNSApKydweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnBvc2l0aW9uID0gJ3RvcCdcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYodGhpcy5zZXR0aW5ncy50YWdUb0JvZHkpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25Ub3AgPSAoZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgZWxlbS5jbGllbnRIZWlnaHQgKyAxKSsncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93blRvcCA9ICd1bnNldCc7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bkJvdHRvbSA9ICd1bnNldCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duTGlzdFlPZmZzZXQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA9ICdib3R0b20nXG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclNlbGVjdGlvbihlPzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cbiAgICBmaWx0ZXJpdGVtcyhldnQ6IGFueSkge1xuICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZmlsdGVyUGlwZS50cmFuc2Zvcm0odGhpcy5jYWNoZWRJdGVtcywgZXZ0LnRhcmdldC52YWx1ZSwgdGhpcy5zZXR0aW5ncy5zZWFyY2hCeSk7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmVkTGlzdCkge1xuICAgICAgICAgICAgbGV0IGxlbiA9IDA7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdC5mb3JFYWNoKChvYmo6IGFueSwgaTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGlzYWJsZWRJdGVtUHJlc2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KCdncnBUaXRsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJMZW5ndGggPSBsZW47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZSh0aGlzLmZpbHRlcmVkTGlzdCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBWaXJ0dWFsU2Nyb2xsZXJNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0FuZ3VsYXJNdWx0aVNlbGVjdCwgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLCBTY3JvbGxEaXJlY3RpdmUsIHN0eWxlRGlyZWN0aXZlLCBMaXN0RmlsdGVyUGlwZSwgSXRlbSwgVGVtcGxhdGVSZW5kZXJlciwgQmFkZ2UsIFNlYXJjaCwgc2V0UG9zaXRpb24sIENJY29uXSxcbiAgICBleHBvcnRzOiBbQW5ndWxhck11bHRpU2VsZWN0LCBDbGlja091dHNpZGVEaXJlY3RpdmUsIFNjcm9sbERpcmVjdGl2ZSwgc3R5bGVEaXJlY3RpdmUsIExpc3RGaWx0ZXJQaXBlLCBJdGVtLCBUZW1wbGF0ZVJlbmRlcmVyLCBCYWRnZSwgU2VhcmNoLCBzZXRQb3NpdGlvbiwgQ0ljb25dLFxuICAgIHByb3ZpZGVyczogW0RhdGFTZXJ2aWNlLCBMaXN0RmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhck11bHRpU2VsZWN0TW9kdWxlIHsgfVxuIiwiPGRpdiBjbGFzcz1cImN1cHBhLWRyb3Bkb3duXCIgKGNsaWNrT3V0c2lkZSk9XCJjbG9zZURyb3Bkb3duT25DbGlja091dCgpXCIgI2N1cHBhRHJvcGRvd24+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWxpc3RcIiAjc2VsZWN0ZWRMaXN0PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYy1idG5cIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBzZXR0aW5ncy5kaXNhYmxlZH1cIiBbYXR0ci50YWJpbmRleF09XCIwXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWRJdGVtcz8ubGVuZ3RoID09IDBcIj57e3NldHRpbmdzLnRleHR9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmICFiYWRnZVRlbXBsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2VsZWN0ZWRJdGVtczt0cmFja0J5OiB0cmFja0J5Rm4uYmluZCh0aGlzKTtsZXQgayA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIHt7aXRlbVtzZXR0aW5ncy5sYWJlbEtleV19fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1saXN0XCIgKm5nSWY9XCJzZWxlY3RlZEl0ZW1zPy5sZW5ndGggPiAwICYmIHNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBiYWRnZVRlbXBsIFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjLXRva2VuXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2VsZWN0ZWRJdGVtczt0cmFja0J5OiB0cmFja0J5Rm4uYmluZCh0aGlzKTtsZXQgayA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWJhZGdlVGVtcGxcIiBjbGFzcz1cImMtbGFiZWxcIj57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJiYWRnZVRlbXBsXCIgY2xhc3M9XCJjLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Yy10ZW1wbGF0ZVJlbmRlcmVyIFtkYXRhXT1cImJhZGdlVGVtcGxcIiBbaXRlbV09XCJpdGVtXCI+PC9jLXRlbXBsYXRlUmVuZGVyZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLXJlbW92ZVwiIChjbGljayk9XCJvbkl0ZW1DbGljayhpdGVtLGssJGV2ZW50KTskZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjLWljb24gW25hbWVdPVwiJ3JlbW92ZSdcIj48L2MtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImMtbGlzdFwiICpuZ0lmPVwic2VsZWN0ZWRJdGVtcz8ubGVuZ3RoID4gMCAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImMtdG9rZW5cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbi5iaW5kKHRoaXMpO2xldCBrID0gaW5kZXhcIiBbaGlkZGVuXT1cImsgPiBzZXR0aW5ncy5iYWRnZVNob3dMaW1pdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWJhZGdlVGVtcGxcIiBjbGFzcz1cImMtbGFiZWxcIj57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYmFkZ2VUZW1wbFwiIGNsYXNzPVwiYy1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGMtdGVtcGxhdGVSZW5kZXJlciBbZGF0YV09XCJiYWRnZVRlbXBsXCIgW2l0ZW1dPVwiaXRlbVwiPjwvYy10ZW1wbGF0ZVJlbmRlcmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1yZW1vdmVcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soaXRlbSxrLCRldmVudCk7JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Yy1pY29uIFtuYW1lXT1cIidyZW1vdmUnXCI+PC9jLWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb3VudHBsYWNlaG9sZGVyXCIgKm5nSWY9XCJzZWxlY3RlZEl0ZW1zPy5sZW5ndGggPiBzZXR0aW5ncy5iYWRnZVNob3dMaW1pdFwiPit7e3NlbGVjdGVkSXRlbXM/Lmxlbmd0aCAtIHNldHRpbmdzLmJhZGdlU2hvd0xpbWl0IH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLXJlbW92ZSBjbGVhci1hbGxcIiAqbmdJZj1cInNldHRpbmdzLmNsZWFyQWxsICYmIHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCA+IDAgJiYgIXNldHRpbmdzLmRpc2FibGVkXCIgKGNsaWNrKT1cImNsZWFyU2VsZWN0aW9uKCRldmVudCk7JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgPGMtaWNvbiBbbmFtZV09XCIncmVtb3ZlJ1wiPjwvYy1pY29uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNBY3RpdmVcIiBjbGFzcz1cImMtYW5nbGUtZG93blwiPlxuICAgICAgICAgICAgICAgIDxjLWljb24gW25hbWVdPVwiJ2FuZ2xlLWRvd24nXCI+PC9jLWljb24+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzQWN0aXZlXCIgY2xhc3M9XCJjLWFuZ2xlLXVwXCI+XG4gICAgICAgICAgICAgICAgPGMtaWNvbiBbbmFtZV09XCInYW5nbGUtdXAnXCI+PC9jLWljb24+XG5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAjZHJvcGRvd25MaXN0IGNsYXNzPVwiZHJvcGRvd24tbGlzdCBhbmltYXRlZCBmYWRlSW5cIiBcbiAgICBbbmdDbGFzc109XCJ7J3RhZ1RvQm9keSc6IHNldHRpbmdzLnRhZ1RvQm9keX1cIlxuICAgIFtzdHlsZS53aWR0aC5weF09XCJkcm9wRG93bldpZHRoXCIgXG4gICAgW3N0eWxlLnRvcF09XCJkcm9wRG93blRvcFwiIFxuICAgIFtzdHlsZS5ib3R0b21dPVwiZHJvcERvd25Cb3R0b21cIlxuICAgIFtzdHlsZS5sZWZ0LnB4XT1cImRyb3BEb3duTGVmdFwiIFxuICAgICAgICBbaGlkZGVuXT1cIiFpc0FjdGl2ZVwiPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnYXJyb3ctdXAnOiBzZXR0aW5ncy5wb3NpdGlvbiA9PSAnYm90dG9tJywgJ2Fycm93LWRvd24nOiBzZXR0aW5ncy5wb3NpdGlvbiA9PSAndG9wJ31cIiBjbGFzcz1cImFycm93LTJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J2Fycm93LXVwJzogc2V0dGluZ3MucG9zaXRpb24gPT0gJ2JvdHRvbScsICdhcnJvdy1kb3duJzogc2V0dGluZ3MucG9zaXRpb24gPT0gJ3RvcCd9XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWFyZWFcIiBbbmdDbGFzc109XCJ7J3NpbmdsZS1zZWxlY3QtbW9kZSc6IHNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiB9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVyZS1jaGVja2JveCBzZWxlY3QtYWxsXCIgKm5nSWY9XCJzZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmICFzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiAmJiBkYXRhPy5sZW5ndGggPiAwICYmICFpc0Rpc2FibGVkSXRlbVByZXNlbnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZXR0aW5ncy5zaG93Q2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdEFsbFwiIFtkaXNhYmxlZF09XCJzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGhcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJpZFwiIChjaGFuZ2UpPVwidG9nZ2xlU2VsZWN0QWxsKCRldmVudClcIi8+XG4gICAgICAgICAgICAgICAgPGxhYmVsIFtmb3JdPVwiaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2hpZGRlbl09XCJpc1NlbGVjdEFsbFwiPnt7c2V0dGluZ3Muc2VsZWN0QWxsVGV4dH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaGlkZGVuXT1cIiFpc1NlbGVjdEFsbFwiPnt7c2V0dGluZ3MudW5TZWxlY3RBbGxUZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImxvYWRpbmctaWNvblwiICpuZ0lmPVwibG9hZGluZ1wiIHNyYz1cImFzc2V0cy9pbWcvbG9hZGluZy5naWZcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtZmlsdGVyXCIgKm5nSWY9XCJzZXR0aW5ncy5lbmFibGVTZWFyY2hGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtc2VhcmNoXCIgaWQ9XCJzZWFyY2hJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjLWljb24gW25hbWVdPVwiJ3NlYXJjaCdcIj48L2MtaWNvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2V0dGluZ3MubGF6eUxvYWRpbmdcIiBbaGlkZGVuXT1cImZpbHRlciA9PSB1bmRlZmluZWQgfHwgZmlsdGVyPy5sZW5ndGggPT0gMFwiIGNsYXNzPVwiYy1jbGVhclwiIChjbGljayk9XCJjbGVhclNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjLWljb24gW25hbWVdPVwiJ2NsZWFyJ1wiPjwvYy1pY29uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInNldHRpbmdzLmxhenlMb2FkaW5nXCIgW2hpZGRlbl09XCJmaWx0ZXIgPT0gdW5kZWZpbmVkIHx8IGZpbHRlcj8ubGVuZ3RoID09IDBcIiBjbGFzcz1cImMtY2xlYXJcIiAoY2xpY2spPVwicmVzZXRJbmZpbml0ZVNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjLWljb24gW25hbWVdPVwiJ2NsZWFyJ1wiPjwvYy1pY29uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiAqbmdJZj1cInNldHRpbmdzLmdyb3VwQnkgJiYgIXNldHRpbmdzLmxhenlMb2FkaW5nICYmICFzZWFyY2hUZW1wbFwiICNzZWFyY2hJbnB1dCB0eXBlPVwidGV4dFwiIFtwbGFjZWhvbGRlcl09XCJzZXR0aW5ncy5zZWFyY2hQbGFjZWhvbGRlclRleHRcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlclwiIChrZXl1cCk9XCJmaWx0ZXJHcm91cGVkTGlzdCgpXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VhcmNoSWNvblwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiAqbmdJZj1cIiFzZXR0aW5ncy5ncm91cEJ5ICYmICFzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiAhc2VhcmNoVGVtcGxcIiAjc2VhcmNoSW5wdXQgdHlwZT1cInRleHRcIiBbcGxhY2Vob2xkZXJdPVwic2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJcIiAoa2V5dXApPVwiZmlsdGVyaXRlbXMoJGV2ZW50KVwiIGFyaWEtbGFiZWxsZWRieT1cInNlYXJjaEljb25cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjLWlucHV0XCIgKm5nSWY9XCJzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiAhc2VhcmNoVGVtcGxcIiAjc2VhcmNoSW5wdXQgdHlwZT1cInRleHRcIiBbcGxhY2Vob2xkZXJdPVwic2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJcIiAoa2V5dXApPVwib25LZXlVcCgkZXZlbnQpXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VhcmNoSWNvblwiPlxuICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjLWlucHV0XCIgKm5nSWY9XCIhc2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgIXNlYXJjaFRlbXBsICYmIHNldHRpbmdzLmdyb3VwQnlcIiAjc2VhcmNoSW5wdXQgdHlwZT1cInRleHRcIiBbcGxhY2Vob2xkZXJdPVwic2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlclwiIChrZXl1cCk9XCJmaWx0ZXJHcm91cExpc3QoJGV2ZW50KVwiPi0tPlxuICAgICAgICAgICAgICAgIDxjLXRlbXBsYXRlUmVuZGVyZXIgKm5nSWY9XCJzZWFyY2hUZW1wbFwiIFtkYXRhXT1cInNlYXJjaFRlbXBsXCIgW2l0ZW1dPVwiaXRlbVwiPjwvYy10ZW1wbGF0ZVJlbmRlcmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyLXNlbGVjdC1hbGxcIiAqbmdJZj1cIiFzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiBzZXR0aW5ncy5lbmFibGVGaWx0ZXJTZWxlY3RBbGwgJiYgIWlzRGlzYWJsZWRJdGVtUHJlc2VudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdXJlLWNoZWNrYm94IHNlbGVjdC1hbGxcIiAqbmdJZj1cIiFzZXR0aW5ncy5ncm91cEJ5ICYmIGZpbHRlcj8ubGVuZ3RoID4gMCAmJiBmaWx0ZXJMZW5ndGggPiAwICAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uXCIgKGNsaWNrKT1cInRvZ2dsZUZpbHRlclNlbGVjdEFsbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc0ZpbHRlclNlbGVjdEFsbFwiIFtkaXNhYmxlZF09XCJzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGhcIiBhcmlhLWxhYmVsbGVkYnk9XCJvcHRpb25OYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIm9wdGlvblwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2hpZGRlbl09XCJpc0ZpbHRlclNlbGVjdEFsbFwiPnt7c2V0dGluZ3MuZmlsdGVyU2VsZWN0QWxsVGV4dH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2hpZGRlbl09XCIhaXNGaWx0ZXJTZWxlY3RBbGxcIj57e3NldHRpbmdzLmZpbHRlclVuU2VsZWN0QWxsVGV4dH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdXJlLWNoZWNrYm94IHNlbGVjdC1hbGxcIiAqbmdJZj1cInNldHRpbmdzLmdyb3VwQnkgJiYgZmlsdGVyPy5sZW5ndGggPiAwICYmIGdyb3VwZWREYXRhPy5sZW5ndGggPiAwICAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uXCIgKGNsaWNrKT1cInRvZ2dsZUZpbHRlclNlbGVjdEFsbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc0ZpbHRlclNlbGVjdEFsbCAmJiBmaWx0ZXI/Lmxlbmd0aCA+IDBcIiBbZGlzYWJsZWRdPVwic2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib3B0aW9uXCIvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaGlkZGVuXT1cImlzRmlsdGVyU2VsZWN0QWxsXCI+e3tzZXR0aW5ncy5maWx0ZXJTZWxlY3RBbGxUZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaGlkZGVuXT1cIiFpc0ZpbHRlclNlbGVjdEFsbFwiPnt7c2V0dGluZ3MuZmlsdGVyVW5TZWxlY3RBbGxUZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXItc2VsZWN0LWFsbFwiICpuZ0lmPVwic2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgc2V0dGluZ3MuZW5hYmxlRmlsdGVyU2VsZWN0QWxsICYmICFpc0Rpc2FibGVkSXRlbVByZXNlbnQgJiYgIXNldHRpbmdzLnNpbmdsZVNlbGVjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdXJlLWNoZWNrYm94IHNlbGVjdC1hbGxcIiAqbmdJZj1cImZpbHRlcj8ubGVuZ3RoID4gMCAmJiBpbmZpbml0ZUZpbHRlckxlbmd0aCA+IDBcIiAoY2xpY2spPVwidG9nZ2xlSW5maW5pdGVGaWx0ZXJTZWxlY3RBbGwoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbFwiIFtkaXNhYmxlZF09XCJzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJvcHRpb25cIi8+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtoaWRkZW5dPVwiaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbFwiPnt7c2V0dGluZ3MuZmlsdGVyU2VsZWN0QWxsVGV4dH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2hpZGRlbl09XCIhaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbFwiPnt7c2V0dGluZ3MuZmlsdGVyVW5TZWxlY3RBbGxUZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXItc2VsZWN0LWFsbFwiICpuZ0lmPVwiZmlsdGVyPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWNvbnRhaW5lclwiICpuZ0lmPVwic2V0dGluZ3MuYWRkTmV3SXRlbU9uRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjLWJ0biBidG4taWNlYmx1ZVwiIChjbGljayk9XCJhZGRGaWx0ZXJOZXdJdGVtKClcIj57e3NldHRpbmdzLmFkZE5ld0J1dHRvblRleHR9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2V0dGluZ3MuZ3JvdXBCeSAmJiAhc2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgaXRlbVRlbXBsID09IHVuZGVmaW5lZFwiIFtzdHlsZS5tYXhIZWlnaHRdPVwic2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwib3ZlcmZsb3c6IGF1dG87XCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGF6eUNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soaXRlbSxpLCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCIgW25nQ2xhc3NdPVwieydzZWxlY3RlZC1pdGVtJzogaXNTZWxlY3RlZChpdGVtKSA9PSB0cnVlIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiKHNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09IHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCAmJiAhaXNTZWxlY3RlZChpdGVtKSkgfHwgaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJvcHRpb25cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3tpdGVtW3NldHRpbmdzLmxhYmVsS2V5XX19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIGxhenkgbG9hZGluZyAtLT5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2V0dGluZ3MuZ3JvdXBCeSAmJiBzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiBpdGVtVGVtcGwgPT0gdW5kZWZpbmVkXCIgW3N0eWxlLm1heEhlaWdodF09XCJzZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJvdmVyZmxvdzogYXV0bztcIj5cbiAgICAgICAgICAgICAgICA8dWwgdmlydHVhbFNjcm9sbGVyICNzY3JvbGwgW2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzXT1cInJhbmRvbVNpemVcIiBbaXRlbXNdPVwidmlydHVhbGRhdGFcIiAodnNTdGFydCk9XCJvblNjcm9sbEVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKHZzRW5kKT1cIm9uU2Nyb2xsRW5kKCRldmVudClcIiBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNldHRpbmdzLm1heEhlaWdodCsncHgnfVwiIGNsYXNzPVwibGF6eUNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2Nyb2xsLnZpZXdQb3J0SXRlbXM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGl0ZW0saSwkZXZlbnQpXCIgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQtaXRlbSc6IGlzU2VsZWN0ZWQoaXRlbSkgPT0gdHJ1ZSB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZXR0aW5ncy5zaG93Q2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCIgW2Rpc2FibGVkXT1cIihzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGggJiYgIWlzU2VsZWN0ZWQoaXRlbSkpIHx8IGl0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gY3VzdG9tIHRlbXBsYXRlIC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzZXR0aW5ncy5ncm91cEJ5ICYmICFzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiBpdGVtVGVtcGwgIT0gdW5kZWZpbmVkXCIgW3N0eWxlLm1heEhlaWdodF09XCJzZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJvdmVyZmxvdzogYXV0bztcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsYXp5Q29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljayhpdGVtLGksJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInB1cmUtY2hlY2tib3hcIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkLWl0ZW0nOiBpc1NlbGVjdGVkKGl0ZW0pID09IHRydWUgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwic2V0dGluZ3Muc2hvd0NoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCIoc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pKSB8fCBpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjLXRlbXBsYXRlUmVuZGVyZXIgW2RhdGFdPVwiaXRlbVRlbXBsXCIgW2l0ZW1dPVwiaXRlbVwiPjwvYy10ZW1wbGF0ZVJlbmRlcmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gbGF6eSBsb2FkaW5nIGFuZCBjdXN0b20gdGVtcGxhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNldHRpbmdzLmdyb3VwQnkgJiYgc2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgaXRlbVRlbXBsICE9IHVuZGVmaW5lZFwiIFtzdHlsZS5tYXhIZWlnaHRdPVwic2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwib3ZlcmZsb3c6IGF1dG87XCI+XG4gICAgICAgICAgICAgICAgPHVsIHZpcnR1YWxTY3JvbGxlciAjc2Nyb2xsMiBbZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXNdPVwicmFuZG9tU2l6ZVwiIFtpdGVtc109XCJ2aXJ0dWFsZGF0YVwiICh2c1N0YXJ0KT1cIm9uU2Nyb2xsRW5kKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAodnNFbmQpPVwib25TY3JvbGxFbmQoJGV2ZW50KVwiIGNsYXNzPVwibGF6eUNvbnRhaW5lclwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0Jzogc2V0dGluZ3MubWF4SGVpZ2h0KydweCd9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzY3JvbGwyLnZpZXdQb3J0SXRlbXM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGl0ZW0saSwkZXZlbnQpXCIgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQtaXRlbSc6IGlzU2VsZWN0ZWQoaXRlbSkgPT0gdHJ1ZSB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZXR0aW5ncy5zaG93Q2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCIgW2Rpc2FibGVkXT1cIihzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGggJiYgIWlzU2VsZWN0ZWQoaXRlbSkpIHx8IGl0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGMtdGVtcGxhdGVSZW5kZXJlciBbZGF0YV09XCJpdGVtVGVtcGxcIiBbaXRlbV09XCJpdGVtXCI+PC9jLXRlbXBsYXRlUmVuZGVyZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBsYXp5IGxvYWRpbmcsIGdyb3VwIEJ5IGFuZCBjdXN0b20gdGVtcGxhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2V0dGluZ3MuZ3JvdXBCeSAmJiBzZXR0aW5ncy5sYXp5TG9hZGluZyAmJiBpdGVtVGVtcGwgIT0gdW5kZWZpbmVkXCIgW3N0eWxlLm1heEhlaWdodF09XCJzZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJvdmVyZmxvdzogYXV0bztcIj5cbiAgICAgICAgICAgICAgICA8dWwgdmlydHVhbFNjcm9sbGVyICNzY3JvbGwzIFtlbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplc109XCJyYW5kb21TaXplXCIgW2l0ZW1zXT1cInZpcnR1YWxkYXRhXCIgKHZzU3RhcnQpPVwib25TY3JvbGxFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICh2c0VuZCk9XCJvblNjcm9sbEVuZCgkZXZlbnQpXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBzZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J31cIiBjbGFzcz1cImxhenlDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc2Nyb2xsMy52aWV3UG9ydEl0ZW1zOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJvbkl0ZW1DbGljayhpdGVtLGksJGV2ZW50KVwiICpuZ0lmPVwiIWl0ZW0uZ3JwVGl0bGVcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IGl0ZW0uZ3JwVGl0bGUsJ2dycC1pdGVtJzogIWl0ZW0uZ3JwVGl0bGUgJiYgIXNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbn1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicHVyZS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveCAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uXCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCIoc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pKSB8fCBpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjLXRlbXBsYXRlUmVuZGVyZXIgW2RhdGFdPVwiaXRlbVRlbXBsXCIgW2l0ZW1dPVwiaXRlbVwiPjwvYy10ZW1wbGF0ZVJlbmRlcmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIml0ZW0uZ3JwVGl0bGVcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IGl0ZW0uZ3JwVGl0bGUsJ2dycC1pdGVtJzogIWl0ZW0uZ3JwVGl0bGUgJiYgIXNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbn1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicHVyZS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiKHNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09IHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCAmJiAhaXNTZWxlY3RlZChpdGVtKSkgfHwgaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Yy10ZW1wbGF0ZVJlbmRlcmVyIFtkYXRhXT1cIml0ZW1UZW1wbFwiIFtpdGVtXT1cIml0ZW1cIj48L2MtdGVtcGxhdGVSZW5kZXJlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIGdyb3VwIEJ5IGFuZCBjdXN0b20gdGVtcGxhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2V0dGluZ3MuZ3JvdXBCeSAmJiAhc2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgaXRlbVRlbXBsICE9IHVuZGVmaW5lZFwiIFtzdHlsZS5tYXhIZWlnaHRdPVwic2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwib3ZlcmZsb3c6IGF1dG87XCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGF6eUNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cGVkRGF0YTsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAoY2xpY2spPVwic2VsZWN0R3JvdXAoaXRlbSlcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IGl0ZW0uZ3JwVGl0bGUsJ2dycC1pdGVtJzogIWl0ZW0uZ3JwVGl0bGUgJiYgIXNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbn1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicHVyZS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveCAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uXCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXRlbS5zZWxlY3RlZFwiIFtkaXNhYmxlZF09XCIoc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pKSB8fCBpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxhenlDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IHZhbCBvZiBpdGVtLmxpc3QgOyBsZXQgaiA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJvbkl0ZW1DbGljayh2YWwsaiwkZXZlbnQpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IHZhbC5ncnBUaXRsZSwnZ3JwLWl0ZW0nOiAhdmFsLmdycFRpdGxlICYmICFzZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb259XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInB1cmUtY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZXR0aW5ncy5zaG93Q2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKHZhbClcIiBbZGlzYWJsZWRdPVwiKHNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09IHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCAmJiAhaXNTZWxlY3RlZCh2YWwpKSB8fCB2YWwuZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGMtdGVtcGxhdGVSZW5kZXJlciBbZGF0YV09XCJpdGVtVGVtcGxcIiBbaXRlbV09XCJ2YWxcIj48L2MtdGVtcGxhdGVSZW5kZXJlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBsYXp5IGxvYWRpbmcsIGdyb3VwIEJ5IC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNldHRpbmdzLmdyb3VwQnkgJiYgc2V0dGluZ3MubGF6eUxvYWRpbmcgJiYgaXRlbVRlbXBsID09IHVuZGVmaW5lZFwiIFtzdHlsZS5tYXhIZWlnaHRdPVwic2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwib3ZlcmZsb3c6IGF1dG87XCI+XG4gICAgICAgICAgICAgICAgPHZpcnR1YWwtc2Nyb2xsZXIgW2l0ZW1zXT1cImdyb3VwZWREYXRhXCIgKHZzVXBkYXRlKT1cInZpZXdQb3J0SXRlbXMgPSAkZXZlbnRcIiAodnNFbmQpPVwib25TY3JvbGxFbmQoJGV2ZW50KVwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0Jzogc2V0dGluZ3MubWF4SGVpZ2h0KydweCd9XCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bCB2aXJ0dWFsU2Nyb2xsZXIgI3Njcm9sbDQgW2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzXT1cInJhbmRvbVNpemVcIiBbaXRlbXNdPVwidmlydHVhbGRhdGFcIiAodnNTdGFydCk9XCJvblNjcm9sbEVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2c0VuZCk9XCJvblNjcm9sbEVuZCgkZXZlbnQpXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBzZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J31cIiBjbGFzcz1cImxhenlDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNjcm9sbDQudmlld1BvcnRJdGVtczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJpdGVtLmdycFRpdGxlXCIgW25nQ2xhc3NdPVwieydncnAtdGl0bGUnOiBpdGVtLmdycFRpdGxlLCdncnAtaXRlbSc6ICFpdGVtLmdycFRpdGxlICYmICFzZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24sICdzZWxlY3RlZC1pdGVtJzogaXNTZWxlY3RlZChpdGVtKSA9PSB0cnVlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInB1cmUtY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwic2V0dGluZ3Muc2hvd0NoZWNrYm94ICYmICFpdGVtLmdycFRpdGxlICYmICFzZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb25cIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIoc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pKSB8fCBpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7aXRlbVtzZXR0aW5ncy5sYWJlbEtleV19fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGl0ZW0saSwkZXZlbnQpXCIgKm5nSWY9XCIhaXRlbS5ncnBUaXRsZVwiIFtuZ0NsYXNzXT1cInsnZ3JwLXRpdGxlJzogaXRlbS5ncnBUaXRsZSwnZ3JwLWl0ZW0nOiAhaXRlbS5ncnBUaXRsZSAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uLCAnc2VsZWN0ZWQtaXRlbSc6IGlzU2VsZWN0ZWQoaXRlbSkgPT0gdHJ1ZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveCAmJiAhaXRlbS5ncnBUaXRsZVwiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiKHNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09IHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCAmJiAhaXNTZWxlY3RlZChpdGVtKSkgfHwgaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC92aXJ0dWFsLXNjcm9sbGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIGdyb3VwIEJ5IC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNldHRpbmdzLmdyb3VwQnkgJiYgIXNldHRpbmdzLmxhenlMb2FkaW5nICYmIGl0ZW1UZW1wbCA9PSB1bmRlZmluZWRcIiBbc3R5bGUubWF4SGVpZ2h0XT1cInNldHRpbmdzLm1heEhlaWdodCsncHgnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIm92ZXJmbG93OiBhdXRvO1wiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxhenlDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ3JvdXBlZERhdGEgOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJzZWxlY3RHcm91cChpdGVtKVwiIFtuZ0NsYXNzXT1cInsnZ3JwLXRpdGxlJzogaXRlbS5ncnBUaXRsZSwnZ3JwLWl0ZW0nOiAhaXRlbS5ncnBUaXRsZSAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9ufVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwic2V0dGluZ3Muc2hvd0NoZWNrYm94ICYmICFzZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb25cIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpdGVtLnNlbGVjdGVkXCIgW2Rpc2FibGVkXT1cIihzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGggJiYgIWlzU2VsZWN0ZWQoaXRlbSkpIHx8IGl0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7aXRlbVtzZXR0aW5ncy5sYWJlbEtleV19fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGF6eUNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgdmFsIG9mIGl0ZW0ubGlzdCA7IGxldCBqID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKHZhbCxqLCRldmVudCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQtaXRlbSc6IGlzU2VsZWN0ZWQodmFsKSA9PSB0cnVlLCdncnAtdGl0bGUnOiB2YWwuZ3JwVGl0bGUsJ2dycC1pdGVtJzogIXZhbC5ncnBUaXRsZSAmJiAhc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9ufVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwic2V0dGluZ3Muc2hvd0NoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZCh2YWwpXCIgW2Rpc2FibGVkXT1cIihzZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PSBzZWxlY3RlZEl0ZW1zPy5sZW5ndGggJiYgIWlzU2VsZWN0ZWQodmFsKSkgfHwgdmFsLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD57e3ZhbFtzZXR0aW5ncy5sYWJlbEtleV19fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSA8c3BhbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cGVkRGF0YSA7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAoY2xpY2spPVwib25JdGVtQ2xpY2soaXRlbSxpLCRldmVudClcIiAqbmdJZj1cIiFpdGVtLmdycFRpdGxlXCIgW25nQ2xhc3NdPVwieydncnAtdGl0bGUnOiBpdGVtLmdycFRpdGxlLCdncnAtaXRlbSc6ICFpdGVtLmdycFRpdGxlfVwiIGNsYXNzPVwicHVyZS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZXR0aW5ncy5zaG93Q2hlY2tib3ggJiYgIWl0ZW0uZ3JwVGl0bGVcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGl0ZW0pXCIgW2Rpc2FibGVkXT1cInNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09IHNlbGVjdGVkSXRlbXM/Lmxlbmd0aCAmJiAhaXNTZWxlY3RlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57e2l0ZW1bc2V0dGluZ3MubGFiZWxLZXldfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiaXRlbS5ncnBUaXRsZSAmJiAhc2V0dGluZ3Muc2VsZWN0R3JvdXBcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IGl0ZW0uZ3JwVGl0bGUsJ2dycC1pdGVtJzogIWl0ZW0uZ3JwVGl0bGV9XCIgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveCAmJiBzZXR0aW5ncy5zZWxlY3RHcm91cFwiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwic2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7aXRlbVtzZXR0aW5ncy5sYWJlbEtleV19fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgPGxpICAoY2xpY2spPVwic2VsZWN0R3JvdXAoaXRlbSlcIiAqbmdJZj1cIml0ZW0uZ3JwVGl0bGUgJiYgc2V0dGluZ3Muc2VsZWN0R3JvdXBcIiBbbmdDbGFzc109XCJ7J2dycC10aXRsZSc6IGl0ZW0uZ3JwVGl0bGUsJ2dycC1pdGVtJzogIWl0ZW0uZ3JwVGl0bGV9XCIgY2xhc3M9XCJwdXJlLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cInNldHRpbmdzLnNob3dDaGVja2JveCAmJiBzZXR0aW5ncy5zZWxlY3RHcm91cFwiIHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cIml0ZW0uc2VsZWN0ZWRcIiBbZGlzYWJsZWRdPVwic2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT0gc2VsZWN0ZWRJdGVtcz8ubGVuZ3RoICYmICFpc1NlbGVjdGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7aXRlbVtzZXR0aW5ncy5sYWJlbEtleV19fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+IC0tPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoNSBjbGFzcz1cImxpc3QtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YT8ubGVuZ3RoID09IDBcIj57e3NldHRpbmdzLm5vRGF0YUxhYmVsfX08L2g1PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PiJdfQ==