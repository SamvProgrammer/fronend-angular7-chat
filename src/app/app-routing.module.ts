import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './vista/inicio/inicio.component';
import { PrincipalChatComponent } from './vista/principal-chat/principal-chat.component';


const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'principal',component:PrincipalChatComponent},
  { path: '**', component: InicioComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
