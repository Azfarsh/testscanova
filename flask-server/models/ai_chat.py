from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference

class AIChatModel:
    def __init__(self):
        # IBM Cloud credentials
        self.WATSONX_EU_APIKEY = "dyMxBmL4Ed5W1be_02Tp-R2NnFBuBmVZ9CiaMGN49rLi"
        self.WATSONX_EU_PROJECT_ID = "42ffa95e-9858-4da3-8a16-3fd4d83dd48b"
        self.URL = "https://eu-gb.ml.cloud.ibm.com"

        self.credentials = Credentials(
            url=self.URL,
            api_key=self.WATSONX_EU_APIKEY
        )

        # Model setup
        self.model = ModelInference(
            model_id="mistralai/pixtral-12b",
            credentials=self.credentials,
            project_id=self.WATSONX_EU_PROJECT_ID,
            params={"max_tokens": 200}
        )

    def augment_api_request_body(self, user_query, text_input=None, image_input=None, document_input=None, voice_input=None):
        messages = [
            {
                "role": "user",
                "content": [{
                    "type": "text", 
                    "text": f"You are a helpful Medical assistant. Answer the following user query Provide the response in clear, Complete , structured paragraphs  for readability : {user_query}"
                }]
            }
        ]

        if text_input:
            messages[0]["content"].append({"type": "text", "text": text_input})

        if image_input:
            messages[0]["content"].append({
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{image_input}"}
            })

        if document_input:
            messages[0]["content"].append({"type": "document", "document": document_input})

        if voice_input:
            messages[0]["content"].append({"type": "voice", "voice": voice_input})

        return messages

    def get_response(self, user_query, text_input=None, image_input=None, document_input=None, voice_input=None):
        messages = self.augment_api_request_body(
            user_query,
            text_input,
            image_input,
            document_input,
            voice_input
        )

        response = self.model.chat(messages=messages)
        return response['choices'][0]['message']['content']