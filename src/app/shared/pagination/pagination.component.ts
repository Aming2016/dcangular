import {Component, OnInit, Input, ElementRef, HostBinding, ViewChild, AfterViewInit} from "@angular/core";
import {Logger} from "../../data/logger/logger.service";
import {appConfig} from "../../../environments/environment";
import {isNullOrUndefined} from "util";
import {UtilService} from "../../core/util.service";
import {UIService} from "../../core/ui/ui.service";
declare var $: any

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit,AfterViewInit {

  get start(): number {
    return this.page * this.size
  }

  get end(): number {
    return (this.page + 1) * this.size
  }

  private logger: Logger

  constructor(private util: UtilService, private el: ElementRef, private ui: UIService) {
    this.logger = util.createLogger(this)
  }


  @Input()
  totalSize: number

  private _size = appConfig.pageSize
  @Input()
  set size(size: number) {
    if (!size) {
      this._size = appConfig.pageSize
    } else {
      this._size = size
    }
  }

  get size(): number {
    return this._size
  }

  private _page: number = 0
  @Input()
  set page(page: number) {
    if (isNullOrUndefined(page) || page >= this.totalPage) {
      this._page = 0
    } else if (page < 0) {
      this._page = this.totalPage - 1
    } else {
      this._page = page
    }
  }

  get page() {
    return this._page
  }

  get totalPage(): number {
    if(this.totalSize == null){
      return 0
    }
    return Math.ceil(this.totalSize / this.size)
  }

  isManyPages() {
    return this.totalPage > this.groupPagesCount * 3
  }

  isFewPages() {
    return this.totalPage < this.groupPagesCount + 2
  }

  ngOnInit() {
    this.ui.compactWidth$().subscribe((compact => {
      if (compact) {
        this.groupPagesCount = 3
      } else {
        this.groupPagesCount = 4
      }
      if (!this.isManyPages()) {
        this.groupPagesCount - 1
      }
      if (this.isFewPages()) {
        this.groupPagesCount + 2
      }
    }))
  }

  ngAfterViewInit(): void {
    if (this.dialog) {
      $(this.dialog.nativeElement).modal({
        blurring: true
      })
    }
  }


  selectPage() {
    $(this.dialog.nativeElement).modal("show")
  }

  @HostBinding("class") get parentClass() {
    return "flex-container flex-column flex-item"
  }

  @ViewChild("dialog") dialog: ElementRef;

  emitResize() {
    this.logger.debug(this.el.nativeElement.offsetWidth)
    this.logger.debug(this.el.nativeElement.offsetHeight)
  }

  private groupPagesCount = 4

  get pageMatrix() {
    if (!this.totalSize) {
      return []
    }
    let mtx = []
    let rowArr
    for (let x = 0; x < this.totalPage; x++) {
      if (x % this.groupPagesCount == 0) {
        rowArr = []
        mtx.push(rowArr)
      }
      rowArr.push(x)
    }

    while (rowArr.length < this.groupPagesCount) {
      rowArr.push(null)
    }
    return mtx
  }

  _pageGroup = 0

  get pageGroupArray() {
    if(!this.totalPage){
      return []
    }
    let totalGroup = Math.ceil(this.totalPage / this.groupPagesCount)
    let mtx = new Array(this.totalPage).fill(1).map((v, i) => i)
    if(totalGroup == 1){
      return mtx
    } else if (this.pageGroup == (totalGroup - 1)) {
      return mtx.slice(mtx.length - this.groupPagesCount)
    } else {
      return mtx.slice(this.pageGroup * this.groupPagesCount,
        (this.pageGroup + 1) * this.groupPagesCount)
    }
  }

  get pageGroup() {
    return this._pageGroup
  }

  set pageGroup(pageGroup: number) {
    let totalGroup = Math.ceil(this.totalPage / this.groupPagesCount)
    if (isNullOrUndefined(pageGroup) || pageGroup >= totalGroup) {
      this._pageGroup = 0
    } else if (pageGroup < 0) {
      this._pageGroup = totalGroup - 1
    } else {
      this._pageGroup = pageGroup
    }
  }

  dialogClick(colIdx) {
    if (colIdx != null) {
      this.page = colIdx
    }
    this.pageGroup = Math.ceil(this.page / this.groupPagesCount)
    $(this.dialog.nativeElement).modal("hide")
  }
}
