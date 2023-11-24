import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocateFormComponent } from './asset-allocate-form.component';

describe('AssetAllocateFormComponent', () => {
  let component: AssetAllocateFormComponent;
  let fixture: ComponentFixture<AssetAllocateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetAllocateFormComponent]
    });
    fixture = TestBed.createComponent(AssetAllocateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
