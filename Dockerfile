# Stage 1: Build the React Application
FROM node:22-alpine AS build

WORKDIR /app

# نسخ ملفات الـ package وتسطيب المكتبات
COPY package.json package-lock.json ./
RUN npm install

# نسخ باقي ملفات المشروع وعمل Build
COPY . .
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine

# مسح الملفات الافتراضية بتاعة Nginx
RUN rm -rf /usr/share/nginx/html/*

# نسخ ملف إعدادات Nginx اللي عملناه
COPY nginx.conf /etc/nginx/conf.d/default.conf

# نسخ الملفات النهائية من المرحلة الأولى
COPY --from=build /app/dist /usr/share/nginx/html

# كشف البورت رقم 80
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]