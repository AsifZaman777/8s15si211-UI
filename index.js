import zim from "https://zimjs.org/cdn/016/zim";
const{Reactangel,Circle, label,Frame,Slider,Button}= zim;

const frame = new Frame(FIT,1920,1080,"#edf0f5");

frame.on("ready",()=>{
    
    const bg = new Pic("images/bg.png").center();
    const wheel = new Pic("images/wheel.png").pos(380,540)
    const wheelStand = new Pic("images/wheelStand.png").pos(500,650);
    const brightPicture = new Pic("images/bright.png").pos(1500,845).alp(0);
    
    const fan = new Pic("images/fan.png").centerReg().pos(1638,550);

    //place slider...
    //slider for force control..
    const button_slider = new Button({
        label: "",
        width: 85,
        height: 85,
        backgroundColor: "blue",
        borderWidth: 0,
        corner: 40
    }).sca(.3);
    //const sliderImage = new Pic("images/sliderbutton.png");
    ///button-blue for the slider buttton
    const slider_1 = new Slider({ 
        min:0,
        max:10,
        step: 1,
        currentValue: 0,
        button: button_slider,
        barColor:"transparent",

    })
    .center()
    .sca(2.07)
    .pos(155,970)
    .change(() => {

    zog(slider_1.currentValue);
    });

    const powerBtn = new Button({
        label: "",
        width: 85,
        height: 85,
        backgroundColor: "transparent",
        borderWidth: 0,
        corner: 40,
        

    }).center().pos(1080,920);

const toggolebutton1 = new Pic("images/button.png").center(powerBtn);

powerBtn.on("click",()=>{
     fan.animate({
        props:{rotation:-360},
        loop:true,
        time:.9,
        ease:"linear",
        
     })
     brightPicture.alp(1);


})







})