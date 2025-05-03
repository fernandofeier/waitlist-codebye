FROM node:18-alpine

WORKDIR /app

# Instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar código fonte
COPY . .

# Construir aplicação
RUN npm run build

# Configurar ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expor porta
EXPOSE 3000

# Iniciar aplicação
CMD ["npm", "start"]
