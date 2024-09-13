import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServicioGeneralService } from 'src/app/Service/servicio-general.service';
import { Usuario } from 'src/app/models/modelos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [NgbActiveModal]
})
export class RegisterComponent {
  userForm: FormGroup;
  users: Usuario[] = [];
  roles: string[] = ['user']; // Solo rol de usuario para este componente
  currentItem: Usuario | null = null;
  isAdmin: boolean = false; // Controlar si es admin o no

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: ServicioGeneralService,
    public modal: NgbActiveModal
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: [this.roles[0]] // Establece el primer rol como valor predeterminado
    });
  }

  ngOnInit(): void {
    this.checkUserRole(); // Verifica si el usuario es admin
    if (this.isAdmin) {
      this.getUsers();
    }
  }

  checkUserRole() {
    // Lógica para verificar el rol del usuario, por ejemplo, desde el servicio de autenticación
    // Aquí se establece que es admin o no
    // Esto debería ser reemplazado con la lógica real para determinar el rol del usuario
    this.isAdmin = false; // Ajusta esto según la lógica de tu aplicación
  }

  getUsers() {
    this.userService.getuser().subscribe(
      (res: Usuario[]) => {
        this.users = res;
      },
      err => console.error(err)
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData: Usuario = this.userForm.value;

    this.userService.saveuser(userData).subscribe(
      () => {
        this.toastr.success('¡Éxito! El usuario ha sido añadido.');
        this.close();
        if (this.isAdmin) {
          this.getUsers();
        }
        this.userForm.reset();
      },
      error => {
        this.toastr.error('Hubo un problema al añadir el usuario.');
        console.error('Error adding user:', error);
      }
    );
  }

  close() {
    this.modal.dismiss();
  }

  deleteItem(id: number): void {
    if (!this.isAdmin) return; // Solo permitir eliminación si es admin
    this.userService.deleteuser(id).subscribe(
      () => {
        this.toastr.success('¡Éxito! El usuario ha sido eliminado.');
        this.getUsers();
      },
      error => {
        this.toastr.error('Hubo un problema al eliminar el usuario.');
        console.error('Error deleting user:', error);
      }
    );
  }

  updateItem(item: Usuario): void {
    if (!this.isAdmin) return; // Solo permitir actualización si es admin
    this.currentItem = item;
    this.userForm.patchValue(item);
  }

  updateCurrentItem(): void {
    if (!this.isAdmin || !this.currentItem) return; // Solo permitir actualización si es admin
    const updatedData: Usuario = this.userForm.value;
    this.userService.upuser(this.currentItem.id, updatedData).subscribe(
      () => {
        this.toastr.success('¡Éxito! El usuario ha sido actualizado.');
        this.close();
        this.getUsers();
        this.userForm.reset();
        this.currentItem = null;
      },
      error => {
        this.toastr.error('Hubo un problema al actualizar el usuario.');
        console.error('Error updating user:', error);
      }
    );
  }
}