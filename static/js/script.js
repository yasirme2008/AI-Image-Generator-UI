import ImgGenerator from "./utils/genImg.js";
class App {
    constructor() {
        this.imgGenerator = new ImgGenerator(this);
        this.initElems();
        this.assignEventListeners();
        this.selectedStyleElem;
        this.selectedAspectRatioElem;
    }

    initElems() {
        const propertyNames = [
            "promptTextBox",
            "negativeTextBox",
            "generateBtn",
            "selectedModel",
            "cfgText",
            "cfgRange",
            "stepsText",
            "stepsRange",
            "aspectRatioDiv",
            "widthTextBox",
            "heightTextBox",
            "styles",
            "closeMobileSettings",
            "openMobileSettings",
            "configs",
            "availableModels",
            "generatedImgs"
        ];

        propertyNames.forEach(propertyName => {
            this[propertyName] = document.getElementById(propertyName);
        });
        this.selectedStyleElem = this.styles.firstElementChild;
        this.selectedStyleElemColor = '2px solid rgba(37, 185, 243, 0.3)';
        this.selectedStyleElem.style.border = this.selectedStyleElemColor;

        this.selectedAspectRatioElem = this.aspectRatioDiv.firstElementChild;
        this.selectedAspectRatioElemColor = '2px solid rgba(105, 204, 243, 0.3)';
        this.selectedAspectRatioElem.style.border = this.selectedAspectRatioElemColor;

    }

    assignEventListeners(){
        this.generateBtn.addEventListener('click',()=>{
            this.imgGenerator.generate();
            this.imgGenerator.generate();
        })
        this.closeMobileSettings.addEventListener('click', ()=>{
            this.configs.style.display='none'
        });
        this.openMobileSettings.addEventListener('click', ()=>{
            this.configs.style.display='flex'
        });
        this.cfgRange.addEventListener('input',()=>{
            this.cfgText.innerText = cfgRange.value;
        });
        this.stepsRange.addEventListener('input',()=>{
            this.stepsText.innerText = stepsRange.value;
        });
        this.selectedModel.addEventListener('click', ()=>{
            this.selectedModel.style.display='none';
            this.availableModels.style.display = this.availableModels.style.display === 'flex' ? 'none' : 'flex';
        })
        this.selectedModelChild=null;
        for(const child of this.availableModels.children){
            child.addEventListener('click', ()=>{
                if(this.selectedModelChild){
                    this.selectedModelChild.style.border='';
                }
                this.selectedModel.firstElementChild.innerText = child.innerText;
                child.style.border = '2px solid rgba(116, 253, 223, 0.2)'
                this.availableModels.style.display='none';
                this.selectedModel.style.display='flex';
                this.selectedModelChild = child;
            })
        }
        for (const child of this.styles.children) {
            child.addEventListener('click', () => {
                this.selectedStyleElem.style.border = '';
                this.selectedStyleElem = child;
                child.style.border = this.selectedStyleElemColor;
            });
        }
        for(const child of this.aspectRatioDiv.children){
            child.addEventListener('click', () => {
                this.selectedAspectRatioElem.style.border = '';
                this.selectedAspectRatioElem = child;
                if(this.selectedAspectRatioElem.innerText=='1:1'){
                    this.widthTextBox.value = 1024;
                    this.heightTextBox.value = 1024;
                } else if(this.selectedAspectRatioElem.innerText=='9:16'){
                    this.widthTextBox.value = 576;
                    this.heightTextBox.value = 1024;
                } else if(this.selectedAspectRatioElem.innerText=='16:9'){
                    this.widthTextBox.value = 1024;
                    this.heightTextBox.value = 576;
                } else if(this.selectedAspectRatioElem.innerText=='3:4'){
                    this.widthTextBox.value = 768;
                    this.heightTextBox.value = 1024;
                } else if(this.selectedAspectRatioElem.innerText=='4:3'){
                    this.widthTextBox.value = 1024;
                    this.heightTextBox.value = 768;
                }
                child.style.border = this.selectedAspectRatioElemColor;
            });
        }

        document.getElementById('closeNote').addEventListener('click', ()=>{
            document.getElementById('note').style.display = 'none';
        })
    }

    
}

const app = new App();
