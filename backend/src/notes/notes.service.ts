import { Injectable } from "@nestjs/common";
import { Note } from "./note.model";

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private idCounter = 1;

  create(noteData: { title: string; content: string }): Note {
    const newNote: Note = {
      id: (this.idCounter++).toString(),
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date(),
    };

    this.notes.push(newNote);
    return newNote;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findById(id: string): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }
}
