import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/modelos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: Usuario| null = null;
  constructor(private http: HttpClient){}


loginToServer(correo: string, password1: string) {
  // Aquí realizas una solicitud HTTP al backend
  return this.http.post('https://citasmedicasserver-production.up.railway.app/api/login', { correo, password1 });
}
isAuthenticated(): boolean {
  return this.isLoggedIn;
}

setLoggendInStatus(status: boolean){
  this.isLoggedIn = status;
}
logout(){
  this.isLoggedIn = false;
}
setCurrentUser(usuario: Usuario) {
  this.currentUser = usuario;
}

getCurrentUser(): Usuario | null {
  return this.currentUser;
}
}
