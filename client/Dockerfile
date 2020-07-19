FROM node:alpine
LABEL maintainer="Mohamed Hussein"
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

