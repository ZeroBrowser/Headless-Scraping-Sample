FROM node:12.9.1-alpine AS build
ENV NODE_ENV dev
COPY . ./usr/src/app
WORKDIR /usr/src/app
RUN npm install
#compile
RUN npm run tsc 

FROM node:slim
ENV NODE_ENV production
EXPOSE 7001
COPY --from=build /usr/src/app/out /usr/src/app
COPY --from=build /usr/src/app/package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm install --production
# Start
CMD [ "npm", "start" ]