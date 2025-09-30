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

**Tracking Automático:**
- UTM Source, Medium, Campaign, Term, Content
- Google Click ID (gclid)
- Facebook Click ID (fbclid)

## 🚀 Como Executar

### Opção 1: Usando Docker (Recomendado para Testes)

#### Pré-requisitos
- Docker e Docker Compose instalados

#### 1. Clonar o repositório
```bash
git clone https://github.com/PhelipeG/logik-manager-lead-backend.git
cd logik-manager-lead-backend
```

#### 2. Subir PostgreSQL com Docker
```bash
# Subir o banco PostgreSQL
docker-compose up -d

# Verificar se está rodando
docker ps
```

#### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Banco de dados Docker
DATABASE_URL="postgresql://logik_user:logik_password@localhost:5432/logik_leads"
# Servidor
PORT=5000
NODE_ENV="development"
```

#### 4. Instalar dependências e executar
```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# Executar aplicação
npm run dev
```

#### 5. Parar o Docker
```bash
# Parar PostgreSQL
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v
```

### Opção 2: Instalação Tradicional

#### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL instalado localmente ou Docker (ver Opção 1)
- npm ou yarn

#### 1. Clonar o repositório
```bash
git clone https://github.com/PhelipeG/logik-manager-lead-backend.git
cd logik-manager-lead-backend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Banco de dados local
DATABASE_URL="postgresql://usuario:senha@localhost:5432/logik_leads"
# Servidor
PORT=5000
NODE_ENV="development"
```

#### 4. Configurar banco de dados
```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# (Opcional) Executar seed para dados de teste
npm run db:seed
```

#### 5. Executar o servidor
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:5000`

## 🐳 Docker Compose

O projeto inclui um `docker-compose.yml` para facilitar o teste local:

### Configuração do PostgreSQL
```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: logik_leads
      POSTGRES_USER: logik_user
      POSTGRES_PASSWORD: logik_password
    ports:
      - "5432:5432"
```

### Comandos úteis do Docker
```bash
# Subir apenas o PostgreSQL
docker-compose up -d

# Ver logs do PostgreSQL
docker-compose logs postgres

# Conectar ao PostgreSQL
docker exec -it logik_postgres psql -U logik_user -d logik_leads

# Parar serviços
docker-compose down

# Resetar dados (remove volumes)
docker-compose down -v
```
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

### 🌐 API em Produção
**URL Base:** https://logik-manager-lead-backend.onrender.com

### Swagger UI (Interativa)
- **Local:** http://localhost:5000/docs
- **Produção:** https://logik-manager-lead-backend.onrender.com/docs

A documentação interativa permite:
- 📖 Visualizar todos os endpoints
- 🧪 Testar as rotas diretamente
- 📝 Ver schemas de request/response

### Health Check
```bash
# Local
GET http://localhost:5000/api/health

# Produção
GET https://logik-manager-lead-backend.onrender.com/api/health
```
## 📊 Exemplos de Uso

### Criar Lead (Público)
```bash
# Local
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

# Produção
curl -X POST https://logik-manager-lead-backend.onrender.com/api/leads \
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
```

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

### 🌐 Deploy em Produção
**API Live:** https://logik-manager-lead-backend.onrender.com

**Plataforma:** Render.com  
**Banco de dados:** NeonDB (PostgreSQL)

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
