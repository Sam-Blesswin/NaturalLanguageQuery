from typing import List
from pydantic import BaseModel

class FieldModel(BaseModel):
    name: str
    type: str

class TableModel(BaseModel):
    tablename: str
    fields: List[FieldModel]

class QueryRequest(BaseModel):
    schema: List[TableModel]
    prompt: str

class DbRequest(BaseModel):
    db_url: str
    query: str
