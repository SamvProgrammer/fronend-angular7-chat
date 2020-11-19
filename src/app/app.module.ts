import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge'
import { MatTabsModule } from '@angular/material/tabs';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './vista/inicio/inicio.component';


import { UsuariosService } from './servicios/usuarios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CambiarusuarioComponent } from './vista/inicio/cambiarusuario/cambiarusuario.component';
import { PrincipalChatComponent } from './vista/principal-chat/principal-chat.component';
import { ListausuariosComponent } from './vista/listausuarios/listausuarios.component';
import { ChatsocketComponent } from './vista/chatsocket/chatsocket.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CambiarusuarioComponent,
    PrincipalChatComponent,
    ListausuariosComponent,
    ChatsocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatBadgeModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
