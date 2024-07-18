"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.setGlobalPrefix("/api/v1");
    await app.listen(process.env.PORT);
    console.log("Server Start Port:", process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map