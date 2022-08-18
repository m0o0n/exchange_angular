import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit {
  @Input() InpVal: any = 0;
  @Input() changeInpVal: any;
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
