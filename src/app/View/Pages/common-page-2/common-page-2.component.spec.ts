import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPage2Component } from './common-page-2.component';

describe('CommonPage2Component', () => {
  let component: CommonPage2Component;
  let fixture: ComponentFixture<CommonPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonPage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
