import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServicioGeneralService } from 'src/app/Service/servicio-general.service';
import { Usuario } from 'src/app/models/modelos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [NgbActiveModal]
})
export class UsuariosComponent implements OnInit {

  userForm: FormGroup;
  users: Usuario[] = [];
  roles: string[] = ['admin', 'user']; // Define los roles aquí
  currentItem: Usuario | null = null;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: ServicioGeneralService,
    public modal: NgbActiveModal
  ) {
    this.userForm = this.fb.group({
      nombre: [null, Validators.required],
      fecha_nacimiento: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
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
        this.getUsers();
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
    this.currentItem = item;
    this.userForm.patchValue(item);
  }

  updateCurrentItem(): void {
    if (this.currentItem) {
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
}
