import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReniecCredencialComponent } from './reniec-credencial.component';

describe('ReniecCredencialComponent', () => {
  let component: ReniecCredencialComponent;
  let fixture: ComponentFixture<ReniecCredencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReniecCredencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReniecCredencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
