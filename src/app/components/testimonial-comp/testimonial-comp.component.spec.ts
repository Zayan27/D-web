import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCompComponent } from './testimonial-comp.component';

describe('TestimonialCompComponent', () => {
  let component: TestimonialCompComponent;
  let fixture: ComponentFixture<TestimonialCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
