import { Controller, Get, Post, Body } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { Note } from "./note.model";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: { title: string; content: string }): Note {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(): Note[] {
    return this.notesService.findAll();
  }
}
