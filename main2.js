import { Client } from './client.js'


var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let Main = {};

Main.username = "V";
Main.opponentname = "S";

Main.client = new Client();

// --- let's initiate our Client with initial settings ------------------
// --- for example we can get from server different initialSettings of starting Phase ---
// --- in this case user will see different Phase on Rondel and will get different reaction

let initialSettings = {
    firstPlayer: 'Nazi',
    secondPlayer: 'Ally',
    startingPhase: 'firstPlayerRallyPhase',
    startingSidePictureSrc: 'assets/turnphaseaxis.gif',
    otherSidePictureSrc: 'assets/turnphaseallied.gif',

    mapSrc: 'assets/bdv.gif',

    countersOptions: {
        squadType_propertiesHash: {
            'ruSquadE-0': {
                src: 'assets/ru628S.gif',
                otherSideSrc: 'assets/ruh7b.gif',
                className: 'ManCounters',
            },

            'geSquadE-0': {
                src: 'assets/ge467S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'ManCounters',
            },
        },

        parametersOnCreationHash : {
            'ruSquadE-0':[{top:100,left:100}],
            'geSquadE-0':[{top:300,left:300},{top:350,left:350}]
        },

        

    }
}

Main.client.init(initialSettings)
//--------- -------------------------------------------------------------

document.getElementById('canvasContainer').tabIndex = 1000;

//-------------------------------------------------------------------------------------------------------------------------------
