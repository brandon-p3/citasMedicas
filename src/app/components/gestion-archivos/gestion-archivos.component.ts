import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstruccionesFormatoComponent } from './instrucciones-formato/instrucciones-formato.component';
import { FormatosComponent } from './formatos/formatos.component';
import { ProcedimientosComponent } from './procedimientos/procedimientos.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gestion-archivos',
  templateUrl: './gestion-archivos.component.html',
  styleUrls: ['./gestion-archivos.component.css'],
  providers: [NgbActiveModal]
})
export class GestionArchivosComponent {
  
}
