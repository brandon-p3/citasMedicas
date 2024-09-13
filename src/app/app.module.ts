import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { GestionArchivosComponent } from './components/gestion-archivos/gestion-archivos.component';
import { FormatosComponent } from './components/gestion-archivos/formatos/formatos.component';
import { InstruccionesFormatoComponent } from './components/gestion-archivos/instrucciones-formato/instrucciones-formato.component';
import { ProcedimientosComponent } from './components/gestion-archivos/procedimientos/procedimientos.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/login/login.component';
import { IdFilterPipe } from './pipe/id-filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { RecordatorioComponent } from './components/recordatorio/recordatorio.component';
import { HomeuserComponent } from './components/homeuser/homeuser.component';
import { CitasComponent } from './components/citas/citas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { InfUserComponent } from './components/inf-user/inf-user.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { FilterByUserIdPipe } from './filter-by-user-id.pipe';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    HomeComponent,
    GestionArchivosComponent,
    FormatosComponent,
    InstruccionesFormatoComponent,
    ProcedimientosComponent,
    LoginComponent,
    IdFilterPipe,
    RegisterComponent,
    RecordatorioComponent,
    HomeuserComponent,
    CitasComponent,
    HistorialComponent,
    RecordatoriosComponent,
    InfUserComponent,
    HorariosComponent,
    FilterByUserIdPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule ,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
