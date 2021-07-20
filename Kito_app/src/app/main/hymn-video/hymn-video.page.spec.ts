import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HymnVideoPage } from './hymn-video.page';

describe('HymnVideoPage', () => {
  let component: HymnVideoPage;
  let fixture: ComponentFixture<HymnVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HymnVideoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HymnVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
