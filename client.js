
import { Canv } from './canv.js'
import { Interface } from './ui.js'
import { Game } from './game.js'
import { Map } from './map.js'

import { methods } from './clientMethods_ReactionOnCanvas.js'
import { rout } from './routPhase.js'
// import { Counter, MultiManCounters, SingleManCounters, Weapon } from './counters.js'
//------------------------ 20 03 2020 ----------------------------------------------------------------
import { createStack } from './stackFactory.js'

import { createCounter } from './countersFinal.js'

import { buttonsCallbacks } from './buttonsCallbacks.js'



class Client {
    constructor() {

        this.allPhases_CallbacksHash = {

            'firstPlayerRallyPhase': this.firstPlayerRallyPhase.bind(this),
            'secondPlayerRallyPhase': this.secondPlayerRallyPhase.bind(this),
            'firstPlayerPrepFirePhase': this.firstPlayerPrepFirePhase.bind(this),
            'firstPlayerMovementPhase': this.firstPlayerMovementPhase.bind(this),
            'secondPlayerDefenciveFirePhase': this.secondPlayerDefenciveFirePhase.bind(this),
            'firstPlayerAdvFirePhase': this.firstPlayerAdvFirePhase.bind(this),
            'firstPlayerRoutPhase': this.firstPlayerRoutPhase.bind(this),
            'secondPlayerRoutPhase': this.secondPlayerRoutPhase.bind(this),
            'firstPlayerAdvancePhase': this.firstPlayerAdvancePhase.bind(this),
            'firstPlayerCloseCombatPhase': this.firstPlayerCloseCombatPhase.bind(this),

            'defenciveFirstFirePhase': this.defenciveFirstFirePhase.bind(this),

        };

        // Next hash table is used by _buildMenuInterface() to find what buttons appropriate Phase needs
        //'End Rally' - what button, :bool - disabled or not . We can add any other bt-ns ('Rally All At Once''Choose Next To Rally')

        this.phaseInterfaceMenuTable = {

            'firstPlayerRallyPhase': { 'End Phase': true },
            'secondPlayerRallyPhase': { 'End Opp"s Rally': true, 'Waitng For Opponents Rally': true },
            'firstPlayerPrepFirePhase': { 'End Phase': true },
            'firstPlayerMovementPhase': { 'End Phase': true, 'Defencive Fire': false }, //'Defencive Fire' : true
            'secondPlayerDefenciveFirePhase': { 'End Opp"s DFPh': true, 'Waitng For Opponents DF': true },
            'firstPlayerAdvFirePhase': { 'End Phase': true },
            'firstPlayerRoutPhase': { 'End Phase': true },
            'secondPlayerRoutPhase': { 'End Opp"s Rout': true, 'Waitng For Opponents Rout': true },
            'firstPlayerAdvancePhase': { 'End Phase': true },
            'firstPlayerCloseCombatPhase': { 'End Phase': true },

            'defenciveFirstFirePhase': { 'End Opp"s Reaction Fire': true, },

        };

        this.firstPlayer = undefined;
        this.secondPlayer = undefined;

        this.canvasObj = new Canv();
        this.interface = new Interface();
        this.game = new Game()
        this.map = new Map()

        this.currentCounterInterface = undefined

        this.selectedCounter = undefined

        this.stack = { status: 'uncreated' }

        this.firingStack = { status: 'uncreated' }

        this.countersFromBrokenMovingStackArray = undefined

        this.image = undefined

        this.counterID_Counter_Hash = {}
        //---------------------------------------------------------------------------------------------------------------------
        this.secondPlayerHeavyMashineGunsArray = []
        this.secondPlayerLightMashineGunsArray = []

        this.firstPlayerBrokenCountersArr = []
        this.secondPlayerBrokenCountersArr = []

        this.hex_KnownEnemyHexesArr_Hash = undefined
        this.mustRoutArr = undefined
    }

    setInterfaceScheme() {
        this.interfaceScheme = {

            'End Phase': {
                'callback': this.endPhaseCallback.bind(this),
                'class': 'endPhase',
                'name': `End ${this.firstPlayer}'s Phase`
            },

            'End Opp"s Rally': {
                'callback': this.endOppsRallyCallback.bind(this),
                'class': 'EndOppsRally',
                'name': `End ${this.secondPlayer}'s Rally`
            },

            'Waitng For Opponents Rally': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally',
                'name': `Waitng For ${this.secondPlayer}'s Rally`
            },

            'Waitng For Opponents DF': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally', // 'WaitngForOpponentsDF',
                'name': `Waitng For ${this.secondPlayer}'s DF`
            },

            'End Opp"s DFPh': {
                'callback': this.endOppsDFPhCallback.bind(this),
                'class': 'EndOppsDFPh',
                'name': `End ${this.secondPlayer}'s DFPh`
            },

            'End Opp"s Rout': {
                'callback': this.endOppsRoutCallback.bind(this),
                'class': 'EndOppsRout',
                'name': `End ${this.secondPlayer}'s Rout`
            },

            'Waitng For Opponents Rout': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally',//'WaitngForOpponentsRout',
                'name': `Waitng For ${this.secondPlayer}'s Rout`
            },

            'Rally': {
                //'enabledPhases': ['firstPlayerRallyPhase', 'secondPlayerRallyPhase', 'firstPlayerPrepFirePhaseCallback'],
                'callback': this.rallyCallback.bind(this),
                'class': 'Rally',
                'name': 'Rally'
            },

            'Assault Move': {
                'callback': this.assaultMoveCallback.bind(this),
                'class': 'AssaultMove',
                'name': 'Assault Move'
            },
            'Double Time': {
                'callback': this.doubleTimeCallback.bind(this),
                'class': 'DoubleTime',
                'name': 'Double Time'
            },
            'Break Stack': {
                'callback': this.breakStackCallback.bind(this),
                'class': 'BreakStack',
                'name': 'Break Stack'
            },

            'Attach': {
                'callback': this.attachCallback.bind(this),
                'class': 'Attach',
                'name': 'Attach'
            },
            'End Movement': {
                'callback': this.endMovementCallback.bind(this),
                'class': 'EndMovement',
                'name': 'End Movement'
            },
            'Defencive Fire': {
                'callback': this.defenciveFireCallback.bind(this),
                'class': 'DefenciveFirstFire',
                'name': 'Defencive Fire'
            },
            'End Opp"s Reaction Fire': {
                'callback': this.endReactionFireCallback.bind(this),
                'class': 'EndReactionFire',
                'name': 'End Opp"s Reaction Fire'
            },
            'Add Squad To Fire Group': {
                'callback': this.addSquadToFG.bind(this),
                'class': 'AddSquadToFG',
                'name': 'Add Squad To Fire Group',
            },
            'Add Weapon To Fire Group': {
                'callback': this.addWeaponToFG.bind(this),
                'class': 'AddSquadToFG',
                'name': 'Add Weapon To Fire Group',
            },
            'Fire As Separate Groups': {
                'callback': this.fireAsSeparateGroups.bind(this),
                'class': 'FireAsSeparateGroups',
                'name': 'Fire As Separate Groups',
            },
            'Fire From Every Hexes': {
                'callback': this.fireFromEveryHexes.bind(this),
                'class': 'FireFromEveryHexes',
                'name': 'Fire From Every Hexes',
            },
            'Cancel Fire': {
                'callback': this.cancelFire.bind(this),
                'class': 'CancelFire',
                'name': 'Cancel Fire',
            }

        };

    }

    init(options) {

        this.firstPlayer = options.firstPlayer
        this.secondPlayer = options.secondPlayer


        this._createCounters(options.countersOptions)

        let allCountersArr = Object.values(this.counterID_Counter_Hash)



        this.setInterfaceScheme()
        // let's set starting Phase . Because it is Single Player variant there will be all phases one by one
        // But in full version all Phases will go in parallel . So despite of same names they will be absolutely different

        // let's process options , that we got from Main and build a Visual, Interface, and Reaction according to it

        let startingPhaseTitle = options.startingPhase

        // now we got only Starting Phase title. We will build everything from it
        // in later versions we'll also get set of Counters with its coordinates, accessories, e.t.c

        // first let's set a Reaction on click on not Interface objects that are on Canvas (callbacks for mouse click on Canvas) 

        let callback = this._getCallbackForMouseClickOnCanvasBy(startingPhaseTitle)

        this._removeAllCallbacksOffCanvasAndSetNew(callback)

        // then let's build appropriate UI to control Phase switching

        //this._buildMenuInterface(startingPhaseTitle)

        // our Interface's module buildMenuButton(x,y,...,z) should get those things :
        // where to place , how to look , what to do and be disabled or not
        // 
        // and finally we need to draw a Rondel with appropriate Angle

        //this.canvasObj.preloadAndDrawRondel('assets/turnphase.gif')
        //this.canvasObj.setOtherSidePictureSrc(options.otherSidePictureSrc)

        this.canvasObj.setSidePicturesSrc(options.startingSidePictureSrc, options.otherSidePictureSrc)
        this.canvasObj.preloadAndDrawRondel2('assets/turnphase.gif')

        this.game.setGamePhase(options.startingPhase)


        // -------- Loading Creating and Drawing Background and Counters

        //this.canvasObj.loadSVGFromURL(options.mapSrc)

        this.load_And_DrawBackground(options.mapSrc).
            then(() => {

                return Promise.all(this.getPromisesToLoadImages(allCountersArr))
            }).
            then((imgArr) => {

                this.setDrawOptions_addLoadedImagesToCanvas_createGroup(imgArr, allCountersArr)

                //----------- create promises to load otherSides of man counters. Only for Rout ---

                let counter
                let promArr = []

                imgArr.forEach((image, index) => {

                    counter = allCountersArr[index]

                    if (counter.getType() == 'MashineGun') {
                        return false
                    }

                    let p = new Promise((resolve, reject) => {
                        image.setSrc(counter.otherSideSrc, (image) => {
                            resolve(image)
                        })
                    })

                    promArr.push(p)
                })

                return Promise.all(promArr)

            }).

            then((imgArr2) => {

                imgArr2.forEach((img) => {
                    img.set({
                        stroke: null,
                        strokeWidth: 3
                    })
                })

                // this.canvasObj.getRondelPicture().animate('angle', '-=90', {
                //     onChange: this.canvasObj.canvas2.requestRenderAll.bind(this.canvasObj.canvas2),
                // })

                //this.routPhasePreparing()

                //------------ end ------------------------------

                this._buildMenuInterface(startingPhaseTitle)

                this.canvasObj.canvas.renderAll()

            })
        //.catch(err => alert(err))

        this.canvasObj.setZoomListener()

    };

    _createCounters(countersOptions) {
        let parametersOnCreationHash = countersOptions.parametersOnCreationHash
        for (let i in parametersOnCreationHash) {

            let arrayOfCoords = parametersOnCreationHash[i]

            arrayOfCoords.forEach((obj) => {
                let ops = countersOptions.squadType_propertiesHash[i]

                let centerPoint = this.map._calculateFreeCoords(obj, 48)

                ops.options = { top: centerPoint.y, left: centerPoint.x }       // {q:6,r:0,s:-6}
                ops.ownHex = obj

                let counter = createCounter(ops)

                this.fillCounterID_Counter_Hash(counter.ID, counter)
                this.fillHex_CounterID_setHexOwner(obj, counter)

                //--------------------------------------------------------------------------


                if (counter.getType() != 'MashineGun') {                    // remove it when rout phase is done

                    this.changeCounterStateUnderFire('broken', counter)
                }
                if (counter.getType() == 'MashineGun' && counter.normalRange == 16 && counter.owner == 'Ally') {
                    this.secondPlayerHeavyMashineGunsArray.push(counter)
                }
                if (counter.getType() == 'MashineGun' && counter.normalRange < 16 && counter.owner == 'Ally') {
                    this.secondPlayerLightMashineGunsArray.push(counter)
                }
                //--------------------------------------------------------------------------

            })

        }
    }

    _drawCounters() {
        for (let c in this.counterID_Counter_Hash) {

            this.drawCounter(this.counterID_Counter_Hash[c])
        }
    }

    createCounterObject(className, ops) {
        let C = this.counterTable[className]
        return new C(ops)
    };

    drawCounter(c) {

        let ref = c.src
        let ops = c.options
        Object.assign(ops, {
            originX: 'center',
            originY: 'center',
            //selectable: false
        })
        let cb = (i) => {
            c.imageID = i.id;
            i.counter = c
        }
        let prom = this.canvasObj.creatingPromise(ref)

        this.canvasObj.draw(prom, ops, cb)
    }

    switchPlayers() {
        let temp;
        temp = this.firstPlayer;
        this.firstPlayer = this.secondPlayer;
        this.secondPlayer = temp
    }

    // phaseInterfaceMenuTable - what buttons must be in every Phase, and are they disabled or not
    // interfaceScheme - what properties every buttons has (class,cb.name)

    _buildMenuInterface(phaseTitle) {
        // get  object 'sheme' from phaseInterfaceMenuTable like {End Phase:true,...}
        let scheme = this.phaseInterfaceMenuTable[phaseTitle]

        // if there are several names in this object let's build a button for every one of them
        for (let name in scheme) {
            let result = scheme[name];
            // we need a set of propertires for every button like class, callback , and name that it got . We'll get it from interfaceScheme
            this.interface.buildButton(this.interfaceScheme[name], result)
        }
    };

    _getCallbackForMouseClickOnCanvasBy(phaseTitle) {
        return this.allPhases_CallbacksHash[phaseTitle]
    };

    _removeAllCallbacksOffCanvasAndSetNew(callback) {
        this.canvasObj.setOffMouseClickListener();
        this.canvasObj.setMouseClickListener(callback)
    };

    buildCUI(counter) {

        let phase = this.game.getPhase()
        let schemeObj = counter.getScheme(phase)  // {'phase':{'Do Something':false,...]} - we get {'Do Something': false,...}

        for (let buttonName in schemeObj) {

            let obj = this.interfaceScheme[buttonName]
            let bool = schemeObj[buttonName]

            this.interface.buildButton(obj, bool, counter)
        }

        return this
    };

    clearCounterInterface() {                                   // change name to clearCurrentCounterInterface
        console.log('clearing clearCounterInterface')
        let currentCounterInterface = this.currentCounterInterface
        // ---- is any counter already selected ?
        if (currentCounterInterface) {
            for (let name in currentCounterInterface) {
                this.interface.remove(name)
            }
        }
        // NOTE: Returning this for chaining
        return this
    };

    _setCurrentCounterInterface(counter) {

        this.currentCounterInterface = counter.getScheme(this.game.getPhase())

    }

    processKeyDown(options) {
        // if (options.repeat) {
        //     return;
        // }
        var units = 10
        if (options.keyCode == 65) {                                    // refactor to case switch + change animateSliding(if o !== undef)

            var delta = new fabric.Point(units, 0);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 83) {                                    // refactor to case switch + change animateSliding(if o !== undef)

            var delta = new fabric.Point(0, units);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 68) {                                    // refactor to case switch + change animateSliding(if o !== undef)
            ;
            var delta = new fabric.Point(-units, 0);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 87) {                                    // refactor to case switch + change animateSliding(if o !== undef)
            ;
            var delta = new fabric.Point(0, -units);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }

    }
    // --------------------- added 26 02 2020
    _isClickedCounterOwnerIsSameAsPhaseOwner(counter, player) {

        return counter.owner == player
    }
    //----------------------------- 27 02 2020 -----------------------------------
    _checkIfHexIsInCoverArc(counter, hex) {
        return true
    }

    addCounterToStack(counter, stack) {
        stack.addToStack(counter)

    }

    getStackUIScheme(stack) {

        return stack.getUIScheme()
    }

    setStackUIButtonsCondition(stack, buttonName, bool) {
        let scheme = this.getStackUIScheme(stack) // {'R':true}

        scheme[buttonName] = bool
    }

    buildStackUI(stack) {
        for (let buttonName in this.getStackUIScheme(stack)) {

            let obj = this.interfaceScheme[buttonName]
            let bool = stack.schemeObj[buttonName]

            this.interface.buildButton(obj, bool)
        }
    }

    getStackStatus(stack) {
        return stack.status
    }

    _isCounterInSameHexAsStack(counter, stack) {

        let hex = stack.getOwnHex()
        return JSON.stringify(hex) == JSON.stringify(counter.ownHex)
    }

    setMouseClickListenerAccordingToCurrentPhase() {
        let p = this.game.getPhase()
        let cb = this.allPhases_CallbacksHash[p]
        this.canvasObj.setMouseClickListener(cb);
    }

    setStackStatus(stack, status) {
        stack.setStatus(status)
    }

    setStackUIDisabled(stack) {
        stack.setUIDisabled()
    }

    _isCounterInStack(counter, stack) {
        let arr = stack.getStackCountersArray()
        if (arr.indexOf(counter) != -1) {
            return true
        }
    }

    clearCountersFromBrokenMovingStackArray() {
        this.countersFromBrokenMovingStackArray = undefined
    }

    rearrangeCountersPositionInHex(hex) {

        let center = this.map.getCenterCoordsObjFromHex(hex)
        let countersInHexArray = this.map.getCountersIDinHexArray(hex) // [conterID,...]
        let img
        let c = { x: 0, y: 0 }

        countersInHexArray.forEach((counterID, index, arr) => {
            let counter = this.getCounterByItsID(counterID)

            if (counter.weightHex > 0) {    // if counter.weightHex == 0 then it is weapon attached with some C-r. Itis a group twice size, so weapon size is there

                img = counter.group || this.canvasObj.getImageByID(counter.getImageID())

                if (index == 0) {    // we set for first counter coords equal to centercoordz
                    c.x = center.x   // we can take countersInHexArray.length and set c.x = ctnter.x  - Math.floor(length/2) * 10
                    c.y = center.y
                } else {
                    c.x = c.x + img.width * 0.25
                    c.y = c.y + img.width * 0.25
                }

                img.set({ left: c.x, top: c.y })

                this.canvasObj.canvas.add(img)
            }
        })
    }

    getCounterByItsID(ID) {
        return this.counterID_Counter_Hash[ID]
    }

    fillCounterID_Counter_Hash(ID, counter) {
        this.counterID_Counter_Hash[ID] = counter
    }

    changeColorOfBorder(counter, color) {
        this.canvasObj.getImageByID(counter.getImageID()).set({
            stroke: color,
            strokeWidth: 3
        })
        this.canvasObj.canvas.renderAll()
    }

    changeColorOfBorderImage(img, color) {
        img.set({
            stroke: color,
            strokeWidth: 3
        })
        this.canvasObj.canvas.renderAll()
    }

    _checkForMovingStatus(status, counter) {
        if (counter.getMovingState) {
            return counter.getMovingState() == status
        }
        console.log('counter got no Moving state')
        return false
    }

    endEachCounterMove(arr) {
        if (arr) {
            arr.forEach((counter) => {
                this.changeColorOfBorder(counter, null)
                counter.setMovingStatus('moved')
            })
        }
        console.log('there is no conters not finished its move')
        return this
    }

    _check_ForNullTarget_ForOwner_ForMovingStatus(target) {

        if (target == null) {
            console.log('clicked on empty space. Select Counter')
            return true
        }
        if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(target.counter, this.firstPlayer)) {
            console.log('u click not your counter')
            return true
        }
        if (!target.counter.getMovingStatus) {
            console.log('u try  to select static counter')
            return true
        }
        if (target.counter.getMovingStatus() == 'moved') {
            console.log('u try to select counter that is moved already')
            return true
        }
    }

    createNewStack_setStatus_addCounter_setOwnHex(status, counter) {

        let stack = createStack('moving').addToStack(counter).setStatus(status).setOwnHex(counter.ownHex)
        // if ownHex == road - add Road Bonus

        this.changeColorOfBorder(counter, "red")

        return stack
    }

    isEqual(obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2)
    }

    moveProcessing(point) {

        let targetHex = this.map.getHexFromCoords(point)

        let targetHexType = this.map.getHexType(targetHex)

        //console.log(targetHexType != 'road' && this.stack.isOnTheRoadFromStart)
        if (targetHexType != 'road' && this.stack.isOnTheRoadFromStart) {

            this.stack.isOnTheRoadFromStart = false

            let result = this.stack.mgArray.some((movingCounter) => {
                movingCounter.subtractMF(1)
                let bool = this._checkIfMovementPointsEnded(movingCounter)

                movingCounter.getRoadBonus()

                return bool
            })

            if (result) {
                this.stack.isOnTheRoadFromStart = true
                return console.log('u are tryin to get off road , but u do not have enough MF')
            }

            this.stack.mgArray.forEach((movingCounter) => {
                movingCounter.subtractMF(1)
            })

        }

        if (this._is_Click_NotInCoverArc_inOwnHex_onEnemy_EnterCostTooHigh(this.stack, targetHex)) {
            return
        }

        this.stack.mgArray.forEach((movingCounter) => {

            let previousHex = movingCounter.ownHex
            let costToEnter = movingCounter.getCostToEnter(this.map.getHexType(targetHex))
            let img = movingCounter.group || this.canvasObj.getImageByID(movingCounter.getImageID())
            let coords = this.getFreeCoordsAsTopLeftObj(targetHex, img.width)

            movingCounter.subtractMF(costToEnter)
            movingCounter.setHexPosition(targetHex)

            this.map.removeIDFromHex_counterIDHash(previousHex, movingCounter.ID)
            this.fillHex_CounterID_setHexOwner(targetHex, movingCounter)

            this.canvasObj.setOffMouseClickListener()
            this.canvasObj.createPromiseAnimation(img, coords)
                .then(() => {
                    this.setMouseClickListenerAccordingToCurrentPhase()

                    this.rearrangeCountersPositionInHex(previousHex)
                    if (this._checkIfMovementPointsEnded(movingCounter)) {

                        this.setMOVEDstatus_NullBorderColor_RemoveFromStack(movingCounter, this.stack)
                    }
                    if (this._isStackEmpty(this.stack)) {        //  && getMovingStackStatus() == 'filledWithBrokenStackRemnants'
                        this.setStackStatus(this.stack, 'uncreated')
                        this.clearStackUI(this.stack)
                        return console.log('all untis from MG have ended its move ')
                    }

                    if (!this.stack.isEnabled('End Movement')) {
                        this.stack.enableButton('End Movement')
                        this.interface.enableButton('End Movement')
                    }
                    this.stack.disableButton('Assault Move')
                    this.interface.disableButton('Assault Move')

                    this.stack.disableButton('Double Time')
                    this.interface.disableButton('Double Time')

                })
        })


        // disable assault and double time buttons
        // if Stop Movement disabled => enable it

        // if (!this.stack.isEnabled('End Movement')) {
        //     this.stack.enableButton('End Movement')
        //             // now redrawIt
        // this.interface.enableButton('End Movement')
        // }

        if (this.interface.isDisabled('Defencive Fire')) {
            this.interface.enableButton('Defencive Fire')
        }

        this.setStackStatus(this.stack, 'moving')
    }

    getFreeCoordsAsTopLeftObj(hex, size) {
        let c = this.map._calculateFreeCoords(hex, size)
        return { top: c.y, left: c.x }
    }

    _checkIfMovementPointsEnded(counter) {
        console.log(counter.getMFLeft())
        return counter.getMFLeft() == 0
    }

    setMOVEDstatus_NullBorderColor_RemoveFromStack(counter, stack) {
        let img = this.canvasObj.getImageByID(counter.getImageID())
        this.setMovingStatus(counter, 'moved')
        this.changeColorOfBorderImage(img, null)
        this.removeCounterFromStack(stack, counter)
    }

    removeCounterFromStack(stack, counter) {
        stack.removeCounterFromArray(counter)
    }

    setMovingStatus(counter, status) {
        counter.setMovingStatus(status)
    }

    _checkIfThereIsAnEnemyInHex(movingCounter, targetHex) {

        switch (movingCounter.getType()) {
            case 'AFV':
                return false;
            case 'MultiManCounter':

                if (this.map.getOwnerOfHex(targetHex) != undefined && this.map.getOwnerOfHex(targetHex) != movingCounter.owner) {
                    return true
                }
                break;
        }
    }

    _isCostToEnterHigherMFLeft(movingCounter, costToEnter) {
        if (movingCounter.getMFLeft() < costToEnter) { // 'wood' - 2MF 'grain' - 1.5 'building' - 2 MF
            console.log('cost to enter is higher then MF left')
            return true
        }
    }

    _is_Click_NotInCoverArc_inOwnHex_onEnemy_EnterCostTooHigh(stack, targetHex) {


        return stack.mgArray.some((movingCounter) => {

            if (this._checkIfMovementPointsEnded(movingCounter)) {
                this.setMOVEDstatus_NullBorderColor_RemoveFromStack(movingCounter, this.stack)
                return true
            }

            if (this.isEqual(movingCounter.ownHex, targetHex)) {
                console.log('u try to move into the own Hex')
                return true
            }
            if (!this._checkIfHexIsInCoverArc(movingCounter, targetHex)) {
                console.log('u try to move into Hex not in your Cover Arc')
                return true
            }

            if (this._checkIfThereIsAnEnemyInHex(movingCounter, targetHex)) {  // case MMC true ? AFV false
                console.log('u try to move into Hex with an Enemy')
                return true
            }

            let costToEnter = movingCounter.getCostToEnter(this.map.getHexType(targetHex))

            if (this._isCostToEnterHigherMFLeft(movingCounter, costToEnter)) {
                console.log('cost to enter is higher then MF left')
                return true
            }
        })
    }

    fillHex_CounterID_setHexOwner(targetHex, movingCounter) {
        this.map.addHexTohex_counterIDHash(targetHex)
        this.map.fillhex_counterIDHash(targetHex, movingCounter.ID)
        this.map.setOwnerOfHex(targetHex, movingCounter.owner)
    }


    _isStackEmpty(stack) {
        return stack.getStackCountersArrLength() == 0
    }

    clearStackUI(stack) {
        for (let buttonName in this.getStackUIScheme(stack)) {
            this.interface.remove(buttonName)
        }
    }
    //----------------------------------------------- move end -------------------------------------------------------------------------

    buildGUI(group, stack) {

        let scheme = group.uiScheme

        let k = 0
        for (let name in scheme) {

            let bool = scheme[name];

            let btton = this.interface.buildButton(this.interfaceScheme[name], bool, { group: group, stack: stack })

            btton.style.top = group.top - 100 + 'px';
            btton.style.left = group.left - k + 'px';
            k = 105
        }
    }

    clearGroupUI() {

        for (let buttonName in { 'Add Squad To Fire Group': true, 'Add Weapon To Fire Group': true }) {

            this.interface.remove(buttonName)
        }
    }

    createNewFStack(status) {

        let stack = createStack('firing').setStatus(status)

        return stack
    }

    addingToFireStack(counter, stack) {

        // if (counter.getType() == 'SingleManCounter' && stack._isHex_CountersArrayEmpty(counter.ownHex)) {
        //     return console.log('u cannot add SMC to FG without MMC or Weapon')
        // }
        if (counter.getType() == 'SingleManCounter') {

            console.log('add SMC')
            stack.setHex_Bonus(counter.ownHex, counter.commandBonus)
        }

        console.log(stack)

        if (counter.experience == 'Inexperienced') {
            stack.experience = 'Inexperienced'
        }

        stack.addToGeneralCountersArray(counter)
        stack.setHex_countersArray(counter.ownHex, counter)

        this.changeColorOfBorder(counter, "red")

        this.clearGroupUI()
    }

    _isCounterNearStack(counter, stack) {

        let arr = Object.keys(stack['hex_countersArray'])

        let result = arr.some((hex) => {
            let h = JSON.parse(hex)

            return this.map.isHexNear(counter.ownHex, h)
        })

        if (result) {
            console.log('counter is near or inside hexes with stack')
            return true
        }
    }

    calculateCommanderBonus(stack) {

        let arr = Object.values(stack['hex_bonus'])

        if (arr.length == 0) { return 0 }

        return Math.min(...arr)
    }

    calculateWorstHindranceDRM(stack) {
        let arr = Object.values(stack['hex_hindrance'])

        return Math.max(...arr)

    }

    getResultRollingTwoDice() {
        let d1 = 5//this.diceRoll()
        let d2 = 2//this.diceRoll()
        return { 'WhiteDice': d1, 'RedDice': d2, 'sum': d2 + d1 }
    }

    diceRoll() {
        //return Math.floor(Math.random() * 6) + 1;
        return 6
    }

    calculate_And_SetFiringStatus(diceRoll, phase, stack) {

        stack.mgArray.forEach((counter) => {

            let status = this.calculateFiringStatus(diceRoll, phase, counter, stack)
            console.log('diceRoll :', diceRoll)
            console.log('status :', status)

            counter.setFiringStatus(status)
        })
    }


    returnMashinGunsOnTopOfGroup(stack) {
        setTimeout(() => {
            stack.mgArray.forEach((counter) => {
                if (counter.getType() == 'MashineGun') {

                    counter.group.bringToFront()

                    this.canvasObj.getImageByID(counter.getImageID()).set({ // only to show changes ! Without it won't work
                        strokeWidth: 4
                    })
                    this.canvasObj.canvas.requestRenderAll()
                }
            })
        }, (stack.mgArray.length + 1) * 1000)
    }

    isEveryFiringHexGotLoS(stack) {

        return Object.values(stack['hex_los']).indexOf(false) == -1
    }

    callbackToDrawLines(arr) {

        let a = [Object.values(arr[0]), Object.values(arr[1])]

        const segment = [].concat(...a)

        this.canvasObj.drawLine(segment)
    }

    fireFromEveryHexes() {
        console.log('fff')
    }

    cancelFire() {
        console.log('ffff')
    }

    setHex_LoS(stack, targetHex) {

        if (!Object.keys(stack['hex_los']).length == 0) {
            return console.log('this stack  already set LoS')
        }

        let firingHexesArr = Object.keys(stack['hex_countersArray'])

        firingHexesArr.forEach((hex) => {

            let bool = this.map.isLoS(hex, targetHex, this.callbackToDrawLines.bind(this))
            stack.setHex_LoS(hex, bool)
            // if (!bool) {
            //     stack.setHex_LoS(hex, bool)
            // }
        })
    }

    setHex_Hindrance(stack, targetHex) {

        if (!Object.keys(stack['hex_hindrance']).length == 0) {       // hind not everywhere, but los is/ that's why
            return console.log('this stack already set hindrance')
        }

        let firingHexesArr = Object.keys(stack['hex_countersArray'])
        let hind = 0

        for (let hex of firingHexesArr) {

            hex = JSON.parse(hex)

            let arrayOfHexesInLoS = this.map.getHexesBetween(targetHex, hex)

            for (let h of arrayOfHexesInLoS) {

                hind += this.map.getHexHindrance(h)

                if (hind >= 6) {
                    stack.setHex_LoS(hex, false)
                    break
                }
            }

            stack.setHex_Hindrance(hex, hind)
            hind = 0
        }
    }

    calcFireStatus_Animate(diceRoll, stack) {

        let phase = this.game.getPhase()

        this.calculate_And_SetFiringStatus(diceRoll, phase, stack)
        this.animateFireEffectOnFirer(stack)
        this.returnMashinGunsOnTopOfGroup(stack)
    }

    buildingButtonsToChooseStackFiringOnNoLoS(stack, point) {

        this.interface.buildButton(this.interfaceScheme['Fire As Separate Groups'], true, { stack: stack, point: point })
        this.interface.buildButton(this.interfaceScheme['Fire From Every Hexes'], true)

        this.canvasObj.setOffMouseClickListener()

        stack.setUISchemeButton('Cancel Fire', false)

        this.clearStackUI(stack)
        this.buildStackUI(stack)

        this.interface.disableButton(`End ${this.firstPlayer}'s Phase`)
    }

    fireAsSeparateGroups(button, ops) {


        // rebuild all possible stacks
        // for each call fire processing

        let hexesWithoutLoSArray = ops.stack.getHexesWithoutLoSArray()
        let hexesWithLoSArray = ops.stack.getHexesWithLoSArray()

        // console.log(hexesWithoutLoSArray)
        // console.log(hexesWithLoSArray)

        let sortedNoLoS = this.sortToArrayOfSeparateHexesArrays(hexesWithoutLoSArray)
        let sortedLoS = this.sortToArrayOfNearestHexesArrays(hexesWithLoSArray)

        // console.log(sortedLoS)
        // console.log(sortedNoLoS)

        let stacksWithoutLoSArray = this.createNewStacksOfOldOne_AddCounters(ops.stack, sortedNoLoS, false)
        let stacksWithLoSArray = this.createNewStacksOfOldOne_AddCounters(ops.stack, sortedLoS, true)


        // console.log(stacksWithoutLoSArray)
        // console.log(stacksWithLoSArray)

        stacksWithLoSArray.forEach((stack) => {

            this.fireProcessing(ops.point, stack)
        })

        stacksWithoutLoSArray.forEach((stack) => {
            this.fireProcessing(ops.point, stack)
        })

    }

    sortToArrayOfSeparateHexesArrays(hexesArr) {

        return hexesArr.map((hex) => {
            return [hex]
        })

    }

    sortToArrayOfNearestHexesArrays(hexesArr) {

        let arrayOfNearestHexesArrays = []

        while (hexesArr.length > 0) {

            // place chain of hexes nearest to first one into array
            let arrayOfNearestHexes = hexesArr.filter((hex) => {
                return this.map.isHexNear(hex, hexesArr[0])
            })

            console.log(arrayOfNearestHexes)

            arrayOfNearestHexesArrays.push(arrayOfNearestHexes)     // [[h,h],[h]]

            // remove array of nearest hexes from basic one
            hexesArr = hexesArr.filter(hex => !arrayOfNearestHexes.includes(hex))

        }

        return arrayOfNearestHexesArrays
    }

    createNewStacksOfOldOne_AddCounters(stack, arrayOfNearestHexesArr, bool) {  // createNewStacksOfOldOne_AddCounters(stack,arrayOfNearestHexesArr)

        let stacksArray = []
        for (let hexesArr of arrayOfNearestHexesArr) {
            let newStack = this.createNewFStack('readyToFire')

            hexesArr.forEach((hex) => {
                console.log(hex)
                let countersArr = stack.hex_countersArray[hex]
                countersArr.forEach((counter) => {
                    this.addingToFireStack(counter, newStack)
                })

                newStack.setHex_LoS(hex, bool)  // to not check it again when fireProcessing

            })

            stacksArray.push(newStack)
        }

        return stacksArray
    }

    fireProcessing(point, stack) {
        console.log('-----------------')
        // switch between different Phases 
        // PFPh , DFFPh
        // in case of PF :
        // FFNAM FFMO == 0
        // in case DFFPh :
        // if stack.firingStatus  == 'First Fire' && targetHex not closest between possible
        // return

        let targetHex = this.map.getHexFromCoords(point)
        let diceRoll = this.getResultRollingTwoDice()

        this.setHex_LoS(stack, targetHex)   // + drawLine
        this.setHex_Hindrance(stack, targetHex) // move up after setHex_LoS but before isEveryFiringHexGotLoS ?

        if (!this.isEveryFiringHexGotLoS(stack) && stack.getNumberOfHexes() > 1) {

            this.buildingButtonsToChooseStackFiringOnNoLoS(stack, point)

            return console.log('building buttons to choose stack firing')

        }

        if (!this.isEveryFiringHexGotLoS(stack)) {

            this.calcFireStatus_Animate(diceRoll, stack)

            this.firingStack = { status: 'uncreated' }

            return console.log('these firing hexes got no LoS')
        }

        this.calcFireStatus_Animate(diceRoll, stack)

        let drm = this.calcDRM(stack, targetHex)// commanderDRM + hindranceDRM + temDRM

        //-----------------------------------------------------------------------------------------------------------------------------------
        console.log('drm - ', drm)

        let effectOnTarget = this.calculateEffectOfFiring(diceRoll, stack, targetHex, drm)

        console.log('effect - ', effectOnTarget)


        // -------------------- Add check on phase . If Phase is MOve - exclude not moving

        this.targetFireEffectProcessing(targetHex, effectOnTarget)

        //stack = undefined
        this.firingStack = { status: 'uncreated' }

    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------

    calcDRM(stack, targetHex) {
        let commanderDRM = this.calculateCommanderBonus(stack)
        let hindranceDRM = this.calculateWorstHindranceDRM(stack)
        let temDRM = this.calculateTEM(stack, targetHex)

        return commanderDRM + hindranceDRM + temDRM
    }

    flipCounterOnOtherSide(counter) {
        let self = this
        counter.initialImg.setSrc(counter.otherSideSrc, () => {
            self.canvasObj.canvas.renderAll()
        })
    }

    calculateFiringStatus(diceRoll, phase, counter, stack) {

        if (counter.rateOfFire && diceRoll.RedDice <= counter.rateOfFire) {
            return '_ROF_'
        }

        if (counter.breakdownNumber && diceRoll['sum'] >= counter.breakdownNumber) {
            return 'broken'
        }

        if (diceRoll.red == diceRoll.white && !this.isStackUnderCommand(stack) && phase == 'secondPlayerDefenciveFirePhase') {
            return 'FINAL_FIRE'
        }

        if (phase == 'secondPlayerDefenciveFirePhase' && counter.firingStatus == 'FIRST_FIRE') {
            return 'FINAL_FIRE'
        }

        if (phase == 'secondPlayerDefenciveFirePhase' && counter.firingStatus == 'FINAL_FIRE') {
            return 'FINAL_FIRE'
        }

        if (phase == 'secondPlayerDefenciveFirePhase') {
            return 'FIRST_FIRE'
        }

        return 'PREP_FIRE'
    }

    calculateEffectOfFiring(diceRoll, stack, targetHex, drm) {
        let cower

        if (diceRoll.RedDice == diceRoll.WhiteDice && !this.isStackUnderCommand(stack)) {    // this.isStackUnderCommand(stack)
            cower = true
        }


        let DRsumPlusDRM = diceRoll['sum'] + drm
        let sumOfAllCountersFP = this.summingCounterFPforEachHex(stack, targetHex)

        console.log('sumOfAllCountersFP - ', sumOfAllCountersFP)

        let firePower = this.game.getActualFirePower(sumOfAllCountersFP, cower, stack.experience)

        console.log('firePower,DRsumPlusDRM :', firePower, DRsumPlusDRM)

        return this.game.getIFT_FPresult(firePower, DRsumPlusDRM)
    }

    summingCounterFPforEachHex(stack, targetHex) {

        return Object.keys(stack['hex_countersArray']).reduce((sum, hex) => {

            sum = stack['hex_countersArray'][hex].reduce((acc, counter) => {

                let fp = this.calculateCounterFirePower(counter, targetHex)

                return acc + fp
            }, 0)

            return sum
        }, 0)
    }

    calculateCounterFirePower(counter, targetHex) {

        //return 4

        if (counter.getType() == 'SingleManCounter') {
            return 0
        }

        let normalRange = counter.getNormalRange()
        let distance = this.map.getHexesBetween(counter.ownHex, targetHex).length + 1


        if (distance > normalRange * 2) {
            return 0
        }

        if (distance == 0) {     //this.map.isHexNear(counter.ownHex, targetHex)
            return counter.firePower * 2
        }

        if (distance > normalRange) {

            console.log('distance greater than normal. Divide FP by 2')
            return counter.firePower / 2 // can have fractions
        }

        return counter.firePower
    }

    isStackUnderCommand(stack) {

        return Object.values(stack['hex_bonus']).length < Object.values(stack['hex_countersArray'])
    }

    calculateTEM(stack, targetHex) {
        let tem = this.map.getHexTEM(targetHex)

        if (tem == 'woods-road') {

            let countersIDsInHexArray = this.map.getCountersIDinHexArray(targetHex)

            let firingHexesArr = Object.values(stack['hex_countersArray'])

            let bool = firingHexesArr.some((hex) => {
                return !this.map.isLoSIncludingTargetHex(hex, targetHex)
            })

            let bool2 = countersIDsInHexArray.some((counterID) => {
                let counter = this.getCounterByItsID(counterID)
                return counter.onTheRoad
            })

            if (bool && bool2) {

                console.log('stack is on ther road, not wood')
                return 0
            }
        }

        return tem
    }

    //----------------------------------------------------------------------------------------------------

    calcStatusAfterMoralCheck(counter, commandBonus, effectNum, dr) {
        let rollForMoral = dr + effectNum + commandBonus

        switch (counter.getStatus()) {
            case 'broken':
                if (dr == 12) {
                    return 'KIA'
                }

                if (rollForMoral > counter.morale) {


                    return this.calcStatusAfterCasualityReduction(counter)
                }

                break;

            case 'ready to action':

                if (rollForMoral == counter.morale) {
                    return 'pinned'
                }

                if (rollForMoral > counter.morale && dr == 12) {

                    return this.calcStatusAfterCasualityReduction(counter)
                }

                if (rollForMoral > counter.morale) {

                    return 'desperate'
                }

                return 'desperate' // remove ! only for test

            default:

                return 'no effect'
        }
    }

    calcStatusAfterCasualityReduction(counter) {

        switch (counter.getType()) {

            case 'MultiManCounter':
                if (counter.size == 'halfsquad') {
                    return 'KIA'
                }

                //counter.size = 'halfsquad'

                return 'reducted' // 'reducted' ??


            case 'SingleManCounter':
                let woundSeverityDR = this.diceRoll()

                if (woundSeverityDR > 4) {
                    return 'KIA'
                }
                return 'wounded'
        }

    }

    //----------------------------------------------------------------------------------------------------

    findBestLeaderInArray(arr) {

        return arr.reduce((acc, counter) => {

            if (counter.getType() != 'SingleManCounter') {
                return console.log('not SMC')
            }

            if (acc === undefined) {
                console.log('first one !')
                return acc = counter
            }

            if (acc != undefined && counter.commandBonus < acc.commandBonus) {
                acc = counter
            }
            return acc
        }, undefined)
    }


    animateChangingCounterState(status, counter, dr) {

        let self = this
        switch (status) {
            case 'desperate':

                let t = self.canvasObj.createUnderFireTextBox(counter.initialImg, 'DM_+_4')

                counter.group.add(t)
                counter.initialImg.setSrc(counter.otherSideSrc, () => {

                    counter.group.bringToFront()
                    //self.canvasObj.canvas.renderAll()
                    self.changeColorOfBorder(counter, null)
                })

                console.log('-------- fire ----------')
                break;

            case 'broken':

                counter.initialImg.setSrc(counter.otherSideSrc, () => {

                    counter.group.bringToFront()

                    self.changeColorOfBorder(counter, null)
                })
                break;

            case 'KIA' :

                console.log('KIA')

                this.canvasObj.canvas.remove(counter.group)
                this.canvasObj.canvas.remove(counter.initialImg)
                break
            //console.log(dr)

            // cb = () => {

            //     let t = self.canvasObj.createUnderFireTextBox(counter.initialImg, 'DM_+_4')

            //     counter.group.add(t)
            //     counter.initialImg.setSrc(counter.otherSideSrc, () => {

            //         counter.group.bringToFront()
            //         self.canvasObj.canvas.renderAll()
            //     })

            //     console.log('-------- fire ----------')
            //     console.log(dr)

            // }
            //return cb
        }

    }

    animateFireEffectOnFirer(stack) {

        let cb
        let c = 0
        let self = this
        stack.mgArray.forEach((counter) => {
            c = c + 1000

            switch (counter.firingStatus) {
                case '_ROF_':

                    console.log('%Mashine Gun saved ROF ', 'color:blue');

                    cb = () => {
                        counter.group.bringToFront()
                        self.changeColorOfBorder(counter, null)
                    }
                    break;

                case 'PREP_FIRE':
                    cb = () => {

                        let img = counter.initialImg
                        let t = self.canvasObj.createPhaseTextBox(img, counter.firingStatus)



                        counter.group.add(t)
                        counter.group.bringToFront()
                        counter.initialImg.bringToFront()
                        self.changeColorOfBorder(counter, null)
                    }

                    break;

                case 'broken':      /// broken Mashin gun not Squad !

                    cb = () => {
                        counter.groupToAttach.bringToFront()
                        //----------------- flipCounterOnOtherSide ---------------------------
                        counter.initialImg.setSrc(counter.otherSideSrc, () => {
                            counter.group.bringToFront()

                            self.changeColorOfBorder(counter, null)
                        })

                        //self.flipCounterOnOtherSide(counter)
                        //counter.setBrokenStatus()
                        // counter.initialImg.setSrc(counter.otherSideSrc,()=>{
                        //     //counter.initialImg.bringToFront()
                        //     console.log('%Mashine Gun is broken ','color:blue');
                        //     self.canvasObj.canvas.requestRenderAll()
                        //     counter.initialImg.bringToFront()
                        // })
                        //counter.group.bringToFront()

                    }


                    break;
            }
            setTimeout(cb, c)
        })
    }

    targetFireEffectProcessing(targetHex, effectOnTarget) {

        const targetCountersArray = this.map.getCountersIDinHexArray(targetHex).map(id => this.getCounterByItsID(id))
        const effect = effectOnTarget[1]
        const effectNum = effectOnTarget[0]

        let commandBonus = 0
        //let c = 1000

        switch (effect) {
            case 'KIA':

                this.killedInActionEffectProcessing(targetCountersArray, effect, effectNum)

                break

            case 'K/':
                break

            case 'MC':

                this.moralCheckEffectProcessing(targetCountersArray, effect, effectNum, commandBonus)

            case 'PTC':
                break
        }
    }

    changeCounterStateUnderFire(status, counter) {  // + add to this.firstPlayerBrokenCountersArr if broken

        console.log(this.firstPlayer)

        if (status === counter.status) {
            return console.log('check passed')
        }

        switch (status) {

            case 'KIA':

                counter.setNewStatus('KIA')
                // nulify counter from everywher

                break;

            case 'desperate':

                counter.setNewStatus('desperate')
                //counter.morale = 

                //---------------------------------------------------------
                if (counter.owner == this.firstPlayer) {
                    this.firstPlayerBrokenCountersArr.push(counter)
                }
                else {
                    this.secondPlayerBrokenCountersArr.push(counter)
                }

                //---------------------------------------------------------

                break;

            case 'pinned':

                counter.setNewStatus('pinned')

                break;

            case 'wounded':

                counter.setWoundedState()
                counter.setNewStatus('wounded')

                break;

            case 'reducted':

                counter.setReductedState()
                counter.status = 'ready to action'


                break;

            case 'broken':

                counter.setNewStatus('broken')
                //counter.morale =

                //---------------------------------------------------------
                if (counter.owner == this.firstPlayer) {

                    this.firstPlayerBrokenCountersArr.push(counter)
                }
                else {
                    this.secondPlayerBrokenCountersArr.push(counter)
                }

                //---------------------------------------------------------

                break;
        }
    }

    moralCheckEffectProcessing(targetCountersArray, effect, effectNum) {

        let c = 1000
        let commandBonus = 0
        const bestLeader = this.findBestLeaderInArray(targetCountersArray)

        console.log('bestLeader -', bestLeader)

        if (bestLeader) {

            let self = this
            c = 0

            //setTimeout(self.calcStatus_Change_Animate_UnderFire(bestLeader, effect, commandBonus, effectNum), c)

            setTimeout(() => {

                let dr = self.getResultRollingTwoDice()
                let status = self.calcStatusUnderFire(effect, effectNum, bestLeader, commandBonus, dr)

                self.changeCounterStateUnderFire(status, bestLeader)
                self.animateChangingCounterState(status, bestLeader, dr)

            }, c)

            commandBonus = bestLeader.commandBonus

            targetCountersArray.splice(targetCountersArray.indexOf(bestLeader), 1)
        }


        targetCountersArray.forEach((counter) => {

            let self = this
            c = c + 1000
            //this.calcStatus_Change_Animate_UnderFire(counter, effect,commandBonus,effectNum)

            //setTimeout(self.calcStatus_Change_Animate_UnderFire(counter, effect, commandBonus, effectNum), c)

            setTimeout(() => {

                let dr = self.getResultRollingTwoDice()
                let status = self.calcStatusUnderFire(effect, effectNum, counter, commandBonus, dr)

                self.changeCounterStateUnderFire(status, counter)
                self.animateChangingCounterState(status, counter, dr)

            }, c)

        })

        if (bestLeader.newStatus == 'KIA') {
            console.log('LLTC')
        }
    }

    roll_CalcStatus_ChangeState_Animate(effect, effectNum, counter, commandBonus) {

        let dr = this.getResultRollingTwoDice()
        let status = this.calcStatusUnderFire(effect, effectNum, counter, commandBonus, dr)

        this.changeCounterStateUnderFire(status, counter)
        this.animateChangingCounterState(status, counter, dr)

    }

    // calcStatus_Change_Animate_UnderFire(counter, effect, commandBonus, effectNum) {

    //     let status
    //     let dr = this.getResultRollingTwoDice()

    //     switch (effect) {

    //         case 'MC':

    //             status = this.calcStatusAfterMoralCheck(counter, commandBonus, effectNum, dr)

    //             console.log('status :', status)

    //             break;
    //     }

    //     this.changeCounterStateUnderFire(status, counter)

    //     return this.animateChangingCounterState(status, counter, dr)
    // }

    killedInActionEffectProcessing(targetCountersArray, effect, effectNum) {
        // randomly choose effectNum counters of targetCountersArray
        //, statuses == KIA
        // its Images shows wyth KIA then
        // its images(group) removed from canvas , statuses == KIA
        // killed counters removed from hexes , recalc hex reshow new positions
        // every other counter are desperate or CR if already

        //---------choose randomly targets from hex :
        let arToKill = (() => {

            // do numbers of killed is bigger then numbers of counters ?
            if (arr.length < num) {
                return arr
            }

            let res = []
            for (let i = 0; i < num; i++) {
                var item = arr[Math.floor(Math.random() * arr.length)];
                arr.splice(arr.indexOf(item), 1)
                res.push(item)
            }
            return res
        })();

        const arrToKill = targetCountersArray.reduce((acc, counter) => {

        }, [])
    }

    calcStatusUnderFire(effect, effectNum, counter, commandBonus, dr) {

        switch (effect) {

            case 'MC':

                status = this.calcStatusAfterMoralCheck(counter, commandBonus, effectNum, dr)

                console.log('status :', status)

                return status;
        }

    }

    getPromisesToLoadImages(countersArr) {

        return countersArr.map((counter) => {
            return this.canvasObj.creatingPromise(counter.src)
        })
    }

    setDrawOptions_addLoadedImagesToCanvas_createGroup(imgArr, allCountersArr) {

        let counter
        let ops
        let group

        imgArr.forEach((img, index) => {

            //------- set options for images and add them to canvas as group ---------
            counter = allCountersArr[index]
            ops = counter.options

            Object.assign(ops, {
                originX: 'center',
                originY: 'center',
            })

            img.set(ops)
            group = this.canvasObj.createGroup(...[img])    // group with only img

            counter.group = group
            counter.group.counter = counter
            counter.initialImg = img

            this.canvasObj.create_and_fill_ID_ImageHash(img)
            counter.imageID = img.id;
            img.counter = counter

            this.canvasObj.canvas.add(group)

            // ---------- end ------------

        })
    }

    load_And_DrawBackground(mapSrc) {

        let p = this.canvasObj.creatingPromise(mapSrc)
        p.
            then((img) => {
                this.canvasObj.draw(p, { top: 0, left: 0, evented: false, selectable: false, }, () => { this.canvasObj.canvas.sendToBack(img) })//this.canvas.sendToBack(img) 
            })

        return new Promise(resolve => resolve(1));
    }

    //--------------------------------------------------------------------------------------------------------------------

    isSafeHex(hex) {

        let hexType = this.map.getHexType(hex)

        if (hexType == 'wooden building' || hexType == 'stone building' || hexType == 'woods') {    // this.isSafeHex(hex)

            if (!this.isEnemyNear(hex)) {
                return true
            }
        }
        return false
    }

    filterHexesForEnemyPresence(hexesArr, player) {

        return hexesArr.filter((hex) => {
            return this.map.getOwnerOfHex(hex) == player
        })
    }

    collectUniqueElemsArray(array) {
        return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse)
    }
    
    isEnemyNear(hex) {

        let nearestHexesArr = this.map.nearestHexesArr(hex)
        let ownerOfStartHex = this.map.getOwnerOfHex(hex)

        return nearestHexesArr.some((hex) => {
            if (this.map.getOwnerOfHex(hex) != undefined && this.map.getOwnerOfHex(hex) != ownerOfStartHex) {
                return true
            }
            return false
        })
    }
}

// -- let's mix canvas reaction into our class
Object.assign(Client.prototype, methods, buttonsCallbacks, rout)
export { Client };
