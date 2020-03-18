let move = {

    firstPlayerMovementPhase(options) {
        let counter;
        let absolutePointer = options.absolutePointer
        let movingStackStatus = this.getMovingStackStatus() // this.countersManipulator.getStack().getStackStatus

        console.log(movingStackStatus)
        switch (movingStackStatus) {

            case 'uncreated':

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)) { 
                    return
                }
                
                counter = options.target.counter

                if (counter.getMovingStatus() == "brokenStackRemnant") {    //this._checkForMovingStatus(counter,"brokenStackRemnant")
                    this.createNewStack_setStatus_addCounter_setOwnHex('filledWithBrokenStackRemnants',counter)
                    this.buildMGUI()
                    return
                }

                console.log('clicked on not Moved, not broken stack remnant counter. ')

                this.endEachCounterMove(this.countersFromBrokenMovingStackArray).clearCountersFromBrokenMovingStackArray()

                this.createNewStack_setStatus_addCounter_setOwnHex('filledWithCounters',counter)
                this.buildMGUI()

                break;

            case 'filledWithCounters':

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

                this.moveProcessing(absolutePointer)

                break;
        }

    },
}

export { move };