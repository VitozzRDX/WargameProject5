let methods = {
    firstPlayerRallyPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPRPhase')
            return
        }
       
        let img = options.target
        let counter = options.target.counter

        if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,this.firstPlayer)){
            console.log('u click not your counter')
            //return
        }

        //--let' go-------

        this.clearCounterInterface()
        this.buildCUI(counter)
        this._setCurrentCounterInterface(counter)




        // if Player clicked on its counter && counter is broken - Rally
    },

    _checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter,player){
        console.log(counter.owner,player)
        return counter.owner == player
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


    firstPlayerMovementPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPMPhase')
            return
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

    // secondPlayerRallyPhaseHalfTurn(options) {
    //     // ---------- does we clicked on empty space ?
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPCCPhase')
    //         return
    //     }
    // },

    // firstPlayerRallyPhaseHalfTurn(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerPrepFirePhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerMovementPhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // firstPlayerDefenciveFirePhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in FPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerAdvFirePhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerRoutPhaseHalfTurn(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // firstPlayerRoutPhaseHalfTurn(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerAdvancePhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },

    // secondPlayerCloseCombatPhase(options) {
    //     if (options.target == null) {
    //         console.log('clicked on empty space in SPDFPhase')
    //         return
    //     }
    // },
}

export { methods };