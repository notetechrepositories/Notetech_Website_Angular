import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComonPageComponent } from './comon-page.component';

describe('ComonPageComponent', () => {
  let component: ComonPageComponent;
  let fixture: ComponentFixture<ComonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComonPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
