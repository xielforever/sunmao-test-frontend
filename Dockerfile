FROM node:22-alpine AS build
WORKDIR /src
COPY package.json build.js test.js ./
COPY src ./src
RUN npm run test && npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
