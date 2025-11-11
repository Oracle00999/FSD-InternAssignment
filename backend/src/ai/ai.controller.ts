import { Controller, Post, Body } from "@nestjs/common";

@Controller("ai-summary")
export class AiController {
  @Post()
  generateSummary(@Body() body: { text: string }): { summary: string } {
    //  Mock AI summarization
    const summary = this.mockAISummarize(body.text);
    return { summary };
  }

  private mockAISummarize(text: string): string {
    // Simple logic: take first sentence or first 100 characters
    const sentences = text.split(".");
    if (sentences.length > 1) {
      return sentences[0] + ".";
    }

    // If no clear sentence boundaries, take first 100 chars
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  }
}
