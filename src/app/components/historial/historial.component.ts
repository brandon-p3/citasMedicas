import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicioGeneralService } from '../../Service/servicio-general.service';
import { Historial } from '../../models/modelos';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/modelos';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  providers: [NgbActiveModal]
})
export class HistorialComponent {
  historialForm: FormGroup;
  currentItem: Historial;
  historialList: any = [];
  users: any = [];
  usuarios: Usuario | null = null;
  usuarios1: Usuario []=[];
  isAuthenticated: boolean = false;
  usuarioId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private servicioGeneral: ServicioGeneralService,
    private authService: AuthService, private router: Router
  ) {
    this.currentItem = {} as Historial;
    this.historialForm = this.fb.group({
      nombre: ['', Validators.required],
      padecimientos: ['', Validators.required],
      tiempo_padecimiento: ['', Validators.required],
      notas: [''], // Campo opcional
      usuario_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gethistorial();
    this.getUsers();
    this.usuarios = this.authService.getCurrentUser();
    this.isAuthenticated = !!this.usuarios;
    console.log(this.usuarios?.nombre)
    if (!this.isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.usuarioId = this.usuarios?.id || null;  // Asignar el ID del usuario
    }
  }
  gethistorial() {
    this.servicioGeneral.gethistorial().subscribe(
      res => {
        this.historialList = res;
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
    if (this.historialForm.invalid) {
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
    const newHistorial: Historial = this.historialForm.value;

    this.servicioGeneral.savehistorial(newHistorial).subscribe(
      () => {
        this.toastr.success('¡Éxito! El historial ha sido registrado correctamente.', 'Guardado');
        this.resetForm();
        this.gethistorial();
      },
      err => this.toastr.error('Error al registrar el historial.', 'Error')
    );
  }

  updateCurrentItem(): void {
    const updatedHistorial: Historial = this.historialForm.value;

    this.servicioGeneral.uphistorial(this.currentItem.id, updatedHistorial).subscribe(
      () => {
        this.toastr.success('¡Éxito! El historial ha sido actualizado correctamente.', 'Actualizado');
        this.resetForm();
        this.gethistorial();
      },
      err => this.toastr.error('Error al actualizar el historial.', 'Error')
    );
  }

  editItem(item: Historial): void {
    this.currentItem = item;
    this.historialForm.patchValue(item);
  }

  deleteItem(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar este historial?')) return;

    this.servicioGeneral.deletehistorial(id).subscribe(
      () => {
        this.toastr.success('¡El historial ha sido eliminado!', 'Eliminado');
        this.resetForm();
        this.gethistorial();
      },
      err => this.toastr.error('Error al eliminar el historial.', 'Error')
    );
  }

  resetForm(): void {
    this.historialForm.reset();
    this.currentItem = {} as Historial;
  }
}
