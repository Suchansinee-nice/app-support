import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr01Component } from './eap0001scr01.component';

describe('Eap0001scr01Component', () => {
  let component: Eap0001scr01Component;
  let fixture: ComponentFixture<Eap0001scr01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
