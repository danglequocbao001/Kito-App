import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { ParishesPage } from './parishes.page';

describe('ParishesPage', () => {
  let component: ParishesPage;
  let fixture: ComponentFixture<ParishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
