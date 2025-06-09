import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http_service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: HttpService) {}

  createNote(data: any): Observable<any> {
    return this.http.postApi('notes/addNotes', data, this.http.getHeader());
  }
  getNotes() {
  return this.http.getApi('notes/getNotesList', this.http.getHeader()); 
  }
  changeNoteColor(noteId: string, color: string) {
  const url = 'notes/changesColorNotes';
  const payload = {
    color,
    noteIdList: [noteId]
  };
  return this.http.postApi(url, payload, this.http.getHeader()); 
 }
}

