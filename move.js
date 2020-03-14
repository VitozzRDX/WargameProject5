let move = {
    firstPlayerMovementPhase(options) {
        let counter;
        let absolutePointer = options.absolutePointer
        let movingStackStatus = this.getMovingStackStatus()

        switch (movingStackStatus) {
            case 'uncreated':

            console.log('case uncreated')
            console.log(options.target)
                if (options.target == null) {
                    console.log('clicked on empty space. Select Counter')
                    return
                }
                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    console.log('u click not your counter')
                    return
                }
                if (options.target.counter.getMovingStatus() == 'moved') {
                    console.log('u try to select counter that is moved already')
                    return
                }
                counter = options.target.counter

                if (counter.getMovingStatus() == "brokenStackRemnant" ) {

                    this.createNewMovingStack()
                    this.setMovingStackStatus('filledWithBrokenStackRemnants')
                    this.addToMovingStack(counter)
                    this.setOwnHexForMovingStack(counter.ownHex)
                    //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
                    this.changeColorOfBorder(counter, "red")
                    this.buildMGUI()
                    return
                }

                console.log('clicked on not Moved, not broken stack remnant counter. ')

                if (this.countersFromBrokenMovingStackArray) {
                    this.countersFromBrokenMovingStackArray.forEach((counter) => {
                        
                        // counter.group._restoreObjectsState()

                        // this.canvasObj.getImageByID(counter.getImageID()).set({
                        //     selectable: true,
                        //     evented: true
                        // })

                        // this.canvasObj.canvas.remove(counter.group)

                        this.canvasObj.getImageByID(counter.getImageID()).set({
                            stroke: null
                        })

                        counter.setMovingStatus('moved')
                    })

                    this.clearCountersFromBrokenMovingStackArray()
            }

                this.createNewMovingStack()
                this.setMovingStackStatus('filledWithCounters')
                this.addToMovingStack(counter)
                this.setOwnHexForMovingStack(counter.ownHex)
                this.buildMGUI()
                this.createAndDrawGroupOfImgAndBorder(counter)


            break;
            case 'filledWithCounters':
                console.log("case 'filledWithCounters':")
                if (options.target == null) {
                    console.log('clicked on empty space. First Move processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                counter = options.target.counter
                console.log(counter)

                if (counter.getMovingStatus() == 'moved') {
                    console.log('u try to select counter that is moved already')
                    return
                }
                if (this._checkIfCounterIsAlreadyInMovingGroup(counter)){
                    console.log('selected counter is already in Moving Group')
                    return
                }



                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
                    console.log('u click not your counter. Move Processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter)) {
                    console.log('click on counter, that is in the same hex as MG, and that MG is nor moving. Add it to Moving Group')

                    this.createAndDrawGroupOfImgAndBorder(counter)
                    this.addToMovingStack(counter)
                    return
                }

                this.moveProcessing(absolutePointer)
                break;

            case 'filledWithBrokenStackRemnants':
                console.log('case filledWithBrokenStackRemnants')

                if (options.target == null) {
                    console.log('clicked on empty space. ')
                    this.moveProcessing(absolutePointer)
                    return
                }

                counter = options.target.counter

                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
                    console.log('u click not your counter. Move Processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (counter.getMovingStatus() == 'moved') {
                    console.log('u try to select counter that is moved already')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (this._checkIfCounterIsAlreadyInMovingGroup(counter)){
                    console.log('selected counter is already in Moving Group')
                    return
                }
                

                if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && counter.getMovingStatus() == "brokenStackRemnant") {
                    //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")

                    console.log('selected counter is in same hex as Moving Group and same Moving Status . Adding to MG ')
                    this.addToMovingStack(counter)
                    //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
                    this.changeColorOfBorder(counter,'red')
                    return
                }

                break;
            case 'moving':

                if (options.target == null) {
                    console.log('clicked on empty space. Move processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    console.log('u click not your counter. Move Processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                this.moveProcessing(absolutePointer)

                break;
        }

    },
} 

export { move };