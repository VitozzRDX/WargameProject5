let methods = {
    firstPlayerRallyPhase(options) {

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

    //     if (options.target == null && !this._checkIfCounterSelectionOccuredBefore()) {
    //         console.log('clicked on empty space in FPMPhase without Selected Counter. Choose one.')
    //         return
    //     }
        
    //     if (this._checkIfCounterSelectionOccuredBefore() && this._checkIfCounterIsNearTargetHex(options.absolutePointer) && !this._checkIfSelectionHaveEndedItsMove()) {
    //         console.log('we clicked on legal hex , and it still got MP , so it must move ')
    //         return
    //     }

    //     if (this._checkIfCounterSelectionOccuredBefore() && this._checkIfCounterIsNearTargetHex(options.absolutePointer) && this._checkIfSelectionHaveEndedItsMove()) {
    //         console.log('we clicked on legal hex , but it got no MP , so nothing happens')
    //         return
    //     }

    //     if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter,this.firstPlayer)){
    //         console.log('u click not your counter')

    //         return
    //     }

    //     if (!this._checkIfCounterSelectionOccuredBefore() && this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter,this.firstPlayer)){
    //         (console.log('u click on your"s counter and you got no counters that have been selected before . Now it is selected'))  //not ended its move
    //         this.selectedCounter = options.target.counter

    //         this.clearCounterInterface()
    //         this.buildCUI(options.target.counter)
    //         this._setCurrentCounterInterface(options.target.counter)

    //         return
    //     }


    //     if (this._checkIfSelectionHaveEndedItsMove() && this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter,this.firstPlayer) ){
    //         (console.log('u click on your"s counter and you got no counters that have not ended its move . Now it is selected'))
    //         this.selectedCounter = options.target.counter

    //         this.clearCounterInterface()
    //         this.buildCUI(options.target.counter)
    //         this._setCurrentCounterInterface(options.target.counter)

    //         return
    //     }

    //     if (this._checkIfCounterIsNearTargetHex(options.absolutePointer) ) {
    //         console.log('we clicked on legal hex , and it must move ')
    //         return
    //     }

    //     return
    //     //let selectedCounter =  this.selectedCounter = options.target.counter
        
    // },

    // firstPlayerMovementPhase(options){
    //     switch (options.target) {

    //         case null :
    //             console.log('clicked on empty space')
    //             if (!this._checkIfCounterSelectionOccuredBefore()) {
    //                 console.log('No Selected Counter. Choose one.')
    //                 return
    //             }

    //             let absolutePointer = options.absolutePointer

    //             if (this._checkIfCounterIsNearTargetHex(absolutePointer) && this._checkIfSelectionHaveEndedItsMove() ) {
    //                 console.log('we clicked on legal hex , but it got no MP , so nothing happens ')
    //                 return
    //             }

    //             if (this._checkIfCounterIsNearTargetHex(absolutePointer) && !this._checkIfSelectionHaveEndedItsMove() ) {
    //                 console.log('we clicked on legal hex , and it still got MP , so it must move ')

    //                 this.moveProcessing(absolutePointer)

    //                 return
    //             }

    //             break;

    //         default :
    //             console.log('clicked on some object')

    //             let counter =  options.target.counter

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer)){
    //                 console.log('u click not your counter')
        
    //                 return
    //             }
    //             if (!this._checkIfCounterSelectionOccuredBefore() && this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer)){
    //                 (console.log('u click on your"s counter and you got no counters that have been selected before . Now it is selected'))  //not ended its move
    //                 this.selectedCounter = counter
        
    //                 this.clearCounterInterface()
    //                 this.buildCUI(counter)
    //                 this._setCurrentCounterInterface(counter)
        
    //                 return
    //             }
        
        
    //             if (this._checkIfSelectionHaveEndedItsMove() && this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer) ){
    //                 (console.log('u click on your"s counter and you got no counters that have not ended its move . Now it is selected'))
    //                 this.selectedCounter = counter
        
    //                 this.clearCounterInterface()
    //                 this.buildCUI(counter)
    //                 this._setCurrentCounterInterface(counter)
        
    //                 return
    //             }

    //             if (this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer) && !this._checkIfSelectionHaveEndedItsMove()) {
    //                 console.log('u click on your"s counter but previous one still got MP , so it must move  ')

    //                 this.moveToOccupiedHexProcessing(counter)
    //                 return
    //             }

    //             break;
    //     }

        
    // },

    firstPlayerMovementPhase(options){

        let absolutePointer = options.absolutePointer
        switch (this.selectedCounter) {
            case undefined :
                console.log('got no Selected Counter')
                if (options.target == null) {
                    console.log('clicked on empty space. Select Counter')
                    return
                }
                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter,this.firstPlayer)) {
                    console.log('u click not your counter')
                    return
                }
                console.log('u click on your"s counter and you got no counters that have been selected before . Now it is selected')
                this.selectedCounter = options.target.counter
        
                this.clearCounterInterface()
                this.buildCUI(options.target.counter)
                this._setCurrentCounterInterface(options.target.counter)

                break;

            default :
                console.log('Selected Counter set')

                if (options.target == null){
                    console.log('clicked on empty space. Move processing')
                    this.moveProcessing(absolutePointer)
                    return
                }
                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter,this.firstPlayer)) {
                    console.log('u click not your counter. Move Processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (this._checkIfSelectionHaveEndedItsMove()) {
                    console.log('u click on your"s counter and Selected one has ended its move. New one is selected')
                    this.selectedCounter = options.target.counter
        
                    this.clearCounterInterface()
                    this.buildCUI(options.target.counter)
                    this._setCurrentCounterInterface(options.target.counter)
                    return
                }

                console.log('u click on your"s counter but previous one still got MP. Move Processing')
                this.moveProcessing(absolutePointer)

                break;
        }
    },

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

export { methods };