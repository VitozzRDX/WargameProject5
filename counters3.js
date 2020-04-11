let basicCounter = {
    init(param){

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
    getWeightHex(){
        return this.weightHex
    },

    getID () {
        return this.ID
    },
    getType() {
        return this.constructor.name
    },
}


let SingleManCounter = Object.create(basicCounter)

SingleManCounter.init = function (param) {
    this.init(param)
    this.movingFactor = param.movingFactor
}

let SingleManCounterMethods = {
    init(param) {
        this.init(param)
        this.movingFactor = param.movingFactor
    },

    command() {
        console.log('GO!')
    }
}

Object.assign(SingleManCounter,SingleManCounterMethods)

// в принципе я добился некоторого

// используем более красивый синтаксис объектного литерала
// с краткими методами!
var AuthController = {
	errors: [],
	checkAuth() {
		// ...
	},
	server(url,data) {
		// ...
	}
	// ...
};

// ТЕПЕРЬ, свяжем `AuthController` через делегирование с `LoginController`
Object.setPrototypeOf( AuthController, LoginController );


class BasicGamePiece {
    constructor(param) {
        this.size = param.size  
    }
    fire(){
        console.log('fire')
    }
}

// first and second children . Got different methods move() and attachTo() plus different properties 
class MovingWeaponPiece extends BasicGamePiece {
    constructor(param) {
        super(param)
        this.movementPoints = param.movementPoints
    }
    move(){
        this.movementPoints -= 1
    }
}

class StaticWeaponPiece extends BasicGamePiece {
    constructor(param) {
        super(param)
        this.owner = param.owner
    }
    attachTo(owner){
        this.owner = owner
    }
}

// now children of MovingWeaponPiece

class Squad extends MovingWeaponPiece {
    constructor(param) {
        super(param)
        
    }
    getUnderCommand(){
        console.log('ready to action')
    }
    fire(){                         // shadowing
        super.fire()
        console.log('as squad')
    }
}

class Vehicle extends MovingWeaponPiece {
    constructor(param) {
        super(param)
    }
    ignition(){
        console.log('at the start!')
    }
}
// and the third step of inheritance :

class Tank extends Vehicle {
    constructor(param) {
        super(param)
        this.orientation = param.orientation
    }
    rotateArmament(where){
        this.orientation = where
    }
}
