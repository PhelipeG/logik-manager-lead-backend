import { prisma } from "@/database/databaseConnection";
import { CreateLeadInput, UpdateLeadInput } from "@/schemas";

export class LeadService {
  private readonly leadSelect = {
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
  };
  private validateDate(dateString: string): Date {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida");
    }
    return date;
  }
  async createLead(data: CreateLeadInput) {
    try {
      const lead = await prisma.lead.create({
        data: {
          ...data,
          birthDate:
            typeof data.birthDate === "string"
              ? this.validateDate(data.birthDate)
              : data.birthDate,
        },
        select: this.leadSelect,
      });
      return lead;
    } catch (error) {
      console.error("Erro ao criar lead:", error);
      if (error instanceof Error && error.message === "Data inválida") {
        throw error;
      }
      throw new Error("Erro ao criar lead");
    }
  }
  async getAllLeads(page = 1, limit = 10, search?: string) {
    try {
      const skip = (page - 1) * limit;

      if (page < 1 || limit < 1 || limit > 100) {
        throw new Error("Parâmetros de paginação inválidos");
      }
      const where = search?.trim()
        ? {
            OR: [
              {
                name: { contains: search.trim(), mode: "insensitive" as const },
              },
              {
                email: {
                  contains: search.trim(),
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {};

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: this.leadSelect,
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
      console.error("Erro ao buscar leads:", error);
      throw new Error("Erro ao buscar leads");
    }
  }
  async getLeadById(id: string) {
    try {
      if (!id?.trim()) {
        throw new Error("ID é obrigatório");
      }
      const lead = await prisma.lead.findUnique({
        where: { id: id.trim() },
        select: this.leadSelect,
      });

      if (!lead) {
        throw new Error("Lead não encontrado");
      }
      return lead;
    } catch (error) {
      console.error(`Erro ao buscar lead ${id}:`, error);
      throw new Error(
        error instanceof Error ? error.message : "Erro ao buscar lead"
      );
    }
  }
  async updateLead(id: string, data: UpdateLeadInput) {
    try {
      const updateData = { ...data };

      if (data.birthDate) {
        const date = new Date(data.birthDate);
        if (isNaN(date.getTime())) {
          throw new Error("Data de nascimento inválida");
        }
        updateData.birthDate = date;
      }

      const lead = await prisma.lead.update({
        where: { id },
        data: updateData,
        select: this.leadSelect,
      });
      return lead;
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
      throw new Error("Erro ao atualizar lead");
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
