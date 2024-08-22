import os
from Query import Query
from langchain_community.utilities import SQLDatabase
from langchain_cohere import ChatCohere

os.environ[
    'COHERE_API_KEY'] = 'WxPWfSIHVASNIFMlfnLMrViai4iKklvMl1jvfVu5'

model_name = "google/flan-t5-large"
api_key = "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"  # Replace with your actual API key
db_url = 'sqlite:///../../heritage_culture_data/heritage_culture.db'

llm = ChatCohere()
db = SQLDatabase.from_uri(db_url)
query_handler = Query(llm, db)

user_query = "how many states are from odisha?"
result = query_handler.process_query(user_query)
print(result)
