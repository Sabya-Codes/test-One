from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate


class Query:
    def __init__(self, llm, db):
        self.llm = llm
        self.db = db

    def get_schema(self, _):
        return self.db.get_table_info()

    def process_query(self, user_query):
        prompt_raw = """
        Based on the table schema below, write a SQL query that would answer the user's question.
        {schema}
        
        Question: {question}
        SQL Query:
        """
        prompt = ChatPromptTemplate.from_template(prompt_raw)
        prompt.format(schema="my schema", question="how many cities are there?")

        sql_chain = (
                RunnablePassthrough.assign(schema=self.get_schema)
                | prompt | self.llm
                | StrOutputParser()
        )

        return sql_chain.invoke({"question": "how many cities are there?"})
