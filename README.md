# Victor Rocha / strattegia.dev

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="https://opensource.org/licenses/CC-BY-NC-4.0"><img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-7f5af0?style=for-the-badge" alt="License: CC BY-NC 4.0" /></a>
</p>

**Uma vitrine digital de alta performance.**

> Soluções digitais com estética minimalista, arquitetura robusta e foco na experiência do usuário.

---

## ⚡ Sobre o Projeto

Este repositório hospeda o ecossistema pessoal de **Victor Rocha**.  
Mais do que um simples portfólio, é uma aplicação **Next.js 14 (App Router)** completa, projetada para demonstrar domínio em **arquitetura de software**, **otimização de performance (Core Web Vitals)** e **design de interface**.

O projeto foi construído sobre o **design system Once UI**, mas fortemente customizado com funcionalidades exclusivas de backend e otimizações de renderização.

---

## 🛠 Tech Stack & Arquitetura

### Core

- **Framework:** Next.js 14 (App Router / Server Components)
- **Linguagem:** TypeScript
- **Estilização:** Once UI (SCSS Modules / CSS Variables) & Classnames
- **Content:** MDX (com componentes customizados via next-mdx-remote)

### Features Exclusivas

- **Server-Side OG Generator:** Painel administrativo interno (`/admin/generator`) para criar capas de projetos em tempo real usando **Satori** e **Edge Functions**.
- **Internacionalização (i18n):** Sistema customizado de contexto (PT/EN) sem overhead de bibliotecas pesadas.
- **Newsletter:** Integração via API Route própria com **Mailchimp** (Double Opt-in & Tagging).
- **Easter Egg:** Implementação do **Konami Code** (`↑↑↓↓←→←→BA`) com carregamento preguiçoso (Lazy Loading) para não impactar o TBT.

### Infra & Analytics

- **Deploy:** Vercel
- **Monitoramento:** Vercel Analytics & Speed Insights
- **SEO:** JSON-LD Schemas dinâmicos e Metadata API do Next.js.

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para clonar e executar o projeto na sua máquina.

### 1. Clone o repositório

```
git clone https://github.com/strattegia-mp3/personal-portfolio.git
cd personal-portfolio
```

### 2. Instale as dependências

```
npm install
```

### 3. Configuração de Variáveis de Ambiente

Renomeie o arquivo `.env.example` para `.env.local` e preencha as chaves:

```
# URL Base (Crucial para OG Images e SEO)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Integração Mailchimp (Newsletter)
MAILCHIMP_API_KEY="sua_api_key"
MAILCHIMP_SERVER_PREFIX="usX"
MAILCHIMP_AUDIENCE_ID="seu_audience_id"
```

### 4. Execute o servidor de desenvolvimento

```
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── admin/        # Gerador de OG Images (Edge Runtime)
│   ├── api/          # Rotas API (Subscribe, OG Generate, Auth)
│   ├── blog/         # Páginas do Blog
│   ├── work/         # Páginas de Projetos
│   └── layout.tsx    # Root Layout (Server Component)
├── components/
│   ├── mdx/          # Mapeamento de componentes Markdown
│   ├── gallery/      # Visualização de Grid/Masonry
│   └── ...           # Componentes de UI modulares
├── resources/        # Conteúdo estático e configurações (i18n)
└── views/            # Client Components para páginas principais
```

---

## ✨ Funcionalidades em Destaque

### 🎨 OG Image Generator (Admin)

Uma ferramenta interna acessível em `/admin/generator`.  
Permite customizar títulos, cargos e imagens de fundo para gerar **PNG de alta qualidade on-the-fly** para compartilhamento social.  
Utiliza **@vercel/og**.

---

### 🌍 Sistema de i18n Híbrido

Utiliza uma abordagem híbrida onde o conteúdo estático reside em `src/resources/content-i18n.tsx`.

- **SEO:** Metadata gerado no servidor.
- **UX:** `TitleManager` atualiza o título da aba no cliente instantaneamente ao trocar o idioma.

---

### 📝 Blog com MDX Power

Os posts do blog suportam **componentes React interativos dentro do Markdown**, como:

- `<CodeBlock />` com syntax highlighting.
- `<Feedback />` para callouts.
- `<Pt>` e `<En>` para renderização condicional de idioma dentro do mesmo arquivo.

---

## 🤝 Créditos & Licença

Este projeto utiliza como base o template **Magic Portfolio** da **Once UI**, distribuído sob licença **CC BY-NC 4.0**.

- **Design System:** Once UI
- **Desenvolvimento & Customizações:** Victor Rocha

Desenvolvido com 💜 e TypeScript por **Victor Rocha**.
