let rout = {

    routPhasePreparing() {   // routPhase Preparing  // routPhase(player) -after end for 1st pl case pl1 - 

        this.hex_KnownEnemyHexesArr_Hash = this.calcHex_KnownEnemyHexesArr_Hash(this.firstPlayerBrokenCountersArr, this.secondPlayerHeavyMashineGunsArray, this.secondPlayerLightMashineGunsArray)

        console.log('hex_KnownEnemyHexesArr_Hash :',this.hex_KnownEnemyHexesArr_Hash)
//----------------------------------------------------------------------------------------------------------------
        //this.doomedHexesArr  = this.calcDoomedHexes(this.hex_KnownEnemyHexesArr_Hash)
        //this.mustRoutHexesArr = this.calcAllMustRoutHexesArr(this.hex_KnownEnemyHexesArr_Hash,this.doomedHexesArr)

        //this.mustRoutCountersArr = this.calcAllMustRoutCountersArr(this.mustRoutHexesArr)
        //this.doomedCountersArr = this.calcDoomedCountersArr(this.doomedHexesArr)


        // this.mustRoutCountersArr.forEach((counter) => {
        //     this.canvasObj.getImageByID(counter.getImageID()).set({ //changeColorOfBorder
        //         stroke: 'red',
        //         strokeWidth: 3
        //     })
        // })

        // this.doomedCountersArr.forEach((counter) => {
        //     this.canvasObj.getImageByID(counter.getImageID()).set({ //changeColorOfBorder
        //         stroke: 'black',
        //         strokeWidth: 3
        //     })
        // })

        // build MUI for RoutPhase (ending Pase with destructrion all MR that was not moved)

        //this.canvasObj.canvas.renderAll()

//----------------------------------------------------------------------------------------------------------------

        this.mustRoutArr = this.calcAllMustRout(this.hex_KnownEnemyHexesArr_Hash,this.firstPlayer)

        // color them 
        this.mustRoutArr.forEach((counter) => {
            this.canvasObj.getImageByID(counter.getImageID()).set({ //changeColorOfBorder
                stroke: 'red',
                strokeWidth: 3
            })
        })
        // build MUI for RoutPhase (ending Pase with destructrion all MR that was not moved)

        // calc those that doomed

        

        this.canvasObj.canvas.renderAll()

    },

        // collectAllMustRout(player) {

    //     let brokenArr = (player == 'Nazi') ? this.firstPlayerBrokenCountersArr : this.secondPlayerBrokenCountersArr

    calcHex_KnownEnemyHexesArr_Hash(brokenHexesArr, HMGuniqueHexesArr, LMGuniqueHexesArr) {

        let res = {}

        brokenHexesArr.forEach((hex) => { // reduce

            if (this.isSafeHex(hex)) {
                return console.log(`hex ${hex} is in safe place and there is no nearest enemy`)
            }

            let uniqueHexesKnownEnemyArr = this.calcAllUniqueKEHexesArr(hex,this.secondPlayer,HMGuniqueHexesArr,LMGuniqueHexesArr,) 

            if (uniqueHexesKnownEnemyArr.length == 0) {
                return console.log(`hex ${hex} got no Known Enemy`)
            }

            console.log(`hex ${JSON.stringify(hex)} got known enemy : ${JSON.stringify(uniqueHexesKnownEnemyArr)}`)

            res[JSON.stringify(hex)] = uniqueHexesKnownEnemyArr
        })

        return res
    },

    calcHex_KnownEnemyHexesArr_Hash(brokenCountersArr, enemyHMGArray, enemyLMGArray) {

        let brokenHexesArr = this.collectUniqueElemsArray(brokenCountersArr.map(counter => counter.ownHex))
        let HMGuniqueHexesArr = this.collectUniqueElemsArray(enemyHMGArray.map(counter => counter.ownHex))
        let LMGuniqueHexesArr = this.collectUniqueElemsArray(enemyLMGArray.map(counter => counter.ownHex))

        let res = {}

        brokenHexesArr.forEach((hex) => { // reduce

            if (this.isSafeHex(hex)) {
                return console.log(`hex ${hex} is in safe place and there is no nearest enemy`)
            }

            let uniqueHexesKnownEnemyArr = this.calcAllUniqueKEHexesArr(hex,this.secondPlayer,HMGuniqueHexesArr,LMGuniqueHexesArr,) 

            if (uniqueHexesKnownEnemyArr.length == 0) {
                return console.log(`hex ${hex} got no Known Enemy`)
            }

            console.log(`hex ${JSON.stringify(hex)} got known enemy : ${JSON.stringify(uniqueHexesKnownEnemyArr)}`)

            res[JSON.stringify(hex)] = uniqueHexesKnownEnemyArr
        })

        return res
    },

    calcKnownEnemyHexesInMaxPossibleDistance(hex, enemy) {

        // ---------- let us take all hexes around us on maximum possible for MMC distance
        let allHexesInMaxPossibleNormalRangeArr = this.map.calcHexesInRange(hex, 7)    

        // ---------- then search for Enemy presence in those hexes
        let allHexesWithEnemyInMaxPossibleNormalRangeArr = this.filterHexesForEnemyPresence(allHexesInMaxPossibleNormalRangeArr, enemy)


        //----------- is there any Enemy around us on maximum possible distance ?
        if (allHexesWithEnemyInMaxPossibleNormalRangeArr.length == 0) {
            console.log(`hex ${JSON.stringify(hex)} got no Enemy in Max Normal Range`)
            return []
        }

        // -------- let us take all hexes where enemy counters that has normal range on us
        let hexesWithCountersInItsNormalRangeOfHexArr = this.calcAllHexesWithCountersInItsNormalRangeOfHex(allHexesWithEnemyInMaxPossibleNormalRangeArr, hex)


        // -------- then return those which got LoS
        return this.map.filterHexesForLoSOnHex(hexesWithCountersInItsNormalRangeOfHexArr, hex)

    },

    calcAllHexesWithCountersInItsNormalRangeOfHex(hexesArr, hex) {

        hexesArr = hexesArr.filter((enemyHex) => {

            let countersArr = this.map.getCountersIDinHexArray(enemyHex).map(id => this.getCounterByItsID(id))

            return countersArr.some((counter) => {

                return this.map.hex_distance(counter.ownHex, hex) < counter.normalRange
            })

        })

        return hexesArr
    },

    calcKnownEnemyMGHexes(hex, weaponsArr, distance) {

        let arr = []

        weaponsArr.forEach((mgHex) => {

            if (this.map.hex_distance(hex, mgHex) > distance) {
                return //console.log(`hex ${JSON.stringify(mgHex)} is too far away from ${JSON.stringify(hex)}`)
            }

            if (!this.map.isLoS(mgHex, hex)) {
                return console.log(`hex ${JSON.stringify(mgHex)} got no LoS with  ${hex}`)
            }

            arr.push(mgHex)
        })

        return (arr)
    },

    calcAllUniqueKEHexesArr(hex,enemy,HMGuniqueHexesArr,LMGuniqueHexesArr) {

        let knownEnemyWeaponHexesArr = this.calcKnownEnemyMGHexes(hex, LMGuniqueHexesArr, 6).concat(this.calcKnownEnemyMGHexes(hex, HMGuniqueHexesArr, 16))

        let allHexesKnownEnemyArr = knownEnemyWeaponHexesArr.concat(this.calcKnownEnemyHexesInMaxPossibleDistance(hex,enemy))

        return this.collectUniqueElemsArray(allHexesKnownEnemyArr)
    },

    calcAllMustRout(hex_KnownEnemyHexesArr_Hash,player){

        let hexessArr = Object.keys(hex_KnownEnemyHexesArr_Hash)
        let res = []
        hexessArr.forEach((hex)=>{

            res.push(this.map.getCountersIDinHexArray(JSON.parse(hex)).map(id => this.getCounterByItsID(id)))
        })
        return [].concat(...res)
    },


    calcDoomedHexes(hex_KnownEnemyHexesArr_Hash) {

        return Object.keys(hex_KnownEnemyHexesArr_Hash).filter((hex)=>{

            let knownEnemyHexesArr = hex_KnownEnemyHexesArr_Hash[hex]
            let radius = 4

            //let arrayOfIntersectingHexes = this.calcIntersectingRanges(hex,radius,knownEnemyHexesArr)
            //let legalMoveHexesArr = this.calcDifferenceBetweenRanges(hex,arrayOfIntersectingHexes)

            let arr = []
            for (let hexWithKE of knownEnemyHexesArr ) {

                let intersectionHexesArr = this.calcIntersectingRanges(hex,radius,hexWithKE)
                arr.concat(...intersectionHexesArr)
            }

            let legalMoveHexesArr = this.calcDifferenceBetweenRanges(hex,arr)

            return legalMoveHexesArr.length>0
        })

    },

    calcIntersectingRanges(hex,radius,hexWithKE){

        let radius2 = this.map.getHexesBetween(hexWithKE, hex).length 

        let qmin = Math.max(hex.q - radius, hexWithKE.x - radius2)
        let qmax = Math.min(hex.q + radius, hexWithKE.x + radius2)

        let res = []
        
        let q = qmin
        while (q<=qmax) {


        }

        
        return 
    },

    // calcAllIntersectingRanges(intersectingRangesArrays) {
    //     intersectingRangesArrays.reduce((arr)=>{

    //     })
    // }

    higlightSafeplaces(hex) {
        console.log(hex)
    }
}

export { rout };