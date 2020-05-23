FROM node:12.9.1-alpine

# Env
ENV NODE_ENV dev

# Create Directory for the Container
WORKDIR /usr/src/app

# Install all Packages
RUN npm install

# TypeScript
RUN npm run tsc

# Copy all other source code to work directory
ADD /out /usr/src/app

