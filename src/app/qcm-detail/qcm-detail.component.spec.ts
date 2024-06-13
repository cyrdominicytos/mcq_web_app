import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmDetailComponent } from './qcm-detail.component';

describe('QcmDetailComponent', () => {
  let component: QcmDetailComponent;
  let fixture: ComponentFixture<QcmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcmDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
