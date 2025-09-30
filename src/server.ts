import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === "production" ? "warn" : "info",
  },
});

async function start() {
  try {
    await fastify.register(require("@fastify/swagger"), {
      swagger: {
        info: {
          title: "L0gik Leads API",
          description: "API para gerenciamento de leads",
          version: "1.0.0",
        },
        host: "localhost:5000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
      },
    });

    await fastify.register(require("@fastify/swagger-ui"), {
      routePrefix: "/docs", 
    });

    // Registrar plugins
    await fastify.register(cors, {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    });
    // Registrar rotas
    await fastify.register(routes);

    const port = Number(process.env.PORT) || 3001;
    const host =
      process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

    await fastify.listen({ port, host });
    console.log(`🚀 Servidor rodando em http://${host}:${port}`);
  } catch (error) {
    console.error("Erro ao iniciar servidor", error);
    process.exit(1);
  }
}

start();
