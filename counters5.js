class Counter {
    constructor(param) {

        this.src = param.src;
        this.owner = param.owner;
        this.options = param.options
        this.ownHex = param.ownHex
        this.img = undefined;
        this.imageID = undefined;
        this.status = undefined;
        this.colorBorder = undefined
        this.weightHex = 1
        this.ID = (Math.random() + 1).toString(36).slice(2, 18);
        this.otherSideSrc = param.otherSideSrc;

    };

    getImageID() {
        return this.imageID
    }
    getScheme(phase) {
        return this.currentInterfaceElements[phase]
    }
    setHexPosition(hex) {
        this.ownHex = hex
    }
    setNewStatus(status) {
        this.status = status
    }
    getStatus() {
        return this.status
    }
    setWeightHex(num) {
        this.weightHex = num
    }
    getWeightHex(){
        return this.weightHex
    }
    getID () {
        return this.ID
    }
    getType() {
        return this.constructor.name
    }
}

class Attachable {
    constructor() {
        this.attachedTo = undefined
        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Attach': true },
        }
    }

    attachTo(counter){
        this.attachedTo = counter
    }
}

class Movable {
    constructor() {
        this.movingStatus = undefined
    }

    getCostToEnter(type) {
        return this.costToEnterHash[type]
    }

    getMovingStatus(){
        return this.movingStatus 
    }

    setMovingStatus(status) {

        if (!this.getMovingStatus) throw 'there is no possibility to set Moving status here'

        let arr = ['moving','moved','brokenStackRemnant']

        if (arr.indexOf( status ) != -1 ) {
            this.movingStatus = status
        }else{
            throw `there is no sucj status as ${status} in possible to set for counter`
        }
    }
}

class SquadMovable {

    constructor(param){
        let moving = new Movable()
        this.movingStatus = moving.movingStatus

        // 
        this.temporaryMF =  param.movementFactor
        this.movementFactor = param.movementFactor

        // 
    }
    getMFLeft() {
        return this.temporaryMF
    }
    subtractMF(mf) {
        this.temporaryMF = this.temporaryMF - mf
    }
}

class Commandable {

    getReadyToMoveUnderSMCcommand() {
        this.temporaryMF += 1
    }
}

class MultiManCounter extends Counter {
    constructor(param) {
        this.moving = new SquadMovable(param)
        
    }
}

