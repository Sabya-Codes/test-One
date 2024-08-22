import requests
from langchain.llms import BaseLLM


class Wrapper:
    def __init__(self, model_name: str, api_key: str):
        super().__init__()
        self.model_name = model_name
        self.api_key = api_key
        self.api_url = f"https://api-inference.huggingface.co/models/{self.model_name}"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}"
        }

    def generate(self, prompt: str) -> str:
        payload = {
            "inputs": prompt
        }
        response = requests.post(self.api_url, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.json()[0]['generated_text']

    def llm_type(self) -> str:
        return "HuggingFace API"
