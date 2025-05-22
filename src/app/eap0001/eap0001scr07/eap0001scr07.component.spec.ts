import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001scr07Component } from './eap0001scr07.component';

describe('Eap0001scr07Component', () => {
  let component: Eap0001scr07Component;
  let fixture: ComponentFixture<Eap0001scr07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001scr07Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001scr07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
