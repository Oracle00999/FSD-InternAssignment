import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { AiModule } from "./ai/ai.module";

@Module({
  imports: [NotesModule, AiModule],
})
export class AppModule {}
