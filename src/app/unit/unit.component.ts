import { Component, OnInit } from '@angular/core';
import {UnitInterface} from "./unit-interface";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {


  unitCNname:UnitInterface;
  // cols:UnitInterface[];
  // errorMessage=null;

  results:UnitInterface[];
  // results_length:number=0;

  constructor(
    private http:HttpClient,
    private router:Router
              ) { }

  goAdd():void{
    this.router.navigate(['unit/add']);
  }

  ngOnInit() {
    this.unitCNname={
      hxname:'户型名称',
      fangno:'户型位置',
      fang:'房',
      ting:'厅',
      wei:'卫',
      yangtai:'阳台',
      jzmj:'建面',
      tnmj:'套内',
      hxspecial:'户型特点',
      memo:'备注',
      ishot:'主力',
    };

    this.http.get<UnitInterface[]>('http://127.0.0.1:8000/unit/api')
      .subscribe(data=>this.results=data);
    // this.results_length=this.results.length;
  }

}
