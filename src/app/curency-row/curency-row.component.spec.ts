import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurencyRowComponent } from './curency-row.component';

describe('CurencyRowComponent', () => {
  let component: CurencyRowComponent;
  let fixture: ComponentFixture<CurencyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurencyRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurencyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
