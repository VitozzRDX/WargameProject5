
class Canv {
    constructor() {

        window.fabric.Object.prototype.objectCaching = true
        window.fabric.Object.prototype.hasControls = false
        //window.fabric.Object.prototype.hasBorders = false
        
        this.canvas = new window.fabric.CanvasEx('canvas');

        this.canvas2 = new window.fabric.CanvasEx('canvas2');

        this.canvas.hoverCursor = 'pointer';

        // in this.rondelPicture we'll place a ref to rondel image element. At the initialization of Canv it stil not loaded
        this.rondelPicture = undefined;
        this.startingSidePicture = undefined;

        this.firstSidePictureSrc = undefined;   // pictures of Sides (f.e. Axis vs Nazi)
        this.otherSidePictureSrc = undefined;

this.ID_ImageHash = {}

    };
// ------------- added 21 02

    createID() {
        return (Math.random() + 1).toString(36).slice(2, 18);
    }

    fill_ID_ImageHash(id,img){
        this.ID_ImageHash[id]=img
    };

    getImageByID(id){
        return this.ID_ImageHash[id]
    };

    setOffMouseClickListener(callback) {
        this.canvas.off(
            'mouse:up', callback
        )
    };

    setMouseClickListener(callback) {
        this.canvas.on({
            'mouse:up': callback
        })
    };

    // setMouseClickListener(callback,ops) {
    //     this.canvas.on(
    //         'mouse:up',(options) => {
    //             callback(options,ops)
    //         }
    //     )
    // };


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
                //reject(new Error("Ошибка!"))
            })
        })

        return promise
    };

    draw(prom, ops, cb, canv) {
        self = this
        // we got Promise to load image , options that image set (if any) and any function we want to start after finish image loading
        async function loadingImg() {
            let img = await prom;       // continuation of function will halt till prom is resolved

            let id = self.createID()
            self.fill_ID_ImageHash(id,img)
            img.id = id
            
            // now we can set options for image, or do something else with it
            if (ops) {
                img.set(ops)
            };


            if (canv) {
                canv.add(img);
            } else {
                self.canvas.add(img)
            }

            if (cb) {
                cb(img)

            };

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
// --------------------- 25 02 2020 -----------------------------------
    setZoomListener() {
        var self = this;
        this.canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = self.canvas.getZoom();
            zoom = zoom + delta / 50;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            self.canvas.setZoom(zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();

        })
    };

    drawPoly(sixCoords, color, callback, hex) {

        var rect = new fabric.Polygon(sixCoords, {
            stroke: 'green',
            opacity: 0.3,
            fill: color,
            selectable: false,
            evented: false
        });
        // if (color === 'red') {
        //     rect.set({ evented: true })
        //     rect.on('mousedown', () => { callback(hex) })
        //     //this.listOfRedHexes.push(rect)
        // }
        this.canvas.add(rect);
        //this.listOfRectsToDraw.push(rect)
    }

    // ------------------ 27 02 2020 -------------------

    animate(img,where,cb){
        let self= this
        let ops =  {                                                                // add-on
            onChange: self.canvas.requestRenderAll.bind(self.canvas),
            duration: 500,
            onComplete:()=>{
                if (cb){
                //console.log(cb)
                cb()}
            }
        };

        img.animate(where,ops);
    }

    createPromiseAnimation(img,where){

        return  new Promise((resolve, reject) => { this.animate(img,where,resolve) })
    }
    
    createPhaseTextBox(param, text) {
        let l = param.left
        let t = param.top
        let w = param.width

        var textbox = new fabric.Textbox(text, {
            left: l - w / 2 - 12,
            top: t + w / 2 + 2,

            fill: 'red',//'#880E4F',
            strokeWidth: 0.1,
            stroke: "red",
            angle: -90,
            fontSize: 9,
            backgroundColor: 'white',
            selectable: false,
            evented: false,
            borderColor: 'red',
            // editingBorderColor: 'blue',
            // padding: 2
            width:w+5,

            textAlign: 'center',
        });

        return textbox
    }


    createGroup(...args) {
        self = this
		let g = new fabric.Group(args,{
			// selectable: false,
            // evented : false,
            originX: 'center',
            originY: 'center',
        })

        return g
    }
    
    drawGroup(group) {
        this.canvas.add(group)
    }

    loadSVGFromURL(url) {
        let self = this

        window.fabric.loadSVGFromURL(url,(objects, options)=>{
            var obj = fabric.util.groupSVGElements(objects, options);
            console.log(obj)
            self.canvas.add(obj)
            // for (let  i of objects) {

        })
    }

    //------------ 06 03 2020 -----------------------

    changeColorOfBorder(border,color) {
        border.set({
            stroke: color
        })
        this.canvas.renderAll()
    }

    create_and_fill_ID_ImageHash(img){
        let id = this.createID()
        this.fill_ID_ImageHash(id,img)
        img.id = id
    }

    drawLine(arr) {
        
        let line = new fabric.Line(arr, {
            stroke: 'red',
            selectable: false
        })

        this.canvas.add(line)
    }

    createUnderFireTextBox(param, text) {

        let l = param.left
        let t = param.top
        let w = param.width

        var textbox = new fabric.Textbox(text, {
            left: l - w / 2,
            top: t + w / 4,

            fill: '#880E4F',
            strokeWidth: 0.1,
            stroke: "red",
            angle: -35,
            fontSize: 14,
            backgroundColor: 'white',
            selectable: false,
            evented: false
        })

        return textbox
    }


};


export { Canv };