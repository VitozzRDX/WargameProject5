let defenciveFF = {

    defenciveFirstFirePhase(options) {
        if (options.target == null) {
            return console.log('defenciveFirstFirePhase')
        }



        counter = options.target.counter

        
        // let stack = this.firingStack
        // let firingStackStatus = this.getStackStatus(stack)

        // switch (firingStackStatus) {

        //     case 'uncreated':
        //         //create stack                //add counter
        //         if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.secondPlayer)) {
        //             return console.log('not correct Owner')
        //         }

        //         stack = this.firingStack = this.createStack('firing').addToStack(counter).setStatus('filledWithCounters')
        //         this.changeColorOfBorder(counter, "red")

        //         if (counter.getType() == 'SingleManCounter') {
        //             stack.getUnderCommand(counter)
        //         }

        //         break;

        //     case 'filledWithCounters':
        //         // check for correct place and type
        //         //add counter
        //         //or fire
        //         if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.secondPlayer)) {
        //             this.squadFiringProcess(options.target.counter)
        //         }
        //         if(!this._isCounterInSameOrNearestHexAsStack(stack,options.target.counter)){
        //             return console.log('not correct placement')
        //         }
        //         if (options.target.counter.group){
        //             console.log('group')
        //         }
        //         break;
        // }
    }
}

export { defenciveFF };

