import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArchivosComponent } from './gestion-archivos.component';

describe('GestionArchivosComponent', () => {
  let component: GestionArchivosComponent;
  let fixture: ComponentFixture<GestionArchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionArchivosComponent]
    });
    fixture = TestBed.createComponent(GestionArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
