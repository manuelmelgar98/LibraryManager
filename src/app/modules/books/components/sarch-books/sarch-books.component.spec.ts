import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarchBooksComponent } from './sarch-books.component';

describe('SarchBooksComponent', () => {
  let component: SarchBooksComponent;
  let fixture: ComponentFixture<SarchBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SarchBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SarchBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
