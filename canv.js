
class Canv {
    constructor() {
        this.canvas = new window.fabric.CanvasEx('canvas');

        this.canvas.hoverCursor = 'pointer';

        // in this.rondelPicture we'll place a ref to rondel image element. At the initialization of Canv it stil not loaded
        this.rondelPicture = undefined;

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
        var options = {

            fill: '#880E4F',
            strokeWidth: 0.1,
            stroke: "#D81B60",

            fontSize: 12,
            backgroundColor: 'white',
            selectable: false,
            evented: false
        }

        if (param) {
            Object.assign(options, param)
        }

        var textbox = new fabric.Textbox(text, options)
        //textbox.set(where)
        this.canvas.add(textbox)
    }
    // ----------- added  10 02 2020 -----------------
    getRondelPicture() {
        return this.rondelPicture
    };

    animateRondelRotation(angle, img, button, newPhaseCallback) {

        //----- let's turn button End Phase off , to not let another rotation starting
        button.disabled = true

        // -- plus we don't need any interaction while rotation
        this.setOffMouseClickListener()

        let ops = {
            // -- with it we can see smooth rotation                                                     
            onChange: this.canvas.requestRenderAll.bind(this.canvas),
            duration: 500,
            onComplete: () => {

                //-- but on finishing rotation , we turn button back on
                button.disabled = false
                // -- .. and set callback according to new Phase
                if (newPhaseCallback) {
                    this.setMouseClickListener(newPhaseCallback)
                }
            },
        }
        img.animate('angle', angle, ops);
    };

    _rotateTurnRondel(button, newPhaseCallback) {
        let rondel = this.getRondelPicture()
        this.animateRondelRotation('-=45', rondel, button, newPhaseCallback)
    };

    drawRondelImage(reference) {
        var self = this;
        window.fabric.Image.fromURL(reference, (img) => {
            img.set({
                originX: 'center',
                originY: 'center',
                top: self.canvas.height / 9,
                left: self.canvas.width / 2,
                selectable: false,
                opacity: 0.5,
                evented: false
            })
            self.rondelPicture = img
            self.canvas.add(img);
        })
    }

    // ----------- added  10 02 2020 -----------------

    drawRI(reference) {
        var self = this

        async function loadingImg() {

            let promise = new Promise((resolve, reject) => {
                window.fabric.Image.fromURL(reference, (img) => {
                    resolve(img)
                });
            })

            let img = await promise

            self.rondelPicture = img
            self.canvas.add(img);

        }

        loadingImg()

        //self.canvas.add(img);
    }

    // ----------- added  11 02 2020 -----------------

    creatingPromise(reference) {
        let promise = new Promise((resolve, reject) => {
            window.fabric.Image.fromURL(reference, (img) => {
                resolve(img)
            })
        })

        return promise
    }

    draw(prom,ops,cb) {
        // we got Promise to load image , options that image set (if any) and any function we want to start after finish image loading

        var self = this;

        async function loadingImg() {
            let img = await prom;       // continuation of function will halt till prom is resolved

            // now we can set options for image, or do something else with it
            if(ops) {
                img.set(ops)
            };
            
            if(cb){
                cb(img)
                
            };


            self.canvas.add(img);

        }

        loadingImg()

        
    }

    preloadAndDrawRondel(ref) {
        var self = this;

        let cb = (img)=>{
            self.rondelPicture = img
        }
        let ops = {
            originX: 'center',
            originY: 'center',
            top: self.canvas.height / 9,
            left: self.canvas.width / 2,
            selectable: false,
            opacity: 0.5,
            evented: false
        }
        let prom = this.creatingPromise(ref)

        this.draw(prom,ops,cb)

    }

    animateRondelRotation2(angle, img, button, cb) {
        console.log('startet Rondel Rotation')
        //----- let's turn button End Phase off , to not let another rotation starting
        console.log(button)
        console.log('disabling button')
        button.disabled = true

        // -- plus we don't need any interaction while rotation
        this.setOffMouseClickListener()

        let ops = {
            // -- with it we can see smooth rotation                                                     
            onChange: this.canvas.requestRenderAll.bind(this.canvas),
            duration: 500,
            onComplete: () => {
                button.disabled = false
                cb()
            },
        }
        img.animate('angle', angle, ops);
    };

    _rotateTurnRondel2(button) {
        let rondel = this.getRondelPicture()
        let promise = new Promise((resolve,reject)=>{this.animateRondelRotation2('-=45', rondel, button, resolve)})

        return promise
    };
};


export { Canv };