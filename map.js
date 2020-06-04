import { hexFunctions } from './hexFunctions.js'

class Map {
    constructor() {

        this.flat =this.Layout(this.layout_flat(), this.Point(37.5, 37.5), this.Point(-1, 30));//(-112,-33)); // refactor . We should get orient,size and orig from consttructor
        this.hexOwnerAndNumberOfCountersHash = {}

        this.hex_counterIDHash = {}
        this.hex_ownerHash = {}
        this.hex_lastCounterCoordinates = {}

        this.hex_hexTypeHash = {
            '{"q":8,"r":5,"s":-13}':'road',
            '{"q":9,"r":4,"s":-13}':'road',
            '{"q":10,"r":3,"s":-13}':'road',
            '{"q":11,"r":2,"s":-13}':'road',
            '{"q":12,"r":1,"s":-13}':'road',
            '{"q":13,"r":1,"s":-14}':'road',
            '{"q":14,"r":1,"s":-15}':'road',
            '{"q":15,"r":1,"s":-16}':'road',
            '{"q":16,"r":1,"s":-17}':'road',
            '{"q":16,"r":0,"s":-16}':'road',
            '{"q":16,"r":-1,"s":-15}':'road',
            '{"q":16,"r":-2,"s":-14}':'road',
            '{"q":17,"r":-3,"s":-14}':'road',
            '{"q":18,"r":-4,"s":-14}':'road',
            '{"q":19,"r":-5,"s":-14}':'road',
            '{"q":20,"r":-6,"s":-14}':'road',
            '{"q":21,"r":-7,"s":-14}':'road',
            '{"q":22,"r":-8,"s":-14}':'road',
            '{"q":23,"r":-9,"s":-14}':'road',
            '{"q":24,"r":-9,"s":-15}':'road',
            '{"q":25,"r":-9,"s":-16}':'road',
            '{"q":26,"r":-9,"s":-17}':'road',
            '{"q":27,"r":-9,"s":-18}':'road',
            '{"q":28,"r":-9,"s":-19}':'road',
            '{"q":29,"r":-10,"s":-19}':'road',
            '{"q":30,"r":-11,"s":-19}':'road',
            '{"q":24,"r":-10,"s":-14}':'road',
            '{"q":24,"r":-11,"s":-13}':'road',
            '{"q":24,"r":-12,"s":-12}':'road',
        }
    }


    getPolyCorners(hex) {
        return this.polygon_corners(this.flat, { q: hex.q, r: hex.r, s: hex.s })    // refactor (this.flat, hex)
    }
    getCenterCoordsObjFromHex(hex) {
        return this.hex_to_pixel(this.flat,hex)
    }
    getHexFromCoords(coords){
        console.log(coords)
        if (!coords.x||!coords.y) throw 'coords should be an object with properties x and y'
        return this.hex_round(this.pixel_to_hex(this.flat,coords))
    }

    getOwnerOfHex(hex){
        //console.log(this.hex_ownerHash)
        let h = JSON.stringify(hex)
        return this.hex_ownerHash[h]

    }

    setOwnerOfHex(hex,owner){
        let h = JSON.stringify(hex)
        this.hex_ownerHash[h]= owner // owner can be 'disputed'
    }

    getHexType(hex){
        let h = JSON.stringify(hex)
        return this.hex_hexTypeHash[h]||'plain'
    }

    _checkIfHexIsOccupied(hex){
        return false
    }

    addHexTohex_counterIDHash(hex){
        let h = JSON.stringify(hex)
        if(this.hex_counterIDHash[h]) {
            return console.log('this hex is already in hex_counterIDHash')
        }
        this.hex_counterIDHash[h] = []
    }

    fillhex_counterIDHash(hex,counterID){
        let h = JSON.stringify(hex)
        this.hex_counterIDHash[h].push(counterID)
    }

    getCountersIDinHexArray(hex){
        let h = JSON.stringify(hex)
        return this.hex_counterIDHash[h]
    }

    removeIDFromHex_counterIDHash(hex,ID){
        console.log('removeIDFromHex_counterIDHash')
        let h = JSON.stringify(hex)
        let ind = this.hex_counterIDHash[h].indexOf(ID)

        this.hex_counterIDHash[h].splice(ind,1)

    }

    _calculateFreeCoords(hex,size){
        let center = this.getCenterCoordsObjFromHex(hex)
        let arr = this.getCountersIDinHexArray(hex)||[]

        if (arr.length == 0 ) return {x:center.x,y:center.y}
        let num = arr.length
        

        return {x:center.x+num*size*0.25,y:center.y+num*size*0.25 }
    }
//--------------------------------------------------------------------------------------------------------
    isHexNear(originHex, hexClicked){

        if (Math.abs(hexClicked.q - originHex.q)>1){
            return false
        }

        if (Math.abs(hexClicked.r - originHex.r)>1){
            return false
        }

        if (Math.abs(hexClicked.s - originHex.s)>1){
            return false
        }
        
        return true
    }

    getHexesBetween(hexClicked,hexFired) {
        console.log(hexClicked,hexFired)
        return this.hex_linedraw(hexFired,hexClicked);
    }

    getHexHindrance(hex){
        let h = JSON.stringify(hex)
        let type = this.hex_hexTypeHash[h]

        switch (type) {

            case 'orchard':
                return  1


            case 'grain':

                return  1
        }
        return 0
    }


    
    getHexTEM(hex){
        
        let type = this.getHexType(hex)

        switch (type) {

            case 'woods':
                return  1


            case 'wooden building':

                return  2
            case 'stone building':

                return  3
            case 'woods-road' :
                // if los and unit entered with road bonus = 0
                // else = 1
                return 'woods-road'

        }
    }
    isLoS(hex, targetHex){
        return true
    }
}

Object.assign(Map.prototype, hexFunctions)
export { Map }