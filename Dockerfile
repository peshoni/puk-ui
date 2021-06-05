# pull official base image
FROM node:alpine as pwc-front-end 

# set working directory
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=pwc-front-end /app/build /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# # start app
# CMD ["npm", "start"]
#https://mherman.org/blog/dockerizing-a-react-app/