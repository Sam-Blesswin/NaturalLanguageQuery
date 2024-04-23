from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from model import QueryRequest
from langchain_utils import handle_langchain_request
from speech_to_text import transcribe_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.post("/generate/")
async def generate(request: QueryRequest):
    return await handle_langchain_request(request)

@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    return await transcribe_audio(file)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(host="0.0.0.0", port=8000, app="main:app")