import { Component, ContentChild, ElementRef, EventEmitter, Inject, Optional, Input, NgModule, Output, ViewChild } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CommonModule } from '@angular/common';
import * as tween from '@tweenjs/tween.js';
import * as i0 from "@angular/core";
const _c0 = ["header"];
const _c1 = ["container"];
const _c2 = ["content"];
const _c3 = ["invisiblePadding"];
const _c4 = ["*"];
export function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY() {
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
export class VirtualScrollerComponent {
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
VirtualScrollerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VirtualScrollerComponent, selectors: [["virtual-scroller"], ["", "virtualScroller", ""]], contentQueries: function VirtualScrollerComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, _c0, 5, ElementRef);
        i0.ɵɵcontentQuery(dirIndex, _c1, 5, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.headerElementRef = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.containerElementRef = _t.first);
    } }, viewQuery: function VirtualScrollerComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c2, 5, ElementRef);
        i0.ɵɵviewQuery(_c3, 5, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.contentElementRef = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.invisiblePaddingElementRef = _t.first);
    } }, hostVars: 6, hostBindings: function VirtualScrollerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("horizontal", ctx.horizontal)("vertical", !ctx.horizontal)("selfScroll", !ctx.parentScroll);
    } }, inputs: { executeRefreshOutsideAngularZone: "executeRefreshOutsideAngularZone", enableUnequalChildrenSizes: "enableUnequalChildrenSizes", useMarginInsteadOfTranslate: "useMarginInsteadOfTranslate", modifyOverflowStyleOfParentScroll: "modifyOverflowStyleOfParentScroll", stripedTable: "stripedTable", scrollbarWidth: "scrollbarWidth", scrollbarHeight: "scrollbarHeight", childWidth: "childWidth", childHeight: "childHeight", ssrChildWidth: "ssrChildWidth", ssrChildHeight: "ssrChildHeight", ssrViewportWidth: "ssrViewportWidth", ssrViewportHeight: "ssrViewportHeight", bufferAmount: "bufferAmount", scrollAnimationTime: "scrollAnimationTime", resizeBypassRefreshThreshold: "resizeBypassRefreshThreshold", scrollThrottlingTime: "scrollThrottlingTime", scrollDebounceTime: "scrollDebounceTime", checkResizeInterval: "checkResizeInterval", items: "items", compareItems: "compareItems", horizontal: "horizontal", parentScroll: "parentScroll" }, outputs: { vsUpdate: "vsUpdate", vsChange: "vsChange", vsStart: "vsStart", vsEnd: "vsEnd" }, exportAs: ["virtualScroller"], features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c4, decls: 5, vars: 0, consts: [[1, "total-padding"], ["invisiblePadding", ""], [1, "scrollable-content"], ["content", ""]], template: function VirtualScrollerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelement(0, "div", 0, 1);
        i0.ɵɵelementStart(2, "div", 2, 3);
        i0.ɵɵprojection(4);
        i0.ɵɵelementEnd();
    } }, styles: ["[_nghost-%COMP%]{position:relative;display:block;-webkit-overflow-scrolling:touch}.horizontal.selfScroll[_nghost-%COMP%]{overflow-y:visible;overflow-x:auto}.vertical.selfScroll[_nghost-%COMP%]{overflow-y:auto;overflow-x:visible}.scrollable-content[_ngcontent-%COMP%]{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content[_ngcontent-%COMP%]    >*{box-sizing:border-box}.horizontal[_nghost-%COMP%]{white-space:nowrap}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]{display:flex}.horizontal[_nghost-%COMP%]   .scrollable-content[_ngcontent-%COMP%]    >*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding[_ngcontent-%COMP%]{width:1px;opacity:0}.horizontal[_nghost-%COMP%]   .total-padding[_ngcontent-%COMP%]{height:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VirtualScrollerComponent, [{
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
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: ['virtual-scroller-default-options']
            }] }]; }, { executeRefreshOutsideAngularZone: [{
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
        }] }); })();
export class VirtualScrollerModule {
}
VirtualScrollerModule.ɵfac = function VirtualScrollerModule_Factory(t) { return new (t || VirtualScrollerModule)(); };
VirtualScrollerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VirtualScrollerModule });
VirtualScrollerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        {
            provide: 'virtual-scroller-default-options',
            useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
        }
    ], imports: [CommonModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VirtualScrollerModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VirtualScrollerModule, { declarations: [VirtualScrollerComponent], imports: [CommonModule], exports: [VirtualScrollerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1tdWx0aXNlbGVjdC1kcm9wZG93bi1saWIvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFLUixNQUFNLEVBRU4sU0FBUyxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUE7Ozs7Ozs7QUFjMUMsTUFBTSxVQUFVLHdDQUF3QztJQUN2RCxPQUFPO1FBQ04sb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLG1CQUFtQixFQUFFLEdBQUc7UUFDeEIsbUJBQW1CLEVBQUUsSUFBSTtRQUN6Qiw0QkFBNEIsRUFBRSxDQUFDO1FBQy9CLGlDQUFpQyxFQUFFLElBQUk7UUFDdkMsWUFBWSxFQUFFLEtBQUs7S0FDbkIsQ0FBQztBQUNILENBQUM7QUFnRkQsTUFBTSxPQUFPLHdCQUF3QjtJQUlwQyxJQUFXLFlBQVk7UUFDdEIsSUFBSSxRQUFRLEdBQWMsSUFBSSxDQUFDLGdCQUFnQixJQUFTLEVBQUUsQ0FBQztRQUMzRCxPQUFPO1lBQ04sVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQztZQUNwQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDO1lBQ2hDLG1CQUFt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QUFFLHdDQUF3QztTQUNwRDtLQUNELFlBTlMsWUFBWTt1RkFRVixxQkFBcUI7Y0FYakMsUUFBUTtlQUFDO2dCQUNULE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUNuQyxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixTQUFTLEVBQUU7b0JBQ1Y7d0JBQ0MsT0FBTyxFQUFFLGtDQUFrQzt3QkFDM0MsVUFBVSxFQUFFLHdDQUF3QztxQkFDcEQ7aUJBQ0Q7YUFDRDs7d0ZBQ1kscUJBQXFCLG1CQXJwQ3JCLHdCQUF3QixhQTZvQzFCLFlBQVksYUE3b0NWLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Q29udGVudENoaWxkLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdCxcblx0T3B0aW9uYWwsXG5cdElucHV0LFxuXHROZ01vZHVsZSxcblx0Tmdab25lLFxuXHRPbkNoYW5nZXMsXG5cdE9uRGVzdHJveSxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyMixcblx0Vmlld0NoaWxkLFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0SW5qZWN0aW9uVG9rZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0ICogYXMgdHdlZW4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnXG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXJEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdG9wdGlvbnMnO1xuaW1wb3J0IHsgSVBhZ2VJbmZvIH0gZnJvbSAnLi9pcGFnZWluZm8nO1xuaW1wb3J0IHsgSVZpZXdwb3J0IH0gZnJvbSAnLi9pdmlld3BvcnQnO1xuXG5pbXBvcnQgeyBXcmFwR3JvdXBEaW1lbnNpb25zIH0gZnJvbSAnLi93cmFwZ3JvdXBkaW1lbnNpb25zJztcbmltcG9ydCB7IFdyYXBHcm91cERpbWVuc2lvbiB9IGZyb20gJy4vd3JhcGdyb3VwZGltZW5zaW9uJztcblxuaW1wb3J0IHsgSURpbWVuc2lvbnMgfSBmcm9tICcuL2lkaW1lbnNpb24nO1xuXG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBWSVJUVUFMX1NDUk9MTEVSX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IFZpcnR1YWxTY3JvbGxlckRlZmF1bHRPcHRpb25zIHtcblx0cmV0dXJuIHtcblx0XHRzY3JvbGxUaHJvdHRsaW5nVGltZTogMCxcblx0XHRzY3JvbGxEZWJvdW5jZVRpbWU6IDAsXG5cdFx0c2Nyb2xsQW5pbWF0aW9uVGltZTogNzUwLFxuXHRcdGNoZWNrUmVzaXplSW50ZXJ2YWw6IDEwMDAsXG5cdFx0cmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZDogNSxcblx0XHRtb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGw6IHRydWUsXG5cdFx0c3RyaXBlZFRhYmxlOiBmYWxzZVxuXHR9O1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3ZpcnR1YWwtc2Nyb2xsZXIsW3ZpcnR1YWxTY3JvbGxlcl0nLFxuXHRleHBvcnRBczogJ3ZpcnR1YWxTY3JvbGxlcicsXG5cdHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInRvdGFsLXBhZGRpbmdcIiAjaW52aXNpYmxlUGFkZGluZz48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsYWJsZS1jb250ZW50XCIgI2NvbnRlbnQ+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzLmhvcml6b250YWxdJzogXCJob3Jpem9udGFsXCIsXG5cdFx0J1tjbGFzcy52ZXJ0aWNhbF0nOiBcIiFob3Jpem9udGFsXCIsXG5cdFx0J1tjbGFzcy5zZWxmU2Nyb2xsXSc6IFwiIXBhcmVudFNjcm9sbFwiXG5cdH0sXG5cdHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cdCAgZGlzcGxheTogYmxvY2s7XG4gICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgfVxuXG5cdDpob3N0Lmhvcml6b250YWwuc2VsZlNjcm9sbCB7XG4gICAgICBvdmVyZmxvdy15OiB2aXNpYmxlO1xuICAgICAgb3ZlcmZsb3cteDogYXV0bztcblx0fVxuXHQ6aG9zdC52ZXJ0aWNhbC5zZWxmU2Nyb2xsIHtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBvdmVyZmxvdy14OiB2aXNpYmxlO1xuXHR9XG5cbiAgICAuc2Nyb2xsYWJsZS1jb250ZW50IHtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIG1heC13aWR0aDogMTAwdnc7XG4gICAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB9XG5cblx0LnNjcm9sbGFibGUtY29udGVudCA6Om5nLWRlZXAgPiAqIHtcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHR9XG5cblx0Omhvc3QuaG9yaXpvbnRhbCB7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0fVxuXG5cdDpob3N0Lmhvcml6b250YWwgLnNjcm9sbGFibGUtY29udGVudCB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0fVxuXG5cdDpob3N0Lmhvcml6b250YWwgLnNjcm9sbGFibGUtY29udGVudCA6Om5nLWRlZXAgPiAqIHtcblx0XHRmbGV4LXNocmluazogMDtcblx0XHRmbGV4LWdyb3c6IDA7XG5cdFx0d2hpdGUtc3BhY2U6IGluaXRpYWw7XG5cdH1cblxuICAgIC50b3RhbC1wYWRkaW5nIHtcbiAgICAgIHdpZHRoOiAxcHg7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cblxuICAgIDpob3N0Lmhvcml6b250YWwgLnRvdGFsLXBhZGRpbmcge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cdHB1YmxpYyB2aWV3UG9ydEl0ZW1zOiBhbnlbXTtcblx0cHVibGljIHdpbmRvdyA9IHdpbmRvdztcblxuXHRwdWJsaWMgZ2V0IHZpZXdQb3J0SW5mbygpOiBJUGFnZUluZm8ge1xuXHRcdGxldCBwYWdlSW5mbzogSVZpZXdwb3J0ID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0IHx8IDxhbnk+e307XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXJ0SW5kZXg6IHBhZ2VJbmZvLnN0YXJ0SW5kZXggfHwgMCxcblx0XHRcdGVuZEluZGV4OiBwYWdlSW5mby5lbmRJbmRleCB8fCAwLFxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogcGFnZUluZm8uc2Nyb2xsU3RhcnRQb3NpdGlvbiB8fCAwLFxuXHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbEVuZFBvc2l0aW9uIHx8IDAsXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogcGFnZUluZm8ubWF4U2Nyb2xsUG9zaXRpb24gfHwgMCxcblx0XHRcdHN0YXJ0SW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5zdGFydEluZGV4V2l0aEJ1ZmZlciB8fCAwLFxuXHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5lbmRJbmRleFdpdGhCdWZmZXIgfHwgMFxuXHRcdH07XG5cdH1cblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgZXhlY3V0ZVJlZnJlc2hPdXRzaWRlQW5ndWxhclpvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcm90ZWN0ZWQgX2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzOiBib29sZWFuID0gZmFsc2U7XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzO1xuXHR9XG5cdHB1YmxpYyBzZXQgZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXModmFsdWU6IGJvb2xlYW4pIHtcblx0XHRpZiAodGhpcy5fZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMgPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMgPSB2YWx1ZTtcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgdXNlTWFyZ2luSW5zdGVhZE9mVHJhbnNsYXRlOiBib29sZWFuID0gZmFsc2U7XG5cblx0QElucHV0KClcblx0cHVibGljIG1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbDogYm9vbGVhbjtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgc3RyaXBlZFRhYmxlOiBib29sZWFuO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBzY3JvbGxiYXJXaWR0aDogbnVtYmVyO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBzY3JvbGxiYXJIZWlnaHQ6IG51bWJlcjtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgY2hpbGRXaWR0aDogbnVtYmVyO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBjaGlsZEhlaWdodDogbnVtYmVyO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBzc3JDaGlsZFdpZHRoOiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIHNzckNoaWxkSGVpZ2h0OiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIHNzclZpZXdwb3J0V2lkdGg6IG51bWJlciA9IDE5MjA7XG5cblx0QElucHV0KClcblx0cHVibGljIHNzclZpZXdwb3J0SGVpZ2h0OiBudW1iZXIgPSAxMDgwO1xuXG5cdHByb3RlY3RlZCBfYnVmZmVyQW1vdW50OiBudW1iZXIgPSAwO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IGJ1ZmZlckFtb3VudCgpOiBudW1iZXIge1xuXHRcdGlmICh0eXBlb2YgKHRoaXMuX2J1ZmZlckFtb3VudCkgPT09ICdudW1iZXInICYmIHRoaXMuX2J1ZmZlckFtb3VudCA+PSAwKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYnVmZmVyQW1vdW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA/IDUgOiAwO1xuXHRcdH1cblx0fVxuXHRwdWJsaWMgc2V0IGJ1ZmZlckFtb3VudCh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5fYnVmZmVyQW1vdW50ID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgc2Nyb2xsQW5pbWF0aW9uVGltZTogbnVtYmVyO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyByZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkOiBudW1iZXI7XG5cblx0cHJvdGVjdGVkIF9zY3JvbGxUaHJvdHRsaW5nVGltZTogbnVtYmVyO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IHNjcm9sbFRocm90dGxpbmdUaW1lKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFRocm90dGxpbmdUaW1lO1xuXHR9XG5cdHB1YmxpYyBzZXQgc2Nyb2xsVGhyb3R0bGluZ1RpbWUodmFsdWU6IG51bWJlcikge1xuXHRcdHRoaXMuX3Njcm9sbFRocm90dGxpbmdUaW1lID0gdmFsdWU7XG5cdFx0dGhpcy51cGRhdGVPblNjcm9sbEZ1bmN0aW9uKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3Njcm9sbERlYm91bmNlVGltZTogbnVtYmVyO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IHNjcm9sbERlYm91bmNlVGltZSgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxEZWJvdW5jZVRpbWU7XG5cdH1cblx0cHVibGljIHNldCBzY3JvbGxEZWJvdW5jZVRpbWUodmFsdWU6IG51bWJlcikge1xuXHRcdHRoaXMuX3Njcm9sbERlYm91bmNlVGltZSA9IHZhbHVlO1xuXHRcdHRoaXMudXBkYXRlT25TY3JvbGxGdW5jdGlvbigpO1xuXHR9XG5cblx0cHJvdGVjdGVkIG9uU2Nyb2xsOiAoKSA9PiB2b2lkO1xuXHRwcm90ZWN0ZWQgdXBkYXRlT25TY3JvbGxGdW5jdGlvbigpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5zY3JvbGxEZWJvdW5jZVRpbWUpIHtcblx0XHRcdHRoaXMub25TY3JvbGwgPSA8YW55PnRoaXMuZGVib3VuY2UoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHRcdFx0fSwgdGhpcy5zY3JvbGxEZWJvdW5jZVRpbWUpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLnNjcm9sbFRocm90dGxpbmdUaW1lKSB7XG5cdFx0XHR0aGlzLm9uU2Nyb2xsID0gPGFueT50aGlzLnRocm90dGxlVHJhaWxpbmcoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHRcdFx0fSwgdGhpcy5zY3JvbGxUaHJvdHRsaW5nVGltZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5vblNjcm9sbCA9ICgpID0+IHtcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIGNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWRUaW1lcjogbnVtYmVyO1xuXHRwcm90ZWN0ZWQgX2NoZWNrUmVzaXplSW50ZXJ2YWw6IG51bWJlcjtcblx0QElucHV0KClcblx0cHVibGljIGdldCBjaGVja1Jlc2l6ZUludGVydmFsKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWw7XG5cdH1cblx0cHVibGljIHNldCBjaGVja1Jlc2l6ZUludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcblx0XHRpZiAodGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbCA9PT0gdmFsdWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsID0gdmFsdWU7XG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2l0ZW1zOiBhbnlbXSA9IFtdO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IGl0ZW1zKCk6IGFueVtdIHtcblx0XHRyZXR1cm4gdGhpcy5faXRlbXM7XG5cdH1cblx0cHVibGljIHNldCBpdGVtcyh2YWx1ZTogYW55W10pIHtcblx0XHRpZiAodmFsdWUgPT09IHRoaXMuX2l0ZW1zKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5faXRlbXMgPSB2YWx1ZSB8fCBbXTtcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwodHJ1ZSk7XG5cdH1cblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgY29tcGFyZUl0ZW1zOiAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4gYm9vbGVhbiA9IChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiBpdGVtMSA9PT0gaXRlbTI7XG5cblx0cHJvdGVjdGVkIF9ob3Jpem9udGFsOiBib29sZWFuO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IGhvcml6b250YWwoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2hvcml6b250YWw7XG5cdH1cblx0cHVibGljIHNldCBob3Jpem9udGFsKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5faG9yaXpvbnRhbCA9IHZhbHVlO1xuXHRcdHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpOiB2b2lkIHtcblx0XHRjb25zdCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XG5cdFx0aWYgKHNjcm9sbEVsZW1lbnQgJiYgdGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdykge1xuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteSddID0gdGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdy55O1xuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddID0gdGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdy54O1xuXHRcdH1cblxuXHRcdHRoaXMub2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3cgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgb2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3c6IHsgeDogc3RyaW5nLCB5OiBzdHJpbmcgfTtcblx0cHJvdGVjdGVkIF9wYXJlbnRTY3JvbGw6IEVsZW1lbnQgfCBXaW5kb3c7XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgcGFyZW50U2Nyb2xsKCk6IEVsZW1lbnQgfCBXaW5kb3cge1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnRTY3JvbGw7XG5cdH1cblx0cHVibGljIHNldCBwYXJlbnRTY3JvbGwodmFsdWU6IEVsZW1lbnQgfCBXaW5kb3cpIHtcblx0XHRpZiAodGhpcy5fcGFyZW50U2Nyb2xsID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMucmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpO1xuXHRcdHRoaXMuX3BhcmVudFNjcm9sbCA9IHZhbHVlO1xuXHRcdHRoaXMuYWRkU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuXG5cdFx0Y29uc3Qgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXHRcdGlmICh0aGlzLm1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbCAmJiBzY3JvbGxFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdyA9IHsgeDogc2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddLCB5OiBzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy15J10gfTtcblx0XHRcdHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXknXSA9IHRoaXMuaG9yaXpvbnRhbCA/ICd2aXNpYmxlJyA6ICdhdXRvJztcblx0XHRcdHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXgnXSA9IHRoaXMuaG9yaXpvbnRhbCA/ICdhdXRvJyA6ICd2aXNpYmxlJztcblx0XHR9XG5cdH1cblxuXHRAT3V0cHV0KClcblx0cHVibGljIHZzVXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuXHRAT3V0cHV0KClcblx0cHVibGljIHZzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xuXG5cdEBPdXRwdXQoKVxuXHRwdWJsaWMgdnNTdGFydDogRXZlbnRFbWl0dGVyPElQYWdlSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElQYWdlSW5mbz4oKTtcblxuXHRAT3V0cHV0KClcblx0cHVibGljIHZzRW5kOiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xuXG5cdEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcblx0cHJvdGVjdGVkIGNvbnRlbnRFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG5cdEBWaWV3Q2hpbGQoJ2ludmlzaWJsZVBhZGRpbmcnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcblx0cHJvdGVjdGVkIGludmlzaWJsZVBhZGRpbmdFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG5cdEBDb250ZW50Q2hpbGQoJ2hlYWRlcicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxuXHRwcm90ZWN0ZWQgaGVhZGVyRWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuXHRAQ29udGVudENoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcblx0cHJvdGVjdGVkIGNvbnRhaW5lckVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cblx0cHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuYWRkU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuXHR9XG5cblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXHRcdHRoaXMucmVtb3ZlU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuXHRcdHRoaXMucmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpO1xuXHR9XG5cblx0cHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuXHRcdGxldCBpbmRleExlbmd0aENoYW5nZWQgPSB0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoICE9PSB0aGlzLml0ZW1zLmxlbmd0aDtcblx0XHR0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XG5cblx0XHRjb25zdCBmaXJzdFJ1bjogYm9vbGVhbiA9ICFjaGFuZ2VzLml0ZW1zIHx8ICFjaGFuZ2VzLml0ZW1zLnByZXZpb3VzVmFsdWUgfHwgY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlLmxlbmd0aCA9PT0gMDtcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoaW5kZXhMZW5ndGhDaGFuZ2VkIHx8IGZpcnN0UnVuKTtcblx0fVxuXG5cblx0cHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5jYWNoZWRJdGVtc0xlbmd0aCAhPT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcblx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcmV2aW91c1ZpZXdQb3J0ICYmIHRoaXMudmlld1BvcnRJdGVtcyAmJiB0aGlzLnZpZXdQb3J0SXRlbXMubGVuZ3RoID4gMCkge1xuXHRcdFx0bGV0IGl0ZW1zQXJyYXlDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlld1BvcnRJdGVtcy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAoIXRoaXMuY29tcGFyZUl0ZW1zKHRoaXMuaXRlbXNbdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyICsgaV0sIHRoaXMudmlld1BvcnRJdGVtc1tpXSkpIHtcblx0XHRcdFx0XHRpdGVtc0FycmF5Q2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChpdGVtc0FycmF5Q2hhbmdlZCkge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHJlZnJlc2goKTogdm9pZCB7XG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKHRydWUpO1xuXHR9XG5cblx0cHVibGljIGludmFsaWRhdGVBbGxDYWNoZWRNZWFzdXJlbWVudHMoKTogdm9pZCB7XG5cdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zID0ge1xuXHRcdFx0bWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwOiBbXSxcblx0XHRcdG51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzOiAwLFxuXHRcdFx0c3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzOiAwLFxuXHRcdFx0c3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0czogMFxuXHRcdH07XG5cblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XG5cblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHR9XG5cblx0cHVibGljIGludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEZvckl0ZW0oaXRlbTogYW55KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlQ2FjaGVkTWVhc3VyZW1lbnRBdEluZGV4KGluZGV4KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcblx0fVxuXG5cdHB1YmxpYyBpbnZhbGlkYXRlQ2FjaGVkTWVhc3VyZW1lbnRBdEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xuXHRcdFx0bGV0IGNhY2hlZE1lYXN1cmVtZW50ID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpbmRleF07XG5cdFx0XHRpZiAoY2FjaGVkTWVhc3VyZW1lbnQpIHtcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpbmRleF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdC0tdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzIC09IGNhY2hlZE1lYXN1cmVtZW50LmNoaWxkV2lkdGggfHwgMDtcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgLT0gY2FjaGVkTWVhc3VyZW1lbnQuY2hpbGRIZWlnaHQgfHwgMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcblx0fVxuXG5cdHB1YmxpYyBzY3JvbGxJbnRvKGl0ZW06IGFueSwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xuXHRcdGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuXHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnNjcm9sbFRvSW5kZXgoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xuXHR9XG5cblx0cHVibGljIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xuXHRcdGxldCBtYXhSZXRyaWVzOiBudW1iZXIgPSA1O1xuXG5cdFx0bGV0IHJldHJ5SWZOZWVkZWQgPSAoKSA9PiB7XG5cdFx0XHQtLW1heFJldHJpZXM7XG5cdFx0XHRpZiAobWF4UmV0cmllcyA8PSAwKSB7XG5cdFx0XHRcdGlmIChhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaykge1xuXHRcdFx0XHRcdGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuXHRcdFx0bGV0IGRlc2lyZWRTdGFydEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgoaW5kZXgsIDApLCBkaW1lbnNpb25zLml0ZW1Db3VudCAtIDEpO1xuXHRcdFx0aWYgKHRoaXMucHJldmlvdXNWaWV3UG9ydC5zdGFydEluZGV4ID09PSBkZXNpcmVkU3RhcnRJbmRleCkge1xuXHRcdFx0XHRpZiAoYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spIHtcblx0XHRcdFx0XHRhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zY3JvbGxUb0luZGV4X2ludGVybmFsKGluZGV4LCBhbGlnblRvQmVnaW5uaW5nLCBhZGRpdGlvbmFsT2Zmc2V0LCAwLCByZXRyeUlmTmVlZGVkKTtcblx0XHR9O1xuXG5cdFx0dGhpcy5zY3JvbGxUb0luZGV4X2ludGVybmFsKGluZGV4LCBhbGlnblRvQmVnaW5uaW5nLCBhZGRpdGlvbmFsT2Zmc2V0LCBhbmltYXRpb25NaWxsaXNlY29uZHMsIHJldHJ5SWZOZWVkZWQpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXg6IG51bWJlciwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xuXHRcdGFuaW1hdGlvbk1pbGxpc2Vjb25kcyA9IGFuaW1hdGlvbk1pbGxpc2Vjb25kcyA9PT0gdW5kZWZpbmVkID8gdGhpcy5zY3JvbGxBbmltYXRpb25UaW1lIDogYW5pbWF0aW9uTWlsbGlzZWNvbmRzO1xuXG5cdFx0bGV0IGRpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcblx0XHRsZXQgc2Nyb2xsID0gdGhpcy5jYWxjdWxhdGVQYWRkaW5nKGluZGV4LCBkaW1lbnNpb25zKSArIGFkZGl0aW9uYWxPZmZzZXQ7XG5cdFx0aWYgKCFhbGlnblRvQmVnaW5uaW5nKSB7XG5cdFx0XHRzY3JvbGwgLT0gZGltZW5zaW9ucy53cmFwR3JvdXBzUGVyUGFnZSAqIGRpbWVuc2lvbnNbdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xuXHRcdH1cblxuXHRcdHRoaXMuc2Nyb2xsVG9Qb3NpdGlvbihzY3JvbGwsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xuXHR9XG5cblx0cHVibGljIHNjcm9sbFRvUG9zaXRpb24oc2Nyb2xsUG9zaXRpb246IG51bWJlciwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XG5cdFx0c2Nyb2xsUG9zaXRpb24gKz0gdGhpcy5nZXRFbGVtZW50c09mZnNldCgpO1xuXG5cdFx0YW5pbWF0aW9uTWlsbGlzZWNvbmRzID0gYW5pbWF0aW9uTWlsbGlzZWNvbmRzID09PSB1bmRlZmluZWQgPyB0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgOiBhbmltYXRpb25NaWxsaXNlY29uZHM7XG5cblx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXG5cdFx0bGV0IGFuaW1hdGlvblJlcXVlc3Q6IG51bWJlcjtcblxuXHRcdGlmICh0aGlzLmN1cnJlbnRUd2Vlbikge1xuXHRcdFx0dGhpcy5jdXJyZW50VHdlZW4uc3RvcCgpO1xuXHRcdFx0dGhpcy5jdXJyZW50VHdlZW4gPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFhbmltYXRpb25NaWxsaXNlY29uZHMpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoc2Nyb2xsRWxlbWVudCwgdGhpcy5fc2Nyb2xsVHlwZSwgc2Nyb2xsUG9zaXRpb24pO1xuXHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHdlZW5Db25maWdPYmogPSB7IHNjcm9sbFBvc2l0aW9uOiBzY3JvbGxFbGVtZW50W3RoaXMuX3Njcm9sbFR5cGVdIH07XG5cblx0XHRsZXQgbmV3VHdlZW4gPSBuZXcgdHdlZW4uVHdlZW4odHdlZW5Db25maWdPYmopXG5cdFx0XHQudG8oeyBzY3JvbGxQb3NpdGlvbiB9LCBhbmltYXRpb25NaWxsaXNlY29uZHMpXG5cdFx0XHQuZWFzaW5nKHR3ZWVuLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuXHRcdFx0Lm9uVXBkYXRlKChkYXRhKSA9PiB7XG5cdFx0XHRcdGlmIChpc05hTihkYXRhLnNjcm9sbFBvc2l0aW9uKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHNjcm9sbEVsZW1lbnQsIHRoaXMuX3Njcm9sbFR5cGUsIGRhdGEuc2Nyb2xsUG9zaXRpb24pO1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHRcdFx0fSlcblx0XHRcdC5vblN0b3AoKCkgPT4ge1xuXHRcdFx0XHRjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25SZXF1ZXN0KTtcblx0XHRcdH0pXG5cdFx0XHQuc3RhcnQoKTtcblxuXHRcdGNvbnN0IGFuaW1hdGUgPSAodGltZT86IG51bWJlcikgPT4ge1xuXHRcdFx0aWYgKCFuZXdUd2VlbltcImlzUGxheWluZ1wiXSgpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bmV3VHdlZW4udXBkYXRlKHRpbWUpO1xuXHRcdFx0aWYgKHR3ZWVuQ29uZmlnT2JqLnNjcm9sbFBvc2l0aW9uID09PSBzY3JvbGxQb3NpdGlvbikge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0XHRhbmltYXRpb25SZXF1ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGFuaW1hdGUoKTtcblx0XHR0aGlzLmN1cnJlbnRUd2VlbiA9IG5ld1R3ZWVuO1xuXHR9XG5cblx0cHJvdGVjdGVkIGlzQW5ndWxhclVuaXZlcnNhbFNTUjogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZixcblx0XHRwcm90ZWN0ZWQgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0XHRwcm90ZWN0ZWQgcmVhZG9ubHkgem9uZTogTmdab25lLFxuXHRcdHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0QEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuXHRcdEBPcHRpb25hbCgpIEBJbmplY3QoJ3ZpcnR1YWwtc2Nyb2xsZXItZGVmYXVsdC1vcHRpb25zJylcblx0XHRvcHRpb25zOiBWaXJ0dWFsU2Nyb2xsZXJEZWZhdWx0T3B0aW9ucykge1xuXG5cdFx0dGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IgPSBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpO1xuXG5cdFx0dGhpcy5zY3JvbGxUaHJvdHRsaW5nVGltZSA9IG9wdGlvbnMuc2Nyb2xsVGhyb3R0bGluZ1RpbWU7XG5cdFx0dGhpcy5zY3JvbGxEZWJvdW5jZVRpbWUgPSBvcHRpb25zLnNjcm9sbERlYm91bmNlVGltZTtcblx0XHR0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgPSBvcHRpb25zLnNjcm9sbEFuaW1hdGlvblRpbWU7XG5cdFx0dGhpcy5zY3JvbGxiYXJXaWR0aCA9IG9wdGlvbnMuc2Nyb2xsYmFyV2lkdGg7XG5cdFx0dGhpcy5zY3JvbGxiYXJIZWlnaHQgPSBvcHRpb25zLnNjcm9sbGJhckhlaWdodDtcblx0XHR0aGlzLmNoZWNrUmVzaXplSW50ZXJ2YWwgPSBvcHRpb25zLmNoZWNrUmVzaXplSW50ZXJ2YWw7XG5cdFx0dGhpcy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkID0gb3B0aW9ucy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkO1xuXHRcdHRoaXMubW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsID0gb3B0aW9ucy5tb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGw7XG5cdFx0dGhpcy5zdHJpcGVkVGFibGUgPSBvcHRpb25zLnN0cmlwZWRUYWJsZTtcblxuXHRcdHRoaXMuaG9yaXpvbnRhbCA9IGZhbHNlO1xuXHRcdHRoaXMucmVzZXRXcmFwR3JvdXBEaW1lbnNpb25zKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0RWxlbWVudFNpemUoZWxlbWVudDogSFRNTEVsZW1lbnQpIDogQ2xpZW50UmVjdCB7XG5cdFx0bGV0IHJlc3VsdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cdFx0bGV0IG1hcmdpblRvcCA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLXRvcCddLCAxMCkgfHwgMDtcblx0XHRsZXQgbWFyZ2luQm90dG9tID0gcGFyc2VJbnQoc3R5bGVzWydtYXJnaW4tYm90dG9tJ10sIDEwKSB8fCAwO1xuXHRcdGxldCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoc3R5bGVzWydtYXJnaW4tbGVmdCddLCAxMCkgfHwgMDtcblx0XHRsZXQgbWFyZ2luUmlnaHQgPSBwYXJzZUludChzdHlsZXNbJ21hcmdpbi1yaWdodCddLCAxMCkgfHwgMDtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IHJlc3VsdC50b3AgKyBtYXJnaW5Ub3AsXG5cdFx0XHRib3R0b206IHJlc3VsdC5ib3R0b20gKyBtYXJnaW5Cb3R0b20sXG5cdFx0XHRsZWZ0OiByZXN1bHQubGVmdCArIG1hcmdpbkxlZnQsXG5cdFx0XHRyaWdodDogcmVzdWx0LnJpZ2h0ICsgbWFyZ2luUmlnaHQsXG5cdFx0XHR3aWR0aDogcmVzdWx0LndpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0LFxuXHRcdFx0aGVpZ2h0OiByZXN1bHQuaGVpZ2h0ICsgbWFyZ2luVG9wICsgbWFyZ2luQm90dG9tLFxuICAgICAgeTpyZXN1bHQudG9wICttYXJnaW5Ub3AsXG4gICAgICB4OnJlc3VsdC5sZWZ0ICsgbWFyZ2luTGVmdCxcbiAgICAgIHRvSlNPTigpOiBhbnkge1xuICAgICAgICByZXN1bHQudG9KU09OKCk7XG4gICAgICB9XG5cdFx0fTtcblx0fVxuXG5cdHByb3RlY3RlZCBwcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdDogQ2xpZW50UmVjdDtcblx0cHJvdGVjdGVkIGNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWQoKTogdm9pZCB7XG5cdFx0bGV0IGJvdW5kaW5nUmVjdCA9IHRoaXMuZ2V0RWxlbWVudFNpemUodGhpcy5nZXRTY3JvbGxFbGVtZW50KCkpO1xuXG5cdFx0bGV0IHNpemVDaGFuZ2VkOiBib29sZWFuO1xuXHRcdGlmICghdGhpcy5wcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdCkge1xuXHRcdFx0c2l6ZUNoYW5nZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgd2lkdGhDaGFuZ2UgPSBNYXRoLmFicyhib3VuZGluZ1JlY3Qud2lkdGggLSB0aGlzLnByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0LndpZHRoKTtcblx0XHRcdGxldCBoZWlnaHRDaGFuZ2UgPSBNYXRoLmFicyhib3VuZGluZ1JlY3QuaGVpZ2h0IC0gdGhpcy5wcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdC5oZWlnaHQpO1xuXHRcdFx0c2l6ZUNoYW5nZWQgPSB3aWR0aENoYW5nZSA+IHRoaXMucmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZCB8fCBoZWlnaHRDaGFuZ2UgPiB0aGlzLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ7XG5cdFx0fVxuXG5cdFx0aWYgKHNpemVDaGFuZ2VkKSB7XG5cdFx0XHR0aGlzLnByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0ID0gYm91bmRpbmdSZWN0O1xuXHRcdFx0aWYgKGJvdW5kaW5nUmVjdC53aWR0aCA+IDAgJiYgYm91bmRpbmdSZWN0LmhlaWdodCA+IDApIHtcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2ludmlzaWJsZVBhZGRpbmdQcm9wZXJ0eTtcblx0cHJvdGVjdGVkIF9vZmZzZXRUeXBlO1xuXHRwcm90ZWN0ZWQgX3Njcm9sbFR5cGU7XG5cdHByb3RlY3RlZCBfcGFnZU9mZnNldFR5cGU7XG5cdHByb3RlY3RlZCBfY2hpbGRTY3JvbGxEaW07XG5cdHByb3RlY3RlZCBfdHJhbnNsYXRlRGlyO1xuXHRwcm90ZWN0ZWQgX21hcmdpbkRpcjtcblx0cHJvdGVjdGVkIHVwZGF0ZURpcmVjdGlvbigpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XG5cdFx0XHR0aGlzLl9pbnZpc2libGVQYWRkaW5nUHJvcGVydHkgPSAnd2lkdGgnO1xuXHRcdFx0dGhpcy5fb2Zmc2V0VHlwZSA9ICdvZmZzZXRMZWZ0Jztcblx0XHRcdHRoaXMuX3BhZ2VPZmZzZXRUeXBlID0gJ3BhZ2VYT2Zmc2V0Jztcblx0XHRcdHRoaXMuX2NoaWxkU2Nyb2xsRGltID0gJ2NoaWxkV2lkdGgnO1xuXHRcdFx0dGhpcy5fbWFyZ2luRGlyID0gJ21hcmdpbi1sZWZ0Jztcblx0XHRcdHRoaXMuX3RyYW5zbGF0ZURpciA9ICd0cmFuc2xhdGVYJztcblx0XHRcdHRoaXMuX3Njcm9sbFR5cGUgPSAnc2Nyb2xsTGVmdCc7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5faW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5ID0gJ2hlaWdodCc7XG5cdFx0XHR0aGlzLl9vZmZzZXRUeXBlID0gJ29mZnNldFRvcCc7XG5cdFx0XHR0aGlzLl9wYWdlT2Zmc2V0VHlwZSA9ICdwYWdlWU9mZnNldCc7XG5cdFx0XHR0aGlzLl9jaGlsZFNjcm9sbERpbSA9ICdjaGlsZEhlaWdodCc7XG5cdFx0XHR0aGlzLl9tYXJnaW5EaXIgPSAnbWFyZ2luLXRvcCc7XG5cdFx0XHR0aGlzLl90cmFuc2xhdGVEaXIgPSAndHJhbnNsYXRlWSc7XG5cdFx0XHR0aGlzLl9zY3JvbGxUeXBlID0gJ3Njcm9sbFRvcCc7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIGRlYm91bmNlKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpOiBGdW5jdGlvbiB7XG5cdFx0Y29uc3QgdGhyb3R0bGVkID0gdGhpcy50aHJvdHRsZVRyYWlsaW5nKGZ1bmMsIHdhaXQpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm90dGxlZFsnY2FuY2VsJ10oKTtcblx0XHRcdHRocm90dGxlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdFx0cmVzdWx0WydjYW5jZWwnXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm90dGxlZFsnY2FuY2VsJ10oKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHByb3RlY3RlZCB0aHJvdHRsZVRyYWlsaW5nKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpOiBGdW5jdGlvbiB7XG5cdFx0bGV0IHRpbWVvdXQgPSB1bmRlZmluZWQ7XG5cdFx0bGV0IF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgcmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xuXHRcdFx0X2FyZ3VtZW50cyA9IGFyZ3VtZW50c1xuXG5cdFx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICh3YWl0IDw9IDApIHtcblx0XHRcdFx0ZnVuYy5hcHBseShfdGhpcywgX2FyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGltZW91dCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KF90aGlzLCBfYXJndW1lbnRzKTtcblx0XHRcdFx0fSwgd2FpdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRyZXN1bHRbJ2NhbmNlbCddID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0cHJvdGVjdGVkIGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IDA7XG5cblx0cHJvdGVjdGVkIHBhZGRpbmc6IG51bWJlciA9IDA7XG5cdHByb3RlY3RlZCBwcmV2aW91c1ZpZXdQb3J0OiBJVmlld3BvcnQgPSA8YW55Pnt9O1xuXHRwcm90ZWN0ZWQgY3VycmVudFR3ZWVuOiBhbnk7XG5cdHByb3RlY3RlZCBjYWNoZWRJdGVtc0xlbmd0aDogbnVtYmVyO1xuXG5cdHByb3RlY3RlZCBkaXNwb3NlU2Nyb2xsSGFuZGxlcjogKCkgPT4gdm9pZCB8IHVuZGVmaW5lZDtcblx0cHJvdGVjdGVkIGRpc3Bvc2VSZXNpemVIYW5kbGVyOiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xuXG5cdHByb3RlY3RlZCByZWZyZXNoX2ludGVybmFsKGl0ZW1zQXJyYXlNb2RpZmllZDogYm9vbGVhbiwgcmVmcmVzaENvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkLCBtYXhSdW5UaW1lczogbnVtYmVyID0gMik6IHZvaWQge1xuXHRcdC8vbm90ZTogbWF4UnVuVGltZXMgaXMgdG8gZm9yY2UgaXQgdG8ga2VlcCByZWNhbGN1bGF0aW5nIGlmIHRoZSBwcmV2aW91cyBpdGVyYXRpb24gY2F1c2VkIGEgcmUtcmVuZGVyIChkaWZmZXJlbnQgc2xpY2VkIGl0ZW1zIGluIHZpZXdwb3J0IG9yIHNjcm9sbFBvc2l0aW9uIGNoYW5nZWQpLlxuXHRcdC8vVGhlIGRlZmF1bHQgb2YgMnggbWF4IHdpbGwgcHJvYmFibHkgYmUgYWNjdXJhdGUgZW5vdWdoIHdpdGhvdXQgY2F1c2luZyB0b28gbGFyZ2UgYSBwZXJmb3JtYW5jZSBib3R0bGVuZWNrXG5cdFx0Ly9UaGUgY29kZSB3b3VsZCB0eXBpY2FsbHkgcXVpdCBvdXQgb24gdGhlIDJuZCBpdGVyYXRpb24gYW55d2F5cy4gVGhlIG1haW4gdGltZSBpdCdkIHRoaW5rIG1vcmUgdGhhbiAyIHJ1bnMgd291bGQgYmUgbmVjZXNzYXJ5IHdvdWxkIGJlIGZvciB2YXN0bHkgZGlmZmVyZW50IHNpemVkIGNoaWxkIGl0ZW1zIG9yIGlmIHRoaXMgaXMgdGhlIDFzdCB0aW1lIHRoZSBpdGVtcyBhcnJheSB3YXMgaW5pdGlhbGl6ZWQuXG5cdFx0Ly9XaXRob3V0IG1heFJ1blRpbWVzLCBJZiB0aGUgdXNlciBpcyBhY3RpdmVseSBzY3JvbGxpbmcgdGhpcyBjb2RlIHdvdWxkIGJlY29tZSBhbiBpbmZpbml0ZSBsb29wIHVudGlsIHRoZXkgc3RvcHBlZCBzY3JvbGxpbmcuIFRoaXMgd291bGQgYmUgb2theSwgZXhjZXB0IGVhY2ggc2Nyb2xsIGV2ZW50IHdvdWxkIHN0YXJ0IGFuIGFkZGl0aW9uYWwgaW5maW50ZSBsb29wLiBXZSB3YW50IHRvIHNob3J0LWNpcmN1aXQgaXQgdG8gcHJldmVudCB0aGlzLlxuXG5cdFx0aWYgKGl0ZW1zQXJyYXlNb2RpZmllZCAmJiB0aGlzLnByZXZpb3VzVmlld1BvcnQgJiYgdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24gPiAwKSB7XG5cdFx0Ly9pZiBpdGVtcyB3ZXJlIHByZXBlbmRlZCwgc2Nyb2xsIGZvcndhcmQgdG8ga2VlcCBzYW1lIGl0ZW1zIHZpc2libGVcblx0XHRcdGxldCBvbGRWaWV3UG9ydCA9IHRoaXMucHJldmlvdXNWaWV3UG9ydDtcblx0XHRcdGxldCBvbGRWaWV3UG9ydEl0ZW1zID0gdGhpcy52aWV3UG9ydEl0ZW1zO1xuXG5cdFx0XHRsZXQgb2xkUmVmcmVzaENvbXBsZXRlZENhbGxiYWNrID0gcmVmcmVzaENvbXBsZXRlZENhbGxiYWNrO1xuXHRcdFx0cmVmcmVzaENvbXBsZXRlZENhbGxiYWNrID0gKCkgPT4ge1xuXHRcdFx0XHRsZXQgc2Nyb2xsTGVuZ3RoRGVsdGEgPSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsTGVuZ3RoIC0gb2xkVmlld1BvcnQuc2Nyb2xsTGVuZ3RoO1xuXHRcdFx0XHRpZiAoc2Nyb2xsTGVuZ3RoRGVsdGEgPiAwICYmIHRoaXMudmlld1BvcnRJdGVtcykge1xuXHRcdFx0XHRcdGxldCBvbGRTdGFydEl0ZW0gPSBvbGRWaWV3UG9ydEl0ZW1zWzBdO1xuXHRcdFx0XHRcdGxldCBvbGRTdGFydEl0ZW1JbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KHggPT4gdGhpcy5jb21wYXJlSXRlbXMob2xkU3RhcnRJdGVtLCB4KSk7XG5cdFx0XHRcdFx0aWYgKG9sZFN0YXJ0SXRlbUluZGV4ID4gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyKSB7XG5cdFx0XHRcdFx0XHRsZXQgaXRlbU9yZGVyQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnZpZXdQb3J0SXRlbXMubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLmNvbXBhcmVJdGVtcyh0aGlzLml0ZW1zW29sZFN0YXJ0SXRlbUluZGV4ICsgaV0sIG9sZFZpZXdQb3J0SXRlbXNbaV0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0aXRlbU9yZGVyQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCFpdGVtT3JkZXJDaGFuZ2VkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2Nyb2xsVG9Qb3NpdGlvbih0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiArIHNjcm9sbExlbmd0aERlbHRhICwgMCwgb2xkUmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spIHtcblx0XHRcdFx0XHRvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblxuXHRcdFx0XHRpZiAoaXRlbXNBcnJheU1vZGlmaWVkKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXNldFdyYXBHcm91cERpbWVuc2lvbnMoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdmlld3BvcnQgPSB0aGlzLmNhbGN1bGF0ZVZpZXdwb3J0KCk7XG5cblx0XHRcdFx0bGV0IHN0YXJ0Q2hhbmdlZCA9IGl0ZW1zQXJyYXlNb2RpZmllZCB8fCB2aWV3cG9ydC5zdGFydEluZGV4ICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleDtcblx0XHRcdFx0bGV0IGVuZENoYW5nZWQgPSBpdGVtc0FycmF5TW9kaWZpZWQgfHwgdmlld3BvcnQuZW5kSW5kZXggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5lbmRJbmRleDtcblx0XHRcdFx0bGV0IHNjcm9sbExlbmd0aENoYW5nZWQgPSB2aWV3cG9ydC5zY3JvbGxMZW5ndGggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxMZW5ndGg7XG5cdFx0XHRcdGxldCBwYWRkaW5nQ2hhbmdlZCA9IHZpZXdwb3J0LnBhZGRpbmcgIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5wYWRkaW5nO1xuXHRcdFx0XHRsZXQgc2Nyb2xsUG9zaXRpb25DaGFuZ2VkID0gdmlld3BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24gfHwgdmlld3BvcnQuc2Nyb2xsRW5kUG9zaXRpb24gIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxFbmRQb3NpdGlvbiB8fCB2aWV3cG9ydC5tYXhTY3JvbGxQb3NpdGlvbiAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0Lm1heFNjcm9sbFBvc2l0aW9uO1xuXG5cdFx0XHRcdHRoaXMucHJldmlvdXNWaWV3UG9ydCA9IHZpZXdwb3J0O1xuXG5cdFx0XHRcdGlmIChzY3JvbGxMZW5ndGhDaGFuZ2VkKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmludmlzaWJsZVBhZGRpbmdFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2ludmlzaWJsZVBhZGRpbmdQcm9wZXJ0eSwgYCR7dmlld3BvcnQuc2Nyb2xsTGVuZ3RofXB4YCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocGFkZGluZ0NoYW5nZWQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy51c2VNYXJnaW5JbnN0ZWFkT2ZUcmFuc2xhdGUpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9tYXJnaW5EaXIsIGAke3ZpZXdwb3J0LnBhZGRpbmd9cHhgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIGAke3RoaXMuX3RyYW5zbGF0ZURpcn0oJHt2aWV3cG9ydC5wYWRkaW5nfXB4KWApO1xuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3ZWJraXRUcmFuc2Zvcm0nLCBgJHt0aGlzLl90cmFuc2xhdGVEaXJ9KCR7dmlld3BvcnQucGFkZGluZ31weClgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5oZWFkZXJFbGVtZW50UmVmKSB7XG5cdFx0XHRcdFx0bGV0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KClbdGhpcy5fc2Nyb2xsVHlwZV07XG5cdFx0XHRcdFx0bGV0IGNvbnRhaW5lck9mZnNldCA9IHRoaXMuZ2V0RWxlbWVudHNPZmZzZXQoKTtcblx0XHRcdFx0XHRsZXQgb2Zmc2V0ID0gTWF0aC5tYXgoc2Nyb2xsUG9zaXRpb24gLSB2aWV3cG9ydC5wYWRkaW5nIC0gY29udGFpbmVyT2Zmc2V0ICsgdGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0LCAwKTtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGVhZGVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke29mZnNldH1weClgKTtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGVhZGVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2Via2l0VHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke29mZnNldH1weClgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGNoYW5nZUV2ZW50QXJnOiBJUGFnZUluZm8gPSAoc3RhcnRDaGFuZ2VkIHx8IGVuZENoYW5nZWQpID8ge1xuXHRcdFx0XHRcdHN0YXJ0SW5kZXg6IHZpZXdwb3J0LnN0YXJ0SW5kZXgsXG5cdFx0XHRcdFx0ZW5kSW5kZXg6IHZpZXdwb3J0LmVuZEluZGV4LFxuXHRcdFx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb246IHZpZXdwb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24sXG5cdFx0XHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHZpZXdwb3J0LnNjcm9sbEVuZFBvc2l0aW9uLFxuXHRcdFx0XHRcdHN0YXJ0SW5kZXhXaXRoQnVmZmVyOiB2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlcixcblx0XHRcdFx0XHRlbmRJbmRleFdpdGhCdWZmZXI6IHZpZXdwb3J0LmVuZEluZGV4V2l0aEJ1ZmZlcixcblx0XHRcdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogdmlld3BvcnQubWF4U2Nyb2xsUG9zaXRpb25cblx0XHRcdFx0fSA6IHVuZGVmaW5lZDtcblxuXG5cdFx0XHRcdGlmIChzdGFydENoYW5nZWQgfHwgZW5kQ2hhbmdlZCB8fCBzY3JvbGxQb3NpdGlvbkNoYW5nZWQpIHtcblx0XHRcdFx0XHRjb25zdCBoYW5kbGVDaGFuZ2VkID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlIHRoZSBzY3JvbGwgbGlzdCB0byB0cmlnZ2VyIHJlLXJlbmRlciBvZiBjb21wb25lbnRzIGluIHZpZXdwb3J0XG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdQb3J0SXRlbXMgPSB2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlciA+PSAwICYmIHZpZXdwb3J0LmVuZEluZGV4V2l0aEJ1ZmZlciA+PSAwID8gdGhpcy5pdGVtcy5zbGljZSh2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlciwgdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyICsgMSkgOiBbXTtcblx0XHRcdFx0XHRcdHRoaXMudnNVcGRhdGUuZW1pdCh0aGlzLnZpZXdQb3J0SXRlbXMpO1xuXG5cdFx0XHRcdFx0XHRpZiAoc3RhcnRDaGFuZ2VkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudnNTdGFydC5lbWl0KGNoYW5nZUV2ZW50QXJnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKGVuZENoYW5nZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy52c0VuZC5lbWl0KGNoYW5nZUV2ZW50QXJnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHN0YXJ0Q2hhbmdlZCB8fCBlbmRDaGFuZ2VkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMudnNDaGFuZ2UuZW1pdChjaGFuZ2VFdmVudEFyZyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChtYXhSdW5UaW1lcyA+IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlLCByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2ssIG1heFJ1blRpbWVzIC0gMSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0XHRpZiAodGhpcy5leGVjdXRlUmVmcmVzaE91dHNpZGVBbmd1bGFyWm9uZSkge1xuXHRcdFx0XHRcdFx0aGFuZGxlQ2hhbmdlZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuem9uZS5ydW4oaGFuZGxlQ2hhbmdlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChtYXhSdW5UaW1lcyA+IDAgJiYgKHNjcm9sbExlbmd0aENoYW5nZWQgfHwgcGFkZGluZ0NoYW5nZWQpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaywgbWF4UnVuVGltZXMgLSAxKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFNjcm9sbEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdyA/IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkgOiB0aGlzLnBhcmVudFNjcm9sbCB8fCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdHByb3RlY3RlZCBhZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxldCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XG5cblx0XHR0aGlzLnJlbW92ZVNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcblxuXHRcdHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpIHtcblx0XHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAnc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG5cdFx0XHRcdHRoaXMuZGlzcG9zZVJlc2l6ZUhhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Jlc2l6ZScsIHRoaXMub25TY3JvbGwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbEhhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihzY3JvbGxFbGVtZW50LCAnc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG5cdFx0XHRcdGlmICh0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsID4gMCkge1xuXHRcdFx0XHRcdHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyID0gPGFueT5zZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZCgpOyB9LCB0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbW92ZVNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlcikge1xuXHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlcigpO1xuXHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlcikge1xuXHRcdFx0dGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlcigpO1xuXHRcdFx0dGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0RWxlbWVudHNPZmZzZXQoKTogbnVtYmVyIHtcblx0XHRpZiAodGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdGxldCBvZmZzZXQgPSAwO1xuXG5cdFx0aWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFJlZiAmJiB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0b2Zmc2V0ICs9IHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RoaXMuX29mZnNldFR5cGVdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnBhcmVudFNjcm9sbCkge1xuXHRcdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcblx0XHRcdGxldCBlbGVtZW50Q2xpZW50UmVjdCA9IHRoaXMuZ2V0RWxlbWVudFNpemUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0bGV0IHNjcm9sbENsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKHNjcm9sbEVsZW1lbnQpO1xuXHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRvZmZzZXQgKz0gZWxlbWVudENsaWVudFJlY3QubGVmdCAtIHNjcm9sbENsaWVudFJlY3QubGVmdDtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvZmZzZXQgKz0gZWxlbWVudENsaWVudFJlY3QudG9wIC0gc2Nyb2xsQ2xpZW50UmVjdC50b3A7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghKHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93KSkge1xuXHRcdFx0XHRvZmZzZXQgKz0gc2Nyb2xsRWxlbWVudFt0aGlzLl9zY3JvbGxUeXBlXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2Zmc2V0O1xuXHR9XG5cblx0cHJvdGVjdGVkIGNvdW50SXRlbXNQZXJXcmFwR3JvdXAoKTogbnVtYmVyIHtcblx0XHRpZiAodGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IpIHtcblx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHRoaXMuaG9yaXpvbnRhbCA/IHRoaXMuc3NyVmlld3BvcnRIZWlnaHQgLyB0aGlzLnNzckNoaWxkSGVpZ2h0IDogdGhpcy5zc3JWaWV3cG9ydFdpZHRoIC8gdGhpcy5zc3JDaGlsZFdpZHRoKTtcblx0XHR9XG5cblx0XHRsZXQgcHJvcGVydHlOYW1lID0gdGhpcy5ob3Jpem9udGFsID8gJ29mZnNldExlZnQnIDogJ29mZnNldFRvcCc7XG5cdFx0bGV0IGNoaWxkcmVuID0gKCh0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYgJiYgdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHx8IHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuY2hpbGRyZW47XG5cblx0XHRsZXQgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbiA/IGNoaWxkcmVuLmxlbmd0aCA6IDA7XG5cdFx0aWYgKGNoaWxkcmVuTGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cblx0XHRsZXQgZmlyc3RPZmZzZXQgPSBjaGlsZHJlblswXVtwcm9wZXJ0eU5hbWVdO1xuXHRcdGxldCByZXN1bHQgPSAxO1xuXHRcdHdoaWxlIChyZXN1bHQgPCBjaGlsZHJlbkxlbmd0aCAmJiBmaXJzdE9mZnNldCA9PT0gY2hpbGRyZW5bcmVzdWx0XVtwcm9wZXJ0eU5hbWVdKSB7XG5cdFx0XHQrK3Jlc3VsdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFNjcm9sbFN0YXJ0UG9zaXRpb24oKTogbnVtYmVyIHtcblx0XHRsZXQgd2luZG93U2Nyb2xsVmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93KSB7XG5cdFx0XHR3aW5kb3dTY3JvbGxWYWx1ZSA9IHdpbmRvd1t0aGlzLl9wYWdlT2Zmc2V0VHlwZV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpbmRvd1Njcm9sbFZhbHVlIHx8IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpW3RoaXMuX3Njcm9sbFR5cGVdIHx8IDA7XG5cdH1cblxuXHRwcm90ZWN0ZWQgbWluTWVhc3VyZWRDaGlsZFdpZHRoOiBudW1iZXI7XG5cdHByb3RlY3RlZCBtaW5NZWFzdXJlZENoaWxkSGVpZ2h0OiBudW1iZXI7XG5cblx0cHJvdGVjdGVkIHdyYXBHcm91cERpbWVuc2lvbnM6IFdyYXBHcm91cERpbWVuc2lvbnM7XG5cblx0cHJvdGVjdGVkIHJlc2V0V3JhcEdyb3VwRGltZW5zaW9ucygpOiB2b2lkIHtcblx0XHRjb25zdCBvbGRXcmFwR3JvdXBEaW1lbnNpb25zID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zO1xuXHRcdHRoaXMuaW52YWxpZGF0ZUFsbENhY2hlZE1lYXN1cmVtZW50cygpO1xuXG5cdFx0aWYgKCF0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzIHx8ICFvbGRXcmFwR3JvdXBEaW1lbnNpb25zIHx8IG9sZFdyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXMgPT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBpdGVtc1BlcldyYXBHcm91cDogbnVtYmVyID0gdGhpcy5jb3VudEl0ZW1zUGVyV3JhcEdyb3VwKCk7XG5cdFx0Zm9yIChsZXQgd3JhcEdyb3VwSW5kZXggPSAwOyB3cmFwR3JvdXBJbmRleCA8IG9sZFdyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwLmxlbmd0aDsgKyt3cmFwR3JvdXBJbmRleCkge1xuXHRcdFx0Y29uc3Qgb2xkV3JhcEdyb3VwRGltZW5zaW9uOiBXcmFwR3JvdXBEaW1lbnNpb24gPSBvbGRXcmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFt3cmFwR3JvdXBJbmRleF07XG5cdFx0XHRpZiAoIW9sZFdyYXBHcm91cERpbWVuc2lvbiB8fCAhb2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zIHx8ICFvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zLmxlbmd0aCAhPT0gaXRlbXNQZXJXcmFwR3JvdXApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaXRlbXNDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRsZXQgYXJyYXlTdGFydEluZGV4ID0gaXRlbXNQZXJXcmFwR3JvdXAgKiB3cmFwR3JvdXBJbmRleDtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXNQZXJXcmFwR3JvdXA7ICsraSkge1xuXHRcdFx0XHRpZiAoIXRoaXMuY29tcGFyZUl0ZW1zKG9sZFdyYXBHcm91cERpbWVuc2lvbi5pdGVtc1tpXSwgdGhpcy5pdGVtc1thcnJheVN0YXJ0SW5kZXggKyBpXSkpIHtcblx0XHRcdFx0XHRpdGVtc0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXRlbXNDaGFuZ2VkKSB7XG5cdFx0XHRcdCsrdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzICs9IG9sZFdyYXBHcm91cERpbWVuc2lvbi5jaGlsZFdpZHRoIHx8IDA7XG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzICs9IG9sZFdyYXBHcm91cERpbWVuc2lvbi5jaGlsZEhlaWdodCB8fCAwO1xuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XSA9IG9sZFdyYXBHcm91cERpbWVuc2lvbjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlRGltZW5zaW9ucygpOiBJRGltZW5zaW9ucyB7XG5cdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcblxuXHRcdGNvbnN0IG1heENhbGN1bGF0ZWRTY3JvbGxCYXJTaXplOiBudW1iZXIgPSAyNTsgLy8gTm90ZTogRm9ybXVsYSB0byBhdXRvLWNhbGN1bGF0ZSBkb2Vzbid0IHdvcmsgZm9yIFBhcmVudFNjcm9sbCwgc28gd2UgZGVmYXVsdCB0byB0aGlzIGlmIG5vdCBzZXQgYnkgY29uc3VtaW5nIGFwcGxpY2F0aW9uXG5cdFx0dGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0ID0gTWF0aC5tYXgoTWF0aC5taW4oc2Nyb2xsRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBzY3JvbGxFbGVtZW50LmNsaWVudEhlaWdodCwgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUpLCB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQpO1xuXHRcdHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gTWF0aC5tYXgoTWF0aC5taW4oc2Nyb2xsRWxlbWVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbEVsZW1lbnQuY2xpZW50V2lkdGgsIG1heENhbGN1bGF0ZWRTY3JvbGxCYXJTaXplKSwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGgpO1xuXG5cdFx0bGV0IHZpZXdwb3J0V2lkdGggPSBzY3JvbGxFbGVtZW50Lm9mZnNldFdpZHRoIC0gKHRoaXMuc2Nyb2xsYmFyV2lkdGggfHwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggfHwgKHRoaXMuaG9yaXpvbnRhbCA/IDAgOiBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZSkpO1xuXHRcdGxldCB2aWV3cG9ydEhlaWdodCA9IHNjcm9sbEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gKHRoaXMuc2Nyb2xsYmFySGVpZ2h0IHx8IHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodCB8fCAodGhpcy5ob3Jpem9udGFsID8gbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUgOiAwKSk7XG5cblx0XHRsZXQgY29udGVudCA9ICh0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYgJiYgdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHx8IHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuXHRcdGxldCBpdGVtc1BlcldyYXBHcm91cCA9IHRoaXMuY291bnRJdGVtc1BlcldyYXBHcm91cCgpO1xuXHRcdGxldCB3cmFwR3JvdXBzUGVyUGFnZTtcblxuXHRcdGxldCBkZWZhdWx0Q2hpbGRXaWR0aDtcblx0XHRsZXQgZGVmYXVsdENoaWxkSGVpZ2h0O1xuXG5cdFx0aWYgKHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSKSB7XG5cdFx0XHR2aWV3cG9ydFdpZHRoID0gdGhpcy5zc3JWaWV3cG9ydFdpZHRoO1xuXHRcdFx0dmlld3BvcnRIZWlnaHQgPSB0aGlzLnNzclZpZXdwb3J0SGVpZ2h0O1xuXHRcdFx0ZGVmYXVsdENoaWxkV2lkdGggPSB0aGlzLnNzckNoaWxkV2lkdGg7XG5cdFx0XHRkZWZhdWx0Q2hpbGRIZWlnaHQgPSB0aGlzLnNzckNoaWxkSGVpZ2h0O1xuXHRcdFx0bGV0IGl0ZW1zUGVyUm93ID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0V2lkdGggLyBkZWZhdWx0Q2hpbGRXaWR0aCksIDEpO1xuXHRcdFx0bGV0IGl0ZW1zUGVyQ29sID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0SGVpZ2h0IC8gZGVmYXVsdENoaWxkSGVpZ2h0KSwgMSk7XG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSA9IHRoaXMuaG9yaXpvbnRhbCA/IGl0ZW1zUGVyUm93IDogaXRlbXNQZXJDb2w7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCF0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XG5cdFx0XHRpZiAoY29udGVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmICghdGhpcy5jaGlsZFdpZHRoIHx8ICF0aGlzLmNoaWxkSGVpZ2h0KSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCAmJiB2aWV3cG9ydFdpZHRoID4gMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB2aWV3cG9ydFdpZHRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIXRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCAmJiB2aWV3cG9ydEhlaWdodCA+IDApIHtcblx0XHRcdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBjaGlsZCA9IGNvbnRlbnQuY2hpbGRyZW5bMF07XG5cdFx0XHRcdGxldCBjbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZShjaGlsZCk7XG5cdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gTWF0aC5taW4odGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGgsIGNsaWVudFJlY3Qud2lkdGgpO1xuXHRcdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSBNYXRoLm1pbih0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQsIGNsaWVudFJlY3QuaGVpZ2h0KTtcblx0XHRcdH1cblxuXHRcdFx0ZGVmYXVsdENoaWxkV2lkdGggPSB0aGlzLmNoaWxkV2lkdGggfHwgdGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcblx0XHRcdGRlZmF1bHRDaGlsZEhlaWdodCA9IHRoaXMuY2hpbGRIZWlnaHQgfHwgdGhpcy5taW5NZWFzdXJlZENoaWxkSGVpZ2h0IHx8IHZpZXdwb3J0SGVpZ2h0O1xuXHRcdFx0bGV0IGl0ZW1zUGVyUm93ID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0V2lkdGggLyBkZWZhdWx0Q2hpbGRXaWR0aCksIDEpO1xuXHRcdFx0bGV0IGl0ZW1zUGVyQ29sID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0SGVpZ2h0IC8gZGVmYXVsdENoaWxkSGVpZ2h0KSwgMSk7XG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSA9IHRoaXMuaG9yaXpvbnRhbCA/IGl0ZW1zUGVyUm93IDogaXRlbXNQZXJDb2w7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBzY3JvbGxPZmZzZXQgPSBzY3JvbGxFbGVtZW50W3RoaXMuX3Njcm9sbFR5cGVdIC0gKHRoaXMucHJldmlvdXNWaWV3UG9ydCA/IHRoaXMucHJldmlvdXNWaWV3UG9ydC5wYWRkaW5nIDogMCk7XG5cblx0XHRcdGxldCBhcnJheVN0YXJ0SW5kZXggPSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIgfHwgMDtcblx0XHRcdGxldCB3cmFwR3JvdXBJbmRleCA9IE1hdGguY2VpbChhcnJheVN0YXJ0SW5kZXggLyBpdGVtc1BlcldyYXBHcm91cCk7XG5cblx0XHRcdGxldCBtYXhXaWR0aEZvcldyYXBHcm91cCA9IDA7XG5cdFx0XHRsZXQgbWF4SGVpZ2h0Rm9yV3JhcEdyb3VwID0gMDtcblx0XHRcdGxldCBzdW1PZlZpc2libGVNYXhXaWR0aHMgPSAwO1xuXHRcdFx0bGV0IHN1bU9mVmlzaWJsZU1heEhlaWdodHMgPSAwO1xuXHRcdFx0d3JhcEdyb3Vwc1BlclBhZ2UgPSAwO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0KythcnJheVN0YXJ0SW5kZXg7XG5cdFx0XHRcdGxldCBjaGlsZCA9IGNvbnRlbnQuY2hpbGRyZW5baV07XG5cdFx0XHRcdGxldCBjbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZShjaGlsZCk7XG5cblx0XHRcdFx0bWF4V2lkdGhGb3JXcmFwR3JvdXAgPSBNYXRoLm1heChtYXhXaWR0aEZvcldyYXBHcm91cCwgY2xpZW50UmVjdC53aWR0aCk7XG5cdFx0XHRcdG1heEhlaWdodEZvcldyYXBHcm91cCA9IE1hdGgubWF4KG1heEhlaWdodEZvcldyYXBHcm91cCwgY2xpZW50UmVjdC5oZWlnaHQpO1xuXG5cdFx0XHRcdGlmIChhcnJheVN0YXJ0SW5kZXggJSBpdGVtc1BlcldyYXBHcm91cCA9PT0gMCkge1xuXHRcdFx0XHRcdGxldCBvbGRWYWx1ZSA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdO1xuXHRcdFx0XHRcdGlmIChvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0LS10aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XG5cdFx0XHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzIC09IG9sZFZhbHVlLmNoaWxkV2lkdGggfHwgMDtcblx0XHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzIC09IG9sZFZhbHVlLmNoaWxkSGVpZ2h0IHx8IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Kyt0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKGFycmF5U3RhcnRJbmRleCAtIGl0ZW1zUGVyV3JhcEdyb3VwLCBhcnJheVN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdID0ge1xuXHRcdFx0XHRcdFx0Y2hpbGRXaWR0aDogbWF4V2lkdGhGb3JXcmFwR3JvdXAsXG5cdFx0XHRcdFx0XHRjaGlsZEhlaWdodDogbWF4SGVpZ2h0Rm9yV3JhcEdyb3VwLFxuXHRcdFx0XHRcdFx0aXRlbXM6IGl0ZW1zXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzICs9IG1heFdpZHRoRm9yV3JhcEdyb3VwO1xuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzICs9IG1heEhlaWdodEZvcldyYXBHcm91cDtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmhvcml6b250YWwpIHtcblx0XHRcdFx0XHRcdGxldCBtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXAgPSBNYXRoLm1pbihtYXhXaWR0aEZvcldyYXBHcm91cCwgTWF0aC5tYXgodmlld3BvcnRXaWR0aCAtIHN1bU9mVmlzaWJsZU1heFdpZHRocywgMCkpO1xuXHRcdFx0XHRcdFx0aWYgKHNjcm9sbE9mZnNldCA+IDApIHtcblx0XHRcdFx0XHRcdFx0bGV0IHNjcm9sbE9mZnNldFRvUmVtb3ZlID0gTWF0aC5taW4oc2Nyb2xsT2Zmc2V0LCBtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXApO1xuXHRcdFx0XHRcdFx0XHRtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXAgLT0gc2Nyb2xsT2Zmc2V0VG9SZW1vdmU7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbE9mZnNldCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3VtT2ZWaXNpYmxlTWF4V2lkdGhzICs9IG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cDtcblx0XHRcdFx0XHRcdGlmIChtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXAgPiAwICYmIHZpZXdwb3J0V2lkdGggPj0gc3VtT2ZWaXNpYmxlTWF4V2lkdGhzKSB7XG5cdFx0XHRcdFx0XHRcdCsrd3JhcEdyb3Vwc1BlclBhZ2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxldCBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwID0gTWF0aC5taW4obWF4SGVpZ2h0Rm9yV3JhcEdyb3VwLCBNYXRoLm1heCh2aWV3cG9ydEhlaWdodCAtIHN1bU9mVmlzaWJsZU1heEhlaWdodHMsIDApKTtcblx0XHRcdFx0XHRcdGlmIChzY3JvbGxPZmZzZXQgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBzY3JvbGxPZmZzZXRUb1JlbW92ZSA9IE1hdGgubWluKHNjcm9sbE9mZnNldCwgbWF4VmlzaWJsZUhlaWdodEZvcldyYXBHcm91cCk7XG5cdFx0XHRcdFx0XHRcdG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXAgLT0gc2Nyb2xsT2Zmc2V0VG9SZW1vdmU7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbE9mZnNldCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cyArPSBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwO1xuXHRcdFx0XHRcdFx0aWYgKG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXAgPiAwICYmIHZpZXdwb3J0SGVpZ2h0ID49IHN1bU9mVmlzaWJsZU1heEhlaWdodHMpIHtcblx0XHRcdFx0XHRcdFx0Kyt3cmFwR3JvdXBzUGVyUGFnZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQrK3dyYXBHcm91cEluZGV4O1xuXG5cdFx0XHRcdFx0bWF4V2lkdGhGb3JXcmFwR3JvdXAgPSAwO1xuXHRcdFx0XHRcdG1heEhlaWdodEZvcldyYXBHcm91cCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IGF2ZXJhZ2VDaGlsZFdpZHRoID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZFdpZHRocyAvIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcblx0XHRcdGxldCBhdmVyYWdlQ2hpbGRIZWlnaHQgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0cyAvIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcblx0XHRcdGRlZmF1bHRDaGlsZFdpZHRoID0gdGhpcy5jaGlsZFdpZHRoIHx8IGF2ZXJhZ2VDaGlsZFdpZHRoIHx8IHZpZXdwb3J0V2lkdGg7XG5cdFx0XHRkZWZhdWx0Q2hpbGRIZWlnaHQgPSB0aGlzLmNoaWxkSGVpZ2h0IHx8IGF2ZXJhZ2VDaGlsZEhlaWdodCB8fCB2aWV3cG9ydEhlaWdodDtcblxuXHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRpZiAodmlld3BvcnRXaWR0aCA+IHN1bU9mVmlzaWJsZU1heFdpZHRocykge1xuXHRcdFx0XHRcdHdyYXBHcm91cHNQZXJQYWdlICs9IE1hdGguY2VpbCgodmlld3BvcnRXaWR0aCAtIHN1bU9mVmlzaWJsZU1heFdpZHRocykgLyBkZWZhdWx0Q2hpbGRXaWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2aWV3cG9ydEhlaWdodCA+IHN1bU9mVmlzaWJsZU1heEhlaWdodHMpIHtcblx0XHRcdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSArPSBNYXRoLmNlaWwoKHZpZXdwb3J0SGVpZ2h0IC0gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cykgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGl0ZW1Db3VudCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuXHRcdGxldCBpdGVtc1BlclBhZ2UgPSBpdGVtc1BlcldyYXBHcm91cCAqIHdyYXBHcm91cHNQZXJQYWdlO1xuXHRcdGxldCBwYWdlQ291bnRfZnJhY3Rpb25hbCA9IGl0ZW1Db3VudCAvIGl0ZW1zUGVyUGFnZTtcblx0XHRsZXQgbnVtYmVyT2ZXcmFwR3JvdXBzID0gTWF0aC5jZWlsKGl0ZW1Db3VudCAvIGl0ZW1zUGVyV3JhcEdyb3VwKTtcblxuXHRcdGxldCBzY3JvbGxMZW5ndGggPSAwO1xuXG5cdFx0bGV0IGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgPSB0aGlzLmhvcml6b250YWwgPyBkZWZhdWx0Q2hpbGRXaWR0aCA6IGRlZmF1bHRDaGlsZEhlaWdodDtcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xuXHRcdFx0bGV0IG51bVVua25vd25DaGlsZFNpemVzID0gMDtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZXcmFwR3JvdXBzOyArK2kpIHtcblx0XHRcdFx0bGV0IGNoaWxkU2l6ZSA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV0gJiYgdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXVt0aGlzLl9jaGlsZFNjcm9sbERpbV07XG5cdFx0XHRcdGlmIChjaGlsZFNpemUpIHtcblx0XHRcdFx0XHRzY3JvbGxMZW5ndGggKz0gY2hpbGRTaXplO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCsrbnVtVW5rbm93bkNoaWxkU2l6ZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0c2Nyb2xsTGVuZ3RoICs9IE1hdGgucm91bmQobnVtVW5rbm93bkNoaWxkU2l6ZXMgKiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2Nyb2xsTGVuZ3RoID0gbnVtYmVyT2ZXcmFwR3JvdXBzICogZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5oZWFkZXJFbGVtZW50UmVmKSB7XG5cdFx0XHRzY3JvbGxMZW5ndGggKz0gdGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXHRcdH1cblxuXHRcdGxldCB2aWV3cG9ydExlbmd0aCA9IHRoaXMuaG9yaXpvbnRhbCA/IHZpZXdwb3J0V2lkdGggOiB2aWV3cG9ydEhlaWdodDtcblx0XHRsZXQgbWF4U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heChzY3JvbGxMZW5ndGggLSB2aWV3cG9ydExlbmd0aCwgMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aXRlbUNvdW50OiBpdGVtQ291bnQsXG5cdFx0XHRpdGVtc1BlcldyYXBHcm91cDogaXRlbXNQZXJXcmFwR3JvdXAsXG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZTogd3JhcEdyb3Vwc1BlclBhZ2UsXG5cdFx0XHRpdGVtc1BlclBhZ2U6IGl0ZW1zUGVyUGFnZSxcblx0XHRcdHBhZ2VDb3VudF9mcmFjdGlvbmFsOiBwYWdlQ291bnRfZnJhY3Rpb25hbCxcblx0XHRcdGNoaWxkV2lkdGg6IGRlZmF1bHRDaGlsZFdpZHRoLFxuXHRcdFx0Y2hpbGRIZWlnaHQ6IGRlZmF1bHRDaGlsZEhlaWdodCxcblx0XHRcdHNjcm9sbExlbmd0aDogc2Nyb2xsTGVuZ3RoLFxuXHRcdFx0dmlld3BvcnRMZW5ndGg6IHZpZXdwb3J0TGVuZ3RoLFxuXHRcdFx0bWF4U2Nyb2xsUG9zaXRpb246IG1heFNjcm9sbFBvc2l0aW9uXG5cdFx0fTtcblx0fVxuXG5cdHByb3RlY3RlZCBjYWNoZWRQYWdlU2l6ZTogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIHByZXZpb3VzU2Nyb2xsTnVtYmVyRWxlbWVudHM6IG51bWJlciA9IDA7XG5cblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVBhZGRpbmcoYXJyYXlTdGFydEluZGV4V2l0aEJ1ZmZlcjogbnVtYmVyLCBkaW1lbnNpb25zOiBJRGltZW5zaW9ucyk6IG51bWJlciB7XG5cdFx0aWYgKGRpbWVuc2lvbnMuaXRlbUNvdW50ID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRsZXQgZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cCA9IGRpbWVuc2lvbnNbdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xuXHRcdGxldCBzdGFydGluZ1dyYXBHcm91cEluZGV4ID0gTWF0aC5mbG9vcihhcnJheVN0YXJ0SW5kZXhXaXRoQnVmZmVyIC8gZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cCkgfHwgMDtcblxuXHRcdGlmICghdGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgKiBzdGFydGluZ1dyYXBHcm91cEluZGV4O1xuXHRcdH1cblxuXHRcdGxldCBudW1Vbmtub3duQ2hpbGRTaXplcyA9IDA7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydGluZ1dyYXBHcm91cEluZGV4OyArK2kpIHtcblx0XHRcdGxldCBjaGlsZFNpemUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldICYmIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV1bdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xuXHRcdFx0aWYgKGNoaWxkU2l6ZSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gY2hpbGRTaXplO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0KytudW1Vbmtub3duQ2hpbGRTaXplcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzdWx0ICs9IE1hdGgucm91bmQobnVtVW5rbm93bkNoaWxkU2l6ZXMgKiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwKTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlUGFnZUluZm8oc2Nyb2xsUG9zaXRpb246IG51bWJlciwgZGltZW5zaW9uczogSURpbWVuc2lvbnMpOiBJUGFnZUluZm8ge1xuXHRcdGxldCBzY3JvbGxQZXJjZW50YWdlID0gMDtcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xuXHRcdFx0Y29uc3QgbnVtYmVyT2ZXcmFwR3JvdXBzID0gTWF0aC5jZWlsKGRpbWVuc2lvbnMuaXRlbUNvdW50IC8gZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cCk7XG5cdFx0XHRsZXQgdG90YWxTY3JvbGxlZExlbmd0aCA9IDA7XG5cdFx0XHRsZXQgZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cCA9IGRpbWVuc2lvbnNbdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZldyYXBHcm91cHM7ICsraSkge1xuXHRcdFx0XHRsZXQgY2hpbGRTaXplID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXSAmJiB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcblx0XHRcdFx0aWYgKGNoaWxkU2l6ZSkge1xuXHRcdFx0XHRcdHRvdGFsU2Nyb2xsZWRMZW5ndGggKz0gY2hpbGRTaXplO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRvdGFsU2Nyb2xsZWRMZW5ndGggKz0gZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzY3JvbGxQb3NpdGlvbiA8IHRvdGFsU2Nyb2xsZWRMZW5ndGgpIHtcblx0XHRcdFx0XHRzY3JvbGxQZXJjZW50YWdlID0gaSAvIG51bWJlck9mV3JhcEdyb3Vwcztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzY3JvbGxQZXJjZW50YWdlID0gc2Nyb2xsUG9zaXRpb24gLyBkaW1lbnNpb25zLnNjcm9sbExlbmd0aDtcblx0XHR9XG5cblx0XHRsZXQgc3RhcnRpbmdBcnJheUluZGV4X2ZyYWN0aW9uYWwgPSBNYXRoLm1pbihNYXRoLm1heChzY3JvbGxQZXJjZW50YWdlICogZGltZW5zaW9ucy5wYWdlQ291bnRfZnJhY3Rpb25hbCwgMCksIGRpbWVuc2lvbnMucGFnZUNvdW50X2ZyYWN0aW9uYWwpICogZGltZW5zaW9ucy5pdGVtc1BlclBhZ2U7XG5cblx0XHRsZXQgbWF4U3RhcnQgPSBkaW1lbnNpb25zLml0ZW1Db3VudCAtIGRpbWVuc2lvbnMuaXRlbXNQZXJQYWdlIC0gMTtcblx0XHRsZXQgYXJyYXlTdGFydEluZGV4ID0gTWF0aC5taW4oTWF0aC5mbG9vcihzdGFydGluZ0FycmF5SW5kZXhfZnJhY3Rpb25hbCksIG1heFN0YXJ0KTtcblx0XHRhcnJheVN0YXJ0SW5kZXggLT0gYXJyYXlTdGFydEluZGV4ICUgZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDsgLy8gcm91bmQgZG93biB0byBzdGFydCBvZiB3cmFwR3JvdXBcblxuXHRcdGlmICh0aGlzLnN0cmlwZWRUYWJsZSkge1xuXHRcdFx0bGV0IGJ1ZmZlckJvdW5kYXJ5ID0gMiAqIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXA7XG5cdFx0XHRpZiAoYXJyYXlTdGFydEluZGV4ICUgYnVmZmVyQm91bmRhcnkgIT09IDApIHtcblx0XHRcdFx0YXJyYXlTdGFydEluZGV4ID0gTWF0aC5tYXgoYXJyYXlTdGFydEluZGV4IC0gYXJyYXlTdGFydEluZGV4ICUgYnVmZmVyQm91bmRhcnksIDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBhcnJheUVuZEluZGV4ID0gTWF0aC5jZWlsKHN0YXJ0aW5nQXJyYXlJbmRleF9mcmFjdGlvbmFsKSArIGRpbWVuc2lvbnMuaXRlbXNQZXJQYWdlIC0gMTtcblx0XHRsZXQgZW5kSW5kZXhXaXRoaW5XcmFwR3JvdXAgPSAoYXJyYXlFbmRJbmRleCArIDEpICUgZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDtcblx0XHRpZiAoZW5kSW5kZXhXaXRoaW5XcmFwR3JvdXAgPiAwKSB7XG5cdFx0XHRhcnJheUVuZEluZGV4ICs9IGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXAgLSBlbmRJbmRleFdpdGhpbldyYXBHcm91cDsgLy8gcm91bmQgdXAgdG8gZW5kIG9mIHdyYXBHcm91cFxuXHRcdH1cblxuXHRcdGlmIChpc05hTihhcnJheVN0YXJ0SW5kZXgpKSB7XG5cdFx0XHRhcnJheVN0YXJ0SW5kZXggPSAwO1xuXHRcdH1cblx0XHRpZiAoaXNOYU4oYXJyYXlFbmRJbmRleCkpIHtcblx0XHRcdGFycmF5RW5kSW5kZXggPSAwO1xuXHRcdH1cblxuXHRcdGFycmF5U3RhcnRJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5U3RhcnRJbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XG5cdFx0YXJyYXlFbmRJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5RW5kSW5kZXgsIDApLCBkaW1lbnNpb25zLml0ZW1Db3VudCAtIDEpO1xuXG5cdFx0bGV0IGJ1ZmZlclNpemUgPSB0aGlzLmJ1ZmZlckFtb3VudCAqIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXA7XG5cdFx0bGV0IHN0YXJ0SW5kZXhXaXRoQnVmZmVyID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlTdGFydEluZGV4IC0gYnVmZmVyU2l6ZSwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XG5cdFx0bGV0IGVuZEluZGV4V2l0aEJ1ZmZlciA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5RW5kSW5kZXggKyBidWZmZXJTaXplLCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFydEluZGV4OiBhcnJheVN0YXJ0SW5kZXgsXG5cdFx0XHRlbmRJbmRleDogYXJyYXlFbmRJbmRleCxcblx0XHRcdHN0YXJ0SW5kZXhXaXRoQnVmZmVyOiBzdGFydEluZGV4V2l0aEJ1ZmZlcixcblx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogZW5kSW5kZXhXaXRoQnVmZmVyLFxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogc2Nyb2xsUG9zaXRpb24sXG5cdFx0XHRzY3JvbGxFbmRQb3NpdGlvbjogc2Nyb2xsUG9zaXRpb24gKyBkaW1lbnNpb25zLnZpZXdwb3J0TGVuZ3RoLFxuXHRcdFx0bWF4U2Nyb2xsUG9zaXRpb246IGRpbWVuc2lvbnMubWF4U2Nyb2xsUG9zaXRpb25cblx0XHR9O1xuXHR9XG5cblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVZpZXdwb3J0KCk6IElWaWV3cG9ydCB7XG5cdFx0bGV0IGRpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50c09mZnNldCgpO1xuXG5cdFx0bGV0IHNjcm9sbFN0YXJ0UG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbFN0YXJ0UG9zaXRpb24oKTtcblx0XHRpZiAoc2Nyb2xsU3RhcnRQb3NpdGlvbiA+IChkaW1lbnNpb25zLnNjcm9sbExlbmd0aCArIG9mZnNldCkgJiYgISh0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdykpIHtcblx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb24gPSBkaW1lbnNpb25zLnNjcm9sbExlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiAtPSBvZmZzZXQ7XG5cdFx0fVxuXHRcdHNjcm9sbFN0YXJ0UG9zaXRpb24gPSBNYXRoLm1heCgwLCBzY3JvbGxTdGFydFBvc2l0aW9uKTtcblxuXHRcdGxldCBwYWdlSW5mbyA9IHRoaXMuY2FsY3VsYXRlUGFnZUluZm8oc2Nyb2xsU3RhcnRQb3NpdGlvbiwgZGltZW5zaW9ucyk7XG5cdFx0bGV0IG5ld1BhZGRpbmcgPSB0aGlzLmNhbGN1bGF0ZVBhZGRpbmcocGFnZUluZm8uc3RhcnRJbmRleFdpdGhCdWZmZXIsIGRpbWVuc2lvbnMpO1xuXHRcdGxldCBuZXdTY3JvbGxMZW5ndGggPSBkaW1lbnNpb25zLnNjcm9sbExlbmd0aDtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFydEluZGV4OiBwYWdlSW5mby5zdGFydEluZGV4LFxuXHRcdFx0ZW5kSW5kZXg6IHBhZ2VJbmZvLmVuZEluZGV4LFxuXHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHBhZ2VJbmZvLnN0YXJ0SW5kZXhXaXRoQnVmZmVyLFxuXHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5lbmRJbmRleFdpdGhCdWZmZXIsXG5cdFx0XHRwYWRkaW5nOiBNYXRoLnJvdW5kKG5ld1BhZGRpbmcpLFxuXHRcdFx0c2Nyb2xsTGVuZ3RoOiBNYXRoLnJvdW5kKG5ld1Njcm9sbExlbmd0aCksXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBwYWdlSW5mby5zY3JvbGxTdGFydFBvc2l0aW9uLFxuXHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbEVuZFBvc2l0aW9uLFxuXHRcdFx0bWF4U2Nyb2xsUG9zaXRpb246IHBhZ2VJbmZvLm1heFNjcm9sbFBvc2l0aW9uXG5cdFx0fTtcblx0fVxufVxuXG5ATmdNb2R1bGUoe1xuXHRleHBvcnRzOiBbVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50XSxcblx0ZGVjbGFyYXRpb25zOiBbVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50XSxcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG5cdHByb3ZpZGVyczogW1xuXHRcdHtcblx0XHRcdHByb3ZpZGU6ICd2aXJ0dWFsLXNjcm9sbGVyLWRlZmF1bHQtb3B0aW9ucycsXG5cdFx0XHR1c2VGYWN0b3J5OiBWSVJUVUFMX1NDUk9MTEVSX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZXG5cdFx0fVxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlck1vZHVsZSB7IH1cbiJdfQ==