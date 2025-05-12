FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

RUN yarn install --frozen-lockfile

EXPOSE 3001

CMD ["node", "dist/app.js"]
