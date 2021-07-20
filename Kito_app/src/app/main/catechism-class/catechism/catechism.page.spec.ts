import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatechismPage } from './catechism.page';

describe('CatechismPage', () => {
  let component: CatechismPage;
  let fixture: ComponentFixture<CatechismPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatechismPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatechismPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
