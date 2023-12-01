import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoPopupComponent } from './asset-info-popup.component';

describe('AssetInfoPopupComponent', () => {
  let component: AssetInfoPopupComponent;
  let fixture: ComponentFixture<AssetInfoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetInfoPopupComponent]
    });
    fixture = TestBed.createComponent(AssetInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
