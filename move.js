let move = {

    firstPlayerMovementPhase(options) {
        let counter;
        let absolutePointer = options.absolutePointer
        let stack = this.stack
        let movingStackStatus = this.getStackStatus(stack) // this.countersManipulator.getStack().getStackStatus

        
        switch (movingStackStatus) {

            case 'uncreated':

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)) { 
                    return
                }
                
                counter = options.target.counter

                if (counter.getMovingStatus() == "brokenStackRemnant") {    //this._checkForMovingStatus(counter,"brokenStackRemnant")

                    stack = this.stack = this.createNewStack_setStatus_addCounter_setOwnHex('filledWithBrokenStackRemnants',counter)
//----------------------------------------------------------------------------------------------------------------------------------------------
                    if(counter.getType() == 'SingleManCounter') {  
                        stack.getUnderCommand(counter)
                    }
//----------------------------------------------------------------------------------------------------------------------------------------------
                    this.buildStackUI(stack)
                    return
                }

                console.log('clicked on not Moved, not broken stack remnant counter. ')

                this.endEachCounterMove(this.countersFromBrokenMovingStackArray).clearCountersFromBrokenMovingStackArray()

                stack = this.stack = this.createNewStack_setStatus_addCounter_setOwnHex('filledWithCounters',counter)
//----------------------------------------------------------------------------------------------------------------------------------------------
                if(counter.getType() == 'SingleManCounter') {  
                    stack.getUnderCommand(counter)
                }
//----------------------------------------------------------------------------------------------------------------------------------------------

                this.buildStackUI(stack)

                break;

            case 'filledWithCounters':

                if (this._check_ForNullTarget_ForOwner_ForMovingStatus(options.target)){
                    this.moveProcessing(absolutePointer)
                    return
                }

                counter = options.target.counter

                if (this._isCounterInStack(counter,stack)) {
                    return console.log('selected counter is already in Moving Group')
                }

                if (this._isCounterInSameHexAsStack(counter,stack)) {

                    this.changeColorOfBorder(counter, "red")
                    this.addCounterToStack(counter,stack)

// if stack is under Command + counter is commandable - gut under C + getBonus
// if not + counter is Commander - stack is under C + for every c in stack - get under + bonus

//----------------------------------------------------------------------------------------------------------------------------------------------
                    console.log(counter)
                    if (stack.isUnderCommand()) {
                        try {
                            counter.getUnderCommand()
                            counter.getCommanderBonus()

                            return console.log('added squad to stack with Commander')
                        } catch (error) {
                            console.log(error,'adding not Squad')
                        }
                    }

                    if(counter.getType() == 'SingleManCounter') {   // maybe we do not need this check cause it is always one of this
                        stack.getUnderCommand(counter)
                        stack.getCommandBonus()
                        
                    }
//----------------------------------------------------------------------------------------------------------------------------------------------
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

                if (this._isCounterInStack(counter,stack)) {
                    return console.log('selected counter is already in Moving Group')
                }

                if (this._isCounterInSameHexAsStack(counter,stack) && counter.getMovingStatus() == "brokenStackRemnant") {

                    this.addCounterToStack(counter,stack)
                    this.changeColorOfBorder(counter, 'red')

//----------------------------------------------------------------------------------------------------------------------------------------------
                    if (stack.isUnderCommand()) {
                        try {
                            counter.getUnderCommand()
                            counter.getCommanderBonus()

                            return console.log('added squad to stack with Commander')
                        } catch (error) {
                            console.log(error,'adding not Squad')
                        }
                    }

                    if(counter.getType() == 'SingleManCounter') {   // maybe we do not need this check cause it is always one of this
                        console.log(stack)
                        stack.getUnderCommand(counter)
                        stack.getCommandBonus()
                        
                    }
//----------------------------------------------------------------------------------------------------------------------------------------------                  
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