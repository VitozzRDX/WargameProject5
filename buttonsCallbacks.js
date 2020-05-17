
let buttonsCallbacks = {

        endPhaseCallback(button) {

            console.log('called End Phase ')
    
            // 1 check what Phase now
            this.game.switchToNextPhase()
            let phase = this.game.getPhase()    // rename to newPhase
    
            console.log('New phase :', phase)
    
            let newPhaseCallback = this.allPhases_CallbacksHash[phase]
    
            // --- does we get to opponent"s Half Turn ? ---------
            if (phase == 'secondPlayerRallyPhaseHalfTurn' || phase == 'firstPlayerRallyPhase') {
                this.switchPlayers()
                this.setInterfaceScheme()
                this.canvasObj._flipSidePicture()
            }
    
            // --- is new Phase 'secondPlayerRallyPhase' ? In single Player variant it is same Phase as FPRP,so no Rondel Rotation
            if (phase == 'secondPlayerRallyPhase' || phase == 'secondPlayerRoutPhase' || phase == 'firstPlayerRallyPhaseHalfTurn'
                || phase == 'firstPlayerRoutPhaseHalfTurn') {
    
                this.canvasObj.setOffMouseClickListener()
                this.canvasObj.setMouseClickListener(newPhaseCallback);
    
                // ----  we don't need to Rotate Rondel , but  still need to  build new Menu
                this.interface.clearAllUI()
    
                // 3 Build appropriate MUI 
                this._buildMenuInterface(phase)
            }
    
            // --- is the new Phase any other ? ...
            else {
                // ---- ... let'start asinchronous animation of Rondel Rotation
                let p = this.canvasObj._rotateTurnRondel2(button);
                // --- and after completion set apropriate cb and build appropriate MUI
                p.then(() => {
                    this.canvasObj.setMouseClickListener(newPhaseCallback);
                    this.interface.clearAllUI()
                    this._buildMenuInterface(phase)
                })
            }
    
    
        },
        
        endOppsRallyCallback(button) {
    
            console.log('pressed End Opp"s Rally button')
            // at this moment we need just to launch Next Phase same as in End Phase Callback
    
            this.endPhaseCallback(button)
        },
    
        waitngForOpponentsRallyCallback(button) {
            console.log('DON"T TOUCH IT !!')
        },
    
        endOppsDFPhCallback(button) {
    
            console.log('pressed End Opp"s DF button')
            // at this moment we need just to launch Next Phase same as in End Phase Callback
    
            this.endPhaseCallback(button)
        },
    
        endOppsRoutCallback(button) {
    
            console.log('pressed End Opp"s Rout button')
            // at this moment we need just to launch Next Phase same as in End Phase Callback
    
            this.endPhaseCallback(button)
        },

        rallyCallback(button) {
            console.log(button)
        },

        breakStackCallback(button) {
            console.log('breakStack pressed')
    
            if (this.countersFromBrokenMovingStackArray) throw 'array with Broken Stack counters is full'
    
            this.countersFromBrokenMovingStackArray = this.stack.mgArray
    
            this.stack.mgArray.forEach((counter) => {
    
                this.changeColorOfBorder(counter, "yellow")
                counter.setMovingStatus('brokenStackRemnant')
                try {
                    if (counter.isUnderCommand()) {
                        //console.log('here')
                        counter.removeCommanderBonus()
                    }
                } catch (error) {
                    console.log(error,'it should be a Commander')
                }
    
    
            })
            
            //this.interface.clearAllUI()
    
            
            this.setStackStatus(this.stack, 'uncreated')
            this.setStackUIDisabled(this.stack)
            this.clearStackUI(this.stack)
            this.buildStackUI(this.stack)
    
            this.interface.disableButton('Defencive Fire')
    
        },

        attachCallback(button, counter) {
            let img = this.canvasObj.getImageByID(counter.getImageID())
            this.changeColorOfBorder(counter, 'red')
    
            let newCallback = (options) => {
    
                if (options.target == null) {
                    console.log('options.target == null')
                    return
                }
    
                let counterToAttach = options.target.counter
    
                if (counter == counterToAttach) {
                    console.log('counter == counterToAttach')
                    return
                }
    
    
                let i = this.canvasObj.getImageByID(counterToAttach.getImageID())
    
                this.canvasObj.canvas.discardActiveObject()
    
                img.set({
                    top: i.top + 10,
                    left: i.left + 10,
                    stroke: null
                })//.bringToFront()
    
                this.canvasObj.canvas.add(img)
    
                //-------------- group start---------------------------------------------------------------------------------------
                let group = this.canvasObj.createGroup(i, img)
    
                counterToAttach.group = group
                group.counter = counterToAttach
                group.weaponCounter = counter
    
                this.canvasObj.drawGroup(group)
                //-------------- group end---------------------------------------------------------------------------------------
    
                counter.setWeightHex(0)
                counterToAttach.setWeightHex(2)
                //---------------------------------------------------------------------------------------------------------
                this.map.fillhex_counterIDHash(counterToAttach.ownHex, counter.ID)
                this.rearrangeCountersPositionInHex(counterToAttach.ownHex)
                //---------------------------------------------------------------------------------------------------------
                this.clearCounterInterface()
    
                this._removeAllCallbacksOffCanvasAndSetNew(this.firstPlayerRallyPhase.bind(this))
            }
    
            this._removeAllCallbacksOffCanvasAndSetNew(newCallback)
    
        },

        endMovementCallback(button) {

            this.stack.mgArray.forEach((counter) => {
    
                this.setMovingStatus(counter, 'moved')
                this.changeColorOfBorder(counter, null)
    
            })
    
            this.setStackStatus(this.stack, 'uncreated')
            this.clearStackUI(this.stack)
    
            console.log('end')
        },

        assaultMoveCallback(button) {
            console.log('Next Move will be last. Set state ? Show "Assaulting!" table . Disable Double Time bttn (redraw MGUI ?) ')
    
            // if (stack.status == 'moving') { return console.log('already started Move') }
            this.stack.mgArray.forEach((counter) => {
                // counter.setState('assaulting')
                // 
    
                counter.setMovingStatus('assaulting')
            })
        },

        doubleTimeCallback(button) {
            console.log('set all C in MG except that of exausted, +2 MF to temp, set statuses - exausted ')
            this.stack.mgArray.forEach((counter) => {
                if (counter.status != 'exosted') {
                    counter.status = 'exosted'
                    counter.temporaryMF += 2
                }
            })
            this.stack.disableButton('Double Time')
            this.interface.disableButton('Double Time')
        },

        defenciveFireCallback(button) {
            let devFireCallback = this.allPhases_CallbacksHash['defenciveFirstFirePhase']
    
            this._removeAllCallbacksOffCanvasAndSetNew(devFireCallback)
            this.interface.clearAllUI()
            this._buildMenuInterface('defenciveFirstFirePhase')
            
        },
    
        endReactionFireCallback(button){
    
            console.log('endReactionFireCallback')
    
            this._removeAllCallbacksOffCanvasAndSetNew(this.allPhases_CallbacksHash['firstPlayerMovementPhase'])
            this.interface.clearAllUI()
            this._buildMenuInterface('firstPlayerMovementPhase')
    
            this.clearStackUI(this.stack)
            this.buildStackUI(this.stack)
        },
    

}


export { buttonsCallbacks };