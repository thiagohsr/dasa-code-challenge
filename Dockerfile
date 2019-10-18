FROM node:lts-alpine

# instala um servidor http simples para servir conteúdo estático
RUN npm install -g serve
RUN npm install -g yarn

# faz da pasta 'app' o diretório atual de trabalho
WORKDIR /app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# instala dependências do projeto
RUN yarn install

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
COPY . .

# compila a aplicação de produção com minificação
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]