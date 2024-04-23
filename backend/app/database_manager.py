from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

async def execute(db_url: str, query: str):
    engine = create_engine(db_url)
    with engine.connect() as connection:
        try:
            print("connected")
            sqlquery = text(query)
            result = connection.execute(sqlquery)

            # For SELECT type queries, fetch results
            if query.strip().lower().startswith('select'):
                results = [row._asdict() for row in result]
                return results
            else:
                # For non-SELECT type queries (INSERT, UPDATE, DELETE), commit to save changes
                connection.commit()
                return f"Query executed successfully: {query}"
        except SQLAlchemyError as e:
            # Rollback in case of error
            connection.rollback()
            return str(e) 