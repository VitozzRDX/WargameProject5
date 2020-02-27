class Counter {
    constructor(param) {

        this.src = param.src;

        this.owner = param.owner;

        this.options = param.options

        //if (!param.ownHex) throw `ownHex is ${param.ownHex}`

        //console.log(param.ownHex)
        this.ownHex =  param.ownHex

        this.img = undefined;

        this.imageID = undefined;

        this.status = undefined

    };

    getImageID() {
        return this.imageID
    }

    getScheme(phase) {
        return this.currentInterfaceElements[phase]
    }

    setHexPosition(hex){
        this.ownHex = hex
    }

    setNewStatus(status){
        this.status= status
    }

    getStatus(){
        return this.status
    }
}

class SelfMovingCounters extends Counter {
    constructor(param) {
        super(param)

    }

    getCostToEnter(type){
        return this.costToEnterHash[type]
    }

    

}

class ManCounters extends SelfMovingCounters {
    constructor(param) {
        super(param)
        
        this.temporaryMF = this.movementFactor = param.movementFactor
        //this.morale = param.morale

        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Rally': false },
        }

        this.otherSideSrc = param.otherSideSrc;

        this.costToEnterHash = {
            'plain':1
        }

    }
    getType() {
        return 'MMC'
    }

    getMFLeft(){
        return this.temporaryMF
    }

    subtractMF(mf){
        this.temporaryMF = this.temporaryMF - mf
    }

}

export {
    Counter,
    ManCounters
}