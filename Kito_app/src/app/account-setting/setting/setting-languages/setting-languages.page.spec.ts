import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingLanguagesPage } from './setting-languages.page';

describe('SettingLanguagesPage', () => {
  let component: SettingLanguagesPage;
  let fixture: ComponentFixture<SettingLanguagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLanguagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingLanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
