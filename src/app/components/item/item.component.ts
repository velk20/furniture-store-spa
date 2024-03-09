import {Component, Input} from '@angular/core';
import {Furniture} from "../../model/furniture";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input('item') item: Furniture = {} as Furniture;

}
