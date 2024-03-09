import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FurnitureService} from "../../services/furniture.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-edit', templateUrl: './item-edit.component.html', styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private furnitureService: FurnitureService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe(item => {
        this.editItemForm.setValue(item);
      })
    })
  }

  editItemForm = this.formBuilder.group({
    title: [''], imageUrl: [''], price: [0], quantity: [0], description: [''],
  })

  onSubmit() {
  }
}
