import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicioGeneralService } from '../../../Service/servicio-general.service';
import { RegistroCita } from '../../../models/modelos';

@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent implements OnInit {
  registroCitaForm: FormGroup;
  currentItem: RegistroCita;
  citas: any = [];
  users: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private servicioGeneral: ServicioGeneralService
  ) {
    this.currentItem = {} as RegistroCita;
    this.registroCitaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      dia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getcitas();
    this.getUsers();
  }

  getcitas() {
    this.servicioGeneral.getregistro().subscribe(
      res => {
        this.citas = res;
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
    if (this.registroCitaForm.invalid) {
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
    const newRegistroCita: RegistroCita = this.registroCitaForm.value;

    this.servicioGeneral.saveregistro(newRegistroCita).subscribe(
      () => {
        this.toastr.success('¡Éxito! La cita ha sido registrada correctamente.', 'Guardado');
        this.resetForm();
        this.getcitas();
      },
      err => this.toastr.error('Error al registrar la cita.', 'Error')
    );
  }

  updateCurrentItem(): void {
    const updatedRegistroCita: RegistroCita = this.registroCitaForm.value;

    this.servicioGeneral.upregistro(this.currentItem.id, updatedRegistroCita).subscribe(
      () => {
        this.toastr.success('¡Éxito! La cita ha sido actualizada correctamente.', 'Actualizado');
        this.resetForm();
        this.getcitas();
      },
      err => this.toastr.error('Error al actualizar la cita.', 'Error')
    );
  }

  editItem(item: RegistroCita): void {
    this.currentItem = item;
    this.registroCitaForm.patchValue(item);
  }

  deleteItem(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar esta cita?')) return;

    this.servicioGeneral.deleteregistro(id).subscribe(
      () => {
        this.toastr.success('¡La cita ha sido eliminada!', 'Eliminado');
        this.resetForm();
        this.getcitas();
      },
      err => this.toastr.error('Error al eliminar la cita.', 'Error')
    );
  }

  resetForm(): void {
    this.registroCitaForm.reset();
    this.currentItem = {} as RegistroCita;
  }
}
