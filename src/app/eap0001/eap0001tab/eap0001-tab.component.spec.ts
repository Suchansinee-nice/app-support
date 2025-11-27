import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap0001TabComponent } from './eap0001-tab.component';

describe('Eap0001TabComponent', () => {
  let component: Eap0001TabComponent;
  let fixture: ComponentFixture<Eap0001TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eap0001TabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eap0001TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
