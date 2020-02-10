
class Canv {
    constructor() {
        this.canvas = new window.fabric.CanvasEx('canvas');

        this.canvas.hoverCursor = 'pointer';

    };


    setOffMouseClickListener(callback) {
        this.canvas.off(
            'mouse:down', callback
        )
    };

    setMouseClickListener(callback) {
        this.canvas.on({
            'mouse:down': callback
        })
    };


    drawText(text, param) {
        var options ={

            fill: '#880E4F',
            strokeWidth: 0.1,
            stroke: "#D81B60",

            fontSize: 12,
            backgroundColor: 'white',
            selectable: false,
            evented: false
        }

        if(param) {
           Object.assign(options,param)
        }

        var textbox = new fabric.Textbox(text, options)
        //textbox.set(where)
        this.canvas.add(textbox)
    }



};


export { Canv };