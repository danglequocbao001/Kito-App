import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HymnMusicPage } from './hymn-music.page';

describe('HymnMusicPage', () => {
  let component: HymnMusicPage;
  let fixture: ComponentFixture<HymnMusicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HymnMusicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HymnMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
