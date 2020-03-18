import { hexFunctions } from './hexFunctions.js'

class Map {
    constructor() {

        this.flat =this.Layout(this.layout_flat(), this.Point(37.5, 37.5), this.Point(-1, 30));//(-112,-33)); // refactor . We should get orient,size and orig from consttructor
        this.hexOwnerAndNumberOfCountersHash = {}

        this.hex_counterIDHash = {}
        this.hex_ownerHash = {}
        this.hex_lastCounterCoordinates = {}
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

    getHex_HexOwnerAndNumberOfCountersHash(){
        return this.hexOwnerAndNumberOfCountersHash
    }
    getOwnerAndNumberOfCountersInHex(hex){
        let h = JSON.stringify(hex)
        let o = this.getHex_HexOwnerAndNumberOfCountersHash(h)
          return o[h]
    }
    getOwnerOfHex(hex){

        if (!this.getOwnerAndNumberOfCountersInHex(hex)) return undefined
        return this.getOwnerAndNumberOfCountersInHex(hex).owner
    }
    getNumberOfCountersInHex(hex){
        return this.getOwnerAndNumberOfCountersInHex(hex).numberOfCounters
    }

    // addCounterToHex(hex,owner) {

    //     let h = JSON.stringify(hex)
    //     if (this.hexOwnerAndNumberOfCountersHash[h]) {

    //         let previousOwner = this.hexOwnerAndNumberOfCountersHash[h].owner
    //         if (owner == previousOwner){
    //             this.hexOwnerAndNumberOfCountersHash[h].numberOfCounters +=1
    //             return
    //         }
    //         this.hexOwnerAndNumberOfCountersHash[h].numberOfCounters +=1
    //         this.hexOwnerAndNumberOfCountersHash[h].owner = 'disputed'
    //         // error ! need return here !
    //         return

    //     }
    //     // INitialization of hexOwnerAndNumberOfCountersHash :
    //     this.hexOwnerAndNumberOfCountersHash[h] = {owner: owner,numberOfCounters:1}
    // }

    getHexType(hex){
        return 'plain'
    }

    _checkIfHexIsOccupied(hex){
        return false
    }

    // _calculateFreeCoords(hex){
    //     let h = JSON.stringify(hex)
    //     let o = this.hexOwnerAndNumberOfCountersHash[h]

    //     let k = o.numberOfCounters-1
    //     //console.log(k)

    //     let center = this.getCenterCoordsObjFromHex(hex)

    //     //console.log (center)

    //     return {x:center.x+10*k,y:center.y+10*k}
    // }

    // _calculateFreeCoords(hex,size){
    //     let h = JSON.stringify(hex)
    //     let o = this.hexOwnerAndNumberOfCountersHash[h]

    //     let center = this.getCenterCoordsObjFromHex(hex)
    //     let k = o.numberOfCounters - 1

    //    if(k == 0) {
    //     return {x:center.x,y:center.y}
    //    }

    //    return {x:center.x+k*size*0.25,y:center.y+k*size*0.25 }
    // }

    // _calculateFreeCoords(hex,size){
    //     let h = JSON.stringify(hex)
    //     let o = this.hexOwnerAndNumberOfCountersHash[h]

    //     let center = this.getCenterCoordsObjFromHex(hex)
    //     let k = o.numberOfCounters - 1

    //    if(k == 0) {
    //     return {x:center.x,y:center.y}
    //    }

    //    return {x:center.x+k*size*0.25,y:center.y+k*size*0.25 }
    // }

    addHexTohex_counterIDHash(hex){
        let h = JSON.stringify(hex)
        if(this.hex_counterIDHash[h]) {
            console.log('this hex is already in hex_counterIDHash')
            return
        }
        this.hex_counterIDHash[h] = []
    }

    fillhex_counterIDHash(hex,counterID){
        let h = JSON.stringify(hex)

        // if (!this.hex_counterIDHash[h]){
        //     console.log('in this ')
        // }
        this.hex_counterIDHash[h].push(counterID)
    }
    getCountersIDinHexArray(hex){
        let h = JSON.stringify(hex)
        return this.hex_counterIDHash[h]
    }
    //------------------------------------------------------------------------------
    removeIDFromHex_counterIDHash(hex,ID){
        console.log('removeIDFromHex_counterIDHash')
        let h = JSON.stringify(hex)
        let ind = this.hex_counterIDHash[h].indexOf(ID)

        this.hex_counterIDHash[h].splice(ind,1)

    }

    // getHex_lastCounterCoordinates() {
    //     return this.hex_lastCounterCoordinates
    // }

    // getCoordinatesOfLastCounterInHex(hex){
    //     let h = JSON.stringify(hex)
    //     return this.hex_lastCounterCoordinates[h]
    // }

    // setCoordinatesOfLastCounter(coords,hex){
    //     this.hex_lastCounterCoordinates[hex] = coords
    // }

    _calculateFreeCoords(hex,size){
        let center = this.getCenterCoordsObjFromHex(hex)
        let arr = this.getCountersIDinHexArray(hex)||[]

        console.log(arr)
        if (arr.length == 0 ) return {x:center.x,y:center.y}
        let num = arr.length
        

        return {x:center.x+num*size*0.25,y:center.y+num*size*0.25 }
    }
}

Object.assign(Map.prototype, hexFunctions)
export { Map }