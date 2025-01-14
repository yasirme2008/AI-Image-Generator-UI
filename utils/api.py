import requests
import base64

class Api:
    def __init__(self):
        pass
    def imgToBase64(self,response):
        base64_data = base64.b64encode(response.content).decode('utf-8')
        mime_type = response.headers['Content-Type']
        base64_image_url = f"data:{mime_type};base64,{base64_data}"
        return {"code": 200, "url": base64_image_url}

    def handleResponse(self,response):
        if response.headers.get('Content-Type', '').startswith('image/'):
            return self.imgToBase64(response=response)
        #else handle your response accordingly...

    def send_req(
        self,
        api_url,
        headers,
        data):
        payload_template = {
            "inputs": data['prompt'],
                "parameters": {
                    "guidance_scale": data['cfgScale'],
                    "negative_prompt": data['negativePrompt'],
                    "num_inference_steps": data['inferenceSteps'],
                    "width": data['width'],
                    "height": data['height']
                }
        }

        try:
            response = requests.post(api_url,headers=headers,json=payload_template)
            if(response.status_code!=200):
                return {"code": 500, "message": f"an error occured: {response.text}"}, 500
            return self.handleResponse(response=response)
        except Exception as e:
            return {"code": 500, "message": f"an error occured: {e}"}, 500
            
