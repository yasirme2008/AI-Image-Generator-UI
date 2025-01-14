class ImgGenerator{
    constructor(app){
        this.app = app;
    }
    async sendRequest(){
        const payload = {
            "model": this.app.selectedModel.firstElementChild.innerText,
            "inferenceSteps": Number(this.app.stepsText.innerText),
            "cfgScale": Number(this.app.cfgText.innerText),
            "prompt": this.app.promptTextBox.value,
            "negativePrompt": this.app.negativeTextBox.value,
            "style": this.app.selectedStyleElem.innerText,
            "aspectRatio": this.app.selectedAspectRatioElem.innerText,
            "width": Number(this.app.widthTextBox.value),
            "height": Number(this.app.heightTextBox.value)
        }
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            return response
        } catch (error) {
            return error
        }
    }
    async generate(){
        const div = document.createElement('div');
        const img = document.createElement('img');
        const p = document.createElement('p')
        img.src = 'https://i.gifer.com/origin/34/3459e0e117b5d35a51aef0cf1e443831_w200.webp'
        div.className = 'imgsDiv';
        div.appendChild(img);
        this.app.generatedImgs.prepend(div)
        this.app.generateBtn.disabled = true;

        try {
            const response = await this.sendRequest();
            if(!response.ok){
                if(response.status==400 || response.status==404){
                    const data = await response.json()
                    div.removeChild(img)
                    div.appendChild(p)
                    p.innerText = `error: ${data['message']}`
                }
                else{
                    div.removeChild(img)
                    div.appendChild(p)
                    p.innerText = `${await response.text()}`
                }
                this.app.generateBtn.disabled = false;
                return
            }
            const data = await response.json();
            const imgSrc = data['url'];
            img.src = imgSrc;
            this.app.generateBtn.disabled = false;

        } catch (error) {
            p.innerText = `error: ${error}`;
            this.app.generateBtn.disabled = false;

        }
        
    }
}


export default ImgGenerator;