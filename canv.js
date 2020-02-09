
class Canv {
    constructor() {
        this.canvas = new window.fabric.CanvasEx('canvas');

        this.canvas.preserveObjectStacking = true       // to not bringin to front on selection (we need this under fires)
        this.canvas.skipOffscreen = false;                  // to see offscreened Counter
        this.canvas.hoverCursor = 'pointer';


        this.setResizeListener()
        this.setZoomListener()

        this.stop = false;                      // flag for stop animating


        this.backgroundImagesArray = [];
        this.countersImagesArray = [];
        this.menuImagesArray = [];

        this.listOfFiringBorder = [];

        this.allImagesAndRectsToSlide = [];

    };

    setResizeListener() {
        let self = this;
        window.addEventListener('resize', () => {
            self.canvas.setHeight(window.innerHeight);
            self.canvas.setWidth(window.innerWidth);
            self.canvas.renderAll();
        }, false);
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

    _setBackgrndImgCoordsBeforeSliding() {
        let x = this.backgroundImage.left;
        let y = this.backgroundImage.top;
        this.anchor = { x: x, y: y }

    };

    _getBackgrndImgCoordsBeforeSliding() {
        return this.anchor
    }

    _getBackgrndImgCoordsAfterSliding() {
        return { x: this.backgroundImage.left, y: this.backgroundImage.top }
    }


    animateSliding(ops) {
        console.log('calling animateSliding')
        let l = this.countersImagesArray.concat(this.backgroundImagesArray).concat(this.listOfRectsToDraw).concat(this.listOfFiringBorder);
        this.stop = true;
        let self = this;
        for (let i of l) {
            i.animate(ops.where, ops.how, {                                 // ops.where, ops.how,options
                onChange: self.canvas.requestRenderAll.bind(self.canvas),       // options.onChange == self.canv.requestRenderAll.bind(self.canv)
                duration: 2500,
                abort: function () {

                    return !self.stop
                }
            })
        }
    };



    drawCounterImage(counter) {
        self = this
        window.fabric.Image.fromURL(counter.src, (img) => {

            img.set(counter.options)

            img.parentCounterObj = counter
            counter.img = img;

            counter.left = img.left;
            counter.top = img.top;
            counter.width = img.width;
            counter.initialImg = img


            self.canvas.add(img)        //counter.initialImage)//img);
            self.countersImagesArray.push(img)
        })
    };


    setZoomListener() {
        var self = this;
        this.canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = self.canvas.getZoom();
            zoom = zoom + delta / 200;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            self.canvas.setZoom(zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();

        })
    };



    clearlistOfRectsToDraw() {
        for (let i in this.listOfRectsToDraw) {
            this.canvas.remove(this.listOfRectsToDraw[i])
        };
        this.listOfRectsToDraw = [];
    }

    drawPoly(sixCoords, color, callback, hex) {
        var rect = new fabric.Polygon(sixCoords, {
            stroke: 'green',
            opacity: 0.3,
            fill: color,
            selectable: false,
            evented: false
        });
        if (color === 'red') {
            rect.set({ evented: true })
            rect.on('mousedown', () => { callback(hex) })
            this.listOfRedHexes.push(rect)
        }
        this.canvas.add(rect);
        this.listOfRectsToDraw.push(rect)
    }


    // d fire addon -----------------------------------------------------------------------------------------

    drawFiringBorder(ops) {
        console.log('drawFiringBorder called')
        let center = ops.center
        let size = ops.size
        var rect = new fabric.Rect({
            left: center.x,
            top: center.y,

            originX: 'center',
            originY: 'center',
            width: size,
            height: size,
            stroke: 'red',
            strokeWidth: 4,
            fill: '',
            selectable: false,
        });
        this.canvas.add(rect);
        this.listOfFiringBorder.push(rect)
    }

    setAllImagesAndRectsToSlide() {
        this.allImagesAndRectsToSlide = this.countersImagesArray.concat(this.backgroundImagesArray).concat(this.listOfRectsToDraw).concat(this.listOfFiringBorder);
    }



    clearRedHexes() {
        for (let i of this.listOfRedHexes) {
            this.canvas.remove(i)
        }
        this.listOfRedHexes = []
    }

    clearFiringBorders() {
        for (let i of this.listOfFiringBorder) {
            this.canvas.remove(i)
        }
        this.listOfFiringBorder = []
    }
    //---------------------------------------------------------------------------------------------------------
    drawLine(arr) {
        let line = new fabric.Line(arr, {
            stroke: 'red',
            selectable: false
        })

        this.canvas.add(line)
    }

    drawCircle(center) {
        this.canvas.add(new fabric.Circle({
            left: center.x,
            top: center.y,
            radius: 3,
            stroke: 'red',
            strokeWidth: 1,
            fill: '',
            selectable: false,
        }))
    }


    // drawText(text, where) {
    //     var textbox = new fabric.Textbox(text, {

    //         top : 20,
    //         left : 20,
    //         fill: '#880E4F',
    //         strokeWidth: 0.1,
    //         stroke: "#D81B60",

    //         fontSize: 12,
    //         backgroundColor: 'white',
    //         selectable: false,
    //         evented: false
    //     })
    //     //textbox.set(where)
    //     this.canvas.add(textbox)
    // }

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

    renewCounterImg(img, newImgSrc,cb) {

        img.setSrc(newImgSrc, () => {
            if (cb) {

                cb()
            }
            this.canvas.renderAll()
        })
    }

    //------------------------------------------------------------------------------

	createFiringBorder(param) {
        self = this;
        
        let l = param.left
        let t = param.top
        let w = param.width

		var rect = new fabric.Rect({
            left: l,
            top: t,

            originX: 'center',
            originY: 'center',
            width: w + 2,
            height: w + 2,
            stroke: 'red',
            strokeWidth: 4,
            fill: '',
            selectable: false,
            evented : false
        });
		
		return rect
    }
    
    createPhaseTextBox(param, text) {
        let l = param.left
        let t = param.top
        let w = param.width

        var textbox = new fabric.Textbox(text, {
            left: l - w / 2 - 12,
            top: t + w / 2,

            fill: '#880E4F',
            strokeWidth: 0.1,
            stroke: "red",
            angle: -90,
            fontSize: 9,
            //backgroundColor: 'white',
            selectable: false,
            evented: false
        });

        return textbox
    }

    createGroup(...args) {
        //console.log('here')
        //console.log(args)
        self = this
		let g = new fabric.Group(args,{
			// selectable: false,
            // evented : false,
            // originX: 'center',
            // originY: 'center',
        })

        return g
    }
    
    drawGroup(group) {
        this.canvas.add(group)
    }
    createShotStatusTextBox(param) {
        let text;
        if (param.getGameStatus() == 'pinned' ){
            text = 'PINNED'
        }else{
            text = 'DM_+_4'
        }
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
        });

        return textbox
    }
    //---------------------------------------------------------------------------------------------------------

    // createAndDrawFiringBorder_CounterGroup(img,text) {

        
    //     var rect = new fabric.Rect({
    //         left: img.left,
    //         top: img.top,

    //         originX: 'center',
    //         originY: 'center',
    //         width: img.width + 2,
    //         height: img.width + 2,
    //         stroke: 'red',
    //         strokeWidth: 4,
    //         fill: '',
    //         selectable: false,
    //         evented : false
    //     });

    //     var textbox = new fabric.Textbox(text, {
	// 		left: img.left - img.width/2 - 12,
	// 		top: img.top + img.width/2,
	// 		fill: '#880E4F',
	// 		strokeWidth: 0.1,
	// 		stroke: "#D81B60",
	// 		angle : -90,
	// 		fontSize: 9,
	// 		backgroundColor: 'white',
	// 		selectable: false,
	// 		evented : false
    //     });
        
    //     let g = new fabric.Group([rect,textbox,img],{
	// 		// selectable: false,
	// 		// evented : false
    //     })
        
    //     this.canvas.add(g);
    //     g.img = img;
    //     g.parentCounterObj = img.parentCounterObj
    //     return g
    // }

//--------------------------------------------------------------------
};


export { Canv };