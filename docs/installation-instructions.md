# Instrucciones para instalar y ejecutar el proyecto  
Incluye pasos para backend y frontend, sin requerir conocimientos previos del desarrollo.

---

# 1. Requisitos previos
Asegurarse de tener instalados:

- **Node.js** (versión LTS recomendada)  
- **npm** (incluido con Node.js)  
- **MySQL** (si el backend usa MySQL; configurar credenciales en `.env`)  
- **Git** (opcional, para clonar el repositorio)

---

## 2.1 Instalación backend
Entrar al directorio del backend y ejecutar:

- cd backend
- npm install

---

## 2.2 Instalación frontend
Entrar al directorio del backend y ejecutar:

- cd frontend
- npm install

---


## 3. Configuración

Crear un archivo .env en /backend con las variables necesarias:

DB_NAME=dsw_agro_db
DB_USER=root
DB_PASSWORD=tucontraseña
DB_HOST=localhost
DB_PORT=3306
PORT=3000
SECRET_KEY=An&PVttImkE&

--- 

## 4.1 Ejecución backend

- Desarrollo: npm run dev

- Producción: npm run build
              npm start

## 4.2 Ejecución frontend

- Desarrollo: npm run dev

- Producción: npm run build
              npm run preview
            
