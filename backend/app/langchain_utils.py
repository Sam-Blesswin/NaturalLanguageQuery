import os
from dotenv import load_dotenv

from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain

from model import QueryRequest

# Setup LangChain with OpenAI
load_dotenv('config.env')
api_key = os.getenv('OPENAI_API_KEY')

llm = OpenAI(api_key=api_key)

template = """
Schema Information:
{schema_info}

Question:
Convert the following natural language question into a SQL query based on the schema above:
"{natural_language_question}"

Instructions:
Use the provided schema to determine the correct table and fields to include in your SQL query. Make sure the query correctly reflects the conditions described in the natural language question. If the question involves specific operations like joining tables, filtering, or aggregating data, ensure these are correctly implemented in your SQL query. Provide the SQL query below:

SQL Query:
"""

prompt = PromptTemplate.from_template(template)
llm_chain = LLMChain(prompt=prompt, llm=llm)

async def handle_langchain_request(request: QueryRequest):
    try:
        schema = request.schema
        schema_info = ""
        for table in schema:
            schema_info += f"Table {table.tablename} contains fields: "
            schema_info += ", ".join([f"{field.name} ({field.type})" for field in table.fields]) + ".\n"

        natural_language_question = request.prompt

        response = await llm_chain.ainvoke({"schema_info": schema_info, "natural_language_question": natural_language_question})
        return {"response": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))