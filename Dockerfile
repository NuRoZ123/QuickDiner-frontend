FROM node:16.10.0 as build-quickdiner
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as production-quickdiner
COPY --from=build-quickdiner /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]