# 🚀 L0gik Leads API

API REST para sistema de gerenciamento de leads desenvolvida como parte do teste técnico para vaga de Desenvolvedor Full Stack na L0gik.

## 📋 Sobre o Projeto

Sistema completo de cadastro e gestão de leads que oferece:
- **Formulário público** para captura de leads
- **Painel administrativo** para gestão completa
- **Tracking automático** de UTMs e parâmetros de marketing
- **Export CSV** para análise de dados

## 🛠️ Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Fastify** (Framework web)
- **Prisma ORM** (Banco de dados)
- **PostgreSQL** (Banco de dados)
- **Zod** (Validação de schemas)
- **Swagger** (Documentação da API)

## ⚡ Funcionalidades

### 🌐 Rotas Públicas
- **POST /api/leads** - Criar novo lead (formulário público)
- **POST /api/auth/login** - Login no sistema
- **POST /api/auth/register** - Registrar novo usuário

### 🔐 Rotas Protegidas (Requer Autenticação)
- **GET /api/leads** - Listar leads com paginação e busca
- **GET /api/leads/:id** - Visualizar detalhes de um lead específico
- **PUT /api/leads/:id** - Atualizar dados de um lead
- **DELETE /api/leads/:id** - Deletar um lead
- **GET /api/leads/export/csv** - Exportar leads em formato CSV
- **GET /api/auth/verify** - Verificar validade do token

### 📊 Campos do Lead
**Obrigatórios:**
- Nome completo
- Email (validação de formato)
- Telefone (validação brasileira)
- Cargo/Posição
- Data de nascimento
- Mensagem

**Tracking Automático:**
- UTM Source, Medium, Campaign, Term, Content
- Google Click ID (gclid)
- Facebook Click ID (fbclid)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone https://github.com/PhelipeG/logik-manager-lead-backend.git
cd logik-manager-lead-backend

```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/logik_leads"
# Servidor
PORT=5000
NODE_ENV="development"
```

### 4. Configurar banco de dados
```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# (Opcional) Executar seed para dados de teste
npm run db:seed
```

### 5. Executar o servidor
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:5000`

## 📚 Documentação da API

### Swagger UI (Interativa)
Acesse: **http://localhost:5000/docs**

A documentação interativa permite:
- 📖 Visualizar todos os endpoints
- 🧪 Testar as rotas diretamente
- 📝 Ver schemas de request/response

### Health Check
```bash
GET http://localhost:5000/api/health
```
## 📊 Exemplos de Uso

### Criar Lead (Público)
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "position": "Desenvolvedor",
    "birthDate": "1990-05-15",
    "message": "Interessado nos serviços",
    "utmSource": "google",
    "utmMedium": "cpc"
  }'

## 🗂️ Estrutura do Projeto

```
src/
├── controllers/       # Controladores das rotas
├── services/         # Lógica de negócio
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação (Zod)
├── database/        # Configuração do banco
└── server.ts        # Arquivo principal

prisma/
├── schema.prisma    # Schema do banco de dados
└── migrations/      # Migrations do banco
```

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Executar em desenvolvimento
npm run build        # Build para produção
npm start           # Executar em produção
npm run db:generate # Gerar cliente Prisma
npm run db:migrate  # Executar migrations
npm run db:push     # Sincronizar schema (dev)
npm run db:seed     # Executar seed (dados teste)
```

## 🔧 Validações Implementadas

- ✅ **Email**: Formato válido obrigatório
- ✅ **Telefone**: Padrão brasileiro `(XX) XXXXX-XXXX`
- ✅ **Data**: Formato ISO válido
- ✅ **Campos obrigatórios**: Validação server-side

## 🚀 Deploy

### Variáveis de ambiente para produção:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="production-secret"
NODE_ENV="production"
PORT=5000
```
## 🤝 Contribuição

Este projeto foi desenvolvido como teste técnico para a L0gik. 

### Autor
**Luis Felipe Silva** - [LinkedIn](https://www.linkedin.com/in/luis-felipe-silv) - [GitHub](https://github.com/PhelipeG)

---

## 📞 Suporte

Para dúvidas sobre este projeto:
- 📧 Email: luisphelipe1000@gmail.com
- 💼 LinkedIn: [Luis Felipe Silva](https://www.linkedin.com/in/luis-felipe-silv)

---

**Desenvolvido com ❤️ para o teste técnico L0gik**
