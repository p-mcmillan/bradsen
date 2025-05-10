FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3001

CMD ["node", "dist/app.js"]
