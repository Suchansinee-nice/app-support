import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr08Component } from './eap0001scr08.component';

describe('Eap0001scr08Component', () => {
  let component: Eap0001scr08Component;
  let fixture: ComponentFixture<Eap0001scr08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr08Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
