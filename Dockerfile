# Use a versão LTS do Node.js
FROM node:18-alpine AS base

# Configuração de variáveis de ambiente
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Instala dependências apenas para compilação
FROM base AS deps
WORKDIR /app

# Copia os arquivos de configuração de dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Compilação da aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compila a aplicação
RUN npm run build

# Imagem de produção
FROM base AS runner
WORKDIR /app

# Cria um usuário não-root para executar a aplicação
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos necessários para produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Configura as permissões corretas
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
