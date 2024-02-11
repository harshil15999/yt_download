FROM node:18-alpine
WORKDIR /task-manager
COPY package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
COPY ./config/dev.env /task-manager/config
EXPOSE 3000
# RUN chown -R node /task-manager
# USER node
CMD ["npm", "start"]
