import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: HttpService) {}

 
  createNote(payload: any): Observable<any> {
    return this.http.postApi('notes/addNotes', payload, this.http.getHeader());
  }

 
  getNotes(): Observable<any> {
    return this.http.getApi('notes/getNotesList', this.http.getHeader());
  }


  getArchivedNotes(): Observable<any> {
    return this.http.getApi('notes/getArchiveNotesList', this.http.getHeader());
  }


  changeNoteColor(noteId: string, color: string): Observable<any> {
    const payload = {
      color,
      noteIdList: [noteId]
    };
    return this.http.postApi('notes/changesColorNotes', payload, this.http.getHeader());
  }

  
  archiveNote(payload: any) {
    return this.http.postApi('notes/archiveNotes', payload, this.http.getHeader());
  }

  getTrashedNotes() {
  return this.http.getApi('notes/getTrashNotesList', this.http.getHeader());
  }

  deleteForever(payload: any) {
    return this.http.postApi('notes/deleteForeverNotes', payload, this.http.getHeader());
  }
  trashNote(payload: any) {
    return this.http.postApi('notes/trashNotes', payload, this.http.getHeader());
  }
  pinNote(payload: any) {
    return this.http.postApi('notes/pinUnpinNotes', payload, this.http.getHeader());
  }

  
  





}
