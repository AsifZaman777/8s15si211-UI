import zim from "https://zimjs.org/cdn/016/zim";
const { Reactangel, Circle, label, Frame, Slider, Button, Pic, Ticker, GlowEffect } = zim;

const frame = new Frame(FIT, 1920, 1080, "#edf0f5");

frame.on("ready", () => {
    
    const bg = new Pic("images/bg.png").center();
    const wheel = new Pic("images/wheel.png").centerReg().pos(380, 540);
    const wheelStand = new Pic("images/wheelStand.png").pos(500, 650);
    const fan = new Pic("images/fan.png").centerReg().pos(1638, 550);
   
    const lightGlowEffect = new Circle(20, "yellow").center().mov(610, 375);
    let glowEffect = new GlowEffect({ color: "yellow", blurX: 0, blurY: 0, knockout: true });
    lightGlowEffect.effect(glowEffect);

    // Place slider...
    // Slider for force control...
    const button_slider = new Button({
        label: "",
        width: 85,
        height: 85,
        backgroundColor: "blue",
        borderWidth: 0,
        corner: 40
    }).sca(.3);

    // Button-blue for the slider button...
    const turbineSlider = new Slider({ 
        min: 0,
        max: 10,
        step: 1,
        currentValue: 0,
        button: button_slider,
        barColor: "transparent",
    })
    .center()
    .sca(2.07)
    .pos(155, 970);

    const powerBtn = new Button({
        label: "",
        width: 85,
        height: 85,
        backgroundColor: "transparent",
        borderWidth: 0,
        corner: 40,
    }).center().pos(1080, 920);

    const toggleButtonImg = new Pic("images/button.png").center(powerBtn);

    let toggle = false;
    let fanTickerListener = null;
    let lightTickerListener = null;

    Ticker.add(() => {
        wheel.rotation += turbineSlider.currentValue;
    });

    function startFan() {
        if (fanTickerListener) return; // Prevent adding multiple listeners
        fanTickerListener = Ticker.add(() => {
            fan.rotation += turbineSlider.currentValue;
            if (fan.rotation >= 360) {
                fan.rotation = 0;
            }
        });
    }

    function stopFan() {
        if (fanTickerListener) {
            Ticker.remove(fanTickerListener);
            fanTickerListener = null;
        }
    }

    function startGlow() {
        if (lightTickerListener) return; // Prevent adding multiple listeners
        lightTickerListener = Ticker.add(() => {
            const value = turbineSlider.currentValue;
            glowEffect = new GlowEffect({ color: "yellow", blurX: value * 5, blurY: value * 5, knockout: true });
            lightGlowEffect.effect(glowEffect);
        });
    }

    function stopGlow() {
        if (lightTickerListener) {
            Ticker.remove(lightTickerListener);
            lightTickerListener = null;
        }
        glowEffect = new GlowEffect({ color: "yellow", blurX: 0, blurY: 0, knockout: true });
        lightGlowEffect.effect(glowEffect);
    }

    powerBtn.on("click", () => {
        toggle = !toggle;
        
        if (toggle && turbineSlider.currentValue > 0) {
            startFan();
            startGlow();
        } else {
            stopFan();
            stopGlow();
        }
    });
});
