import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettableComponent } from './assettable.component';

describe('AssettableComponent', () => {
  let component: AssettableComponent;
  let fixture: ComponentFixture<AssettableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssettableComponent]
    });
    fixture = TestBed.createComponent(AssettableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
