import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordatorioComponent } from './recordatorio.component';

describe('RecordatorioComponent', () => {
  let component: RecordatorioComponent;
  let fixture: ComponentFixture<RecordatorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordatorioComponent]
    });
    fixture = TestBed.createComponent(RecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
