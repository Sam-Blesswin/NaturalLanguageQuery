# Speech 2 SQL Project

## Natural Language Query

This project enables querying a database using natural language through speech-to-text technology.

## Tech Stack

- Python
- TypeScript
- FastAPI
- Langchain
- React
- GPT 3.5 LLM
- Google Speech-to-Text

## Project Setup

### Backend

**Framework**: FastAPI with uvicorn

#### Environment Variables

Create a `config.env` file in the backend directory and add the following:

```
OPENAI_API_KEY=
```

#### Google Speech-to-Text

You will need the `service_account.json` file to access the Google Speech-to-Text API. Place it in the backend directory.

#### How to Run the Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Activate the virtual environment:

   ```
   source venv/bin/activate
   ```

3. Start the server:
   ```
   python app/main.py
   ```

### Frontend

**Framework**: React with Vite, Tailwind CSS, and TypeScript

#### How to Run the Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Important Note

Ensure that you have obtained the `OPENAI_API_KEY` and the `service_account.json` file before running the backend. The `OPENAI_API_KEY` can be obtained from OpenAI, and the `service_account.json` can be obtained from the Google Cloud Console.

For any questions or issues, feel free to contact samblesswin.stephenrajan@utah.edu and vijay.vempati@utah.edu.
