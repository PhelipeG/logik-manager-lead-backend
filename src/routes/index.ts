import { AuthController } from "../controllers/authController";
import { LeadController } from "../controllers/leadController";
import { FastifyInstance } from "fastify";

const leadController = new LeadController();

export async function routes(fastify: FastifyInstance) {
  // Schemas para documentação
  const leadSchema = {
    type: "object",
    required: ["name", "email", "phone", "position", "birthDate", "message"],
    properties: {
      id: { type: "string", format: "uuid", description: "ID do lead" },
      name: { type: "string", description: "Nome completo" },
      email: { type: "string", format: "email", description: "Email válido" },
      phone: { type: "string", description: "Telefone brasileiro" },
      position: { type: "string", description: "Cargo/posição" },
      birthDate: {
        type: "string",
        format: "date",
        description: "Data de nascimento",
      },
      message: { type: "string", description: "Mensagem do lead" },
      utmSource: { type: "string", description: "UTM Source" },
      utmMedium: { type: "string", description: "UTM Medium" },
      utmCampaign: { type: "string", description: "UTM Campaign" },
      utmTerm: { type: "string", description: "UTM Term" },
      utmContent: { type: "string", description: "UTM Content" },
      gclid: { type: "string", description: "Google Click ID" },
      fbclid: { type: "string", description: "Facebook Click ID" },
    },
  };
  const successResponse = {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: leadSchema,
      message: { type: "string" },
    },
  };

  fastify.post(
    "/api/leads",
    {
      schema: {
        description: "Criar novo lead (formulário público)",
        tags: ["Leads - Público"],
        body: leadSchema,
        response: { 201: successResponse },
      },
    },
    leadController.createLead
  );

  fastify.get(
    "/api/leads",
    {
      schema: {
        tags: ["Leads - Admin"],
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
            search: { type: "string", description: "Buscar por nome ou email" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              data: {
                type: "object",
                properties: {
                  leads: { type: "array", items: leadSchema },
                  total: { type: "integer" },
                  page: { type: "integer" },
                  totalPages: { type: "integer" },
                },
              },
            },
          },
        },
      },
    },
    leadController.getLeads
  );

  fastify.get(
    "/api/leads/:id",
    {
      schema: {
        tags: ["Leads - Admin"],
        params: {
          type: "object",
          required: ["id"],
          properties: { id: { type: "string" } },
        },
        response: { 200: successResponse },
      },
    },
    leadController.getLeadById
  );

  fastify.put(
    "/api/leads/:id",
    {
      schema: {
        tags: ["Leads - Admin"],
        params: {
          type: "object",
          required: ["id"],
          properties: { id: { type: "string" } },
        },
        body: { ...leadSchema, required: [] }, // Remove required para update
        response: { 200: successResponse },
      },
    },
    leadController.updateLead
  );

  fastify.delete(
    "/api/leads/:id",
    {
      schema: {
        tags: ["Leads - Admin"],
        params: {
          type: "object",
          required: ["id"],
          properties: { id: { type: "string" } },
        },
      },
    },
    leadController.deleteLead
  );

  fastify.get(
    "/api/leads/export/csv",
    {
      schema: {
        tags: ["Leads - Admin"],
        response: { 200: { type: "string", description: "Arquivo CSV" } },
      },
    },
    leadController.exportLeads
  );

  // Health check
  fastify.get(
    "/api/health",
    {
      schema: {
        tags: ["Sistema"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              success: { type: "boolean" },
              timestamp: { type: "string" },
            },
          },
        },
      },
    },
    async () => ({
      message: "API funcionando!",
      success: true,
      timestamp: new Date().toISOString(),
    })
  );
}
