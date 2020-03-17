let move = {
    // firstPlayerMovementPhase(options) {
    //     let counter;
    //     let absolutePointer = options.absolutePointer
    //     let movingStackStatus = this.getMovingStackStatus() // this.countersManipulator.getStack().getStackStatus

    //     switch (movingStackStatus) {

    //         case 'uncreated':

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

    //             if (counter.getMovingStatus() == "brokenStackRemnant") {

    //                 this.createNewMovingStack()
    //                 this.setMovingStackStatus('filledWithBrokenStackRemnants')
    //                 this.addToMovingStack(counter)
    //                 this.setOwnHexForMovingStack(counter.ownHex)
    //                 this.changeColorOfBorder(counter, "red")
    //                 this.buildMGUI()
    //                 return
    //             }

    //             console.log('clicked on not Moved, not broken stack remnant counter. ')

    //             if (this.countersFromBrokenMovingStackArray) {
    //                 this.countersFromBrokenMovingStackArray.forEach((counter) => {

    //                     this.canvasObj.getImageByID(counter.getImageID()).set({
    //                         stroke: null
    //                     })
    //                     counter.setMovingStatus('moved')
    //                 })
    //                 this.clearCountersFromBrokenMovingStackArray()
    //             }

    //             this.createNewMovingStack()
    //             this.setMovingStackStatus('filledWithCounters')
    //             this.addToMovingStack(counter)
    //             this.setOwnHexForMovingStack(counter.ownHex)
    //             this.buildMGUI()
    //             this.createAndDrawGroupOfImgAndBorder(counter)

    //             break;

    //         case 'filledWithCounters':
    //             console.log("case 'filledWithCounters':")

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. First Move processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             counter = options.target.counter

    //             if (counter.getMovingStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }

    //             if (this._checkIfCounterIsAlreadyInMovingGroup(counter)) {
    //                 console.log('selected counter is already in Moving Group')
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

    //             if (this._checkIfCounterIsAlreadyInMovingGroup(counter)) {
    //                 console.log('selected counter is already in Moving Group')
    //                 return
    //             }


    //             if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && counter.getMovingStatus() == "brokenStackRemnant") {
    //                 //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")

    //                 console.log('selected counter is in same hex as Moving Group and same Moving Status . Adding to MG ')
    //                 this.addToMovingStack(counter)
    //                 //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
    //                 this.changeColorOfBorder(counter, 'red')
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

    firstPlayerMovementPhase(options) {
        let counter;
        let absolutePointer = options.absolutePointer
        let movingStackStatus = this.getMovingStackStatus() // this.countersManipulator.getStack().getStackStatus

        switch (movingStackStatus) {

            case 'uncreated':

                // if (options.target == null) {
                //     return console.log('clicked on empty space. Select Counter')
                // }
                // if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                //     return console.log('u click not your counter')
                // }
                // if (options.target.counter.getMovingStatus() == 'moved') {
                //     return console.log('u try to select counter that is moved already')
                // }

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)) return
                
                counter = options.target.counter

                if (counter.getMovingStatus() == "brokenStackRemnant") {    //this._checkForMovingStatus(counter,"brokenStackRemnant")

                    // this.createNewMovingStack()
                    // this.setMovingStackStatus('filledWithBrokenStackRemnants')
                    // this.addToMovingStack(counter)
                    // this.setOwnHexForMovingStack(counter.ownHex)
                    // this.changeColorOfBorder(counter, "red")

                    this.createNewStack_setStatus_addCounter_setOwnHex('filledWithBrokenStackRemnants',counter)
                    this.buildMGUI()
                    return
                }

                console.log('clicked on not Moved, not broken stack remnant counter. ')

                //
                // if (this.countersFromBrokenMovingStackArray) {      
                //     // end all their Movement
                //     this.countersFromBrokenMovingStackArray.forEach((counter) => {
                //         this.changeColorOfBorder(counter,null)
                //         counter.setMovingStatus('moved')
                //     })
                //     // nullify this.countersFromBrokenMovingStackArray
                //     this.clearCountersFromBrokenMovingStackArray()
                // }

                this.endEachCounterMove(this.countersFromBrokenMovingStackArray).clearCountersFromBrokenMovingStackArray()

                // this.createNewMovingStack()
                // this.setMovingStackStatus('filledWithCounters')
                // this.addToMovingStack(counter)
                // this.setOwnHexForMovingStack(counter.ownHex)
                // this.changeColorOfBorder(counter, "red")

                this.createNewStack_setStatus_addCounter_setOwnHex('filledWithCounters',counter)
                this.buildMGUI()

                break;

            case 'filledWithCounters':

                // if (options.target == null) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('clicked on empty space. First Move processing')
                // }
                // if (counter.getMovingStatus() == 'moved') {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('u try to select counter that is moved already')
                // }
                // if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('u click not your counter. Move Processing')
                // }

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)){
                    this.moveProcessing(absolutePointer)
                    return
                }

                counter = options.target.counter

                if (this._checkIfCounterIsAlreadyInMovingGroup(counter)) {
                    return console.log('selected counter is already in Moving Group')
                }

                if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter)) {

                    this.changeColorOfBorder(counter, "red")
                    this.addToMovingStack(counter)
                    return console.log('click on counter, that is in the same hex as MG, and that MG is nor moving. Add it to Moving Group')
                }

                this.moveProcessing(absolutePointer)
                break;

            case 'filledWithBrokenStackRemnants':
                // if (options.target == null) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('clicked on empty space. ')
                // }
                // if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('u click not your counter. Move Processing')
                // }
                // if (counter.getMovingStatus() == 'moved') {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('u try to select counter that is moved already')
                // }

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)){
                    this.moveProcessing(absolutePointer)
                    return
                }

                counter = options.target.counter

                if (this._checkIfCounterIsAlreadyInMovingGroup(counter)) {
                    return console.log('selected counter is already in Moving Group')
                }

                if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && counter.getMovingStatus() == "brokenStackRemnant") {

                    this.addToMovingStack(counter)
                    this.changeColorOfBorder(counter, 'red')
                    return console.log('selected counter is in same hex as Moving Group and same Moving Status . Adding to MG ')
                }

                break;

            case 'moving':

                // if (options.target == null) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('clicked on empty space. Move processing')
                // }

                // if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                //     this.moveProcessing(absolutePointer)
                //     return console.log('u click not your counter. Move Processing')
                // }

                this.moveProcessing(absolutePointer)

                break;
        }

    },
}

export { move };