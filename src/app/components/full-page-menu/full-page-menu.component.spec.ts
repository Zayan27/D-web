import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageMenuComponent } from './full-page-menu.component';

describe('FullPageMenuComponent', () => {
  let component: FullPageMenuComponent;
  let fixture: ComponentFixture<FullPageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullPageMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
