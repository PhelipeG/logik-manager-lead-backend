import { ApiResponse, createLeadSchema, updateLeadSchema } from "@/schemas";
import { LeadService } from "@/services/leadService";
import { FastifyReply, FastifyRequest } from "fastify";

const leadService = new LeadService();

export class LeadController {
  async createLead(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validation = createLeadSchema.safeParse(request.body);

      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          error: "Dados Invalidos",
          message: validation.error.errors[0]?.message || "Erro de Validaçao",
        } as ApiResponse);
      }
      const lead = await leadService.createLead(validation.data);

      return reply.status(201).send({
        success: true,
        data: lead,
        message: "Lead criado com sucesso",
      } as ApiResponse);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      } as ApiResponse);
    }
  }
  async getLeads(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, search } = request.query as {
        page?: string;
        limit?: string;
        search?: string;
      };

      const result = await leadService.getAllLeads(
        parseInt(page || "1"),
        parseInt(limit || "10"),
        search
      );

      return reply.send({
        success: true,
        data: {
          leads: result.leads,
          total: result.pagination.total,
          page: result.pagination.page,
          limit: result.pagination.limit,
          totalPages: result.pagination.pages,
        },
      } as ApiResponse);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      } as ApiResponse);
    }
  }
  async getLeadById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const lead = await leadService.getLeadById(id);

      return reply.send({
        success: true,
        data: lead,
      } as ApiResponse);
    } catch (error) {
      return reply.status(404).send({
        success: false,
        error: error instanceof Error ? error.message : "Lead não encontrado",
      } as ApiResponse);
    }
  }
  async deleteLead(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await leadService.deleteLead(id);

      return reply.send({
        success: true,
        message: "Lead deletado com sucesso !",
      } as ApiResponse);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      } as ApiResponse);
    }
  }
  async exportLeads(request: FastifyRequest, reply: FastifyReply) {
    try {
      const leads = await leadService.exportLeads();

      const headers = [
        "ID",
        "Nome",
        "Email",
        "Telefone",
        "Cargo",
        "Data Nascimento",
        "Mensagem",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "UTM Term",
        "UTM Content",
        "GCLID",
        "FBCLID",
        "Criado em",
      ];

      const csvData = [
        headers.join(","),
        ...leads.map((lead: any) =>
          [
            lead.id,
            `"${lead.name}"`,
            lead.email,
            lead.phone,
            `"${lead.position}"`,
            lead.birthDate.toISOString().split("T")[0],
            `"${lead.message}"`,
            lead.utmSource || "",
            lead.utmMedium || "",
            lead.utmCampaign || "",
            lead.utmTerm || "",
            lead.utmContent || "",
            lead.gclid || "",
            lead.fbclid || "",
            lead.createdAt.toISOString(),
          ].join(",")
        ),
      ].join("\n");

      reply.header("Content-Type", "text/csv");
      reply.header("Content-Disposition", "attachment; filename=leads.csv");
      return reply.send(csvData);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      } as ApiResponse);
    }
  }
  async updateLead(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validation = updateLeadSchema.safeParse(request.body);

      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          error: "Dados inválidos",
          message: validation.error.errors[0]?.message || "Erro de validação",
        } as ApiResponse);
      }

      const lead = await leadService.updateLead(id, validation.data);

      return reply.send({
        success: true,
        data: lead,
        message: "Lead atualizado com sucesso",
      } as ApiResponse);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      } as ApiResponse);
    }
  }
}
