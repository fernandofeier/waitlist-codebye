#!/bin/bash
# Script de build para o Easypanel

# Instalar dependências
npm ci

# Construir a aplicação
npm run build

# Exibir mensagem de sucesso
echo "Build concluído com sucesso!"
