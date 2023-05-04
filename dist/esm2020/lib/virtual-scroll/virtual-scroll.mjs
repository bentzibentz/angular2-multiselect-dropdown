import { Component, ContentChild, ElementRef, EventEmitter, Inject, Optional, Input, NgModule, Output, ViewChild } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CommonModule } from '@angular/common';
import * as tween from '@tweenjs/tween.js';
import * as i0 from "@angular/core";
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
VirtualScrollerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }, { token: 'virtual-scroller-default-options', optional: true }], target: i0.ɵɵFactoryTarget.Component });
VirtualScrollerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VirtualScrollerComponent, selector: "virtual-scroller,[virtualScroller]", inputs: { executeRefreshOutsideAngularZone: "executeRefreshOutsideAngularZone", enableUnequalChildrenSizes: "enableUnequalChildrenSizes", useMarginInsteadOfTranslate: "useMarginInsteadOfTranslate", modifyOverflowStyleOfParentScroll: "modifyOverflowStyleOfParentScroll", stripedTable: "stripedTable", scrollbarWidth: "scrollbarWidth", scrollbarHeight: "scrollbarHeight", childWidth: "childWidth", childHeight: "childHeight", ssrChildWidth: "ssrChildWidth", ssrChildHeight: "ssrChildHeight", ssrViewportWidth: "ssrViewportWidth", ssrViewportHeight: "ssrViewportHeight", bufferAmount: "bufferAmount", scrollAnimationTime: "scrollAnimationTime", resizeBypassRefreshThreshold: "resizeBypassRefreshThreshold", scrollThrottlingTime: "scrollThrottlingTime", scrollDebounceTime: "scrollDebounceTime", checkResizeInterval: "checkResizeInterval", items: "items", compareItems: "compareItems", horizontal: "horizontal", parentScroll: "parentScroll" }, outputs: { vsUpdate: "vsUpdate", vsChange: "vsChange", vsStart: "vsStart", vsEnd: "vsEnd" }, host: { properties: { "class.horizontal": "horizontal", "class.vertical": "!horizontal", "class.selfScroll": "!parentScroll" } }, queries: [{ propertyName: "headerElementRef", first: true, predicate: ["header"], descendants: true, read: ElementRef }, { propertyName: "containerElementRef", first: true, predicate: ["container"], descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "contentElementRef", first: true, predicate: ["content"], descendants: true, read: ElementRef }, { propertyName: "invisiblePaddingElementRef", first: true, predicate: ["invisiblePadding"], descendants: true, read: ElementRef }], exportAs: ["virtualScroller"], usesOnChanges: true, ngImport: i0, template: `
    <div class="total-padding" #invisiblePadding></div>
    <div class="scrollable-content" #content>
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [":host{position:relative;display:block;-webkit-overflow-scrolling:touch}:host.horizontal.selfScroll{overflow-y:visible;overflow-x:auto}:host.vertical.selfScroll{overflow-y:auto;overflow-x:visible}.scrollable-content{top:0;left:0;width:100%;height:100%;max-width:100vw;max-height:100vh;position:absolute}.scrollable-content ::ng-deep>*{box-sizing:border-box}:host.horizontal{white-space:nowrap}:host.horizontal .scrollable-content{display:flex}:host.horizontal .scrollable-content ::ng-deep>*{flex-shrink:0;flex-grow:0;white-space:initial}.total-padding{width:1px;opacity:0}:host.horizontal .total-padding{height:100%}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['virtual-scroller-default-options']
                }] }]; }, propDecorators: { executeRefreshOutsideAngularZone: [{
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
            }] } });
export class VirtualScrollerModule {
}
VirtualScrollerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VirtualScrollerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerModule, declarations: [VirtualScrollerComponent], imports: [CommonModule], exports: [VirtualScrollerComponent] });
VirtualScrollerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerModule, providers: [
        {
            provide: 'virtual-scroller-default-options',
            useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
        }
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VirtualScrollerModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1tdWx0aXNlbGVjdC1kcm9wZG93bi1saWIvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFLUixNQUFNLEVBRU4sU0FBUyxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUE7O0FBYzFDLE1BQU0sVUFBVSx3Q0FBd0M7SUFDdkQsT0FBTztRQUNOLG9CQUFvQixFQUFFLENBQUM7UUFDdkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLG1CQUFtQixFQUFFLElBQUk7UUFDekIsNEJBQTRCLEVBQUUsQ0FBQztRQUMvQixpQ0FBaUMsRUFBRSxJQUFJO1FBQ3ZDLFlBQVksRUFBRSxLQUFLO0tBQ25CLENBQUM7QUFDSCxDQUFDO0FBZ0ZELE1BQU0sT0FBTyx3QkFBd0I7SUFJcEMsSUFBVyxZQUFZO1FBQ3RCLElBQUksUUFBUSxHQUFjLElBQUksQ0FBQyxnQkFBZ0IsSUFBUyxFQUFFLENBQUM7UUFDM0QsT0FBTztZQUNOLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLENBQUM7WUFDcEMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQztZQUNoQyxtQkFBbUIsRUFB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O1lBQ0MsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxVQUFVLEVBQUUsd0NBQXdDO1NBQ3BEO0tBQ0QsWUFOUyxZQUFZOzJGQVFWLHFCQUFxQjtrQkFYakMsUUFBUTttQkFBQztvQkFDVCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbkMsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNWOzRCQUNDLE9BQU8sRUFBRSxrQ0FBa0M7NEJBQzNDLFVBQVUsRUFBRSx3Q0FBd0M7eUJBQ3BEO3FCQUNEO2lCQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRDb250ZW50Q2hpbGQsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRPcHRpb25hbCxcblx0SW5wdXQsXG5cdE5nTW9kdWxlLFxuXHROZ1pvbmUsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIyLFxuXHRWaWV3Q2hpbGQsXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRJbmplY3Rpb25Ub2tlblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgKiBhcyB0d2VlbiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcydcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlckRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0b3B0aW9ucyc7XG5pbXBvcnQgeyBJUGFnZUluZm8gfSBmcm9tICcuL2lwYWdlaW5mbyc7XG5pbXBvcnQgeyBJVmlld3BvcnQgfSBmcm9tICcuL2l2aWV3cG9ydCc7XG5cbmltcG9ydCB7IFdyYXBHcm91cERpbWVuc2lvbnMgfSBmcm9tICcuL3dyYXBncm91cGRpbWVuc2lvbnMnO1xuaW1wb3J0IHsgV3JhcEdyb3VwRGltZW5zaW9uIH0gZnJvbSAnLi93cmFwZ3JvdXBkaW1lbnNpb24nO1xuXG5pbXBvcnQgeyBJRGltZW5zaW9ucyB9IGZyb20gJy4vaWRpbWVuc2lvbic7XG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIFZJUlRVQUxfU0NST0xMRVJfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogVmlydHVhbFNjcm9sbGVyRGVmYXVsdE9wdGlvbnMge1xuXHRyZXR1cm4ge1xuXHRcdHNjcm9sbFRocm90dGxpbmdUaW1lOiAwLFxuXHRcdHNjcm9sbERlYm91bmNlVGltZTogMCxcblx0XHRzY3JvbGxBbmltYXRpb25UaW1lOiA3NTAsXG5cdFx0Y2hlY2tSZXNpemVJbnRlcnZhbDogMTAwMCxcblx0XHRyZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkOiA1LFxuXHRcdG1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbDogdHJ1ZSxcblx0XHRzdHJpcGVkVGFibGU6IGZhbHNlXG5cdH07XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAndmlydHVhbC1zY3JvbGxlcixbdmlydHVhbFNjcm9sbGVyXScsXG5cdGV4cG9ydEFzOiAndmlydHVhbFNjcm9sbGVyJyxcblx0dGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidG90YWwtcGFkZGluZ1wiICNpbnZpc2libGVQYWRkaW5nPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzY3JvbGxhYmxlLWNvbnRlbnRcIiAjY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3MuaG9yaXpvbnRhbF0nOiBcImhvcml6b250YWxcIixcblx0XHQnW2NsYXNzLnZlcnRpY2FsXSc6IFwiIWhvcml6b250YWxcIixcblx0XHQnW2NsYXNzLnNlbGZTY3JvbGxdJzogXCIhcGFyZW50U2Nyb2xsXCJcblx0fSxcblx0c3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0ICBkaXNwbGF5OiBibG9jaztcbiAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgICB9XG5cblx0Omhvc3QuaG9yaXpvbnRhbC5zZWxmU2Nyb2xsIHtcbiAgICAgIG92ZXJmbG93LXk6IHZpc2libGU7XG4gICAgICBvdmVyZmxvdy14OiBhdXRvO1xuXHR9XG5cdDpob3N0LnZlcnRpY2FsLnNlbGZTY3JvbGwge1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIG92ZXJmbG93LXg6IHZpc2libGU7XG5cdH1cblxuICAgIC5zY3JvbGxhYmxlLWNvbnRlbnQge1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgbWF4LXdpZHRoOiAxMDB2dztcbiAgICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cblxuXHQuc2Nyb2xsYWJsZS1jb250ZW50IDo6bmctZGVlcCA+ICoge1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cblxuXHQ6aG9zdC5ob3Jpem9udGFsIHtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHR9XG5cblx0Omhvc3QuaG9yaXpvbnRhbCAuc2Nyb2xsYWJsZS1jb250ZW50IHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHR9XG5cblx0Omhvc3QuaG9yaXpvbnRhbCAuc2Nyb2xsYWJsZS1jb250ZW50IDo6bmctZGVlcCA+ICoge1xuXHRcdGZsZXgtc2hyaW5rOiAwO1xuXHRcdGZsZXgtZ3JvdzogMDtcblx0XHR3aGl0ZS1zcGFjZTogaW5pdGlhbDtcblx0fVxuXG4gICAgLnRvdGFsLXBhZGRpbmcge1xuICAgICAgd2lkdGg6IDFweDtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuXG4gICAgOmhvc3QuaG9yaXpvbnRhbCAudG90YWwtcGFkZGluZyB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblx0cHVibGljIHZpZXdQb3J0SXRlbXM6IGFueVtdO1xuXHRwdWJsaWMgd2luZG93ID0gd2luZG93O1xuXG5cdHB1YmxpYyBnZXQgdmlld1BvcnRJbmZvKCk6IElQYWdlSW5mbyB7XG5cdFx0bGV0IHBhZ2VJbmZvOiBJVmlld3BvcnQgPSB0aGlzLnByZXZpb3VzVmlld1BvcnQgfHwgPGFueT57fTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhcnRJbmRleDogcGFnZUluZm8uc3RhcnRJbmRleCB8fCAwLFxuXHRcdFx0ZW5kSW5kZXg6IHBhZ2VJbmZvLmVuZEluZGV4IHx8IDAsXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBwYWdlSW5mby5zY3JvbGxTdGFydFBvc2l0aW9uIHx8IDAsXG5cdFx0XHRzY3JvbGxFbmRQb3NpdGlvbjogcGFnZUluZm8uc2Nyb2xsRW5kUG9zaXRpb24gfHwgMCxcblx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiBwYWdlSW5mby5tYXhTY3JvbGxQb3NpdGlvbiB8fCAwLFxuXHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHBhZ2VJbmZvLnN0YXJ0SW5kZXhXaXRoQnVmZmVyIHx8IDAsXG5cdFx0XHRlbmRJbmRleFdpdGhCdWZmZXI6IHBhZ2VJbmZvLmVuZEluZGV4V2l0aEJ1ZmZlciB8fCAwXG5cdFx0fTtcblx0fVxuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBleGVjdXRlUmVmcmVzaE91dHNpZGVBbmd1bGFyWm9uZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdHByb3RlY3RlZCBfZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXM6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KClcblx0cHVibGljIGdldCBlbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcygpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXM7XG5cdH1cblx0cHVibGljIHNldCBlbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyh2YWx1ZTogYm9vbGVhbikge1xuXHRcdGlmICh0aGlzLl9lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA9PT0gdmFsdWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA9IHZhbHVlO1xuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyB1c2VNYXJnaW5JbnN0ZWFkT2ZUcmFuc2xhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgbW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsOiBib29sZWFuO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBzdHJpcGVkVGFibGU6IGJvb2xlYW47XG5cblx0QElucHV0KClcblx0cHVibGljIHNjcm9sbGJhcldpZHRoOiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIHNjcm9sbGJhckhlaWdodDogbnVtYmVyO1xuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBjaGlsZFdpZHRoOiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIGNoaWxkSGVpZ2h0OiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIHNzckNoaWxkV2lkdGg6IG51bWJlcjtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgc3NyQ2hpbGRIZWlnaHQ6IG51bWJlcjtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgc3NyVmlld3BvcnRXaWR0aDogbnVtYmVyID0gMTkyMDtcblxuXHRASW5wdXQoKVxuXHRwdWJsaWMgc3NyVmlld3BvcnRIZWlnaHQ6IG51bWJlciA9IDEwODA7XG5cblx0cHJvdGVjdGVkIF9idWZmZXJBbW91bnQ6IG51bWJlciA9IDA7XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgYnVmZmVyQW1vdW50KCk6IG51bWJlciB7XG5cdFx0aWYgKHR5cGVvZiAodGhpcy5fYnVmZmVyQW1vdW50KSA9PT0gJ251bWJlcicgJiYgdGhpcy5fYnVmZmVyQW1vdW50ID49IDApIHtcblx0XHRcdHJldHVybiB0aGlzLl9idWZmZXJBbW91bnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzID8gNSA6IDA7XG5cdFx0fVxuXHR9XG5cdHB1YmxpYyBzZXQgYnVmZmVyQW1vdW50KHZhbHVlOiBudW1iZXIpIHtcblx0XHR0aGlzLl9idWZmZXJBbW91bnQgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBzY3JvbGxBbmltYXRpb25UaW1lOiBudW1iZXI7XG5cblx0QElucHV0KClcblx0cHVibGljIHJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ6IG51bWJlcjtcblxuXHRwcm90ZWN0ZWQgX3Njcm9sbFRocm90dGxpbmdUaW1lOiBudW1iZXI7XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgc2Nyb2xsVGhyb3R0bGluZ1RpbWUoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsVGhyb3R0bGluZ1RpbWU7XG5cdH1cblx0cHVibGljIHNldCBzY3JvbGxUaHJvdHRsaW5nVGltZSh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5fc2Nyb2xsVGhyb3R0bGluZ1RpbWUgPSB2YWx1ZTtcblx0XHR0aGlzLnVwZGF0ZU9uU2Nyb2xsRnVuY3Rpb24oKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfc2Nyb2xsRGVib3VuY2VUaW1lOiBudW1iZXI7XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgc2Nyb2xsRGVib3VuY2VUaW1lKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbERlYm91bmNlVGltZTtcblx0fVxuXHRwdWJsaWMgc2V0IHNjcm9sbERlYm91bmNlVGltZSh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5fc2Nyb2xsRGVib3VuY2VUaW1lID0gdmFsdWU7XG5cdFx0dGhpcy51cGRhdGVPblNjcm9sbEZ1bmN0aW9uKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgb25TY3JvbGw6ICgpID0+IHZvaWQ7XG5cdHByb3RlY3RlZCB1cGRhdGVPblNjcm9sbEZ1bmN0aW9uKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLnNjcm9sbERlYm91bmNlVGltZSkge1xuXHRcdFx0dGhpcy5vblNjcm9sbCA9IDxhbnk+dGhpcy5kZWJvdW5jZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XG5cdFx0XHR9LCB0aGlzLnNjcm9sbERlYm91bmNlVGltZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMuc2Nyb2xsVGhyb3R0bGluZ1RpbWUpIHtcblx0XHRcdHRoaXMub25TY3JvbGwgPSA8YW55PnRoaXMudGhyb3R0bGVUcmFpbGluZygoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XG5cdFx0XHR9LCB0aGlzLnNjcm9sbFRocm90dGxpbmdUaW1lKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLm9uU2Nyb2xsID0gKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyOiBudW1iZXI7XG5cdHByb3RlY3RlZCBfY2hlY2tSZXNpemVJbnRlcnZhbDogbnVtYmVyO1xuXHRASW5wdXQoKVxuXHRwdWJsaWMgZ2V0IGNoZWNrUmVzaXplSW50ZXJ2YWwoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbDtcblx0fVxuXHRwdWJsaWMgc2V0IGNoZWNrUmVzaXplSW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuXHRcdGlmICh0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWwgPSB2YWx1ZTtcblx0XHR0aGlzLmFkZFNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfaXRlbXM6IGFueVtdID0gW107XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgaXRlbXMoKTogYW55W10ge1xuXHRcdHJldHVybiB0aGlzLl9pdGVtcztcblx0fVxuXHRwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBhbnlbXSkge1xuXHRcdGlmICh2YWx1ZSA9PT0gdGhpcy5faXRlbXMpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9pdGVtcyA9IHZhbHVlIHx8IFtdO1xuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcblx0fVxuXG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBjb21wYXJlSXRlbXM6IChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiBib29sZWFuID0gKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IGl0ZW0xID09PSBpdGVtMjtcblxuXHRwcm90ZWN0ZWQgX2hvcml6b250YWw6IGJvb2xlYW47XG5cdEBJbnB1dCgpXG5cdHB1YmxpYyBnZXQgaG9yaXpvbnRhbCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5faG9yaXpvbnRhbDtcblx0fVxuXHRwdWJsaWMgc2V0IGhvcml6b250YWwodmFsdWU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9ob3Jpem9udGFsID0gdmFsdWU7XG5cdFx0dGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZXZlcnRQYXJlbnRPdmVyc2Nyb2xsKCk6IHZvaWQge1xuXHRcdGNvbnN0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcblx0XHRpZiAoc2Nyb2xsRWxlbWVudCAmJiB0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93KSB7XG5cdFx0XHRzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy15J10gPSB0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93Lnk7XG5cdFx0XHRzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy14J10gPSB0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93Lng7XG5cdFx0fVxuXG5cdFx0dGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHByb3RlY3RlZCBvbGRQYXJlbnRTY3JvbGxPdmVyZmxvdzogeyB4OiBzdHJpbmcsIHk6IHN0cmluZyB9O1xuXHRwcm90ZWN0ZWQgX3BhcmVudFNjcm9sbDogRWxlbWVudCB8IFdpbmRvdztcblx0QElucHV0KClcblx0cHVibGljIGdldCBwYXJlbnRTY3JvbGwoKTogRWxlbWVudCB8IFdpbmRvdyB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudFNjcm9sbDtcblx0fVxuXHRwdWJsaWMgc2V0IHBhcmVudFNjcm9sbCh2YWx1ZTogRWxlbWVudCB8IFdpbmRvdykge1xuXHRcdGlmICh0aGlzLl9wYXJlbnRTY3JvbGwgPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5yZXZlcnRQYXJlbnRPdmVyc2Nyb2xsKCk7XG5cdFx0dGhpcy5fcGFyZW50U2Nyb2xsID0gdmFsdWU7XG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XG5cblx0XHRjb25zdCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XG5cdFx0aWYgKHRoaXMubW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsICYmIHNjcm9sbEVsZW1lbnQgIT09IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93ID0geyB4OiBzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy14J10sIHk6IHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXknXSB9O1xuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteSddID0gdGhpcy5ob3Jpem9udGFsID8gJ3Zpc2libGUnIDogJ2F1dG8nO1xuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddID0gdGhpcy5ob3Jpem9udGFsID8gJ2F1dG8nIDogJ3Zpc2libGUnO1xuXHRcdH1cblx0fVxuXG5cdEBPdXRwdXQoKVxuXHRwdWJsaWMgdnNVcGRhdGU6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG5cdEBPdXRwdXQoKVxuXHRwdWJsaWMgdnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+KCk7XG5cblx0QE91dHB1dCgpXG5cdHB1YmxpYyB2c1N0YXJ0OiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xuXG5cdEBPdXRwdXQoKVxuXHRwdWJsaWMgdnNFbmQ6IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+KCk7XG5cblx0QFZpZXdDaGlsZCgnY29udGVudCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxuXHRwcm90ZWN0ZWQgY29udGVudEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cblx0QFZpZXdDaGlsZCgnaW52aXNpYmxlUGFkZGluZycsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxuXHRwcm90ZWN0ZWQgaW52aXNpYmxlUGFkZGluZ0VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cblx0QENvbnRlbnRDaGlsZCgnaGVhZGVyJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXG5cdHByb3RlY3RlZCBoZWFkZXJFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG5cdEBDb250ZW50Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxuXHRwcm90ZWN0ZWQgY29udGFpbmVyRWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuXHRwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XG5cdH1cblxuXHRwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0dGhpcy5yZW1vdmVTY3JvbGxFdmVudEhhbmRsZXJzKCk7XG5cdFx0dGhpcy5yZXZlcnRQYXJlbnRPdmVyc2Nyb2xsKCk7XG5cdH1cblxuXHRwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG5cdFx0bGV0IGluZGV4TGVuZ3RoQ2hhbmdlZCA9IHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggIT09IHRoaXMuaXRlbXMubGVuZ3RoO1xuXHRcdHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcblxuXHRcdGNvbnN0IGZpcnN0UnVuOiBib29sZWFuID0gIWNoYW5nZXMuaXRlbXMgfHwgIWNoYW5nZXMuaXRlbXMucHJldmlvdXNWYWx1ZSB8fCBjaGFuZ2VzLml0ZW1zLnByZXZpb3VzVmFsdWUubGVuZ3RoID09PSAwO1xuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChpbmRleExlbmd0aENoYW5nZWQgfHwgZmlyc3RSdW4pO1xuXHR9XG5cblxuXHRwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoICE9PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5jYWNoZWRJdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuXHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKHRydWUpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByZXZpb3VzVmlld1BvcnQgJiYgdGhpcy52aWV3UG9ydEl0ZW1zICYmIHRoaXMudmlld1BvcnRJdGVtcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRsZXQgaXRlbXNBcnJheUNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aWV3UG9ydEl0ZW1zLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmICghdGhpcy5jb21wYXJlSXRlbXModGhpcy5pdGVtc1t0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIgKyBpXSwgdGhpcy52aWV3UG9ydEl0ZW1zW2ldKSkge1xuXHRcdFx0XHRcdGl0ZW1zQXJyYXlDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGl0ZW1zQXJyYXlDaGFuZ2VkKSB7XG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwodHJ1ZSk7XG5cdH1cblxuXHRwdWJsaWMgaW52YWxpZGF0ZUFsbENhY2hlZE1lYXN1cmVtZW50cygpOiB2b2lkIHtcblx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMgPSB7XG5cdFx0XHRtYXhDaGlsZFNpemVQZXJXcmFwR3JvdXA6IFtdLFxuXHRcdFx0bnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM6IDAsXG5cdFx0XHRzdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHM6IDAsXG5cdFx0XHRzdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzOiAwXG5cdFx0fTtcblxuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcblxuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XG5cdH1cblxuXHRwdWJsaWMgaW52YWxpZGF0ZUNhY2hlZE1lYXN1cmVtZW50Rm9ySXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLmludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEF0SW5kZXgoaW5kZXgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHR9XG5cblx0cHVibGljIGludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXHRcdGlmICh0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XG5cdFx0XHRsZXQgY2FjaGVkTWVhc3VyZW1lbnQgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2luZGV4XTtcblx0XHRcdGlmIChjYWNoZWRNZWFzdXJlbWVudCkge1xuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2luZGV4XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0LS10aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgLT0gY2FjaGVkTWVhc3VyZW1lbnQuY2hpbGRXaWR0aCB8fCAwO1xuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0cyAtPSBjYWNoZWRNZWFzdXJlbWVudC5jaGlsZEhlaWdodCB8fCAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHR9XG5cblx0cHVibGljIHNjcm9sbEludG8oaXRlbTogYW55LCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XG5cdFx0bGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuc2Nyb2xsVG9JbmRleChpbmRleCwgYWxpZ25Ub0JlZ2lubmluZywgYWRkaXRpb25hbE9mZnNldCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgc2Nyb2xsVG9JbmRleChpbmRleDogbnVtYmVyLCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XG5cdFx0bGV0IG1heFJldHJpZXM6IG51bWJlciA9IDU7XG5cblx0XHRsZXQgcmV0cnlJZk5lZWRlZCA9ICgpID0+IHtcblx0XHRcdC0tbWF4UmV0cmllcztcblx0XHRcdGlmIChtYXhSZXRyaWVzIDw9IDApIHtcblx0XHRcdFx0aWYgKGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKCk7XG5cdFx0XHRsZXQgZGVzaXJlZFN0YXJ0SW5kZXggPSBNYXRoLm1pbihNYXRoLm1heChpbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XG5cdFx0XHRpZiAodGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXggPT09IGRlc2lyZWRTdGFydEluZGV4KSB7XG5cdFx0XHRcdGlmIChhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaykge1xuXHRcdFx0XHRcdGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIDAsIHJldHJ5SWZOZWVkZWQpO1xuXHRcdH07XG5cblx0XHR0aGlzLnNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgcmV0cnlJZk5lZWRlZCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2Nyb2xsVG9JbmRleF9pbnRlcm5hbChpbmRleDogbnVtYmVyLCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XG5cdFx0YW5pbWF0aW9uTWlsbGlzZWNvbmRzID0gYW5pbWF0aW9uTWlsbGlzZWNvbmRzID09PSB1bmRlZmluZWQgPyB0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgOiBhbmltYXRpb25NaWxsaXNlY29uZHM7XG5cblx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuXHRcdGxldCBzY3JvbGwgPSB0aGlzLmNhbGN1bGF0ZVBhZGRpbmcoaW5kZXgsIGRpbWVuc2lvbnMpICsgYWRkaXRpb25hbE9mZnNldDtcblx0XHRpZiAoIWFsaWduVG9CZWdpbm5pbmcpIHtcblx0XHRcdHNjcm9sbCAtPSBkaW1lbnNpb25zLndyYXBHcm91cHNQZXJQYWdlICogZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XG5cdFx0fVxuXG5cdFx0dGhpcy5zY3JvbGxUb1Bvc2l0aW9uKHNjcm9sbCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgc2Nyb2xsVG9Qb3NpdGlvbihzY3JvbGxQb3NpdGlvbjogbnVtYmVyLCBhbmltYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciA9IHVuZGVmaW5lZCwgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSB1bmRlZmluZWQpOiB2b2lkIHtcblx0XHRzY3JvbGxQb3NpdGlvbiArPSB0aGlzLmdldEVsZW1lbnRzT2Zmc2V0KCk7XG5cblx0XHRhbmltYXRpb25NaWxsaXNlY29uZHMgPSBhbmltYXRpb25NaWxsaXNlY29uZHMgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2Nyb2xsQW5pbWF0aW9uVGltZSA6IGFuaW1hdGlvbk1pbGxpc2Vjb25kcztcblxuXHRcdGxldCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XG5cblx0XHRsZXQgYW5pbWF0aW9uUmVxdWVzdDogbnVtYmVyO1xuXG5cdFx0aWYgKHRoaXMuY3VycmVudFR3ZWVuKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRUd2Vlbi5zdG9wKCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRUd2VlbiA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRpZiAoIWFuaW1hdGlvbk1pbGxpc2Vjb25kcykge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShzY3JvbGxFbGVtZW50LCB0aGlzLl9zY3JvbGxUeXBlLCBzY3JvbGxQb3NpdGlvbik7XG5cdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB0d2VlbkNvbmZpZ09iaiA9IHsgc2Nyb2xsUG9zaXRpb246IHNjcm9sbEVsZW1lbnRbdGhpcy5fc2Nyb2xsVHlwZV0gfTtcblxuXHRcdGxldCBuZXdUd2VlbiA9IG5ldyB0d2Vlbi5Ud2Vlbih0d2VlbkNvbmZpZ09iailcblx0XHRcdC50byh7IHNjcm9sbFBvc2l0aW9uIH0sIGFuaW1hdGlvbk1pbGxpc2Vjb25kcylcblx0XHRcdC5lYXNpbmcodHdlZW4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXG5cdFx0XHQub25VcGRhdGUoKGRhdGEpID0+IHtcblx0XHRcdFx0aWYgKGlzTmFOKGRhdGEuc2Nyb2xsUG9zaXRpb24pKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoc2Nyb2xsRWxlbWVudCwgdGhpcy5fc2Nyb2xsVHlwZSwgZGF0YS5zY3JvbGxQb3NpdGlvbik7XG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uU3RvcCgoKSA9PiB7XG5cdFx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvblJlcXVlc3QpO1xuXHRcdFx0fSlcblx0XHRcdC5zdGFydCgpO1xuXG5cdFx0Y29uc3QgYW5pbWF0ZSA9ICh0aW1lPzogbnVtYmVyKSA9PiB7XG5cdFx0XHRpZiAoIW5ld1R3ZWVuW1wiaXNQbGF5aW5nXCJdKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRuZXdUd2Vlbi51cGRhdGUodGltZSk7XG5cdFx0XHRpZiAodHdlZW5Db25maWdPYmouc2Nyb2xsUG9zaXRpb24gPT09IHNjcm9sbFBvc2l0aW9uKSB7XG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSwgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRcdGFuaW1hdGlvblJlcXVlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0YW5pbWF0ZSgpO1xuXHRcdHRoaXMuY3VycmVudFR3ZWVuID0gbmV3VHdlZW47XG5cdH1cblxuXHRwcm90ZWN0ZWQgaXNBbmd1bGFyVW5pdmVyc2FsU1NSOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLFxuXHRcdHByb3RlY3RlZCByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyLFxuXHRcdHByb3RlY3RlZCByZWFkb25seSB6b25lOiBOZ1pvbmUsXG5cdFx0cHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG5cdFx0QE9wdGlvbmFsKCkgQEluamVjdCgndmlydHVhbC1zY3JvbGxlci1kZWZhdWx0LW9wdGlvbnMnKVxuXHRcdG9wdGlvbnM6IFZpcnR1YWxTY3JvbGxlckRlZmF1bHRPcHRpb25zKSB7XG5cblx0XHR0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUiA9IGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCk7XG5cblx0XHR0aGlzLnNjcm9sbFRocm90dGxpbmdUaW1lID0gb3B0aW9ucy5zY3JvbGxUaHJvdHRsaW5nVGltZTtcblx0XHR0aGlzLnNjcm9sbERlYm91bmNlVGltZSA9IG9wdGlvbnMuc2Nyb2xsRGVib3VuY2VUaW1lO1xuXHRcdHRoaXMuc2Nyb2xsQW5pbWF0aW9uVGltZSA9IG9wdGlvbnMuc2Nyb2xsQW5pbWF0aW9uVGltZTtcblx0XHR0aGlzLnNjcm9sbGJhcldpZHRoID0gb3B0aW9ucy5zY3JvbGxiYXJXaWR0aDtcblx0XHR0aGlzLnNjcm9sbGJhckhlaWdodCA9IG9wdGlvbnMuc2Nyb2xsYmFySGVpZ2h0O1xuXHRcdHRoaXMuY2hlY2tSZXNpemVJbnRlcnZhbCA9IG9wdGlvbnMuY2hlY2tSZXNpemVJbnRlcnZhbDtcblx0XHR0aGlzLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQgPSBvcHRpb25zLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ7XG5cdFx0dGhpcy5tb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGwgPSBvcHRpb25zLm1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbDtcblx0XHR0aGlzLnN0cmlwZWRUYWJsZSA9IG9wdGlvbnMuc3RyaXBlZFRhYmxlO1xuXG5cdFx0dGhpcy5ob3Jpem9udGFsID0gZmFsc2U7XG5cdFx0dGhpcy5yZXNldFdyYXBHcm91cERpbWVuc2lvbnMoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRFbGVtZW50U2l6ZShlbGVtZW50OiBIVE1MRWxlbWVudCkgOiBDbGllbnRSZWN0IHtcblx0XHRsZXQgcmVzdWx0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRsZXQgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblx0XHRsZXQgbWFyZ2luVG9wID0gcGFyc2VJbnQoc3R5bGVzWydtYXJnaW4tdG9wJ10sIDEwKSB8fCAwO1xuXHRcdGxldCBtYXJnaW5Cb3R0b20gPSBwYXJzZUludChzdHlsZXNbJ21hcmdpbi1ib3R0b20nXSwgMTApIHx8IDA7XG5cdFx0bGV0IG1hcmdpbkxlZnQgPSBwYXJzZUludChzdHlsZXNbJ21hcmdpbi1sZWZ0J10sIDEwKSB8fCAwO1xuXHRcdGxldCBtYXJnaW5SaWdodCA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLXJpZ2h0J10sIDEwKSB8fCAwO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogcmVzdWx0LnRvcCArIG1hcmdpblRvcCxcblx0XHRcdGJvdHRvbTogcmVzdWx0LmJvdHRvbSArIG1hcmdpbkJvdHRvbSxcblx0XHRcdGxlZnQ6IHJlc3VsdC5sZWZ0ICsgbWFyZ2luTGVmdCxcblx0XHRcdHJpZ2h0OiByZXN1bHQucmlnaHQgKyBtYXJnaW5SaWdodCxcblx0XHRcdHdpZHRoOiByZXN1bHQud2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQsXG5cdFx0XHRoZWlnaHQ6IHJlc3VsdC5oZWlnaHQgKyBtYXJnaW5Ub3AgKyBtYXJnaW5Cb3R0b20sXG4gICAgICB5OnJlc3VsdC50b3AgK21hcmdpblRvcCxcbiAgICAgIHg6cmVzdWx0LmxlZnQgKyBtYXJnaW5MZWZ0LFxuICAgICAgdG9KU09OKCk6IGFueSB7XG4gICAgICAgIHJlc3VsdC50b0pTT04oKTtcbiAgICAgIH1cblx0XHR9O1xuXHR9XG5cblx0cHJvdGVjdGVkIHByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0OiBDbGllbnRSZWN0O1xuXHRwcm90ZWN0ZWQgY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZCgpOiB2b2lkIHtcblx0XHRsZXQgYm91bmRpbmdSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZSh0aGlzLmdldFNjcm9sbEVsZW1lbnQoKSk7XG5cblx0XHRsZXQgc2l6ZUNoYW5nZWQ6IGJvb2xlYW47XG5cdFx0aWYgKCF0aGlzLnByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0KSB7XG5cdFx0XHRzaXplQ2hhbmdlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB3aWR0aENoYW5nZSA9IE1hdGguYWJzKGJvdW5kaW5nUmVjdC53aWR0aCAtIHRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3Qud2lkdGgpO1xuXHRcdFx0bGV0IGhlaWdodENoYW5nZSA9IE1hdGguYWJzKGJvdW5kaW5nUmVjdC5oZWlnaHQgLSB0aGlzLnByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0LmhlaWdodCk7XG5cdFx0XHRzaXplQ2hhbmdlZCA9IHdpZHRoQ2hhbmdlID4gdGhpcy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkIHx8IGhlaWdodENoYW5nZSA+IHRoaXMucmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZDtcblx0XHR9XG5cblx0XHRpZiAoc2l6ZUNoYW5nZWQpIHtcblx0XHRcdHRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3QgPSBib3VuZGluZ1JlY3Q7XG5cdFx0XHRpZiAoYm91bmRpbmdSZWN0LndpZHRoID4gMCAmJiBib3VuZGluZ1JlY3QuaGVpZ2h0ID4gMCkge1xuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfaW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5O1xuXHRwcm90ZWN0ZWQgX29mZnNldFR5cGU7XG5cdHByb3RlY3RlZCBfc2Nyb2xsVHlwZTtcblx0cHJvdGVjdGVkIF9wYWdlT2Zmc2V0VHlwZTtcblx0cHJvdGVjdGVkIF9jaGlsZFNjcm9sbERpbTtcblx0cHJvdGVjdGVkIF90cmFuc2xhdGVEaXI7XG5cdHByb3RlY3RlZCBfbWFyZ2luRGlyO1xuXHRwcm90ZWN0ZWQgdXBkYXRlRGlyZWN0aW9uKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmhvcml6b250YWwpIHtcblx0XHRcdHRoaXMuX2ludmlzaWJsZVBhZGRpbmdQcm9wZXJ0eSA9ICd3aWR0aCc7XG5cdFx0XHR0aGlzLl9vZmZzZXRUeXBlID0gJ29mZnNldExlZnQnO1xuXHRcdFx0dGhpcy5fcGFnZU9mZnNldFR5cGUgPSAncGFnZVhPZmZzZXQnO1xuXHRcdFx0dGhpcy5fY2hpbGRTY3JvbGxEaW0gPSAnY2hpbGRXaWR0aCc7XG5cdFx0XHR0aGlzLl9tYXJnaW5EaXIgPSAnbWFyZ2luLWxlZnQnO1xuXHRcdFx0dGhpcy5fdHJhbnNsYXRlRGlyID0gJ3RyYW5zbGF0ZVgnO1xuXHRcdFx0dGhpcy5fc2Nyb2xsVHlwZSA9ICdzY3JvbGxMZWZ0Jztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLl9pbnZpc2libGVQYWRkaW5nUHJvcGVydHkgPSAnaGVpZ2h0Jztcblx0XHRcdHRoaXMuX29mZnNldFR5cGUgPSAnb2Zmc2V0VG9wJztcblx0XHRcdHRoaXMuX3BhZ2VPZmZzZXRUeXBlID0gJ3BhZ2VZT2Zmc2V0Jztcblx0XHRcdHRoaXMuX2NoaWxkU2Nyb2xsRGltID0gJ2NoaWxkSGVpZ2h0Jztcblx0XHRcdHRoaXMuX21hcmdpbkRpciA9ICdtYXJnaW4tdG9wJztcblx0XHRcdHRoaXMuX3RyYW5zbGF0ZURpciA9ICd0cmFuc2xhdGVZJztcblx0XHRcdHRoaXMuX3Njcm9sbFR5cGUgPSAnc2Nyb2xsVG9wJztcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZGVib3VuY2UoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcblx0XHRjb25zdCB0aHJvdHRsZWQgPSB0aGlzLnRocm90dGxlVHJhaWxpbmcoZnVuYywgd2FpdCk7XG5cdFx0Y29uc3QgcmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3R0bGVkWydjYW5jZWwnXSgpO1xuXHRcdFx0dGhyb3R0bGVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0XHRyZXN1bHRbJ2NhbmNlbCddID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3R0bGVkWydjYW5jZWwnXSgpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0cHJvdGVjdGVkIHRocm90dGxlVHJhaWxpbmcoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcblx0XHRsZXQgdGltZW91dCA9IHVuZGVmaW5lZDtcblx0XHRsZXQgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCByZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cdFx0XHRfYXJndW1lbnRzID0gYXJndW1lbnRzXG5cblx0XHRcdGlmICh0aW1lb3V0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHdhaXQgPD0gMCkge1xuXHRcdFx0XHRmdW5jLmFwcGx5KF90aGlzLCBfYXJndW1lbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoX3RoaXMsIF9hcmd1bWVudHMpO1xuXHRcdFx0XHR9LCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHJlc3VsdFsnY2FuY2VsJ10gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoOiBudW1iZXIgPSAwO1xuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodDogbnVtYmVyID0gMDtcblxuXHRwcm90ZWN0ZWQgcGFkZGluZzogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIHByZXZpb3VzVmlld1BvcnQ6IElWaWV3cG9ydCA9IDxhbnk+e307XG5cdHByb3RlY3RlZCBjdXJyZW50VHdlZW46IGFueTtcblx0cHJvdGVjdGVkIGNhY2hlZEl0ZW1zTGVuZ3RoOiBudW1iZXI7XG5cblx0cHJvdGVjdGVkIGRpc3Bvc2VTY3JvbGxIYW5kbGVyOiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xuXHRwcm90ZWN0ZWQgZGlzcG9zZVJlc2l6ZUhhbmRsZXI6ICgpID0+IHZvaWQgfCB1bmRlZmluZWQ7XG5cblx0cHJvdGVjdGVkIHJlZnJlc2hfaW50ZXJuYWwoaXRlbXNBcnJheU1vZGlmaWVkOiBib29sZWFuLCByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSB1bmRlZmluZWQsIG1heFJ1blRpbWVzOiBudW1iZXIgPSAyKTogdm9pZCB7XG5cdFx0Ly9ub3RlOiBtYXhSdW5UaW1lcyBpcyB0byBmb3JjZSBpdCB0byBrZWVwIHJlY2FsY3VsYXRpbmcgaWYgdGhlIHByZXZpb3VzIGl0ZXJhdGlvbiBjYXVzZWQgYSByZS1yZW5kZXIgKGRpZmZlcmVudCBzbGljZWQgaXRlbXMgaW4gdmlld3BvcnQgb3Igc2Nyb2xsUG9zaXRpb24gY2hhbmdlZCkuXG5cdFx0Ly9UaGUgZGVmYXVsdCBvZiAyeCBtYXggd2lsbCBwcm9iYWJseSBiZSBhY2N1cmF0ZSBlbm91Z2ggd2l0aG91dCBjYXVzaW5nIHRvbyBsYXJnZSBhIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tcblx0XHQvL1RoZSBjb2RlIHdvdWxkIHR5cGljYWxseSBxdWl0IG91dCBvbiB0aGUgMm5kIGl0ZXJhdGlvbiBhbnl3YXlzLiBUaGUgbWFpbiB0aW1lIGl0J2QgdGhpbmsgbW9yZSB0aGFuIDIgcnVucyB3b3VsZCBiZSBuZWNlc3Nhcnkgd291bGQgYmUgZm9yIHZhc3RseSBkaWZmZXJlbnQgc2l6ZWQgY2hpbGQgaXRlbXMgb3IgaWYgdGhpcyBpcyB0aGUgMXN0IHRpbWUgdGhlIGl0ZW1zIGFycmF5IHdhcyBpbml0aWFsaXplZC5cblx0XHQvL1dpdGhvdXQgbWF4UnVuVGltZXMsIElmIHRoZSB1c2VyIGlzIGFjdGl2ZWx5IHNjcm9sbGluZyB0aGlzIGNvZGUgd291bGQgYmVjb21lIGFuIGluZmluaXRlIGxvb3AgdW50aWwgdGhleSBzdG9wcGVkIHNjcm9sbGluZy4gVGhpcyB3b3VsZCBiZSBva2F5LCBleGNlcHQgZWFjaCBzY3JvbGwgZXZlbnQgd291bGQgc3RhcnQgYW4gYWRkaXRpb25hbCBpbmZpbnRlIGxvb3AuIFdlIHdhbnQgdG8gc2hvcnQtY2lyY3VpdCBpdCB0byBwcmV2ZW50IHRoaXMuXG5cblx0XHRpZiAoaXRlbXNBcnJheU1vZGlmaWVkICYmIHRoaXMucHJldmlvdXNWaWV3UG9ydCAmJiB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiA+IDApIHtcblx0XHQvL2lmIGl0ZW1zIHdlcmUgcHJlcGVuZGVkLCBzY3JvbGwgZm9yd2FyZCB0byBrZWVwIHNhbWUgaXRlbXMgdmlzaWJsZVxuXHRcdFx0bGV0IG9sZFZpZXdQb3J0ID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0O1xuXHRcdFx0bGV0IG9sZFZpZXdQb3J0SXRlbXMgPSB0aGlzLnZpZXdQb3J0SXRlbXM7XG5cblx0XHRcdGxldCBvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2sgPSByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2s7XG5cdFx0XHRyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2sgPSAoKSA9PiB7XG5cdFx0XHRcdGxldCBzY3JvbGxMZW5ndGhEZWx0YSA9IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxMZW5ndGggLSBvbGRWaWV3UG9ydC5zY3JvbGxMZW5ndGg7XG5cdFx0XHRcdGlmIChzY3JvbGxMZW5ndGhEZWx0YSA+IDAgJiYgdGhpcy52aWV3UG9ydEl0ZW1zKSB7XG5cdFx0XHRcdFx0bGV0IG9sZFN0YXJ0SXRlbSA9IG9sZFZpZXdQb3J0SXRlbXNbMF07XG5cdFx0XHRcdFx0bGV0IG9sZFN0YXJ0SXRlbUluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoeCA9PiB0aGlzLmNvbXBhcmVJdGVtcyhvbGRTdGFydEl0ZW0sIHgpKTtcblx0XHRcdFx0XHRpZiAob2xkU3RhcnRJdGVtSW5kZXggPiB0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIpIHtcblx0XHRcdFx0XHRcdGxldCBpdGVtT3JkZXJDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMudmlld1BvcnRJdGVtcy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuY29tcGFyZUl0ZW1zKHRoaXMuaXRlbXNbb2xkU3RhcnRJdGVtSW5kZXggKyBpXSwgb2xkVmlld1BvcnRJdGVtc1tpXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpdGVtT3JkZXJDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoIWl0ZW1PcmRlckNoYW5nZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zY3JvbGxUb1Bvc2l0aW9uKHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uICsgc2Nyb2xsTGVuZ3RoRGVsdGEgLCAwLCBvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9sZFJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaykge1xuXHRcdFx0XHRcdG9sZFJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXG5cdFx0XHRcdGlmIChpdGVtc0FycmF5TW9kaWZpZWQpIHtcblx0XHRcdFx0XHR0aGlzLnJlc2V0V3JhcEdyb3VwRGltZW5zaW9ucygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB2aWV3cG9ydCA9IHRoaXMuY2FsY3VsYXRlVmlld3BvcnQoKTtcblxuXHRcdFx0XHRsZXQgc3RhcnRDaGFuZ2VkID0gaXRlbXNBcnJheU1vZGlmaWVkIHx8IHZpZXdwb3J0LnN0YXJ0SW5kZXggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zdGFydEluZGV4O1xuXHRcdFx0XHRsZXQgZW5kQ2hhbmdlZCA9IGl0ZW1zQXJyYXlNb2RpZmllZCB8fCB2aWV3cG9ydC5lbmRJbmRleCAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LmVuZEluZGV4O1xuXHRcdFx0XHRsZXQgc2Nyb2xsTGVuZ3RoQ2hhbmdlZCA9IHZpZXdwb3J0LnNjcm9sbExlbmd0aCAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbExlbmd0aDtcblx0XHRcdFx0bGV0IHBhZGRpbmdDaGFuZ2VkID0gdmlld3BvcnQucGFkZGluZyAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnBhZGRpbmc7XG5cdFx0XHRcdGxldCBzY3JvbGxQb3NpdGlvbkNoYW5nZWQgPSB2aWV3cG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiB8fCB2aWV3cG9ydC5zY3JvbGxFbmRQb3NpdGlvbiAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbEVuZFBvc2l0aW9uIHx8IHZpZXdwb3J0Lm1heFNjcm9sbFBvc2l0aW9uICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQubWF4U2Nyb2xsUG9zaXRpb247XG5cblx0XHRcdFx0dGhpcy5wcmV2aW91c1ZpZXdQb3J0ID0gdmlld3BvcnQ7XG5cblx0XHRcdFx0aWYgKHNjcm9sbExlbmd0aENoYW5nZWQpIHtcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW52aXNpYmxlUGFkZGluZ0VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5faW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5LCBgJHt2aWV3cG9ydC5zY3JvbGxMZW5ndGh9cHhgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChwYWRkaW5nQ2hhbmdlZCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLnVzZU1hcmdpbkluc3RlYWRPZlRyYW5zbGF0ZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX21hcmdpbkRpciwgYCR7dmlld3BvcnQucGFkZGluZ31weGApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke3ZpZXdwb3J0LnBhZGRpbmd9cHgpYCk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dlYmtpdFRyYW5zZm9ybScsIGAke3RoaXMuX3RyYW5zbGF0ZURpcn0oJHt2aWV3cG9ydC5wYWRkaW5nfXB4KWApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmhlYWRlckVsZW1lbnRSZWYpIHtcblx0XHRcdFx0XHRsZXQgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKVt0aGlzLl9zY3JvbGxUeXBlXTtcblx0XHRcdFx0XHRsZXQgY29udGFpbmVyT2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50c09mZnNldCgpO1xuXHRcdFx0XHRcdGxldCBvZmZzZXQgPSBNYXRoLm1heChzY3JvbGxQb3NpdGlvbiAtIHZpZXdwb3J0LnBhZGRpbmcgLSBjb250YWluZXJPZmZzZXQgKyB0aGlzLmhlYWRlckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQsIDApO1xuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0aGlzLl90cmFuc2xhdGVEaXJ9KCR7b2Zmc2V0fXB4KWApO1xuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3ZWJraXRUcmFuc2Zvcm0nLCBgJHt0aGlzLl90cmFuc2xhdGVEaXJ9KCR7b2Zmc2V0fXB4KWApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgY2hhbmdlRXZlbnRBcmc6IElQYWdlSW5mbyA9IChzdGFydENoYW5nZWQgfHwgZW5kQ2hhbmdlZCkgPyB7XG5cdFx0XHRcdFx0c3RhcnRJbmRleDogdmlld3BvcnQuc3RhcnRJbmRleCxcblx0XHRcdFx0XHRlbmRJbmRleDogdmlld3BvcnQuZW5kSW5kZXgsXG5cdFx0XHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogdmlld3BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbixcblx0XHRcdFx0XHRzY3JvbGxFbmRQb3NpdGlvbjogdmlld3BvcnQuc2Nyb2xsRW5kUG9zaXRpb24sXG5cdFx0XHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyLFxuXHRcdFx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyLFxuXHRcdFx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiB2aWV3cG9ydC5tYXhTY3JvbGxQb3NpdGlvblxuXHRcdFx0XHR9IDogdW5kZWZpbmVkO1xuXG5cblx0XHRcdFx0aWYgKHN0YXJ0Q2hhbmdlZCB8fCBlbmRDaGFuZ2VkIHx8IHNjcm9sbFBvc2l0aW9uQ2hhbmdlZCkge1xuXHRcdFx0XHRcdGNvbnN0IGhhbmRsZUNoYW5nZWQgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHQvLyB1cGRhdGUgdGhlIHNjcm9sbCBsaXN0IHRvIHRyaWdnZXIgcmUtcmVuZGVyIG9mIGNvbXBvbmVudHMgaW4gdmlld3BvcnRcblx0XHRcdFx0XHRcdHRoaXMudmlld1BvcnRJdGVtcyA9IHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyID49IDAgJiYgdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyID49IDAgPyB0aGlzLml0ZW1zLnNsaWNlKHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyLCB2aWV3cG9ydC5lbmRJbmRleFdpdGhCdWZmZXIgKyAxKSA6IFtdO1xuXHRcdFx0XHRcdFx0dGhpcy52c1VwZGF0ZS5lbWl0KHRoaXMudmlld1BvcnRJdGVtcyk7XG5cblx0XHRcdFx0XHRcdGlmIChzdGFydENoYW5nZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy52c1N0YXJ0LmVtaXQoY2hhbmdlRXZlbnRBcmcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoZW5kQ2hhbmdlZCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnZzRW5kLmVtaXQoY2hhbmdlRXZlbnRBcmcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3RhcnRDaGFuZ2VkIHx8IGVuZENoYW5nZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblx0XHRcdFx0XHRcdFx0dGhpcy52c0NoYW5nZS5lbWl0KGNoYW5nZUV2ZW50QXJnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG1heFJ1blRpbWVzID4gMCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaywgbWF4UnVuVGltZXMgLSAxKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAocmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdGlmICh0aGlzLmV4ZWN1dGVSZWZyZXNoT3V0c2lkZUFuZ3VsYXJab25lKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVDaGFuZ2VkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy56b25lLnJ1bihoYW5kbGVDaGFuZ2VkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKG1heFJ1blRpbWVzID4gMCAmJiAoc2Nyb2xsTGVuZ3RoQ2hhbmdlZCB8fCBwYWRkaW5nQ2hhbmdlZCkpIHtcblx0XHRcdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSwgcmVmcmVzaENvbXBsZXRlZENhbGxiYWNrLCBtYXhSdW5UaW1lcyAtIDEpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0U2Nyb2xsRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93ID8gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keSA6IHRoaXMucGFyZW50U2Nyb2xsIHx8IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXHR9XG5cblx0cHJvdGVjdGVkIGFkZFNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcblxuXHRcdHRoaXMucmVtb3ZlU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuXG5cdFx0dGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdykge1xuXHRcdFx0XHR0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcblx0XHRcdFx0dGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAncmVzaXplJywgdGhpcy5vblNjcm9sbCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHNjcm9sbEVsZW1lbnQsICdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcblx0XHRcdFx0aWYgKHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWwgPiAwKSB7XG5cdFx0XHRcdFx0dGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXIgPSA8YW55PnNldEludGVydmFsKCgpID0+IHsgdGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkKCk7IH0sIHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVtb3ZlU2Nyb2xsRXZlbnRIYW5kbGVycygpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXIpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyKSB7XG5cdFx0XHR0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyKCk7XG5cdFx0XHR0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRpc3Bvc2VSZXNpemVIYW5kbGVyKSB7XG5cdFx0XHR0aGlzLmRpc3Bvc2VSZXNpemVIYW5kbGVyKCk7XG5cdFx0XHR0aGlzLmRpc3Bvc2VSZXNpemVIYW5kbGVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBnZXRFbGVtZW50c09mZnNldCgpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0bGV0IG9mZnNldCA9IDA7XG5cblx0XHRpZiAodGhpcy5jb250YWluZXJFbGVtZW50UmVmICYmIHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRvZmZzZXQgKz0gdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGhpcy5fb2Zmc2V0VHlwZV07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucGFyZW50U2Nyb2xsKSB7XG5cdFx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXHRcdFx0bGV0IGVsZW1lbnRDbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG5cdFx0XHRsZXQgc2Nyb2xsQ2xpZW50UmVjdCA9IHRoaXMuZ2V0RWxlbWVudFNpemUoc2Nyb2xsRWxlbWVudCk7XG5cdFx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XG5cdFx0XHRcdG9mZnNldCArPSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0IC0gc2Nyb2xsQ2xpZW50UmVjdC5sZWZ0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9mZnNldCArPSBlbGVtZW50Q2xpZW50UmVjdC50b3AgLSBzY3JvbGxDbGllbnRSZWN0LnRvcDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCEodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpKSB7XG5cdFx0XHRcdG9mZnNldCArPSBzY3JvbGxFbGVtZW50W3RoaXMuX3Njcm9sbFR5cGVdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvZmZzZXQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgY291bnRJdGVtc1BlcldyYXBHcm91cCgpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xuXHRcdFx0cmV0dXJuIE1hdGgucm91bmQodGhpcy5ob3Jpem9udGFsID8gdGhpcy5zc3JWaWV3cG9ydEhlaWdodCAvIHRoaXMuc3NyQ2hpbGRIZWlnaHQgOiB0aGlzLnNzclZpZXdwb3J0V2lkdGggLyB0aGlzLnNzckNoaWxkV2lkdGgpO1xuXHRcdH1cblxuXHRcdGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmhvcml6b250YWwgPyAnb2Zmc2V0TGVmdCcgOiAnb2Zmc2V0VG9wJztcblx0XHRsZXQgY2hpbGRyZW4gPSAoKHRoaXMuY29udGFpbmVyRWxlbWVudFJlZiAmJiB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgfHwgdGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5jaGlsZHJlbjtcblxuXHRcdGxldCBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuID8gY2hpbGRyZW4ubGVuZ3RoIDogMDtcblx0XHRpZiAoY2hpbGRyZW5MZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdGxldCBmaXJzdE9mZnNldCA9IGNoaWxkcmVuWzBdW3Byb3BlcnR5TmFtZV07XG5cdFx0bGV0IHJlc3VsdCA9IDE7XG5cdFx0d2hpbGUgKHJlc3VsdCA8IGNoaWxkcmVuTGVuZ3RoICYmIGZpcnN0T2Zmc2V0ID09PSBjaGlsZHJlbltyZXN1bHRdW3Byb3BlcnR5TmFtZV0pIHtcblx0XHRcdCsrcmVzdWx0O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0U2Nyb2xsU3RhcnRQb3NpdGlvbigpOiBudW1iZXIge1xuXHRcdGxldCB3aW5kb3dTY3JvbGxWYWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRpZiAodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpIHtcblx0XHRcdHdpbmRvd1Njcm9sbFZhbHVlID0gd2luZG93W3RoaXMuX3BhZ2VPZmZzZXRUeXBlXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2luZG93U2Nyb2xsVmFsdWUgfHwgdGhpcy5nZXRTY3JvbGxFbGVtZW50KClbdGhpcy5fc2Nyb2xsVHlwZV0gfHwgMDtcblx0fVxuXG5cdHByb3RlY3RlZCBtaW5NZWFzdXJlZENoaWxkV2lkdGg6IG51bWJlcjtcblx0cHJvdGVjdGVkIG1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQ6IG51bWJlcjtcblxuXHRwcm90ZWN0ZWQgd3JhcEdyb3VwRGltZW5zaW9uczogV3JhcEdyb3VwRGltZW5zaW9ucztcblxuXHRwcm90ZWN0ZWQgcmVzZXRXcmFwR3JvdXBEaW1lbnNpb25zKCk6IHZvaWQge1xuXHRcdGNvbnN0IG9sZFdyYXBHcm91cERpbWVuc2lvbnMgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnM7XG5cdFx0dGhpcy5pbnZhbGlkYXRlQWxsQ2FjaGVkTWVhc3VyZW1lbnRzKCk7XG5cblx0XHRpZiAoIXRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMgfHwgIW9sZFdyYXBHcm91cERpbWVuc2lvbnMgfHwgb2xkV3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcyA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGl0ZW1zUGVyV3JhcEdyb3VwOiBudW1iZXIgPSB0aGlzLmNvdW50SXRlbXNQZXJXcmFwR3JvdXAoKTtcblx0XHRmb3IgKGxldCB3cmFwR3JvdXBJbmRleCA9IDA7IHdyYXBHcm91cEluZGV4IDwgb2xkV3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXAubGVuZ3RoOyArK3dyYXBHcm91cEluZGV4KSB7XG5cdFx0XHRjb25zdCBvbGRXcmFwR3JvdXBEaW1lbnNpb246IFdyYXBHcm91cERpbWVuc2lvbiA9IG9sZFdyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XTtcblx0XHRcdGlmICghb2xkV3JhcEdyb3VwRGltZW5zaW9uIHx8ICFvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXMgfHwgIW9sZFdyYXBHcm91cERpbWVuc2lvbi5pdGVtcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXMubGVuZ3RoICE9PSBpdGVtc1BlcldyYXBHcm91cCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBpdGVtc0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdGxldCBhcnJheVN0YXJ0SW5kZXggPSBpdGVtc1BlcldyYXBHcm91cCAqIHdyYXBHcm91cEluZGV4O1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc1BlcldyYXBHcm91cDsgKytpKSB7XG5cdFx0XHRcdGlmICghdGhpcy5jb21wYXJlSXRlbXMob2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zW2ldLCB0aGlzLml0ZW1zW2FycmF5U3RhcnRJbmRleCArIGldKSkge1xuXHRcdFx0XHRcdGl0ZW1zQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpdGVtc0NoYW5nZWQpIHtcblx0XHRcdFx0Kyt0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgKz0gb2xkV3JhcEdyb3VwRGltZW5zaW9uLmNoaWxkV2lkdGggfHwgMDtcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgKz0gb2xkV3JhcEdyb3VwRGltZW5zaW9uLmNoaWxkSGVpZ2h0IHx8IDA7XG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdID0gb2xkV3JhcEdyb3VwRGltZW5zaW9uO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVEaW1lbnNpb25zKCk6IElEaW1lbnNpb25zIHtcblx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXG5cdFx0Y29uc3QgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemU6IG51bWJlciA9IDI1OyAvLyBOb3RlOiBGb3JtdWxhIHRvIGF1dG8tY2FsY3VsYXRlIGRvZXNuJ3Qgd29yayBmb3IgUGFyZW50U2Nyb2xsLCBzbyB3ZSBkZWZhdWx0IHRvIHRoaXMgaWYgbm90IHNldCBieSBjb25zdW1pbmcgYXBwbGljYXRpb25cblx0XHR0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQgPSBNYXRoLm1heChNYXRoLm1pbihzY3JvbGxFbGVtZW50Lm9mZnNldEhlaWdodCAtIHNjcm9sbEVsZW1lbnQuY2xpZW50SGVpZ2h0LCBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZSksIHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodCk7XG5cdFx0dGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBNYXRoLm1heChNYXRoLm1pbihzY3JvbGxFbGVtZW50Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRWxlbWVudC5jbGllbnRXaWR0aCwgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUpLCB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCk7XG5cblx0XHRsZXQgdmlld3BvcnRXaWR0aCA9IHNjcm9sbEVsZW1lbnQub2Zmc2V0V2lkdGggLSAodGhpcy5zY3JvbGxiYXJXaWR0aCB8fCB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCB8fCAodGhpcy5ob3Jpem9udGFsID8gMCA6IG1heENhbGN1bGF0ZWRTY3JvbGxCYXJTaXplKSk7XG5cdFx0bGV0IHZpZXdwb3J0SGVpZ2h0ID0gc2Nyb2xsRWxlbWVudC5vZmZzZXRIZWlnaHQgLSAodGhpcy5zY3JvbGxiYXJIZWlnaHQgfHwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0IHx8ICh0aGlzLmhvcml6b250YWwgPyBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZSA6IDApKTtcblxuXHRcdGxldCBjb250ZW50ID0gKHRoaXMuY29udGFpbmVyRWxlbWVudFJlZiAmJiB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgfHwgdGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG5cdFx0bGV0IGl0ZW1zUGVyV3JhcEdyb3VwID0gdGhpcy5jb3VudEl0ZW1zUGVyV3JhcEdyb3VwKCk7XG5cdFx0bGV0IHdyYXBHcm91cHNQZXJQYWdlO1xuXG5cdFx0bGV0IGRlZmF1bHRDaGlsZFdpZHRoO1xuXHRcdGxldCBkZWZhdWx0Q2hpbGRIZWlnaHQ7XG5cblx0XHRpZiAodGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IpIHtcblx0XHRcdHZpZXdwb3J0V2lkdGggPSB0aGlzLnNzclZpZXdwb3J0V2lkdGg7XG5cdFx0XHR2aWV3cG9ydEhlaWdodCA9IHRoaXMuc3NyVmlld3BvcnRIZWlnaHQ7XG5cdFx0XHRkZWZhdWx0Q2hpbGRXaWR0aCA9IHRoaXMuc3NyQ2hpbGRXaWR0aDtcblx0XHRcdGRlZmF1bHRDaGlsZEhlaWdodCA9IHRoaXMuc3NyQ2hpbGRIZWlnaHQ7XG5cdFx0XHRsZXQgaXRlbXNQZXJSb3cgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRXaWR0aCAvIGRlZmF1bHRDaGlsZFdpZHRoKSwgMSk7XG5cdFx0XHRsZXQgaXRlbXNQZXJDb2wgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRIZWlnaHQgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpLCAxKTtcblx0XHRcdHdyYXBHcm91cHNQZXJQYWdlID0gdGhpcy5ob3Jpem9udGFsID8gaXRlbXNQZXJSb3cgOiBpdGVtc1BlckNvbDtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIXRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcblx0XHRcdGlmIChjb250ZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYgKCF0aGlzLmNoaWxkV2lkdGggfHwgIXRoaXMuY2hpbGRIZWlnaHQpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoICYmIHZpZXdwb3J0V2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHZpZXdwb3J0V2lkdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghdGhpcy5taW5NZWFzdXJlZENoaWxkSGVpZ2h0ICYmIHZpZXdwb3J0SGVpZ2h0ID4gMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGNoaWxkID0gY29udGVudC5jaGlsZHJlblswXTtcblx0XHRcdFx0bGV0IGNsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKGNoaWxkKTtcblx0XHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSBNYXRoLm1pbih0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCwgY2xpZW50UmVjdC53aWR0aCk7XG5cdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IE1hdGgubWluKHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCwgY2xpZW50UmVjdC5oZWlnaHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWZhdWx0Q2hpbGRXaWR0aCA9IHRoaXMuY2hpbGRXaWR0aCB8fCB0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCB8fCB2aWV3cG9ydFdpZHRoO1xuXHRcdFx0ZGVmYXVsdENoaWxkSGVpZ2h0ID0gdGhpcy5jaGlsZEhlaWdodCB8fCB0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgfHwgdmlld3BvcnRIZWlnaHQ7XG5cdFx0XHRsZXQgaXRlbXNQZXJSb3cgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRXaWR0aCAvIGRlZmF1bHRDaGlsZFdpZHRoKSwgMSk7XG5cdFx0XHRsZXQgaXRlbXNQZXJDb2wgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRIZWlnaHQgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpLCAxKTtcblx0XHRcdHdyYXBHcm91cHNQZXJQYWdlID0gdGhpcy5ob3Jpem9udGFsID8gaXRlbXNQZXJSb3cgOiBpdGVtc1BlckNvbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHNjcm9sbE9mZnNldCA9IHNjcm9sbEVsZW1lbnRbdGhpcy5fc2Nyb2xsVHlwZV0gLSAodGhpcy5wcmV2aW91c1ZpZXdQb3J0ID8gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnBhZGRpbmcgOiAwKTtcblxuXHRcdFx0bGV0IGFycmF5U3RhcnRJbmRleCA9IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlciB8fCAwO1xuXHRcdFx0bGV0IHdyYXBHcm91cEluZGV4ID0gTWF0aC5jZWlsKGFycmF5U3RhcnRJbmRleCAvIGl0ZW1zUGVyV3JhcEdyb3VwKTtcblxuXHRcdFx0bGV0IG1heFdpZHRoRm9yV3JhcEdyb3VwID0gMDtcblx0XHRcdGxldCBtYXhIZWlnaHRGb3JXcmFwR3JvdXAgPSAwO1xuXHRcdFx0bGV0IHN1bU9mVmlzaWJsZU1heFdpZHRocyA9IDA7XG5cdFx0XHRsZXQgc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cyA9IDA7XG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSA9IDA7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHQrK2FycmF5U3RhcnRJbmRleDtcblx0XHRcdFx0bGV0IGNoaWxkID0gY29udGVudC5jaGlsZHJlbltpXTtcblx0XHRcdFx0bGV0IGNsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKGNoaWxkKTtcblxuXHRcdFx0XHRtYXhXaWR0aEZvcldyYXBHcm91cCA9IE1hdGgubWF4KG1heFdpZHRoRm9yV3JhcEdyb3VwLCBjbGllbnRSZWN0LndpZHRoKTtcblx0XHRcdFx0bWF4SGVpZ2h0Rm9yV3JhcEdyb3VwID0gTWF0aC5tYXgobWF4SGVpZ2h0Rm9yV3JhcEdyb3VwLCBjbGllbnRSZWN0LmhlaWdodCk7XG5cblx0XHRcdFx0aWYgKGFycmF5U3RhcnRJbmRleCAlIGl0ZW1zUGVyV3JhcEdyb3VwID09PSAwKSB7XG5cdFx0XHRcdFx0bGV0IG9sZFZhbHVlID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFt3cmFwR3JvdXBJbmRleF07XG5cdFx0XHRcdFx0aWYgKG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0XHQtLXRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcblx0XHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgLT0gb2xkVmFsdWUuY2hpbGRXaWR0aCB8fCAwO1xuXHRcdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgLT0gb2xkVmFsdWUuY2hpbGRIZWlnaHQgfHwgMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQrK3RoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcblx0XHRcdFx0XHRjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMuc2xpY2UoYXJyYXlTdGFydEluZGV4IC0gaXRlbXNQZXJXcmFwR3JvdXAsIGFycmF5U3RhcnRJbmRleCk7XG5cdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFt3cmFwR3JvdXBJbmRleF0gPSB7XG5cdFx0XHRcdFx0XHRjaGlsZFdpZHRoOiBtYXhXaWR0aEZvcldyYXBHcm91cCxcblx0XHRcdFx0XHRcdGNoaWxkSGVpZ2h0OiBtYXhIZWlnaHRGb3JXcmFwR3JvdXAsXG5cdFx0XHRcdFx0XHRpdGVtczogaXRlbXNcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgKz0gbWF4V2lkdGhGb3JXcmFwR3JvdXA7XG5cdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgKz0gbWF4SGVpZ2h0Rm9yV3JhcEdyb3VwO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRcdFx0bGV0IG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCA9IE1hdGgubWluKG1heFdpZHRoRm9yV3JhcEdyb3VwLCBNYXRoLm1heCh2aWV3cG9ydFdpZHRoIC0gc3VtT2ZWaXNpYmxlTWF4V2lkdGhzLCAwKSk7XG5cdFx0XHRcdFx0XHRpZiAoc2Nyb2xsT2Zmc2V0ID4gMCkge1xuXHRcdFx0XHRcdFx0XHRsZXQgc2Nyb2xsT2Zmc2V0VG9SZW1vdmUgPSBNYXRoLm1pbihzY3JvbGxPZmZzZXQsIG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCk7XG5cdFx0XHRcdFx0XHRcdG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcblx0XHRcdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0IC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdW1PZlZpc2libGVNYXhXaWR0aHMgKz0gbWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwO1xuXHRcdFx0XHRcdFx0aWYgKG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCA+IDAgJiYgdmlld3BvcnRXaWR0aCA+PSBzdW1PZlZpc2libGVNYXhXaWR0aHMpIHtcblx0XHRcdFx0XHRcdFx0Kyt3cmFwR3JvdXBzUGVyUGFnZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXAgPSBNYXRoLm1pbihtYXhIZWlnaHRGb3JXcmFwR3JvdXAsIE1hdGgubWF4KHZpZXdwb3J0SGVpZ2h0IC0gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cywgMCkpO1xuXHRcdFx0XHRcdFx0aWYgKHNjcm9sbE9mZnNldCA+IDApIHtcblx0XHRcdFx0XHRcdFx0bGV0IHNjcm9sbE9mZnNldFRvUmVtb3ZlID0gTWF0aC5taW4oc2Nyb2xsT2Zmc2V0LCBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwKTtcblx0XHRcdFx0XHRcdFx0bWF4VmlzaWJsZUhlaWdodEZvcldyYXBHcm91cCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcblx0XHRcdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0IC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdW1PZlZpc2libGVNYXhIZWlnaHRzICs9IG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXA7XG5cdFx0XHRcdFx0XHRpZiAobWF4VmlzaWJsZUhlaWdodEZvcldyYXBHcm91cCA+IDAgJiYgdmlld3BvcnRIZWlnaHQgPj0gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cykge1xuXHRcdFx0XHRcdFx0XHQrK3dyYXBHcm91cHNQZXJQYWdlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCsrd3JhcEdyb3VwSW5kZXg7XG5cblx0XHRcdFx0XHRtYXhXaWR0aEZvcldyYXBHcm91cCA9IDA7XG5cdFx0XHRcdFx0bWF4SGVpZ2h0Rm9yV3JhcEdyb3VwID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgYXZlcmFnZUNoaWxkV2lkdGggPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzIC8gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xuXHRcdFx0bGV0IGF2ZXJhZ2VDaGlsZEhlaWdodCA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzIC8gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xuXHRcdFx0ZGVmYXVsdENoaWxkV2lkdGggPSB0aGlzLmNoaWxkV2lkdGggfHwgYXZlcmFnZUNoaWxkV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcblx0XHRcdGRlZmF1bHRDaGlsZEhlaWdodCA9IHRoaXMuY2hpbGRIZWlnaHQgfHwgYXZlcmFnZUNoaWxkSGVpZ2h0IHx8IHZpZXdwb3J0SGVpZ2h0O1xuXG5cdFx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XG5cdFx0XHRcdGlmICh2aWV3cG9ydFdpZHRoID4gc3VtT2ZWaXNpYmxlTWF4V2lkdGhzKSB7XG5cdFx0XHRcdFx0d3JhcEdyb3Vwc1BlclBhZ2UgKz0gTWF0aC5jZWlsKCh2aWV3cG9ydFdpZHRoIC0gc3VtT2ZWaXNpYmxlTWF4V2lkdGhzKSAvIGRlZmF1bHRDaGlsZFdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHZpZXdwb3J0SGVpZ2h0ID4gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cykge1xuXHRcdFx0XHRcdHdyYXBHcm91cHNQZXJQYWdlICs9IE1hdGguY2VpbCgodmlld3BvcnRIZWlnaHQgLSBzdW1PZlZpc2libGVNYXhIZWlnaHRzKSAvIGRlZmF1bHRDaGlsZEhlaWdodCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgaXRlbUNvdW50ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG5cdFx0bGV0IGl0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyV3JhcEdyb3VwICogd3JhcEdyb3Vwc1BlclBhZ2U7XG5cdFx0bGV0IHBhZ2VDb3VudF9mcmFjdGlvbmFsID0gaXRlbUNvdW50IC8gaXRlbXNQZXJQYWdlO1xuXHRcdGxldCBudW1iZXJPZldyYXBHcm91cHMgPSBNYXRoLmNlaWwoaXRlbUNvdW50IC8gaXRlbXNQZXJXcmFwR3JvdXApO1xuXG5cdFx0bGV0IHNjcm9sbExlbmd0aCA9IDA7XG5cblx0XHRsZXQgZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cCA9IHRoaXMuaG9yaXpvbnRhbCA/IGRlZmF1bHRDaGlsZFdpZHRoIDogZGVmYXVsdENoaWxkSGVpZ2h0O1xuXHRcdGlmICh0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XG5cdFx0XHRsZXQgbnVtVW5rbm93bkNoaWxkU2l6ZXMgPSAwO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZldyYXBHcm91cHM7ICsraSkge1xuXHRcdFx0XHRsZXQgY2hpbGRTaXplID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXSAmJiB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcblx0XHRcdFx0aWYgKGNoaWxkU2l6ZSkge1xuXHRcdFx0XHRcdHNjcm9sbExlbmd0aCArPSBjaGlsZFNpemU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KytudW1Vbmtub3duQ2hpbGRTaXplcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzY3JvbGxMZW5ndGggKz0gTWF0aC5yb3VuZChudW1Vbmtub3duQ2hpbGRTaXplcyAqIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzY3JvbGxMZW5ndGggPSBudW1iZXJPZldyYXBHcm91cHMgKiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmhlYWRlckVsZW1lbnRSZWYpIHtcblx0XHRcdHNjcm9sbExlbmd0aCArPSB0aGlzLmhlYWRlckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdFx0fVxuXG5cdFx0bGV0IHZpZXdwb3J0TGVuZ3RoID0gdGhpcy5ob3Jpem9udGFsID8gdmlld3BvcnRXaWR0aCA6IHZpZXdwb3J0SGVpZ2h0O1xuXHRcdGxldCBtYXhTY3JvbGxQb3NpdGlvbiA9IE1hdGgubWF4KHNjcm9sbExlbmd0aCAtIHZpZXdwb3J0TGVuZ3RoLCAwKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRpdGVtQ291bnQ6IGl0ZW1Db3VudCxcblx0XHRcdGl0ZW1zUGVyV3JhcEdyb3VwOiBpdGVtc1BlcldyYXBHcm91cCxcblx0XHRcdHdyYXBHcm91cHNQZXJQYWdlOiB3cmFwR3JvdXBzUGVyUGFnZSxcblx0XHRcdGl0ZW1zUGVyUGFnZTogaXRlbXNQZXJQYWdlLFxuXHRcdFx0cGFnZUNvdW50X2ZyYWN0aW9uYWw6IHBhZ2VDb3VudF9mcmFjdGlvbmFsLFxuXHRcdFx0Y2hpbGRXaWR0aDogZGVmYXVsdENoaWxkV2lkdGgsXG5cdFx0XHRjaGlsZEhlaWdodDogZGVmYXVsdENoaWxkSGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVuZ3RoOiBzY3JvbGxMZW5ndGgsXG5cdFx0XHR2aWV3cG9ydExlbmd0aDogdmlld3BvcnRMZW5ndGgsXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogbWF4U2Nyb2xsUG9zaXRpb25cblx0XHR9O1xuXHR9XG5cblx0cHJvdGVjdGVkIGNhY2hlZFBhZ2VTaXplOiBudW1iZXIgPSAwO1xuXHRwcm90ZWN0ZWQgcHJldmlvdXNTY3JvbGxOdW1iZXJFbGVtZW50czogbnVtYmVyID0gMDtcblxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlUGFkZGluZyhhcnJheVN0YXJ0SW5kZXhXaXRoQnVmZmVyOiBudW1iZXIsIGRpbWVuc2lvbnM6IElEaW1lbnNpb25zKTogbnVtYmVyIHtcblx0XHRpZiAoZGltZW5zaW9ucy5pdGVtQ291bnQgPT09IDApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdGxldCBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwID0gZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XG5cdFx0bGV0IHN0YXJ0aW5nV3JhcEdyb3VwSW5kZXggPSBNYXRoLmZsb29yKGFycmF5U3RhcnRJbmRleFdpdGhCdWZmZXIgLyBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwKSB8fCAwO1xuXG5cdFx0aWYgKCF0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cCAqIHN0YXJ0aW5nV3JhcEdyb3VwSW5kZXg7XG5cdFx0fVxuXG5cdFx0bGV0IG51bVVua25vd25DaGlsZFNpemVzID0gMDtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0aW5nV3JhcEdyb3VwSW5kZXg7ICsraSkge1xuXHRcdFx0bGV0IGNoaWxkU2l6ZSA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV0gJiYgdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXVt0aGlzLl9jaGlsZFNjcm9sbERpbV07XG5cdFx0XHRpZiAoY2hpbGRTaXplKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBjaGlsZFNpemU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQrK251bVVua25vd25DaGlsZFNpemVzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXN1bHQgKz0gTWF0aC5yb3VuZChudW1Vbmtub3duQ2hpbGRTaXplcyAqIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXApO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVQYWdlSW5mbyhzY3JvbGxQb3NpdGlvbjogbnVtYmVyLCBkaW1lbnNpb25zOiBJRGltZW5zaW9ucyk6IElQYWdlSW5mbyB7XG5cdFx0bGV0IHNjcm9sbFBlcmNlbnRhZ2UgPSAwO1xuXHRcdGlmICh0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XG5cdFx0XHRjb25zdCBudW1iZXJPZldyYXBHcm91cHMgPSBNYXRoLmNlaWwoZGltZW5zaW9ucy5pdGVtQ291bnQgLyBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwKTtcblx0XHRcdGxldCB0b3RhbFNjcm9sbGVkTGVuZ3RoID0gMDtcblx0XHRcdGxldCBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwID0gZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mV3JhcEdyb3VwczsgKytpKSB7XG5cdFx0XHRcdGxldCBjaGlsZFNpemUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldICYmIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV1bdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xuXHRcdFx0XHRpZiAoY2hpbGRTaXplKSB7XG5cdFx0XHRcdFx0dG90YWxTY3JvbGxlZExlbmd0aCArPSBjaGlsZFNpemU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dG90YWxTY3JvbGxlZExlbmd0aCArPSBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNjcm9sbFBvc2l0aW9uIDwgdG90YWxTY3JvbGxlZExlbmd0aCkge1xuXHRcdFx0XHRcdHNjcm9sbFBlcmNlbnRhZ2UgPSBpIC8gbnVtYmVyT2ZXcmFwR3JvdXBzO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNjcm9sbFBlcmNlbnRhZ2UgPSBzY3JvbGxQb3NpdGlvbiAvIGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoO1xuXHRcdH1cblxuXHRcdGxldCBzdGFydGluZ0FycmF5SW5kZXhfZnJhY3Rpb25hbCA9IE1hdGgubWluKE1hdGgubWF4KHNjcm9sbFBlcmNlbnRhZ2UgKiBkaW1lbnNpb25zLnBhZ2VDb3VudF9mcmFjdGlvbmFsLCAwKSwgZGltZW5zaW9ucy5wYWdlQ291bnRfZnJhY3Rpb25hbCkgKiBkaW1lbnNpb25zLml0ZW1zUGVyUGFnZTtcblxuXHRcdGxldCBtYXhTdGFydCA9IGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gZGltZW5zaW9ucy5pdGVtc1BlclBhZ2UgLSAxO1xuXHRcdGxldCBhcnJheVN0YXJ0SW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKHN0YXJ0aW5nQXJyYXlJbmRleF9mcmFjdGlvbmFsKSwgbWF4U3RhcnQpO1xuXHRcdGFycmF5U3RhcnRJbmRleCAtPSBhcnJheVN0YXJ0SW5kZXggJSBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwOyAvLyByb3VuZCBkb3duIHRvIHN0YXJ0IG9mIHdyYXBHcm91cFxuXG5cdFx0aWYgKHRoaXMuc3RyaXBlZFRhYmxlKSB7XG5cdFx0XHRsZXQgYnVmZmVyQm91bmRhcnkgPSAyICogZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDtcblx0XHRcdGlmIChhcnJheVN0YXJ0SW5kZXggJSBidWZmZXJCb3VuZGFyeSAhPT0gMCkge1xuXHRcdFx0XHRhcnJheVN0YXJ0SW5kZXggPSBNYXRoLm1heChhcnJheVN0YXJ0SW5kZXggLSBhcnJheVN0YXJ0SW5kZXggJSBidWZmZXJCb3VuZGFyeSwgMCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGFycmF5RW5kSW5kZXggPSBNYXRoLmNlaWwoc3RhcnRpbmdBcnJheUluZGV4X2ZyYWN0aW9uYWwpICsgZGltZW5zaW9ucy5pdGVtc1BlclBhZ2UgLSAxO1xuXHRcdGxldCBlbmRJbmRleFdpdGhpbldyYXBHcm91cCA9IChhcnJheUVuZEluZGV4ICsgMSkgJSBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwO1xuXHRcdGlmIChlbmRJbmRleFdpdGhpbldyYXBHcm91cCA+IDApIHtcblx0XHRcdGFycmF5RW5kSW5kZXggKz0gZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cCAtIGVuZEluZGV4V2l0aGluV3JhcEdyb3VwOyAvLyByb3VuZCB1cCB0byBlbmQgb2Ygd3JhcEdyb3VwXG5cdFx0fVxuXG5cdFx0aWYgKGlzTmFOKGFycmF5U3RhcnRJbmRleCkpIHtcblx0XHRcdGFycmF5U3RhcnRJbmRleCA9IDA7XG5cdFx0fVxuXHRcdGlmIChpc05hTihhcnJheUVuZEluZGV4KSkge1xuXHRcdFx0YXJyYXlFbmRJbmRleCA9IDA7XG5cdFx0fVxuXG5cdFx0YXJyYXlTdGFydEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlTdGFydEluZGV4LCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcblx0XHRhcnJheUVuZEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlFbmRJbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XG5cblx0XHRsZXQgYnVmZmVyU2l6ZSA9IHRoaXMuYnVmZmVyQW1vdW50ICogZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDtcblx0XHRsZXQgc3RhcnRJbmRleFdpdGhCdWZmZXIgPSBNYXRoLm1pbihNYXRoLm1heChhcnJheVN0YXJ0SW5kZXggLSBidWZmZXJTaXplLCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcblx0XHRsZXQgZW5kSW5kZXhXaXRoQnVmZmVyID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlFbmRJbmRleCArIGJ1ZmZlclNpemUsIDApLCBkaW1lbnNpb25zLml0ZW1Db3VudCAtIDEpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXJ0SW5kZXg6IGFycmF5U3RhcnRJbmRleCxcblx0XHRcdGVuZEluZGV4OiBhcnJheUVuZEluZGV4LFxuXHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHN0YXJ0SW5kZXhXaXRoQnVmZmVyLFxuXHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiBlbmRJbmRleFdpdGhCdWZmZXIsXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBzY3JvbGxQb3NpdGlvbixcblx0XHRcdHNjcm9sbEVuZFBvc2l0aW9uOiBzY3JvbGxQb3NpdGlvbiArIGRpbWVuc2lvbnMudmlld3BvcnRMZW5ndGgsXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogZGltZW5zaW9ucy5tYXhTY3JvbGxQb3NpdGlvblxuXHRcdH07XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlVmlld3BvcnQoKTogSVZpZXdwb3J0IHtcblx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuXHRcdGxldCBvZmZzZXQgPSB0aGlzLmdldEVsZW1lbnRzT2Zmc2V0KCk7XG5cblx0XHRsZXQgc2Nyb2xsU3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0U2Nyb2xsU3RhcnRQb3NpdGlvbigpO1xuXHRcdGlmIChzY3JvbGxTdGFydFBvc2l0aW9uID4gKGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoICsgb2Zmc2V0KSAmJiAhKHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93KSkge1xuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiA9IGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uIC09IG9mZnNldDtcblx0XHR9XG5cdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiA9IE1hdGgubWF4KDAsIHNjcm9sbFN0YXJ0UG9zaXRpb24pO1xuXG5cdFx0bGV0IHBhZ2VJbmZvID0gdGhpcy5jYWxjdWxhdGVQYWdlSW5mbyhzY3JvbGxTdGFydFBvc2l0aW9uLCBkaW1lbnNpb25zKTtcblx0XHRsZXQgbmV3UGFkZGluZyA9IHRoaXMuY2FsY3VsYXRlUGFkZGluZyhwYWdlSW5mby5zdGFydEluZGV4V2l0aEJ1ZmZlciwgZGltZW5zaW9ucyk7XG5cdFx0bGV0IG5ld1Njcm9sbExlbmd0aCA9IGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXJ0SW5kZXg6IHBhZ2VJbmZvLnN0YXJ0SW5kZXgsXG5cdFx0XHRlbmRJbmRleDogcGFnZUluZm8uZW5kSW5kZXgsXG5cdFx0XHRzdGFydEluZGV4V2l0aEJ1ZmZlcjogcGFnZUluZm8uc3RhcnRJbmRleFdpdGhCdWZmZXIsXG5cdFx0XHRlbmRJbmRleFdpdGhCdWZmZXI6IHBhZ2VJbmZvLmVuZEluZGV4V2l0aEJ1ZmZlcixcblx0XHRcdHBhZGRpbmc6IE1hdGgucm91bmQobmV3UGFkZGluZyksXG5cdFx0XHRzY3JvbGxMZW5ndGg6IE1hdGgucm91bmQobmV3U2Nyb2xsTGVuZ3RoKSxcblx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbFN0YXJ0UG9zaXRpb24sXG5cdFx0XHRzY3JvbGxFbmRQb3NpdGlvbjogcGFnZUluZm8uc2Nyb2xsRW5kUG9zaXRpb24sXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogcGFnZUluZm8ubWF4U2Nyb2xsUG9zaXRpb25cblx0XHR9O1xuXHR9XG59XG5cbkBOZ01vZHVsZSh7XG5cdGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnRdLFxuXHRkZWNsYXJhdGlvbnM6IFtWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnRdLFxuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogJ3ZpcnR1YWwtc2Nyb2xsZXItZGVmYXVsdC1vcHRpb25zJyxcblx0XHRcdHVzZUZhY3Rvcnk6IFZJUlRVQUxfU0NST0xMRVJfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcblx0XHR9XG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbGVyTW9kdWxlIHsgfVxuIl19