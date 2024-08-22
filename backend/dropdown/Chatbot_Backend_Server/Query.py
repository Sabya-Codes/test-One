class Query:
    def __init__(self, llm, db):
        self.llm = llm
        self.db = db

    def process_query(self, user_query):
        prompt = (
            "Generate a SQL query to select all columns from a table named 'employees' "
            "where the salary is greater than 50000 and the department is 'Sales'."
        )

        # sql_query = self.llm.generate(prompt)
        # print("SQL QUERY LLM:"+sql_query)
        #
        # # For security reasons, you might want to validate or sanitize the SQL query
        # # before executing it on your database
        # data = self.db_manager.query_data(sql_query)
        return self.db.get_table_info()
