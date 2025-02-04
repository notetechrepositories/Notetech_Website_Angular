import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlankComponent } from './admin-blank.component';

describe('AdminBlankComponent', () => {
  let component: AdminBlankComponent;
  let fixture: ComponentFixture<AdminBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
