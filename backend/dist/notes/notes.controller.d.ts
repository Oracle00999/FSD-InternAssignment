import { NotesService } from "./notes.service";
import { Note } from "./note.model";
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(createNoteDto: {
        title: string;
        content: string;
    }): Note;
    findAll(): Note[];
}
