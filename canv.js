
class Canv {
    constructor() {
        this.canvas = new window.fabric.CanvasEx('canvas');

        this.canvas2 = new window.fabric.CanvasEx('canvas2');

        this.canvas.hoverCursor = 'pointer';

        // in this.rondelPicture we'll place a ref to rondel image element. At the initialization of Canv it stil not loaded
        this.rondelPicture = undefined;
        this.startingSidePicture = undefined;

        this.firstSidePictureSrc = undefined;
        this.otherSidePictureSrc = undefined;

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

    creatingPromise(reference) {
        let promise = new Promise((resolve, reject) => {
            window.fabric.Image.fromURL(reference, (img) => {
                resolve(img)
            })
        })

        return promise
    };

    draw(prom, ops, cb, canv) {
        self = this
        // we got Promise to load image , options that image set (if any) and any function we want to start after finish image loading
        async function loadingImg() {
            let img = await prom;       // continuation of function will halt till prom is resolved

            // now we can set options for image, or do something else with it
            if (ops) {
                img.set(ops)
            };

            if (cb) {
                cb(img)

            };
            if (canv) {
                canv.add(img);
            } else {
                self.canvas.add(img)
            }

            //return img
        }
        
        loadingImg()
    };

    preloadAndDrawBackground(ref,ops) {
        let p = this.creatingPromise(ref)
        this.draw(p,ops)
    }

    preloadAndDraw(arr){
        self = this

        arr.forEach((ref)=>{

            async function A(){

                let promise = new Promise((resolve, reject) => {
                    window.fabric.Image.fromURL(ref, (img) => {
                        resolve(img)
                    })
                })
                let image = await promise
                image.set({
                    originX: 'center',
                    originY: 'center',
                    top: self.canvas.height / 2,
                    left: self.canvas.width / 2,//1.14
                    //selectable: false,
                    //opacity: 0.5,
                    //evented: false
                })
                self.canvas.add(image);
            }
            A()
        })
    }

    preloadAndDrawRondel2(ref) {    
        var self = this;
        var ref2 = this.firstSidePictureSrc;

        let cb = (img) => {
            self.rondelPicture = img
        }

        let cb2 = (img) => {
            self.startingSidePicture = img
        }

        let ops = {
            originX: 'center',
            originY: 'center',
            top: self.canvas2.height / 2,
            left: self.canvas2.width / 2,//1.14
            selectable: false,
            opacity: 0.5,
            evented: false
        }

        let prom = this.creatingPromise(ref)
        let prom2 = this.creatingPromise(ref2)

        this.draw(prom, ops, cb, self.canvas2)
        this.draw(prom2, ops, cb2, self.canvas2)

    }

    animateRondelRotation2(angle, img, button, cb) {

        //----- let's turn button End Phase off , to not let another rotation starting

        button.disabled = true

        // -- plus we don't need any interaction while rotation
        this.setOffMouseClickListener()

        let ops = {
            // -- with it we can see smooth rotation                                                     
            onChange: this.canvas2.requestRenderAll.bind(this.canvas2),
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
        let promise = new Promise((resolve, reject) => { this.animateRondelRotation2('-=45', rondel, button, resolve) })

        return promise
    };

    _flipSidePicture() {

        let self = this;
        let temp;

        this.startingSidePicture.setSrc(self.otherSidePictureSrc, () => {
            this.canvas2.renderAll()
        })

        temp = this.otherSidePictureSrc;
        this.otherSidePictureSrc = this.firstSidePictureSrc
        this.firstSidePictureSrc = temp

    };

    setOtherSidePictureSrc(src) {
        this.otherSidePictureSrc = src
    };

    setSidePicturesSrc(src1, src2) {

        this.firstSidePictureSrc = src1
        this.otherSidePictureSrc = src2
    }

};


export { Canv };