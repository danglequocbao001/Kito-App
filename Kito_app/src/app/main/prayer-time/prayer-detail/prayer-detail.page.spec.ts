import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrayerDetailPage } from './prayer-detail.page';

describe('PrayerDetailPage', () => {
  let component: PrayerDetailPage;
  let fixture: ComponentFixture<PrayerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrayerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
