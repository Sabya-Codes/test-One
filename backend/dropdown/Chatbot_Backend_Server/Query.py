import re

from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate


class Query:
    def __init__(self, llm, db):
        self.llm = llm
        self.db = db

    def get_schema(self, _):
        return self.db.get_table_info()

    def run_query(self, query):
        return self.db.run(query)

    def process_query(self, user_query):
        prompt_raw = """
        Based on the table schema below, write a SQL query that would answer the user's question.
        Do not write anything other than sql query
        {schema}
        
        Question: {question}
        SQL Query:
        """
        prompt = ChatPromptTemplate.from_template(prompt_raw)
        prompt.format(schema="my schema", question=user_query)

        sql_chain = (
                RunnablePassthrough.assign(schema=self.get_schema)
                | prompt | self.llm
                | StrOutputParser()
        )

        template = """
        Base on the table schema below, question, sql query, and sql response, write a natural language response:
        Do not write anything other than natural language response
        {schema}
        
        Question: {question}
        SQL Query: {query}
        SQL Response: {response}"""

        prompt2 = ChatPromptTemplate.from_template(template)

        full_chain = (

                RunnablePassthrough.assign(query=sql_chain).assign(
                    schema=self.get_schema, response=lambda variables: self.run_query(variables["query"]))
                | prompt2 | self.llm | StrOutputParser()

        )

        return full_chain.invoke({"question": user_query})
