import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantitVehiculeComponent } from './garantit-vehicule.component';

describe('GarantitVehiculeComponent', () => {
  let component: GarantitVehiculeComponent;
  let fixture: ComponentFixture<GarantitVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantitVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantitVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
