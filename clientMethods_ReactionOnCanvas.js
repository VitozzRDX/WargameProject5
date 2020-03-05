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

    firstPlayerMovementPhase(options) {

        let absolutePointer = options.absolutePointer
        
        switch (this.selectedCounter) {
            case undefined:
                console.log('got no Selected Counter')
                if (options.target == null) {
                    console.log('clicked on empty space. Select Counter')
                    return
                }
                if (options.target.type == "group") {
                    console.log('clicked on Group - it already moved')
                    return
                }
                //let counter = options.target.counter

                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    console.log('u click not your counter')
                    return
                }

                if (options.target.counter.getStatus() == 'moved') {
                    console.log('u try to select counter that is moved already')
                    return
                }

                console.log('u click on your"s counter and you got no counters that have been selected before . Now it is selected')
                this.selectedCounter = options.target.counter

                this.clearCounterInterface()
                this.buildCUI(options.target.counter)
                this._setCurrentCounterInterface(options.target.counter)

                //------------------- 28 20 2020 



                //let img = this.canvasObj.getImageByID(this.selectedCounter.getImageID())

                // let p = {
                //     width:img.width,
                //     top:img.top,
                //     left:img.left,
                // }
                // let redBorder = this.canvasObj.createFiringBorder(p)

                // let group = this.canvasObj.createGroup(img,redBorder)

                // this.selectedCounter.group = group

                // this.canvasObj.drawGroup(group)

                this.createAndDrawGroupOfImgAndBorder(this.selectedCounter)
                this.addToMovingStack(this.selectedCounter)
                //this.movingGroup.push(group)

                break;

            default:
                console.log(options.target, 'Selected Counter set')

                if (options.target == null) {
                    console.log('clicked on empty space. Move processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                if (options.target.group || options.target.type == 'group') {
                    console.log('clicked on Group or on Image inside- u already selected it')
                    return
                }

                let counter = options.target.counter

                // if (counter.getStatus() == 'moved') {
                //     _checkIfCounterIsInTheSameHexAsSelectedOne(counter)
                //     console.log('u try to select counter that is moved already')
                //     return
                // }

                if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
                    console.log('u click not your counter. Move Processing')
                    this.moveProcessing(absolutePointer)
                    return
                }

                // if (this._checkIfSelectionHaveEndedItsMove()) {
                //     console.log('u click on your"s counter and Selected one has ended its move. New one is selected')   // or didn't started yet
                //     this.selectedCounter = counter

                //     this.clearCounterInterface()
                //     this.buildCUI(counter)
                //     this._setCurrentCounterInterface(counter)
                //     return
                // }
                //------------------- 28 20 2020 

                if (this._checkIfCounterIsInTheSameHexAsSelectedOne(counter) && !this._checkIfCounterMoved(counter) && !this.selectionIsMoving()
                    
                ) {
                    console.log('u click on your"s counter , that is in the same hex as Selected one and it is not moved and Selected one is not moving right now')
                    //console.log('and it is not same as u are already selected')
                    console.log('Add it to Moving group')

                    //this.movingGroup.push(counter)


                    this.createAndDrawGroupOfImgAndBorder(counter)
                    this.addToMovingStack(counter)
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