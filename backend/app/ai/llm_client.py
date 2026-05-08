from google import genai

import app.core.config as config


client = genai.Client(
    api_key=config.settings.GEMINI_API_KEY
)


class LLMClient:

    def generate(
        self,
        prompt: str
    ):

        try:

            response = client.models.generate_content(

                model=config.settings.GEMINI_MODEL,

                contents=prompt
            )

            return {
                "success": True,
                "text": response.text
            }

        except Exception as e:

            error_text = str(e)

            # Rate limit handling
            if "429" in error_text:

                return {
                    "success": False,
                    "error":
                        "AI service temporarily overloaded. Please try again later."
                }

            return {
                "success": False,
                "error": error_text
            }


llm_client = LLMClient()