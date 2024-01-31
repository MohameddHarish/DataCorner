import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialogComponentComponent } from './delete-confirmation-dialog-component.component';

describe('DeleteConfirmationDialogComponentComponent', () => {
  let component: DeleteConfirmationDialogComponentComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDialogComponentComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
