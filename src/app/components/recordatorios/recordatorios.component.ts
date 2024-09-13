import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicioGeneralService } from '../../Service/servicio-general.service';
import { Recordatorio } from '../../models/modelos';
import { Usuario } from 'src/app/models/modelos';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})
export class RecordatoriosComponent {
  recordatorioForm: FormGroup;
  currentItem: Recordatorio;
  records: any = [];
  users: any = [];
  usuarios: Usuario | null = null;
  usuarios1: Usuario []=[];
  isAuthenticated: boolean = false;
  usuarioId: number | null = null; 
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private servicioGeneral: ServicioGeneralService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentItem = {} as Recordatorio;
    this.recordatorioForm = this.fb.group({
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      frecuencia: ['diaria', Validators.required],
      usuario_id: [{value: '', disabled: true}, Validators.required]  // Set default value as empty and disabled
    });
  }
  
  ngOnInit(): void {
    this.getrecordatorio();
    this.getUsers();
    this.usuarios = this.authService.getCurrentUser();
    this.isAuthenticated = !!this.usuarios;
  
    if (!this.isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      // Assign user ID to the form field and disable it
      this.usuarioId = this.usuarios?.id || null;
      this.recordatorioForm.patchValue({ usuario_id: this.usuarioId });
    }
  }

  getrecordatorio() {
    this.servicioGeneral.getrecordatorio().subscribe(
      res => {
        this.records = res;
      },
      err => console.error(err)
    );
  }
  getUsers() { // Changed from getUser to getUsers for clarity
    this.servicioGeneral.getuser().subscribe(
      res => {
        this.users = res; // Populate users array
      },
      err => console.error(err)
    );
  }

  onSubmit(): void {
    if (this.recordatorioForm.invalid) {
      this.toastr.error('Por favor complete el formulario correctamente.', 'Error');
      return;
    }

    if (this.currentItem.id) {
      this.updateCurrentItem();
    } else {
      this.saveNewItem();
    }
  }
  saveNewItem(): void {
    const newRecordatorio: Recordatorio = this.recordatorioForm.value;
  
    // Asignar un valor por defecto si usuarioId es null
    newRecordatorio.usuario_id = this.usuarioId ?? 0;
  
    console.log(newRecordatorio);
    
    this.servicioGeneral.saverecordatorio(newRecordatorio).subscribe(
      () => {
        this.toastr.success('¡Éxito! El recordatorio ha sido registrado correctamente.', 'Guardado');
        this.resetForm();
        this.getrecordatorio();
      },
      err => this.toastr.error('Error al registrar el recordatorio.', 'Error')
    );
  }
  
  
  updateCurrentItem(): void {
    const updatedRecordatorio: Recordatorio = this.recordatorioForm.value;

    this.servicioGeneral.uprecordatorio(this.currentItem.id, updatedRecordatorio).subscribe(
      () => {
        this.toastr.success('¡Éxito! El recordatorio ha sido actualizado correctamente.', 'Actualizado');
        this.resetForm();
        this.getrecordatorio();
      },
      err => this.toastr.error('Error al actualizar el recordatorio.', 'Error')
    );
  }

  editItem(item: Recordatorio): void {
    this.currentItem = item;
    this.recordatorioForm.patchValue(item);
  }

  deleteItem(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar este recordatorio?')) return;

    this.servicioGeneral.deleterecordatorio(id).subscribe(
      () => {
        this.toastr.success('¡El recordatorio ha sido eliminado!', 'Eliminado');
        this.resetForm();
        this.getrecordatorio();
      },
      err => this.toastr.error('Error al eliminar el recordatorio.', 'Error')
    );
  }

  resetForm(): void {
    this.recordatorioForm.reset();
    this.currentItem = {} as Recordatorio;
  }
}
