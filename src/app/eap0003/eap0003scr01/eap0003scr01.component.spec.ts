import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0003scr01Component } from './eap0003scr01.component';

describe('Eap0003scr01Component', () => {
  let component: Eap0003scr01Component;
  let fixture: ComponentFixture<Eap0003scr01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0003scr01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0003scr01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
