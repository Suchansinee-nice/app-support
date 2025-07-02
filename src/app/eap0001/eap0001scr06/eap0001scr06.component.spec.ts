import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr06Component } from './eap0001scr06.component';

describe('Eap0001scr06Component', () => {
  let component: Eap0001scr06Component;
  let fixture: ComponentFixture<Eap0001scr06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr06Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
