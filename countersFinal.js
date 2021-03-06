

function addBasicProps (counter,param) {

    counter.type = param.type;
    counter.src = param.src;
    counter.owner = param.owner;
    counter.options = param.options
    counter.ownHex = param.ownHex
    counter.img = undefined;
    counter.imageID = undefined;
    counter.status = param.status||'ready to action';
    counter.newStatus = undefined;
    counter.colorBorder = undefined
    counter.weightHex = 1
    counter.ID = (Math.random() + 1).toString(36).slice(2, 18);
    counter.otherSideSrc = param.otherSideSrc;
    counter.name = param.name
}

function addMoveProps(counter) {
    counter.movingStatus = undefined
    counter.onTheRoad = false
}

function addSquadMoveProps(counter,param) {

    counter.movementFactor = param.movementFactor
    counter.temporaryMF = param.movementFactor
    counter.costToEnterHash = {
        'plain': 1,
        'road' : 1
    }
}

function addFireProps(counter,param) {

    if(!param.normalRange || !param.firePower) {
        throw console.error();
        
    }
    counter.firingStatus = undefined
    counter.firePower = param.firePower
    counter.temporaryFirePower = param.firePower

    counter.normalRange = param.normalRange

}

function addManInterface(counter){
    counter.currentInterfaceElements = {
        'firstPlayerRallyPhase': { 'Rally': false },
    }
}

function addWeaponProps(counter,param) {
    counter.attachedTo = param.owner|| undefined
    counter.rateOfFire = param.rateOfFire
    counter.breakdownNumber = param.breakdownNumber
}

function addWeaponInterface(counter) {
    counter.currentInterfaceElements = {
        'firstPlayerRallyPhase': { 'Attach': true },
    }
}

function addCommandableProps(counter){
    counter.underCommand = false
}

function addCommanderProps(counter,param){
    counter.commandBonus = counter.basicCommandBonus = param.commandBonus
    counter.morale = param.morale
    
}

function addSquadProps(counter,param){
    if(!param.experience) {
        throw console.error();
        
    }

    counter.experience = param.experience
    counter.size = param.size || 'squad'
    counter.morale = param.morale
}
let Fireable = {
    setFiringStatus(status) {
        this.firingStatus = status
    },

    fire(){
        console.log('fire')
    },

    getNormalRange(){
        return this.normalRange
    }

}

let Movable = {
    getCostToEnter(type) {
// ------------------------------------------------------- 20 04 2020 ------------------------------------------
        if (this.movingStatus == 'assaulting') {
            if (this.costToEnterHash[type] > this.temporaryMF) {
                return this.costToEnterHash[type]
            }
            return this.temporaryMF
        }
// -------------------------------------------------------
        return this.costToEnterHash[type]
    },
    getMovingStatus() {
        return this.movingStatus
    },
    setMovingStatus(status) {

        if (!this.getMovingStatus) throw 'there is no possibility to set Moving status here'

        let arr = ['moving', 'moved', 'brokenStackRemnant','assaulting']

        if (arr.indexOf(status) != -1) {
            this.movingStatus = status
        } else {
            throw `there is no sucj status as ${status} in possible to set for counter`
        }
    },
}

let SquadMovable = {

    getMFLeft() {
        return this.temporaryMF
    },

    subtractMF(mf) {
        console.log(mf)
        this.temporaryMF = this.temporaryMF - mf
    },

    getRoadBonus() {
        this.temporaryMF += 1
    },

    setOnTheRoad(bool){
        this.onTheRoad = bool
    }
}

const Commandable = {

    getUnderCommand() {
        this.underCommand = true
    },

    getCommanderBonus() {   // getCommanderBonus
        this.temporaryMF += 1
    },

    removeCommanderBonus() {
        this.temporaryMF -= 1
    },

    isUnderCommand() {
        return this.underCommand
    },

    setReductedState(){
        let reductedProps = this.halfSquad
        Object.assign(this,reductedProps)
    }
}

const Attachable = {
    attachTo(counter) {
        console.log('attaching')
    }
}

const Woundable = {
    setWoundedState(){
        this.movementFactor -=1
        this.morale -=1
        this.commandBonus +=1
    }
}

let BasicCounterMethods = {

    getImageID() {
        return this.imageID
    },
    getScheme(phase) {
        return this.currentInterfaceElements[phase]
    },
    setHexPosition(hex) {
        this.ownHex = hex
    },
    setNewStatus(status) {
        this.newStatus = status
    },
    getStatus() {
        return this.status
    },
    setWeightHex(num) {
        this.weightHex = num
    },
    getWeightHex() {
        return this.weightHex
    },
    getID() {
        return this.ID
    },
    getType() {
        return this.type
    },
}


//const basicCounter = Object.create(BasicCounterMethods)

export function createCounter(param) {
    const counter = {}
    switch (param.type) {
        case 'MultiManCounter':

            //const counter = {}.addBasicProps
            
            addBasicProps(counter,param)
            addMoveProps(counter)
            addSquadMoveProps(counter,param)
            addFireProps(counter,param)
            addManInterface(counter)
            addCommandableProps(counter)
            addSquadProps(counter,param)

            Object.assign(counter,BasicCounterMethods,Movable,Fireable,SquadMovable,Commandable)

            return counter

        case 'SingleManCounter':

            //const counter = Object.assign({}, )

            addBasicProps(counter,param)
            addCommanderProps(counter,param)
            addMoveProps(counter)
            addSquadMoveProps(counter,param)
            //addFireProps(counter,param)
            addManInterface(counter)

            Object.assign(counter,BasicCounterMethods,Movable,Fireable,SquadMovable)

            return counter

        case 'MashineGun':

            addBasicProps(counter,param)
            addFireProps(counter,param)
            addWeaponProps(counter,param)
            addWeaponInterface(counter)

            Object.assign(counter,BasicCounterMethods,Fireable,Attachable)

            return counter

    }

}