import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabled CORS for frontend communication
  app.enableCors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  });

  await app.listen(3001);
  console.log("Backend server running on http://localhost:3001");
}
bootstrap();
