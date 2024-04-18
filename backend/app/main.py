import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain

# Define a Pydantic model for request data
class Prompt(BaseModel):
    text: str

# Initialize FastAPI app
app = FastAPI()

# Setup LangChain with OpenAI
load_dotenv('config.env')
api_key = os.getenv('OPENAI_API_KEY')
llm = OpenAI(api_key=api_key)

template = """Question: {question}
            Answer: """

prompt = PromptTemplate.from_template(template)

llm_chain = LLMChain(prompt=prompt, llm=llm)

@app.post("/generate/")
async def generate(prompt: Prompt):
    try:
        # Generate text using LangChain
        question = prompt.text
        response = await llm_chain.ainvoke(question)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8000, app=app)