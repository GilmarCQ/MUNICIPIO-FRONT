import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReniecConsultaComponent } from './reniec-consulta.component';

describe('ReniecConsultaComponent', () => {
  let component: ReniecConsultaComponent;
  let fixture: ComponentFixture<ReniecConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReniecConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReniecConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
