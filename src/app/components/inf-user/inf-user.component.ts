import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/modelos';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ServicioGeneralService } from '../../Service/servicio-general.service';
@Component({
  selector: 'app-inf-user',
  templateUrl: './inf-user.component.html',
  styleUrls: ['./inf-user.component.css']
})
export class InfUserComponent {
  usuarios: Usuario | null = null;
  usuarios1: Usuario []=[];
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuarios = this.authService.getCurrentUser();
    this.isAuthenticated = !!this.usuarios;
    console.log(this.usuarios?.nombre)
    if (!this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }
}
