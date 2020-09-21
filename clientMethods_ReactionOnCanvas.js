import { move } from './move.js'
import { defenciveFF } from './defenciveFF.js'


let methods = {
    firstPlayerRallyPhase(options) {
        let absolutePointer = options.absolutePointer

        console.log(this.map.getHexFromCoords(absolutePointer))
        //console.log(absolutePointer)

        // let h= this.map.getHexFromCoords(absolutePointer)
        // let hexes =this.map.calcHexesInRange(h,3)

        // hexes.forEach((hex)=>{

        //     let sixCoords = this.map.getPolyCorners(hex)

        //     this.canvasObj.drawPoly(sixCoords, 'red')
        // })


        if (options.target == null) {
            return //console.log('clicked on empty space in FPRPhase')
        }


        let counter = options.target.counter

        // // if (counter.group) {
        // //     counter.group._restoreObjectsState()

        // //     this.canvasObj.canvas.remove(counter.group)
        // //     return
        // // }

        // //let i = this.canvasObj.getImageByID(counter.getImageID())
        // let i = counter.initialImg
        // let t = this.canvasObj.createPhaseTextBox(i, 'PREP_FIRE')
        // // //this.canvasObj.canvas.add(t);
        // // let g = this.canvasObj.createGroup(...[i, t])

        // // counter.group = g
        // // this.canvasObj.canvas.add(g)
        // counter.text = t
        // options.target.add(t)
        // this.canvasObj.canvas.requestRenderAll()

        this.clearCounterInterface().buildCUI(counter)._setCurrentCounterInterface(counter)
        return
    },

    secondPlayerRallyPhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in SPRPhase')
        }
    },

    firstPlayerPrepFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in FPPFPhase')
        }

        let absolutePointer = options.absolutePointer

        let counter = options.target.counter
        let stack = this.firingStack
        let firingStackStatus = this.getStackStatus(stack) // this.countersManipulator.getStack().getStackStatus

        switch (firingStackStatus) {

            case 'uncreated':

                if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    return console.log('u click not your counter')
                }

                if (counter.getType() == 'SingleManCounter' && !counter.group.weaponCounter) {
                    return console.log('u cannot add SMC to FG without MMC or Weapon')
                }

                stack = this.createNewFStack('readyToFire')
                this.firingStack = stack

                if (counter.group.weapon) { // && group.type == 'attachedWeapon'

                    let group = options.target.counter.group
                    this.buildGUI(group, stack)
                    return
                }

                this.addingToFireStack(counter, stack)

                this.clearStackUI(stack)
                this.buildStackUI(stack)

                break;

            case 'readyToFire':

                if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    // stack.calculateCommanderBonus()
                    // stack.setCommanderCover()
                    this.fireProcessing(absolutePointer, stack)
                    return
                }

                if (counter.group.weapon) { // && group.type == 'attachedWeapon'
                    console.log('with MG')
                    this.clearGroupUI()
                    let group = counter.group
                    this.buildGUI(group, stack)
                    return
                }

                if (this._isCounterInStack(counter, stack)) {
                    return console.log('selected counter is already in Firing Group')
                }

                if (!this._isCounterNearStack(counter, stack)) {
                    return console.log('selected counter not near or in stack')
                }

                this.addingToFireStack(counter, stack)

                break;
        }
    },



    firstPlayerAdvFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in FPAFPhase')
        }
    },

    firstPlayerRoutPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPRtPhase')
        }

        let counter = options.target.counter

        //console.log(this.mustRoutArr.indexOf(counter))

        if (this.mustRoutArr.indexOf(counter) == -1) {
            return console.log('u choose not routed unit')
        }

        // higlight all safeplaces for choosed hex and set new listener

        let safeplacesArr = true//this.calcSafeplacesArr(counter.ownHex)
        //this.higlightSafeplaces(safeplacesArr)

        this.canvasObj.setMouseClickListener(this.firstPlayerRoutPhaseSelectedRouting.bind(this),safeplacesArr)
        


    },

    firstPlayerRoutPhaseSelectedRouting(options,safeplacesArr){
        console.log(safeplacesArr)
    },

    secondPlayerRoutPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in SPRtPhase')
        }
    },

    firstPlayerAdvancePhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPAPhase')
        }
    },

    firstPlayerCloseCombatPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPCCPhase')
        }
    },

    secondPlayerDefenciveFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in SPDFPhase')
        }
    },

    defenciveFirstFirePhase(options) {
        if (options.target == null) {
            return console.log('defenciveFirstFirePhase')
        }
    },
}

Object.assign(methods, move, defenciveFF)
export { methods };