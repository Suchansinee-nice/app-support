import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr02Component } from './eap0001scr02.component';

describe('Eap0001scr02Component', () => {
  let component: Eap0001scr02Component;
  let fixture: ComponentFixture<Eap0001scr02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
