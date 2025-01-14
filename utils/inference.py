import json
import os
from utils.api import Api
class Inference:
    def __init__(self):
        self.api = Api()
        with open('./pipeline.json') as file:
            self.pipeline_dict = json.load(file)
        self.config = self.pipeline_dict['configs']
        with open('./styles.json') as file:
            self.styles_dict = json.load(file)

    def validate(self,data):
        try:
            if(data['model'] not in self.pipeline_dict):
                return {"code": 404, "message": "model not found"}, 404
            elif(data['style'] not in self.styles_dict):
                return {"code": 404, "message": "style not found"}, 404

            model = data['model']
            prompt = self.styles_dict[data['style']].replace("{prompt}", data['prompt'][:self.config['max_prompt_length']])
            negativePrompt = data['negativePrompt'][:self.config['max_negative_prompt_length']]
            inferenceSteps = max(self.config['min_inference_steps'], min(data['inferenceSteps'], self.config['max_inference_steps']))
            cfgScale = max(self.config['min_cfg_scale'], min(data['cfgScale'], self.config['max_cfg_scale']))
            width = max(self.config['min_width'], min(data['width'], self.config['max_width']))
            height = max(self.config['min_height'], min(data['height'], self.config['max_height']))

            transformed = { 
                "prompt": prompt,
                "negativePrompt": negativePrompt,
                "cfgScale": cfgScale,
                "width": width,
                "height": height,
                "aspectRatio": data['aspectRatio'],
                "inferenceSteps": inferenceSteps,
                "model": model,
            }
            return transformed
        except KeyError:
            return {"code": 400, "message": "required parameters are missing"}, 400
        except Exception as e:
            return {"code": 500, "message": f"unexpected error: {e}"}, 500

    def inference(self,data):
        data = self.validate(data=data)
        if isinstance(data, tuple):
            return data

        headers = self.pipeline_dict[data['model']]['headers']
        envHeaders = self.pipeline_dict[data['model']]['envHeaders']
        for header in envHeaders:
            auth = envHeaders[header].split(' ')
            headers[header] = f"{auth[0]} {eval(auth[1])}"
        api_url = self.pipeline_dict[data['model']]['api_url']
        return self.api.send_req(api_url,headers,data)
