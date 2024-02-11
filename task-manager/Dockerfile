FROM node:18-alpine
WORKDIR /src
COPY package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node /src
USER node
CMD ["npm", "start"]
