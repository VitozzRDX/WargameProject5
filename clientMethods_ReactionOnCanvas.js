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

    //     firstPlayerMovementPhase(options) {

    //         let absolutePointer = options.absolutePointer

    //         switch (this.getMovigGroup()) {
    //             case undefined:

    //             console.log('no one added to Moving Group yet')
    //             //-------------------------------------------------------------
    //             if (options.target == null) {
    //                 console.log('clicked on empty space. Select Counter')
    //                 return
    //             }

    //             // if (options.target.type == "group") {
    //             //     console.log('clicked on Group - it is already moving')
    //             //     return
    //             // }

    //             if (options.target.type == "group") {
    //                 console.log('clicked on Group - because there is no group it should be part of broken stack')
    //                 console.log('create new Moving group')
    // //------------------------------------------------------------------------
    //                 if (!options.target.counter) throw 'It is not group u lookin for'

    //                 let counter = options.target.counter
    //                 this.canvasObj.changeColorOfBorder(counter.colorBorder,"red")

    // //------------------------------------------------------------------------

    //                 this.createNewMovingStack()

    //                 this.addToMovingStack(counter)
    //                 this.setOwnHexForMovingStack(counter.ownHex)
    //                 //.addToMovingStack(options.target.counter)
    //                 this.setAllMGUIDisabled()
    //                 this.buildMGUI()
    //                 return
    //             }

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
    //                 console.log('u click not your counter')
    //                 return
    //             }

    //             if (options.target.counter.getStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }
    //             //-------------------------------------------------------------

    //             console.log('u click on your"s counter and you got no counters that have been selected before . Now it is added to newly created MG')

    //             // ----------
    //             // 'case when u cli' 
    //             // if countersFromBrokenMovingStackArray.length != 0 
    //             // countersFromBrokenMovingStackArray.forEach((counter)=>{counter.setStatus('moved'), destroy group}

    //             if (this.countersFromBrokenMovingStackArray) {
    //                 console.log('here cause selected not moved counter with already Broken stack')
    //                 console.log('every one in Broken stack sets moved ')
    //                 this.countersFromBrokenMovingStackArray.forEach((counter)=>{
    //                     counter.setNewStatus('moved')
    // //------------------------------------------------------------------------
    //                     counter.group._restoreObjectsState()

    // this.canvasObj.getImageByID(counter.getImageID()).set({
    //     selectable: true,
    //     evented: true
    // })

    // this.canvasObj.canvas.remove(counter.group)
    // //------------------------------------------------------------------------

    //                 })
    //             }
    //             this.createNewMovingStack()
    //             this.addToMovingStack(options.target.counter)
    //             this.setOwnHexForMovingStack(options.target.counter.ownHex)
    //             this.buildMGUI()
    //             this.createAndDrawGroupOfImgAndBorder(options.target.counter)

    //                 break;

    //             default:

    //                 console.log('got selection')

    //                 if (options.target == null) {
    //                     console.log('clicked on empty space. Move processing')
    //                     this.moveProcessing(absolutePointer)
    //                     return
    //                 }

    //                 if (options.target.group || options.target.type == 'group') {
    //                     console.log('clicked on Group or on Image inside- u already selected it')
    //                     return
    //                 }

    //                 // if (options.target.group || options.target.type == 'group' && this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && this.getMovigGroupStatus()!='moving') {
    //                 //     console.log('')
    //                 // }

    //                 let counter = options.target.counter

    //                 if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
    //                     console.log('u click not your counter. Move Processing')
    //                     this.moveProcessing(absolutePointer)
    //                     return
    //                 }

    //                 if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && this.getMovigGroupStatus()!='moving' &&  this.getMovigGroupStatus()!='moved' ){
    //                     //&& this.getMovigGroupStatus()!='broken' - to not join 
    //                     console.log ('click on counter, that is in the same hex as MG, and that MG is nor moving nor moved (i.e. ready to move)')
    //                     console.log('Add it to Moving Group')

    //                     this.createAndDrawGroupOfImgAndBorder(counter)
    //                     this.addToMovingStack(options.target.counter)

    //                     return
    //                 }



    //                 console.log('u click on your"s counter but u still got existing Moving Group. Move Processing')
    //                 this.moveProcessing(absolutePointer)

    //                 break;
    //         }
    //     },

    // firstPlayerMovementPhase(options) {
    //     let counter;
    //     let absolutePointer = options.absolutePointer
    //     let movingStackStatus = this.getMovingStackStatus()

    //     switch (movingStackStatus) {
    //         case 'uncreated':
    //             console.log('or there was no selected counters at all, or u got broken stack')

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. Select Counter')
    //                 return
    //             }

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
    //                 console.log('u click not your counter')
    //                 return
    //             }

    //             if (options.target.counter.getStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }

    //             console.log(' it should be your counter , ready to move')

    //             counter = options.target.counter

    //             this.createNewMovingStack()
    //             this.setMovingStackStatus('filledWithCounters')

    //             if (counter.getMovingStatus == "brokenStackRemnant") throw 'could not be counters that already was added to Moving Stack this turn'

    //             // if (counter.getMovingStatus == "brokenStackRemnant" ) {

    //             //     console.log('.. and it was in stack earlier')

    //             //     this.setMovingStackStatus('filledWithBrokenStackRemnants')

    //             //     if(counter.colorBorder!='yellow') throw ' color of selection  border should be yellow'

    //             //     this.canvasObj.changeColorOfBorder(counter.colorBorder,"red")
    //             //     this.setAllMGUIDisabled()
    //             // }

    //             // if all conditions above not met , then it should be your counter , ready to move and not taken into broken now stack

    //             this.addToMovingStack(counter)
    //             this.setOwnHexForMovingStack(counter.ownHex)
    //             this.buildMGUI()
    //             this.createAndDrawGroupOfImgAndBorder(counter)

    //             break;
    //         // ================================================================================================================
    //         case 'filledWithCounters':
    //             console.log('got already selected one or more Counters . They did not took part in Stack earlier this Turn and they did not started Moving')

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. First Move processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (!options.target.counter) throw 'u clicked on something that is nor counter , nor null '

    //             counter = options.target.counter

    //             if (counter.getMovingStatus() == 'moved') {
    //                 console.log('u try to select counter that is moved already')
    //                 return
    //             }

    //             if (counter.getMovingStatus() == "brokenStackRemnant") throw 'could not be brokenStackRemnant , because we started new stack'

    //             //console.log('u try to add brokenStackRemnant into stack with counters just set to move . It is prohibited ')
    //             //this.moveProcessing(absolutePointer)
    //             //return

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, this.firstPlayer)) {
    //                 console.log('u click not your counter. Move Processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter)) {
    //                 //this.getMovigGroupStatus()!='moving' dont need cause if we 
    //                 //&& this.getMovigGroupStatus()!='broken' - to not join 
    //                 console.log('click on counter, that is in the same hex as MG, and that MG is nor moving nor moved (i.e. ready to move)')
    //                 console.log('Add it to Moving Group')

    //                 this.createAndDrawGroupOfImgAndBorder(counter)
    //                 this.addToMovingStack(counter)

    //                 return
    //             }

    //             console.log('u click on your"s counter but u already got existing Moving Stack. First Move Processing')
    //             this.moveProcessing(absolutePointer)

    //             break;
    //         // ================================================================================================================
    //         case 'filledWithBrokenStackRemnants':

    //             if (options.target == null) {
    //                 console.log('clicked on empty space. First Move processing')
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

                

    //             if (this._checkIfCounterIsInTheSameHexAsGroupToMove(counter) && counter.getMovingStatus == "brokenStackRemnant") {
    //                 //this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
    //                 this.addToMovingStack(counter)
    //             }

    //             console.log('clicked on fresh counter. ')

    //             this.countersFromBrokenMovingStackArray.forEach((counter) => {
    //                 counter.setNewStatus('moved')
    //                 counter.group._restoreObjectsState()

    //                 this.canvasObj.getImageByID(counter.getImageID()).set({
    //                     selectable: true,
    //                     evented: true
    //                 })

    //                 this.canvasObj.canvas.remove(counter.group)
    //             })
                



    //         // this.moveProcessing(absolutePointer)
    //         // break;
    //         // ================================================================================================================
    //         case 'moving':
    //             console.log('your stack if it New Created or Former Broken one is in the middle of moving now')
    //             if (options.target == null) {
    //                 console.log('clicked on empty space. Move processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             if (!options.target.counter) throw 'u clicked on something that is nor counter , nor null '

    //             if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
    //                 console.log('u click not your counter. Move Processing')
    //                 this.moveProcessing(absolutePointer)
    //                 return
    //             }

    //             console.log('u click on your"s counter but u already got existing Moving Stack. First Move Processing')
    //             this.moveProcessing(absolutePointer)

    //             break;
    //     }

    // },

    firstPlayerMovementPhase(options) {
        let counter;
        let absolutePointer = options.absolutePointer
        let movingStackStatus = this.getMovingStackStatus()

        switch (movingStackStatus) {
            case 'uncreated':

            console.log('case uncreated')
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
                    this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
                    this.buildMGUI()
                    return
                }

                console.log('clicked on not Moved, not broken stack remnant counter. ')

                if (this.countersFromBrokenMovingStackArray) {
                    this.countersFromBrokenMovingStackArray.forEach((counter) => {
                        
                        counter.group._restoreObjectsState()

                        this.canvasObj.getImageByID(counter.getImageID()).set({
                            selectable: true,
                            evented: true
                        })

                        this.canvasObj.canvas.remove(counter.group)

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

                // this.createNewMovingStack()
                // this.setMovingStackStatus('filledWithCounters')
                // this.addToMovingStack(counter)
                // this.setOwnHexForMovingStack(counter.ownHex)
                // this.buildMGUI()
                // this.createAndDrawGroupOfImgAndBorder(counter)

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
                if (this._checkIfCounterIsAlreadyInMovingGroup(counter)){
                    console.log('selected counter is already in Moving Group')
                    return
                }

                if (counter.getMovingStatus() == 'moved') {
                    console.log('u try to select counter that is moved already')
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
                    this.canvasObj.changeColorOfBorder(counter.colorBorder, "red")
                    return
                }

                // console.log('clicked on not Moved, not broken stack remnant counter. ')

                // this.countersFromBrokenMovingStackArray.forEach((counter) => {
                    
                //     counter.group._restoreObjectsState()

                //     this.canvasObj.getImageByID(counter.getImageID()).set({
                //         selectable: true,
                //         evented: true
                //     })

                //     this.canvasObj.canvas.remove(counter.group)

                //     counter.setMovingStatus('moved')
                // })

                // this.clearCountersFromBrokenMovingStackArray()

                // this.createNewMovingStack()
                // this.setMovingStackStatus('filledWithCounters')
                // this.addToMovingStack(counter)
                // this.setOwnHexForMovingStack(counter.ownHex)
                // this.buildMGUI()
                // this.createAndDrawGroupOfImgAndBorder(counter)

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