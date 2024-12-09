import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: { get: (key: string) => (key === 'isbn' ? '9781234567890' : null) }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
