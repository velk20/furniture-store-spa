import {Component, OnInit} from '@angular/core';
import {FurnitureService} from "../../services/furniture.service";
import {Furniture} from "../../model/furniture";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  items: Furniture[] = [];
  constructor(private furnitureService:FurnitureService) {
  }
  ngOnInit(): void {
    this.furnitureService.getAll().subscribe(items=>{
      this.items = items;
    })
  }

}
