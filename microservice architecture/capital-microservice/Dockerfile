FROM node

# Establece el directorio de trabajo en el contenedor
WORKDIR /src

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo del contenedor
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 3001

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
