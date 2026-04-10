import nltk

class Paragrapher:
    def __init__(self, client, chunk_limit=4000):
        self.client = client
        self.chunk_limit = chunk_limit

    def chunk_text(self, text) -> list[str]:
        pass

    def paragraphize(self, text) -> str:
        chunks = self.chunk_text(text)
        result = ''
        for chunk in chunks:
            result += self.request(chunk)
        return result
    
    def request(self, text_chunk):
        prompt = f"""Break the following text into natural paragraphs.
Preserve every word exactly.

Text:
{text_chunk}
"""
        resp = self.client.chat.completions.create(
            model='llama-3.1-8b-instant',
            messages=[{'role': 'user', 'content': prompt}]
        )
        return resp.choices[0].message.content