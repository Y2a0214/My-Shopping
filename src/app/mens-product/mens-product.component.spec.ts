import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensProductComponent } from './mens-product.component';

describe('MensProductComponent', () => {
  let component: MensProductComponent;
  let fixture: ComponentFixture<MensProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
