import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfUserComponent } from './inf-user.component';

describe('InfUserComponent', () => {
  let component: InfUserComponent;
  let fixture: ComponentFixture<InfUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfUserComponent]
    });
    fixture = TestBed.createComponent(InfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
