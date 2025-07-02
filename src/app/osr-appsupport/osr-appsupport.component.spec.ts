import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsrAppsupportComponent } from './osr-appsupport.component';

describe('OsrAppsupportComponent', () => {
  let component: OsrAppsupportComponent;
  let fixture: ComponentFixture<OsrAppsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsrAppsupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsrAppsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
