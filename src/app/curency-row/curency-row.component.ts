import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-curency-row',
  templateUrl: './curency-row.component.html',
  styleUrls: ['./curency-row.component.css'],
})
export class CurencyRowComponent implements OnInit {
  @Input() FromBase: any;
  @Input() Cur: any;
  @Input() Change: any;

  constructor(private store: Store) {}
  ngOnInit(): void {}
}
