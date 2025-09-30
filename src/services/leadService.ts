import { prisma } from "@/database/databaseConnection";
import { CreateLeadInput, UpdateLeadInput } from "@/schemas";

export class LeadService {
  async createLead(data: CreateLeadInput) {
    try {
      const lead = await prisma.lead.create({
        data: {
          ...data,
          birthDate: new Date(data.birthDate),
        },
      });
      return lead;
    } catch (error) {
      throw new Error("Erro ao criar lead");
    }
  }
  async getLeadById(id: string) {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id },
      });

      if (!lead) {
        throw new Error("Lead não encontrado no banco de dados");
      }
      return lead;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao buscar lead"
      );
    }
  }
  async getAllLeads(page = 1, limit = 10, search?: string) {
    try {
      const skip = (page - 1) * limit;
      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {};

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            position: true,
            birthDate: true,
            message: true,
            utmSource: true,
            utmMedium: true,
            utmCampaign: true,
            utmTerm: true,
            utmContent: true,
            gclid: true,
            fbclid: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.lead.count({ where }),
      ]);
      return {
        leads,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error("Erro ao buscar leads");
    }
  }
  async updateLead(id: string, data: UpdateLeadInput) {
    try {
      const lead = await prisma.lead.update({
        where: { id },
        data: {
          ...data,
          birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        },
      });
      return lead;
    } catch (error) {
      throw new Error("Erro ao atualizar lead !");
    }
  }
  async deleteLead(id: string) {
    try {
      await prisma.lead.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao deletar lead");
    }
  }
  async exportLeads() {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      return leads;
    } catch (error) {
      throw new Error("Erro ao exportar leads");
    }
  }
}
