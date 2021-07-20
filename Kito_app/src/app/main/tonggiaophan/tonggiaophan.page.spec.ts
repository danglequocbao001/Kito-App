import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TonggiaophanPage } from './tonggiaophan.page';

describe('TonggiaophanPage', () => {
  let component: TonggiaophanPage;
  let fixture: ComponentFixture<TonggiaophanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonggiaophanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TonggiaophanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
