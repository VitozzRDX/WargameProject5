import {Client} from './client.js'


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

let initialSettings = {startingPhase:'firstPlayerRallyPhase'}

Main.client.init(initialSettings)
//--------- -------------------------------------------------------------

document.getElementById('canvasContainer').tabIndex = 1000;

//-------------------------------------------------------------------------------------------------------------------------------
