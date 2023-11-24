import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReturnFormComponent } from './asset-return-form.component';

describe('AssetReturnFormComponent', () => {
  let component: AssetReturnFormComponent;
  let fixture: ComponentFixture<AssetReturnFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetReturnFormComponent]
    });
    fixture = TestBed.createComponent(AssetReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
