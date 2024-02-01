export default class PennyUI{
    //singleton 
    static instance:PennyUI|null;
    //elements
    elRoot:HTMLElement = document.getElementById('inputUIRoot')!;
    elTopUI:HTMLElement = document.getElementById('topUI')!;
    constructor(){
        //singleton
        if(PennyUI.instance){return PennyUI.instance}
        PennyUI.instance = this;
        //default ui state
        this.showCanvas(false);
        this.showTopUI(false);
    }
    showCanvas(b:boolean){
        console.log(b)
        if(b){
            this.elRoot.setAttribute('style', 'opacity:1');
        }else{
            this.elRoot.setAttribute('style', 'opacity:0');
        }
    }
    showTopUI(b:boolean){
        if(b){
            this.elTopUI.classList.remove('topUI-slideUp')
        }else{
            this.elTopUI.classList.add('topUI-slideUp')
        }
    }
}