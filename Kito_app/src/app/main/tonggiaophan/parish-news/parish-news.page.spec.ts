import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParishNewsPage } from './parish-news.page';

describe('ParishNewsPage', () => {
  let component: ParishNewsPage;
  let fixture: ComponentFixture<ParishNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParishNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
