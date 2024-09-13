import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/modelos';
import { AuthService } from 'src/app/Service/auth.service';
// import { AuthService } from 'src/app/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbActiveModal]
})
export class LoginComponent {
  @Output() datosUsuario: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  correo: string = '';
  password1: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  
  login(): void {
    this.authService.loginToServer(this.correo, this.password1).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.authService.setLoggendInStatus(true);
          
          // Assuming the response contains an array of usuarios, get the first user
          const usuario = response.usuario[0];
          this.authService.setCurrentUser(usuario);
          console.log('Response:', response);

          // Emit the user data
          this.datosUsuario.emit(usuario);
       
          // Check user role and navigate accordingly
          if (usuario.rol === 'admin') {
            this.router.navigate(['/AdminHome']);
          }else if (usuario.rol === 'user') {
            this.router.navigate(['/homeUser']);
          } else {
            // Default route or handle other user types
            this.router.navigate(['/home']);
          }
        } else {
          // Display error message if login is unsuccessful
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.',
          });
        }
      },
      error: (err) => {
        // Display error message for server or network issues
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.',
        });
        console.error('Login error:', err);
      }
    });
  }
}
