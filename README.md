# CareInCode

CareInCode is a health support web app designed to help users understand their health data, simplify reports, and prepare better for doctor visits.

The project currently includes:

- A `frontend` built with React and Vite
- A `backend` built with FastAPI
- Three main user flows:
  - Health Reflection Tool
  - Report Simplifier
  - Doctor Visit Preparation

## Features

- Log optional vitals such as SpO2, blood pressure, heart rate, and temperature
- Upload medical reports and reserve space for plain-language summaries
- Track medications and symptom changes over time
- Generate a structured doctor-visit summary
- Responsive UI for desktop and mobile

## Tech Stack

- Frontend: React, Vite, Framer Motion, React Router
- Backend: FastAPI
- Database: MongoDB
- AI integration target: Gemini API

## Project Structure

```text
CareInCode/
|-- frontend/
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
|-- backend/
|   |-- app/
|   |-- requirements.txt
|   `-- Dockerfile
`-- README.md
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/suzannet-menon/CareInCode-AI-Health-Risk-Assessment-System.git
cd CareInCode-AI-Health-Risk-Assessment-System
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually start on:

```text
http://localhost:5173
```

### 3. Start the backend

Open a second terminal from the project root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run the API server:

```bash
uvicorn app.main:app --reload
```

The backend will usually start on:

```text
http://localhost:8000
```

## Environment Variables

The backend reads settings from a `.env` file inside the `backend` folder.

Example:

```env
GEMINI_API_KEY=
GEMINI_MODEL=models/gemini-2.5-flash
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=careincode
JWT_SECRET=careincode_jwt_secret
ENCRYPTION_KEY=careincode_secure_key_32
```

If you do not connect Gemini or MongoDB yet, parts of the app can still be developed visually from the frontend.

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
uvicorn app.main:app --reload
```

## Notes

- This project is a prototype and is not a medical diagnosis tool.
- Medical image interpretation is out of scope. The report simplifier is intended for report text and extracted report values.

## Future Improvements

- Connect live AI-powered analysis to all three flows
- Export structured doctor summaries as polished PDF documents
- Improve report extraction and summary formatting
- Add authentication and persistent user history
