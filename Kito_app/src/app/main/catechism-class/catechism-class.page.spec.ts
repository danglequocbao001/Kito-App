import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatechismClassPage } from './catechism-class.page';

describe('CatechismClassPage', () => {
  let component: CatechismClassPage;
  let fixture: ComponentFixture<CatechismClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatechismClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatechismClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
