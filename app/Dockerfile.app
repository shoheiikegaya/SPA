FROM node:14.16-alpine3.12
#ENV NODE_ENV=development

COPY ./ /app
WORKDIR /app
RUN npm install
#RUN npm run build
RUN npm run dev
EXPOSE 3001
#CMD npm start
