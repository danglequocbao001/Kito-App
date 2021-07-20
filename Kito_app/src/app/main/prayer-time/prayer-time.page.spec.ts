import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrayerTimePage } from './prayer-time.page';

describe('PrayerTimePage', () => {
  let component: PrayerTimePage;
  let fixture: ComponentFixture<PrayerTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrayerTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
