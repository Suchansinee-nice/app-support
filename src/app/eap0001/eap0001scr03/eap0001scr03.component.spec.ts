import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr03Component } from './eap0001scr03.component';

describe('Eap0001scr03Component', () => {
  let component: Eap0001scr03Component;
  let fixture: ComponentFixture<Eap0001scr03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr03Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
