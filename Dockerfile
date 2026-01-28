FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Copy source and generate OpenAPI spec at build time so /docs is available in container
COPY . ./

# Generate tsoa spec (requires devDependencies to be present)
RUN npm run generate:docs || true

RUN npx prisma generate || true

EXPOSE 3000

CMD ["npm", "run", "dev"]
