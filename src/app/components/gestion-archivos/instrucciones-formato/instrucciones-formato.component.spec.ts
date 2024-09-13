import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruccionesFormatoComponent } from './instrucciones-formato.component';

describe('InstruccionesFormatoComponent', () => {
  let component: InstruccionesFormatoComponent;
  let fixture: ComponentFixture<InstruccionesFormatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstruccionesFormatoComponent]
    });
    fixture = TestBed.createComponent(InstruccionesFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
