FROM node:20-alpine

WORKDIR /the-aussie-outfit-admin-service

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5001

CMD ["npm", "start"]