FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de configuração de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci

# Copiar o restante dos arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expor a porta
EXPOSE 3000

# Iniciar a aplicação
CMD ["npm", "start"]
