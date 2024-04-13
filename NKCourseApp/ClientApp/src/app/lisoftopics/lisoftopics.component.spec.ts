import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisoftopicsComponent } from './lisoftopics.component';

describe('LisoftopicsComponent', () => {
  let component: LisoftopicsComponent;
  let fixture: ComponentFixture<LisoftopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisoftopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisoftopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
