import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionArchivosComponent } from './components/gestion-archivos/gestion-archivos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormatosComponent } from './components/gestion-archivos/formatos/formatos.component';
import { InstruccionesFormatoComponent } from './components/gestion-archivos/instrucciones-formato/instrucciones-formato.component';
import { RecordatorioComponent } from './components/recordatorio/recordatorio.component';
import { ProcedimientosComponent } from './components/gestion-archivos/procedimientos/procedimientos.component';
import { HomeuserComponent } from './components/homeuser/homeuser.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { CitasComponent } from './components/citas/citas.component';
import { InfUserComponent } from './components/inf-user/inf-user.component';

const routes: Routes = [{
  path : '',
  redirectTo : '/home',
  pathMatch : 'full'
},
{
  path : 'home',
  component : HomeComponent
},

{
  path : 'AdminHome',
  component : GestionArchivosComponent
},

{
  path : 'configuracion-usuario',
  component :UsuariosComponent
}

,
{
  path : 'login',
  component :LoginComponent
},
{
  path : 'register',
  component :RegisterComponent
},
{
  path : 'registro-cita-pedagogia',
  component :FormatosComponent
}
,
{
  path : 'historial',
  component :InstruccionesFormatoComponent
}
,
{
  path : 'horarios',
  component :RecordatorioComponent
}
,
{
  path : 'recordatorios',
  component :ProcedimientosComponent

},
{
  path : 'homeUser',
  component :HomeuserComponent

},
{
  path : 'recordatoriosU',
  component :RecordatoriosComponent

},
{
  path : 'historialU',
  component :HistorialComponent

}
,
{
  path : 'horariosU',
  component :HorariosComponent

}
,
{
  path : 'registro-cita-pedagogiaU',
  component :CitasComponent

},
{
  path : 'configuracion-usuarioU',
  component :InfUserComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
