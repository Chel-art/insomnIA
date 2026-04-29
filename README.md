# InsomnIA 🌙

InsomnIA es una aplicación web de interpretación de sueños con memoria persistente. El usuario describe sus sueños y recibe análisis profundos desde una perspectiva psicológica y filosófica (inspirada en Freud, Jung, Lacan, Nietzsche, Camus y Sartre) a través de **Morfeo**, una inteligencia artificial especializada en el inconsciente humano.

## Características Principales ✨

- **Diario de Sueños:** Registro y gestión de múltiples sesiones de interpretación de sueños.
- **Análisis Profundo (Morfeo):** Interpretaciones psicoanalíticas y existencialistas de los sueños.
- **Memoria Onírica Persistente:** El asistente recuerda tus sueños pasados, detectando patrones, símbolos y emociones recurrentes a lo largo de tu historial.
- **Estética Inmersiva:** Interfaz de usuario "Glassmorphism" con un fondo interactivo y dinámico (Three.js) y paleta de colores oscura y onírica.
- **Autenticación Segura:** Registro e inicio de sesión con JWT y contraseñas encriptadas.

## Tecnologías Utilizadas 💻

### Frontend
- **React (Vite)**
- **TypeScript**
- **Tailwind CSS v4** (con diseño de variables CSS personalizadas y Glassmorphism)
- **Three.js** (fondo interactivo de partículas)
- **React Router Dom** (navegación)
- **Sonner** (notificaciones toast)

### Backend
- **Node.js + Express**
- **Prisma ORM**
- **SQLite** (Base de datos local)
- **OpenAI API** (Modelo GPT-4.1-mini para el análisis y extracción de contexto)
- **JWT & bcrypt** (Autenticación)

## Requisitos Previos ⚙️

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (v18 o superior)
- **npm** o **yarn**
- Una clave de API de **OpenAI**.

## Configuración y Ejecución 🚀

1. **Clonar el repositorio:**
   \`\`\`bash
   git clone https://github.com/Chel-art/insomnIA.git
   cd insomnIA
   \`\`\`

2. **Configurar el Backend:**
   \`\`\`bash
   cd server
   npm install
   \`\`\`
   Crea un archivo `.env` en la carpeta `server/` copiando el ejemplo:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edita el `.env` y añade tu \`OPENAI_API_KEY\` y tu secreto para \`JWT_SECRET\`.

   Configura la base de datos y aplica el esquema de Prisma:
   \`\`\`bash
   npx prisma db push
   \`\`\`
   Inicia el servidor backend:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Configurar el Frontend:**
   Abre una nueva terminal y navega a la carpeta del cliente:
   \`\`\`bash
   cd client
   npm install
   \`\`\`
   Inicia el entorno de desarrollo de Vite:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **¡Disfruta!**
   Abre tu navegador en \`http://localhost:5173\` (o el puerto que Vite te asigne) para empezar a registrar tus sueños.

## Arquitectura 🏗️

El proyecto sigue una estricta separación de responsabilidades:
- **MVC en Backend**: Separación clara entre Rutas (`routes/`), Lógica de Negocio (`services/`), y Acceso a Datos DAO (`dao/`).
- **Hooks & Contexto en Frontend**: Lógica de UI encapsulada en React Hooks (`useChat`, `useAuth`) para mantener los componentes visuales limpios y fáciles de probar.

---
*Desarrollado con inspiración onírica. "El sueño es el alivio de las miserias para los que las sufren despiertos" - Miguel de Cervantes.*