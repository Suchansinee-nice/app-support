import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr05Component } from './eap0001scr05.component';

describe('Eap0001scr05Component', () => {
  let component: Eap0001scr05Component;
  let fixture: ComponentFixture<Eap0001scr05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr05Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
