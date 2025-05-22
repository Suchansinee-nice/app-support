import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr09Component } from './eap0001scr09.component';

describe('Eap0001scr09Component', () => {
  let component: Eap0001scr09Component;
  let fixture: ComponentFixture<Eap0001scr09Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr09Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
