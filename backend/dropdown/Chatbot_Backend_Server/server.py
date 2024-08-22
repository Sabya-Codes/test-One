from DbManager import DbManager
from Query import Query
from Wrapper import Wrapper


model_name = "google/flan-t5-large"
api_key = "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"  # Replace with your actual API key
db_path = '../../heritage_culture_data/heritage_culture.db'

llm = Wrapper(model_name=model_name, api_key=api_key)
db_manager = DbManager(db_path)
query_handler = Query(llm, db_manager)

user_query = "show me all records related to cities"
result = query_handler.process_query(user_query)
print(result)
