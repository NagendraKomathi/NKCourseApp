import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMainTemplateComponent } from './test-main-template.component';

describe('TestMainTemplateComponent', () => {
  let component: TestMainTemplateComponent;
  let fixture: ComponentFixture<TestMainTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMainTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMainTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
