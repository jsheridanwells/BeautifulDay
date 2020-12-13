FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV MONGO_DSN mongodb://localhost:27017/beautifulDay
ENV PORT 3000
RUN npm run build:img
EXPOSE 3000
CMD ["npm", "start"]