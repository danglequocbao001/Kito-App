import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatechismMarriagePage } from './catechism-marriage.page';

describe('CatechismMarriagePage', () => {
  let component: CatechismMarriagePage;
  let fixture: ComponentFixture<CatechismMarriagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatechismMarriagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatechismMarriagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
