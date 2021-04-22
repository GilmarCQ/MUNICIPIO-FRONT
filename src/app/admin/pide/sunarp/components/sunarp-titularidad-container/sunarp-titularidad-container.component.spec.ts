import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunarpTitularidadContainerComponent } from './sunarp-titularidad-container.component';

describe('SunarpTitularidadContainerComponent', () => {
  let component: SunarpTitularidadContainerComponent;
  let fixture: ComponentFixture<SunarpTitularidadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunarpTitularidadContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SunarpTitularidadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
