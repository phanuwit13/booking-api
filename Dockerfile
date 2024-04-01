FROM node:20-alpine as builder

RUN npm install -g ts-node

# กำหนดไดเร็กทอรีทำงาน
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ yarn.lock ไปยังไดเร็กทอรีทำงาน
COPY package.json yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install

# คัดลอกทั้งหมดในโฟลเดอร์ปัจจุบันไปยังไดเร็กทอรีทำงาน
COPY . .

# สร้างไฟล์ที่จำเป็นด้วย Prisma
RUN yarn prisma generate

# หมายเหตุ: ไม่รัน migration ที่นี่ เพราะต้องการฐานข้อมูลที่เชื่อมต่อได้

# เปิดพอร์ต 8080
EXPOSE 8080

# คำสั่งเมื่อ container เริ่มทำงาน
CMD ["yarn", "dev"]