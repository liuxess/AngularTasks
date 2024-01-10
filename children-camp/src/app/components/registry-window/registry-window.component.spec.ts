import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryWindowComponent } from './registry-window.component';

describe('RegistryWindowComponent', () => {
  let component: RegistryWindowComponent;
  let fixture: ComponentFixture<RegistryWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistryWindowComponent]
    });
    fixture = TestBed.createComponent(RegistryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
