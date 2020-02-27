import { hexFunctions } from './hexFunctions.js'

class Map {
    constructor() {

        this.flat =this.Layout(this.layout_flat(), this.Point(37.5, 37.5), this.Point(-1, 30));//(-112,-33)); // refactor . We should get orient,size and orig from consttructor
        this.hexOwnerAndNumberOfCountersHash = {}
    }

    getPolyCorners(hex) {
        return this.polygon_corners(this.flat, { q: hex.q, r: hex.r, s: hex.s })    // refactor (this.flat, hex)
    }
    getCenterCoordsObjFromHex(hex) {
        return this.hex_to_pixel(this.flat,hex)
    }
    getHexFromCoords(coords){

        if (!coords.x||!coords.y) throw 'coords should be an object with properties x and y'
        return this.hex_round(this.pixel_to_hex(this.flat,coords))
    }

    // ------------ 27 02 2020-----------------------------------------------------

    addCounterToHex(hex,owner) {
        let h = JSON.stringify(hex)
        if (this.hexOwnerAndNumberOfCountersHash[h]) {
            console.log('somebody here', h)
            let previousOwner = this.hexOwnerAndNumberOfCountersHash[h].owner
            if (owner == previousOwner){
                this.hexOwnerAndNumberOfCountersHash[h].numberOfCounters +=1
                return
            }
            this.hexOwnerAndNumberOfCountersHash[h].numberOfCounters +=1
            this.hexOwnerAndNumberOfCountersHash[h].owner = 'disputed'
        }
        this.hexOwnerAndNumberOfCountersHash[h] = {owner: owner,numberOfCounters:1}
    }


    getHexType(hex){
        return 'plain'
    }

    _checkIfHexIsOccupied(hex){
        return false
    }

    _calculateFreeCoords(hex){
        let h = JSON.stringify(hex)
        let o = this.hexOwnerAndNumberOfCountersHash[h]

        let k = o.numberOfCounters

        let center = this.getCenterCoordsObjFromHex(hex)

        return {x:center.x+5*k,y:center.x+5*k}
    }

}

Object.assign(Map.prototype, hexFunctions)
export { Map }