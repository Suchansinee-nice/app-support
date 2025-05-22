import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr04Component } from './eap0001scr04.component';

describe('Eap0001scr04Component', () => {
  let component: Eap0001scr04Component;
  let fixture: ComponentFixture<Eap0001scr04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr04Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
