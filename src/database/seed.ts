import { prisma } from "./databaseConnection";

async function main() {
  console.log("🌱Iniciando database seed...");
  const sampleLeads = [
    {
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      position: "Desenvolvedor",
      birthDate: new Date("1990-05-15"),
      message: "Interessado em conhecer mais sobre os serviços.",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "lead-gen",
    },
    {
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      position: "Gerente de Marketing",
      birthDate: new Date("1985-08-22"),
      message: "Gostaria de agendar uma reunião para discutir parcerias.",
      utmSource: "facebook",
      utmMedium: "social",
      fbclid: "test-fbclid-123",
    },
    {
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      phone: "(21) 77777-7777",
      position: "Analista de Dados",
      birthDate: new Date("1992-11-30"),
      message: "Preciso de mais informações sobre os planos disponíveis.",
      utmSource: "linkedin",
      utmMedium: "social",
      gclid: "test-gclid-456",
    }
  ];

  for (const leadData of sampleLeads) {
    const existingLead = await prisma.lead.findFirst({
      where: { email: leadData.email },
    });

    if (!existingLead) {
      await prisma.lead.create({
        data: leadData,
      });
    }
  }

  console.log("📊 Simples leads criados");
  console.log("✅ Seed completo com sucesso!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failhou:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
