import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiocesesPage } from './dioceses.page';

describe('DiocesesPage', () => {
  let component: DiocesesPage;
  let fixture: ComponentFixture<DiocesesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiocesesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiocesesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
