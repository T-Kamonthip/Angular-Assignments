import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgFourColorComponent } from './bg-four-color.component';

describe('BgFourColorComponent', () => {
  let component: BgFourColorComponent;
  let fixture: ComponentFixture<BgFourColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BgFourColorComponent]
    });
    fixture = TestBed.createComponent(BgFourColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
