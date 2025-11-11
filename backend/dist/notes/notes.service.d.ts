import { Note } from "./note.model";
export declare class NotesService {
    private notes;
    private idCounter;
    create(noteData: {
        title: string;
        content: string;
    }): Note;
    findAll(): Note[];
    findById(id: string): Note | undefined;
}
