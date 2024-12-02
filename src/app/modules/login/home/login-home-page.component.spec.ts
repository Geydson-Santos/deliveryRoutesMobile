import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomePage } from './login-home-page.component';

describe('HomePage', () => {
  let component: LoginHomePage;
  let fixture: ComponentFixture<LoginHomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
