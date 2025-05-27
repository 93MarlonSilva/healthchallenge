# Health Challenge E-commerce

## Sobre o Projeto
Este é um projeto de e-commerce desenvolvido como um desafio técnico, utilizando tecnologias modernas e otimizadas para performance e escalabilidade.

## Deploy
O projeto está disponível online através da Vercel:
- [Health Challenge E-commerce](https://healtchallenge-react-next.vercel.app/pt)

## Tecnologias Utilizadas

### Next.js
- Escolhido como framework principal devido à sua capacidade nativa de SEO (Search Engine Optimization) que se enquadra nesse projeto de E-commerce
- Renderização do lado do servidor (SSR) para melhor performance
- Otimização automática de imagens
- Roteamento dinâmico
- API Routes integradas

### Gerenciamento de Estado
- Context API nativa do React
- Escolhida por ser uma solução leve e adequada para o escopo do projeto
- Facilita o compartilhamento de estado entre componentes
- Reduz a complexidade do código

### Internacionalização (i18n)
- i18next para suporte a múltiplos idiomas
- Facilita a expansão do e-commerce para diferentes mercados
- Gerenciamento centralizado de traduções

### Estilização
- Tailwind CSS
  - Framework utility-first que permite desenvolvimento rápido
  - Performance otimizada através de purging automático de CSS não utilizado
  - Responsividade nativa
  - Customização flexível
  - Redução significativa do tamanho final do CSS

### Arquitetura
- Componentes reutilizáveis
- Custom Hooks para lógica compartilhada
- Estrutura organizada e escalável

### Dados e Imagens
- Utilização de dados mockados localmente
  - Inicialmente foi projetado uso do Firebase com Realtime Database para armazenamento de dados
  - Imagens foram hospedadas no Firebase Storage
  - API REST foi desenvolvida para consumo dos dados 
  - Por questões de tempo e simplicidade, optou-se por utilizar dados locais
  - Imagens e dados dos produtos estão armazenados localmente no projeto
  - Esta abordagem permite desenvolvimento e testes mais rápidos
  - Facilita a demonstração do projeto sem dependência de serviços externos

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse o projeto em `http://localhost:3000`

## Screenshots

### Home Page
![Home Page](/public/assets/images/homemd.png)

### Product Page
![Product Page](/public/assets/images/productmd.png)

### Orthopedic Page
![Orthopedic Page](/public/assets/images/orthopedicmd.png)

## Estrutura do Projeto

```
├── components/     # Componentes reutilizáveis
├── contexts/      # Contextos do React
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
├── public/        # Arquivos estáticos
├── styles/        # Estilos globais
└── utils/         # Funções utilitárias
```

