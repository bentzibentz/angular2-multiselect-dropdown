import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class DataService {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLW11bHRpc2VsZWN0LWRyb3Bkb3duLWxpYi9zcmMvbGliL211bHRpc2VsZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUkzQyxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUdFLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ2YsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7S0FtQnRDO0lBakJDLE9BQU8sQ0FBQyxJQUFTO1FBRWYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjthQUNJO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7O3NFQXBCVSxXQUFXO2lFQUFYLFdBQVcsV0FBWCxXQUFXO3VGQUFYLFdBQVc7Y0FEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xuXG4gIGZpbHRlcmVkRGF0YTogYW55ID0gW107XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBzZXREYXRhKGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgdGhpcy5maWx0ZXJlZERhdGEgPSBkYXRhO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KGRhdGEpO1xuICB9XG4gIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIGdldEZpbHRlcmVkRGF0YSgpOiBhbnkge1xuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZERhdGE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=