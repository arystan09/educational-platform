# 1. Используем полноценный Node.js образ (без Alpine)
FROM node:20

WORKDIR /app

# 2. Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# 3. Копируем исходный код
COPY . .

# 4. Собираем приложение
RUN npm run build

# 5. Запускаем NestJS-приложение
CMD ["npm", "run", "start:prod"]
