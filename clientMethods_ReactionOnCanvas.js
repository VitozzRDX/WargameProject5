import { move } from './move.js'

let methods = {
    firstPlayerRallyPhase(options) {
        console.log(options.target)

                if (options.target == null) {
            console.log('clicked on empty space in FPRPhase')
            return
        }

        let counter = options.target.counter

        this.clearCounterInterface()
        this.buildCUI(counter)
        this._setCurrentCounterInterface(counter)

        return

        //console.log(options.absolutePointer)

        //console.log(this.map.getHexFromCoords(options.absolutePointer))

        // // ---------- does we clicked on empty space ?
        // if (options.target == null) {
        //     console.log('clicked on empty space in FPRPhase')
        //     return
        // }

        // let img = options.target
        // let counter = options.target.counter

        // if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer)){
        //     console.log('u click not your counter')

        // this.clearCounterInterface()
        // this.buildCUI(counter)
        // this._setCurrentCounterInterface(counter)

        //     //return
        // }

        // if Player clicked on its counter && counter is broken - Rally
    },



    secondPlayerRallyPhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPRPhase')
            return
        }
    },

    firstPlayerPrepFirePhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPPFPhase')
            return
        }
    },


    // firstPlayerMovementPhase(options) {
    //     let counter;
    //     let absolutePointer = options.absolutePointer
    //     let movingStackStatus = this.getMovingStackStatus()

    //     switch (movingStackStatus) {
    //         case 'uncreated':

    //         console.log('case uncreated')
    //             if (options.target == null) {
    //                 console.log('clicked on empty space. Select Counter')
    //                 return
    //             }
    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
    //                 console.log('u click not your counter')
    //                 return
    //             }
    //             if (options.target.counter.getMovingStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }
    //             counter = options.target.counter

    //             if (counter.getMovingStatus() == "brokenStackRemnant" ) {

    //                 this.createNewMovingStack()
    //                 this.setMovingStackStatus('filledWithBrokenStackRemnants')
    //                 this.addToMovingStack(counter)
    //                 this.setOwnHexForMovingStack(counter.ownHex)
    //                 this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
    //                 this.buildMGUI()
    //                 return
    //             }

    //             console.log('clicked on not Moved, not broken stack remnant counter. ')

    //             if (this.countersFromBrokenMovingStackArray) {
    //                 this.countersFromBrokenMovingStackArray.forEach((counter) => {
                        
    //                     counter.group._restoreObjectsState()

    //                     this.canvasObj.getImageByID(counter.getImageID()).set({
    //                         selectable: true,
    //                         evented: true
    //                     })

    //                     this.canvasObj.canvas.remove(counter.group)

    //                     counter.setMovingStatus('moved')
    //                 })

    //                 this.clearCountersFromBrokenMovingStackArray()
    //         }

    //             this.createNewMovingStack()
    //             this.setMovingStackStatus('filledWithCounters')
    //             this.addToMovingStack(counter)
    //             this.setOwnHexForMovingStack(counter.ownHex)
    //             this.buildMGUI()
    //             this.createAndDrawGroupOfImgAndBorder(counter)

    //         break;
    //         case 'filledWithCounters':
    //             console.log("case 'filledWithCounters':")
    //             if (options.target == null) {
    //                 console.log('clicked on empty space. First Move processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             counter = options.target.counter
    //             console.log(counter)
    //             if (this._checkIfCounterIsAlreadyInMovingGroup(counter)){
    //                 console.log('selected counter is already in Moving Group')
    //                 return
    //             }

    //             if (counter.getMovingStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
    //                 console.log('u click not your counter. Move Processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter)) {
    //                 console.log('click on counter, that is in the same hex as MG, and that MG is nor moving. Add it to Moving Group')

    //                 this.createAndDrawGroupOfImgAndBorder(counter)
    //                 this.addToMovingStack(counter)
    //                 return
    //             }

    //             this.moveProcessing(absolutePointer)
    //             break;

    //         case 'filledWithBrokenStackRemnants':
    //             console.log('case filledWithBrokenStackRemnants')

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. ')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             counter = options.target.counter

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
    //                 console.log('u click not your counter. Move Processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (counter.getMovingStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (this._checkIfCounterIsAlreadyInMovingGroup(counter)){
    //                 console.log('selected counter is already in Moving Group')
    //                 return
    //             }
                

    //             if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && counter.getMovingStatus() == "brokenStackRemnant") {
    //                 //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")

    //                 console.log('selected counter is in same hex as Moving Group and same Moving Status . Adding to MG ')
    //                 this.addToMovingStack(counter)
    //                 this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
    //                 return
    //             }

    //             break;
    //         case 'moving':

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. Move processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
    //                 console.log('u click not your counter. Move Processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             this.moveProcessing(absolutePointer)

    //             break;
    //     }

    // },

    secondPlayerDefenciveFirePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    },

    firstPlayerAdvFirePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPAFPhase')
            return
        }
    },

    firstPlayerRoutPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPRtPhase')
            return
        }
    },

    secondPlayerRoutPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPRtPhase')
            return
        }
    },

    firstPlayerAdvancePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPAPhase')
            return
        }
    },

    firstPlayerCloseCombatPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPCCPhase')
            return
        }
    },
}

Object.assign(methods, move)
export { methods };