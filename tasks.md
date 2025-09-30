# Checklist Backend - Teste Técnico L0gik | Sistema de Leads

## 🔧 Configuração e Setup

- [ ] Configurar ESLint + Prettier
  - [ ] Instalar dependências necessárias
  - [ ] Criar arquivo `.eslintrc.json`
  - [ ] Criar arquivo `.prettierrc`
  - [ ] Configurar scripts no `package.json`

## 🗃️ Banco de Dados (PostgreSQL/Prisma)

- [x] Configurar schema do Prisma
  - [x] Modelo de Lead com campos obrigatórios:
    - [x] nome (string, obrigatório)
    - [x] email (string, obrigatório, único)
    - [x] telefone (string, obrigatório)
    - [x] cargo (string, obrigatório)
    - [x] data_nascimento (date, obrigatório)
    - [x] mensagem (text, obrigatório)
  - [x] Campos de tracking automático:
    - [x] utm_source (string, opcional)
    - [x] utm_medium (string, opcional)
    - [x] utm_campaign (string, opcional)
    - [x] utm_term (string, opcional)
    - [x] utm_content (string, opcional)
    - [x] gclid (string, opcional)
    - [x] fbclid (string, opcional)
  - [x] Campos de controle:
    - [x] createdAt (datetime)
    - [x] updatedAt (datetime)
  - [] Modelo de User (autenticação básica)
  - [] Executar migrations

## 🔐 API REST - Autenticação Básica

- [ ] Implementar autenticação básica
  - [ ] Rota de login - POST /api/auth/login
  - [ ] Middleware de autenticação para rotas protegidas
  - [ ] Geração de JWT tokens ou sessão simples

## 📋 API REST - CRUD de Leads

### Rotas Públicas
- [ ] POST /api/leads (formulário público)
  - [ ] Receber dados do formulário
  - [ ] Capturar UTMs automaticamente
  - [ ] Validações obrigatórias:
    - [ ] Email válido (formato)
    - [ ] Telefone brasileiro (regex)
    - [ ] Data de nascimento válida
    - [ ] Todos campos obrigatórios preenchidos

### Rotas Protegidas (Painel Admin)
- [ ] GET /api/leads (listar leads)
  - [ ] Paginação
  - [ ] Busca por nome/email
  - [ ] Filtros opcionais
- [ ] GET /api/leads/:id (detalhes do lead)
  - [ ] Visualizar dados completos
  - [ ] Incluir dados de tracking (UTMs)
- [ ] PUT /api/leads/:id (editar lead)
- [ ] DELETE /api/leads/:id (deletar lead)

### Controllers & Services
- [ ] Criar `LeadController`
  - [ ] createLead (público)
  - [ ] getAllLeads (protegido)
  - [ ] getLeadById (protegido)
  - [ ] updateLead (protegido)
  - [ ] deleteLead (protegido)
  - [ ] searchLeads (protegido)

- [ ] Criar `LeadService`
  - [ ] Validações de dados
  - [ ] Sanitização de inputs
  - [ ] Lógica de negócio
  - [ ] Tratamento de UTMs

## 📤 Export CSV/Excel

- [ ] Implementar funcionalidade de exportação
  - [ ] GET /api/leads/export/csv (protegida)
  - [ ] GET /api/leads/export/excel (protegida) - opcional
  - [ ] Incluir todos os dados do lead
  - [ ] Incluir dados de tracking
  - [ ] Headers adequados para download
  - [ ] Formatação correta dos dados

## 🛡️ Middlewares

- [ ] Middleware de autenticação
  - [ ] Verificar credenciais/token
  - [ ] Proteger rotas administrativas

- [ ] Middleware de validação
  - [ ] Validar email (formato correto)
  - [ ] Validar telefone brasileiro
  - [ ] Validar data de nascimento
  - [ ] Campos obrigatórios

- [ ] Middleware de CORS
  - [ ] Permitir frontend público
  - [ ] Configurar headers adequados

- [ ] Middleware de tratamento de erros
  - [ ] Respostas padronizadas
  - [ ] Log de erros

## 📚 Documentação Obrigatória

- [ ] Criar README detalhado
  - [ ] Instruções de instalação
  - [ ] Como rodar o projeto
  - [ ] Configuração do banco
  - [ ] Variáveis de ambiente
  - [ ] Endpoints da API

- [ ] Documentar API REST
  - [ ] Rotas públicas
  - [ ] Rotas protegidas
  - [ ] Exemplos de request/response
  - [ ] Códigos de erro

## 🔄 Validações Específicas do Teste

- [ ] Validação de email (formato válido)
- [ ] Validação de telefone brasileiro
- [ ] Validação de data de nascimento
- [ ] Todos campos obrigatórios funcionando
- [ ] Captura automática de UTMs
- [ ] Busca por nome/email funcionando
- [ ] Exportação CSV funcionando
- [ ] Autenticação básica implementada

## � Deploy e Finalização

- [ ] Configurar variáveis de ambiente
- [ ] Testar todas as rotas
- [ ] Validar integrações
- [ ] Preparar para deploy (Render, Railway, etc.)
- [ ] Documentação final
- [ ] Code review

---

**Requisitos Técnicos:**
- Node.js (JavaScript ou TypeScript) ✅
- Banco: PostgreSQL (recomendado) ou MySQL/MongoDB
- API REST completa com documentação obrigatória
- Todas as validações implementadas
- Export CSV obrigatório
