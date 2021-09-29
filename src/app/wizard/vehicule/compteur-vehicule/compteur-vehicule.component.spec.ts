import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteurVehiculeComponent } from './compteur-vehicule.component';

describe('CompteurVehiculeComponent', () => {
  let component: CompteurVehiculeComponent;
  let fixture: ComponentFixture<CompteurVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteurVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteurVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
