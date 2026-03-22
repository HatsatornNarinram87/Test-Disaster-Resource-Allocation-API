# ใช้ Node version เบา ๆ
FROM node:20-alpine

# สร้าง working directory
WORKDIR /app

# copy package ก่อน (เพื่อ cache layer)
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port
EXPOSE 3000

# run app
CMD ["npm", "run", "start:prod"]