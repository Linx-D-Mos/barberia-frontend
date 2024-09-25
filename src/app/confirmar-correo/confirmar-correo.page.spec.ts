import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarCorreoPage } from './confirmar-correo.page';

describe('ConfirmarCorreoPage', () => {
  let component: ConfirmarCorreoPage;
  let fixture: ComponentFixture<ConfirmarCorreoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
