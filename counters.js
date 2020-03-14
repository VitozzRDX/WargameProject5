class Counter {
    constructor(param) {

        this.src = param.src;

        this.owner = param.owner;

        this.options = param.options

        //if (!param.ownHex) throw `ownHex is ${param.ownHex}`

        //console.log(param.ownHex)
        this.ownHex = param.ownHex

        this.img = undefined;

        this.imageID = undefined;

        this.status = undefined;

        this.colorBorder = undefined

        this.weightHex = 1

        this.ID = (Math.random() + 1).toString(36).slice(2, 18);


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
    
}

class Weapon extends Counter {
    constructor(param){
        super (param)

        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Attach': true },
        }

    }

    


    
}

class SelfMovingCounters extends Counter {
    constructor(param) {
        super(param)
        this.movingStatus = undefined
    }

    getCostToEnter(type) {
        return this.costToEnterHash[type]
    }

    //------------- 04 03 2020 ------------------

    getMovingStatus(){
        //console.log(this.movingStatus)
        return this.movingStatus 
    }

    setMovingStatus(status) {
        
        let arr = ['moving','moved','brokenStackRemnant']

        if (arr.indexOf( status ) != -1 ) {
            this.movingStatus = status
        }else{
            throw `there is no sucj status as ${status} in possible to set for counter`
        }
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
            'plain': 1
        }
    }
    getMFLeft() {
        return this.temporaryMF
    }

    subtractMF(mf) {
        this.temporaryMF = this.temporaryMF - mf
    }

    getReadyToMoveUnderSMCcommand() {
        return
    }

}

class MultiManCounters extends ManCounters {
    constructor(param) {
        super(param)

    }
    getType() {
        return 'MMC'
    }

    getReadyToMoveUnderSMCcommand() {
        this.temporaryMF += 1
    }
}


class SingleManCounters extends ManCounters {
    constructor(param) {
        super(param)
    }

    getType() {
        return 'SMC'
    }
}

// class ManCounters extends SelfMovingCounters {
//     constructor(param) {
//         super(param)

//         this.temporaryMF = this.movementFactor = param.movementFactor
//         //this.morale = param.morale

//         this.currentInterfaceElements = {
//             'firstPlayerRallyPhase': { 'Rally': false },
//         }

//         this.otherSideSrc = param.otherSideSrc;

//         this.costToEnterHash = {
//             'plain':1
//         }

//     }
//     getType() {
//         return 'MMC'
//     }

//     getMFLeft(){
//         return this.temporaryMF
//     }

//     subtractMF(mf){
//         this.temporaryMF = this.temporaryMF - mf
//     }

//     getReadyToMoveUnderSMCcommand(){
//         throw 'errrrrrrr'

//     }

// }

export {
    Counter,
    MultiManCounters,
    SingleManCounters,
    Weapon
}