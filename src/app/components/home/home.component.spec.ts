import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyLoaderComponent } from '../my-loader/my-loader.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RecordDetailsService } from 'src/app/shared/recordDetails.service';
import { rocketDetailsMock } from 'src/app/shared/constant';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ],
      declarations: [ HomeComponent, MyLoaderComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: RecordDetailsService,
      useValue: jasmine.createSpyObj('RecordDetailsService', ['getFilteredData'])}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    const mockService = TestBed.get(RecordDetailsService);
    mockService.getFilteredData.and.returnValue(of(rocketDetailsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    debugger;
    expect(component).toBeTruthy();
  });

  it('should display Space X launch Programs', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('SpaceX Launch Programs');
  });
  it('should have rocket details populated ', () => {
    expect(component.rocketDetails.length).toBeGreaterThan(0);
  });
});

