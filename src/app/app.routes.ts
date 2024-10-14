import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage),
      },
      {
        path: 'registro',
        loadComponent: () => import('./pages/auth/registro/registro.page').then(m => m.RegistroPage),
      },
      {
        path: 'recuperar',
        loadComponent: () => import('./pages/auth/recuperar/recuperar.page').then(m => m.RecuperarPage),
      },
      {
        path: 'confirmar-correo',
        loadComponent: () => import('./pages/auth/confirmar-correo/confirmar-correo.page').then( m => m.ConfirmarCorreoPage)
      },

    ]
  },
  {
    path: 'client',
    loadComponent: () => import('./pages/profiles/client/client.page').then( m => m.ClientPage),
    children: [
      {
        path: 'barberias',
        loadComponent: () => import('./pages/profiles/client/barberias/barberias.page').then( m => m.BarberiasPage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/profiles/client/perfil/perfil.page').then( m => m.PerfilPage)
      },
      {
        path: 'photo-profile',
        loadComponent: () => import('./pages/profiles/client/photo-profile/photo-profile.page').then( m => m.PhotoProfilePage)
      },
      {
        path: 'citas',
        loadComponent: () => import('./pages/profiles/client/citas/citas.page').then(m => m.CitasPage),
      },

      {
        path: 'barberos',
        loadComponent: () => import('./pages/profiles/client/barberos/barberos.page').then( m => m.BarberosPage)
      },
      
  

    ]
  },
  {
    path: 'barber',
    loadComponent: () => import('./pages/profiles/barber/barber.page').then( m => m.BarberPage),
    children: [
      
    ]
  },
  {
    path: 'cargando',
    loadComponent: () => import('./pages/cargando/cargando.page').then(m => m.CargandoPage),
  },
  {
    path: 'prueba',
    loadComponent: () => import('./pages/prueba/prueba.page').then( m => m.PruebaPage)
  },
 

 








];
