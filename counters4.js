// let BasicCounter = {
//     init(param){
//         console.log('initiating',param)
//     },
//     methodA(){
//         console.log('methodA')
//     }
// }

// let SquadMovable = {
//     methodB(){
//         console.log(this.mf)
//     }
// }

// let ManCounter = {
//     init(param){
//         this.init(param)
//         console.log('as ManCounter')
//         this.mf = param.mf
//     }
// }

// Object.setPrototypeOf(ManCounter,BasicCounter)
// Object.assign(ManCounter,SquadMovable)

// let p = {
//     mf:4
// }
// let counter = Object.create(ManCounter).init(p)
// counter.methodA()
// counter.methodB()

let BasicCounter = {
    init(param) {

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

    },

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
        this.status = status
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

let Movable = {

    getCostToEnter(type) {
        return this.costToEnterHash[type]
    },

    getMovingStatus() {
        return this.movingStatus
    },

    setMovingStatus(status) {

        if (!this.getMovingStatus) throw 'there is no possibility to set Moving status here'

        let arr = ['moving', 'moved', 'brokenStackRemnant']

        if (arr.indexOf(status) != -1) {
            this.movingStatus = status
        } else {
            throw `there is no sucj status as ${status} in possible to set for counter`
        }
    },
}

let Attachable = {
    attachTo(counter) {
        this.attachedTo = counter
    }
}

let SquadMovable = {

    getMFLeft() {
        return this.temporaryMF
    },

    subtractMF(mf) {
        this.temporaryMF = this.temporaryMF - mf
    }
}

let Commandable = {
    getReadyToMoveUnderSMCcommand() {
        this.temporaryMF += 1
    }
}

// const ArmamentFire = {

//     fire(){

//     }
// }

// const MachineGunFire= {

//     fire(){

//     }
// }

// const SquadFire = {
//     fire(){

//     }

//      assaultFire(){

//      }
// }

let ManCounter = {
    setup(param) {
        this.init(param)
        this.movingStatus = undefined
        this.movementFactor = param.movementFactor
        this.temporaryMF = param.movementFactor
        this.costToEnterHash = {
            'plain': 1
        }
        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Rally': false },
        }
    }
}

Object.setPrototypeOf(ManCounter, BasicCounter)
Object.assign(ManCounter, Movable, SquadMovable)


let Weapon = {
    setup(param) {
        this.init(param)
        this.attachedTo = undefined
        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Attach': true },
        }
    }
}

Object.setPrototypeOf(Weapon, BasicCounter)
Object.assign(Weapon, Attachable)

let MultiManCounter = Object.assign({}, ManCounter, Commandable)

let SingleManCounter = Object.assign({}, ManCounter)

let MachineGun = Object.assign({}, Weapon, Attachable)




let counterFactory = function (param) {
    let typeCounter = param.type
    let counter = {}
    switch (typeCounter) {
        case 'MultiManCounter':

            Object.assign(counter, MultiManCounter)

            counter.setup(param)
            return counter
        //break
        case 'SingleManCounter':

            Object.assign(counter, SingleManCounter)
            counter.setup(param)
            return counter

        case 'LMG':

            Object.assign(counter, MachineGun)
            counter.setup(param)
            return counter

    }

}

//
// let counter
// let propsForMovable =  {
//     this. =
// }

// Object.assign(counter,propsForMovable)

// init(config){

// }

const allProperties = {
    addCommon(state, name) {
        state.name = name;
        state.health = 100;
    },
    addMagic(state) {
        state.mana = 100;
    },
    addFight(state, name) {
        state.stamina = 100;
    }
};

const allMethods = {
    cast(spell) {
        console.log(`${this.name} casts ${spell}!`);
        this.mana--;
    },
    fight(spell) {
        console.log(`${this.name} slashes at the foe!`);
        this.stamina--;
    },
};

function Mage2(name) {
    allProperties.addCommon(this, name);
    allProperties.addMagic(this);
}
Mage2.prototype.cast = allMethods.cast;

function Fighter2(name) {
    allProperties.addCommon(this, name);
    allProperties.addFight(this);
}
Fighter2.prototype.fight = allMethods.fight;



//   let props =  {
//       A,
//       B,
//   }

//   setup(config) {
//       init(config)
//       for let i in props {props[i] = config[i]}
//   }

//----------------------------------------------------------------------------------------------------
// const addBasicProps
// const addMoveProps= function(config)  {
//     this.prop = config.prop
// }

//   setup(config) {
//       init(config)
//       this.addMoveProps(config)
//   }
//----------------------------------------------------------------------------------------------------

// const addBasicProps

const addMoveProps = function (config, counter) {
    counter.prop = config.prop
}

const MultiManCounterPrototype = Object.assign({}, Movable, SquadMovable, Commandable)

let newCounter = {}

addBasicProps(config, newCounter)
addMoveProps(config, newCounter)
addSquadMoveProps(config, newCounter)

Object.setPrototypeOf(newCounter, MultiManCounterPrototype)


const vehicleFactory = function (config) {

    const MoveBehaivor = {
        move() {
            console.log('move')
        }
    }

    const TankMoveBehaivor = {
        move() {
            console.log('move')
            console.log('as tank')
        }
    }

    switch (config.type) {
        case 'car':

            const car = Object.assign({}, MoveBehaivor)

            return car

        case 'tank':

            const vehicle = Object.assign({}, TankMoveBehaivor)

            return vehicle
    }

}

let newCar = vehicleFactory()

const MoveBehaivor = {
    move() {
        console.log('move')
    },
    turnToTheLeft() {
    },
    turnToTheRight() {
    },
    // и так далее
}

const TankMoveBehaivor = {
    move() {
        MoveBehaivor.move()                  // здесь вызываем  общую часть
        console.log('as tank')	// отличие от метода для автомобилей
    }
}

