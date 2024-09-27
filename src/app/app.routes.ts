import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar/recuperar.page').then(m => m.RecuperarPage),
  },
  {
    path: 'cargando',
    loadComponent: () => import('./cargando/cargando.page').then(m => m.CargandoPage),
  },
  {
    path: 'citas',
    loadComponent: () => import('./citas/citas.page').then(m => m.CitasPage),
  },
  {
    path: 'barberias',
    loadComponent: () => import('./barberias/barberias.page').then( m => m.BarberiasPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'confirmar-correo',
    loadComponent: () => import('./confirmar-correo/confirmar-correo.page').then( m => m.ConfirmarCorreoPage)
  },
  {
    path: 'prueba',
    loadComponent: () => import('./prueba/prueba.page').then( m => m.PruebaPage)
  },  {
    path: 'photo-profile',
    loadComponent: () => import('./photo-profile/photo-profile.page').then( m => m.PhotoProfilePage)
  },


];
