import {Injectable} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {StorageService} from "./storage.service";
import {AuthService} from "./security/auth.service";

@Injectable()
export class BreadcrumbService {

  private BREAD_CRUMB_KEY = "BREAD_CRUMB_KEY";
  private FAV_ITEMS_KEY = "FAV_ITEMS_KEY";

  constructor(private storage: StorageService){
    let items = this.storage.userGet<MenuItem[]>(this.BREAD_CRUMB_KEY)
    if(items != null){
      this.setItems(items)
    }

    let favItems = this.storage.userGet<MenuItem[]>(this.FAV_ITEMS_KEY)
    if(favItems != null){
      this.setFavItems(favItems)
    }
  }

  private currentItems: MenuItem[] = [{routerLink:"/",label:"首页"}]

  private itemsSource = new BehaviorSubject<MenuItem[]>(this.currentItems);
  itemsHandler = this.itemsSource.asObservable();

  private currentItem : MenuItem
  private favItems: MenuItem[] = []
  private favItemsSource = new BehaviorSubject<MenuItem[]>(this.favItems);
  favItemsHandler = this.favItemsSource.asObservable();

  private currentItemSource = new BehaviorSubject<{item?:MenuItem, stared?:boolean}>({});
  currentItemHandler = this.currentItemSource.asObservable();

  private setItems(items: MenuItem[] = this.currentItems) {
    this.storage.userPut(this.BREAD_CRUMB_KEY, items);
    this.currentItems = items
    this.itemsSource.next(items);
  }

  push(routerLink: string, label: string, icon: string = "keyboard_arrow_right") {
    if(!label){
      return
    }
    this.currentItem = {routerLink: routerLink, label: label, icon : icon}
    this.currentItemSource.next({item:this.currentItem, stared: this.isStared()})
    if (this.currentItems.find(itm => itm.routerLink == routerLink)) {
      return
    }

    this.currentItems.push(this.currentItem)
    this.setItems();
  }

  remove(itm: MenuItem) {
    this.currentItems.splice(this.currentItems.findIndex(m =>
      m.routerLink == itm.routerLink && m.label == itm.label
    ), 1)
    this.setItems()
  }

  private isStared(item: MenuItem = this.currentItem) : boolean{
    if(item == null){
      return false
    }
    let idx = this.favItems.findIndex(itm => itm.routerLink == item.routerLink)
    return idx >= 0
  }

  starMenu(item: MenuItem = this.currentItem){
    if(item == null){
      return
    }
    if (this.isStared(item)) {
      this.rmStarMenu(item)
    } else {
      this.favItems.push(item)
    }
    this.setFavItems()
  }

  rmStarMenu(item: MenuItem = this.currentItem){
    let idx = this.favItems.findIndex(itm => itm.routerLink == item.routerLink)
    if (idx >= 0) {
      return this.favItems.splice(idx,1)
    }
    this.setFavItems()
  }

  setFavItems(items: MenuItem[] = this.favItems) {
    this.storage.userPut(this.FAV_ITEMS_KEY, items);
    this.favItems = items
    this.favItemsSource.next(items);
    this.currentItemSource.next({item:this.currentItem, stared: this.isStared()})
  }
}
