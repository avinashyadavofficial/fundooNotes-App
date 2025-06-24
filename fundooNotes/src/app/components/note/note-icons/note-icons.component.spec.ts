import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteIconsComponent } from './note-icons.component';

describe('NoteIconsComponent', () => {
  let component: NoteIconsComponent;
  let fixture: ComponentFixture<NoteIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoteIconsComponent]
    });
    fixture = TestBed.createComponent(NoteIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
