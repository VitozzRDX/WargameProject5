import { hexFunctions } from './hexFunctions.js'

class Map {
    constructor() {

        this.flat = this.Layout(this.layout_flat(), this.Point(37.5, 37.5), this.Point(-1, 30));//(-112,-33)); // refactor . We should get orient,size and orig from consttructor
        this.hexOwnerAndNumberOfCountersHash = {}

        this.hex_counterIDHash = {}
        this.hex_ownerHash = {}
        this.hex_lastCounterCoordinates = {}

        this.hex_KnownEnemyHexesHash = {}

        this.hex_hexTypeHash = {
            '{"q":8,"r":5,"s":-13}': 'road',
            '{"q":9,"r":4,"s":-13}': 'road',
            '{"q":10,"r":3,"s":-13}': 'road',
            '{"q":11,"r":2,"s":-13}': 'road',
            '{"q":12,"r":1,"s":-13}': 'road',
            '{"q":13,"r":1,"s":-14}': 'road',
            '{"q":14,"r":1,"s":-15}': 'road',
            '{"q":15,"r":1,"s":-16}': 'road',
            '{"q":16,"r":1,"s":-17}': 'road',
            '{"q":16,"r":0,"s":-16}': 'road',
            '{"q":16,"r":-1,"s":-15}': 'road',
            '{"q":16,"r":-2,"s":-14}': 'road',
            '{"q":17,"r":-3,"s":-14}': 'road',
            '{"q":18,"r":-4,"s":-14}': 'road',
            '{"q":19,"r":-5,"s":-14}': 'road',
            '{"q":20,"r":-6,"s":-14}': 'road',
            '{"q":21,"r":-7,"s":-14}': 'road',
            '{"q":22,"r":-8,"s":-14}': 'road',
            '{"q":23,"r":-9,"s":-14}': 'road',
            '{"q":24,"r":-9,"s":-15}': 'road',
            '{"q":25,"r":-9,"s":-16}': 'road',
            '{"q":26,"r":-9,"s":-17}': 'road',
            '{"q":27,"r":-9,"s":-18}': 'road',
            '{"q":28,"r":-9,"s":-19}': 'road',
            '{"q":29,"r":-10,"s":-19}': 'road',
            '{"q":30,"r":-11,"s":-19}': 'road',
            '{"q":24,"r":-10,"s":-14}': 'road',
            '{"q":24,"r":-11,"s":-13}': 'road',
            '{"q":24,"r":-12,"s":-12}': 'road',
            '{"q":12,"r":0,"s":-12}': 'road',//'wooden building',
        }

        this.hex_hexType_segmentsObjHash = {
            '{"q":8,"r":5,"s":-13}': { type: 'road', segments: [] },

            '{"q":10,"r":0,"s":-10}': {
                type: 'hill', segments: [

                    [{ x: 531.8801072684491, y: 343.7543075657528 }, { x: 557.1160219596728, y: 368.1549874790053 }],

                ]
            },

            '{"q":8,"r":0,"s":-8}': {
                type: 'hill', 
                segments: [
                    [{ x: 431.59146379623246, y: 318.0853485064011 }, { x: 466.8126916578007, y: 259.82219061166427 }]
                ]
            },

            '{"q":8,"r":3,"s":-11}':{
                type: 'hill', 
                segments: [
                    [{ x: 420.49940546967895, y: 497.46697388632873 }, { x: 476.43281807372176, y: 466.56221198156686 }]
                ]
            }

        }
    }


    getPolyCorners(hex) {
        return this.polygon_corners(this.flat, { q: hex.q, r: hex.r, s: hex.s })    // refactor (this.flat, hex)
    }
    getCenterCoordsObjFromHex(hex) {
        return this.hex_to_pixel(this.flat, hex)
    }
    getHexFromCoords(coords) {

        if (!coords.x || !coords.y) throw 'coords should be an object with properties x and y'
        return this.hex_round(this.pixel_to_hex(this.flat, coords))
    }

    getOwnerOfHex(hex) {

        if (typeof hex != 'string') {
            hex = JSON.stringify(hex)
        }
        return this.hex_ownerHash[hex]

    }

    setOwnerOfHex(hex, owner) {
        let h = JSON.stringify(hex)
        this.hex_ownerHash[h] = owner // owner can be 'disputed'
    }

    getHexType(hex) {
        if (typeof hex != 'string') {
            hex = JSON.stringify(hex)
        }
        
        return this.hex_hexTypeHash[hex] || 'plain'
    }

    _checkIfHexIsOccupied(hex) {
        return false
    }

    addHexTohex_counterIDHash(hex) {
        let h = JSON.stringify(hex)
        if (this.hex_counterIDHash[h]) {
            return //console.log('this hex is already in hex_counterIDHash')
        }
        this.hex_counterIDHash[h] = []
    }

    fillhex_counterIDHash(hex, counterID) {
        let h = JSON.stringify(hex)
        this.hex_counterIDHash[h].push(counterID)
    }

    getCountersIDinHexArray(hex) {

        
        let h = JSON.stringify(hex)
        return this.hex_counterIDHash[h]
    }

    removeIDFromHex_counterIDHash(hex, ID) {
        console.log('removeIDFromHex_counterIDHash')
        let h = JSON.stringify(hex)
        let ind = this.hex_counterIDHash[h].indexOf(ID)

        this.hex_counterIDHash[h].splice(ind, 1)

    }

    _calculateFreeCoords(hex, size) {
        let center = this.getCenterCoordsObjFromHex(hex)
        let arr = this.getCountersIDinHexArray(hex) || []

        if (arr.length == 0) return { x: center.x, y: center.y }
        let num = arr.length


        return { x: center.x + num * size * 0.25, y: center.y + num * size * 0.25 }
    }
    //--------------------------------------------------------------------------------------------------------
    isHexNear(originHex, hexClicked) {

        if (typeof originHex === 'string') {
            originHex = JSON.parse(originHex)
        }
        if (typeof hexClicked === 'string') {
            hexClicked = JSON.parse(hexClicked)
        }

        if (Math.abs(hexClicked.q - originHex.q) > 1) {
            return false
        }

        if (Math.abs(hexClicked.r - originHex.r) > 1) {
            return false
        }

        if (Math.abs(hexClicked.s - originHex.s) > 1) {
            return false
        }

        return true
    }

    getHexesBetween(hexClicked, hexFired) {


        if (typeof hexClicked == 'string') {
            hexClicked = JSON.parse(hexClicked)
        }
        if (typeof hexFired == 'string') {
            hexFired = JSON.parse(hexFired)
        }
        
        return this.hex_linedraw(hexFired, hexClicked);
    }

    getHexHindrance(hex) {
        let h = JSON.stringify(hex)
        let type = this.hex_hexTypeHash[h]

        switch (type) {

            case 'orchard':
                return 1


            case 'grain':

                return 1
        }
        return 0
    }



    getHexTEM(hex) {

        let type = this.getHexType(hex)
        console.log('type - ',type)
        switch (type) {

            case 'woods':
                return 1


            case 'wooden building':

                return 2
            case 'stone building':

                return 3
            case 'woods-road':
                // if los and unit entered with road bonus = 0
                // else = 1
                return 'woods-road'
            case 'plain' :
                return 0

        }
    }
    isLoS(hex, targetHex, callbackToDrawLines) {

        if (typeof hex == 'string') {
            hex = JSON.parse(hex)
        }
        if (typeof targetHex == 'string') {
            targetHex = JSON.parse(targetHex)
        }

        let result = true
        let pointA = this.getCenterCoordsObjFromHex(hex)
        let pointB = this.getCenterCoordsObjFromHex(targetHex)


        // draw line between 

        let segmentA = [pointA, pointB]

        if (callbackToDrawLines){
            callbackToDrawLines(segmentA)
        }else {
            callbackToDrawLines = () => {
                //console.log('can not draw line')
            }
        }
        

        

        let arrayOfHexesInLoS = this.getHexesBetween(hex, targetHex)


        for (let hex of arrayOfHexesInLoS) {

            let segmentsArray = this.getSegmentsFrom_Hex_SegmentsArrayHash(hex)

            result = segmentsArray.some((segment) => {

                if (this._isLineSegmentsCross(segment, segmentA)) {
                    callbackToDrawLines(segment)
                    return true
                }

            })

            if (result) {
                //console.log('line crossing !')
                return false
            }

            //console.log('no line cross in hex ', hex)
        }


        return true
    }

    _isLineSegmentsCross(segment, segmentA) {
        if (segment == 0) {
            return false
        }
        //console.log(this.doLineSegmentsIntersect(segment, segmentA))
        return this.doLineSegmentsIntersect(segment, segmentA).bool
    }

    getSegmentsFrom_Hex_SegmentsArrayHash(hex) {
     hex = JSON.stringify(hex)

        if (!this.hex_hexType_segmentsObjHash[hex] || !this.hex_hexType_segmentsObjHash[hex]['segments']) {
            //console.log('no segments here')
            return [0]
        }

        return this.hex_hexType_segmentsObjHash[hex]['segments']
    }

    doLineSegmentsIntersect(l1, l2) {  // l = [{x:num,y:num},{}]

        //console.log('inside doLineSegmentsIntersect(l1, l2) :', [l1, l2])

        function subtractPoints(point1, point2) {
            var result = {};
            result.x = point1.x - point2.x;
            result.y = point1.y - point2.y;

            return result;
        }
        function crossProduct(point1, point2) {
            return point1.x * point2.y - point1.y * point2.x;
        }
        function equalPoints(point1, point2) {
            return (point1.x == point2.x) && (point1.y == point2.y)
        }

        function allEqual(args) {
            var firstValue = arguments[0],
                i;
            for (i = 1; i < arguments.length; i += 1) {
                if (arguments[i] != firstValue) {
                    return false;
                }
            }
            return true;
        }

        var p = l1[0]

        var p2 = l1[1];

        var q = l2[0];
        var q2 = l2[1];
        var r = subtractPoints(p2, p);
        var s = subtractPoints(q2, q);

        var uNumerator = crossProduct(subtractPoints(q, p), r);
        var denominator = crossProduct(r, s);

        if (uNumerator == 0 && denominator == 0) {
            // They are coLlinear

            // Do they touch? (Are any of the points equal?)
            if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
                return true
            }
            // Do they overlap? (Are all the point differences in either direction the same sign)
            return !allEqual(
                (q.x - p.x < 0),
                (q.x - p2.x < 0),
                (q2.x - p.x < 0),
                (q2.x - p2.x < 0)) ||
                !allEqual(
                    (q.y - p.y < 0),
                    (q.y - p2.y < 0),
                    (q2.y - p.y < 0),
                    (q2.y - p2.y < 0));
        }

        if (denominator == 0) {
            console.log('lines are paralell')
            // lines are paralell
            return false;
        }

        var u = uNumerator / denominator;
        var t = crossProduct(subtractPoints(q, p), s) / denominator;
        //------------------------------------------------------------add-on-------------

        let x = p.x + t * (p2.x - p.x)
        let y = p.y + t * (p2.y - p.y)
        //---------------------------------------------------------------
        if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
            return { 'bool': true, 'obstaclePoint': [x, y] }
        }

        return { 'bool': false, 'obstaclePoint': null }
    }


    nearestHexesArr(hex) {

        if (typeof hex === 'string') {
            hex = JSON.parse(hex)
        }

        let hex_directions = [this.Hex(1, 0, -1), this.Hex(1, -1, 0), this.Hex(0, -1, 1), this.Hex(-1, 0, 1), this.Hex(-1, 1, 0), this.Hex(0, 1, -1)];
        let h
        let results = [];

        for (let i = 0; i < 6; i++) {

            h = this.hex_add(hex, hex_directions[i])
            results.push(h)
        }

        return results
    }



    hexesInRing(startingHexCoord, radius) {
        var results = [];
        var hex = this.hex_add(startingHexCoord, this.hex_scale(this.Hex(-1, 0, 1), radius));              // optimize it  - radius is always == 1
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < radius; j++) {
                results.push(hex);
                hex = this.hex_neighbor(hex, i)
            }
        }
        return results
    }


    hexOnDistance(startHex,dist){
        return this.hex_add(startHex, this.hex_scale(this.Hex(0, 1, -1), dist))
    }


    calcHexesOnRadius(startingHexCoord, radius) {
        let arr = []
        for (var j = 1; j <= radius; j++) {
            let  h = this.hexOnDistance(startingHexCoord, j)
            arr.push(h)
        }
        return arr
    }


    calcHexesInRange(startingHexCoord, radius) {
        let res = []
        let arr = this.calcHexesOnRadius(startingHexCoord, radius)
        radius = 1
        arr.forEach((hex)=>{
            res = res.concat(this.hexesInRing(hex, radius))
            radius +=1
            
        })

        return res
    }

    filterHexesForLoSOnHex(hexesArr, targetHex) {

        return hexesArr.filter(hex => this.isLoS(hex, targetHex))

    }


}

Object.assign(Map.prototype, hexFunctions)
export { Map }