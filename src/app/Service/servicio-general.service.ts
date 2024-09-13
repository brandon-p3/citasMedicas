import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders }  from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Historial, Recordatorio, RegistroCita, Usuario } from '../models/modelos';
@Injectable({
  providedIn: 'root'
})
export class ServicioGeneralService {

  private baseUrl = 'https://citasmedicasserver-production.up.railway.app';
    API_URI='https://citasmedicasserver-production.up.railway.app/api';
  constructor(private http: HttpClient) { }
//Metodos GET


  getuser(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URI}/user`).pipe(
      catchError(error => {
        console.error('Error al obtener correos:', error);
        return of([]); // Devuelve una lista vacía en caso de error
      })
    );
  }
  gethistorial(){
    return this.http.get(`${this.API_URI}/historial`);
  }
  getrecordatorio(){
    return this.http.get(`${this.API_URI}/recordatorio`);
  }
  getregistro(){
    return this.http.get(`${this.API_URI}/registro`);
  }

//POST
  
saveuser(evento: Usuario): Observable<any> {
  return this.http.post(`${this.API_URI}/user`, evento).pipe(
    catchError(error => {
      console.error('Error al guardar user:', error);
      return of(null); // Devuelve null en caso de error
    })
  );
}

savehistorial(evento: Historial): Observable<any> {
  return this.http.post(`${this.API_URI}/historial`, evento).pipe(
    catchError(error => {
      console.error('Error al guardar area:', error);
      return of(null); // Devuelve null en caso de error
    })
  );
}
saverecordatorio(evento: Recordatorio): Observable<any> {
  return this.http.post(`${this.API_URI}/recordatorio`, evento).pipe(
    catchError(error => {
      console.error('Error al guardar formato:', error);
      return of(null); // Devuelve null en caso de error
    })
  );
}
saveregistro(evento: RegistroCita): Observable<any> {
  return this.http.post(`${this.API_URI}/registro`, evento).pipe(
    catchError(error => {
      console.error('Error al guardar registro:', error);
      return of(null); // Returns null in case of error
    })
  );
}


  //DELETE
  
  deleteuser(id: string|number){
    return this.http.delete(`${this.API_URI}/user/${id}`);
  }
  deletehistorial(id: string|number){
    return this.http.delete(`${this.API_URI}/historial/${id}`);
  }

  deleterecordatorio(id: string|number){
    return this.http.delete(`${this.API_URI}/recordatorio/${id}`);
  }

  deleteregistro(id: string|number){
    return this.http.delete(`${this.API_URI}/registro/${id}`);
  }

  

//PUT
upuser(id: string | number, update: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.API_URI}/user/${id}`, update);
}
uphistorial(id: string | number, update: Historial): Observable<Historial> {
  return this.http.put<Historial>(`${this.API_URI}/historial/${id}`, update);
}
uprecordatorio(id: string | number, update: Recordatorio): Observable<Recordatorio> {
  return this.http.put<Recordatorio>(`${this.API_URI}/recordatorio/${id}`, update);
}
upregistro(id: string | number, update: RegistroCita): Observable<RegistroCita> {
  return this.http.put<RegistroCita>(`${this.API_URI}/registro/${id}`, update);
}
}
