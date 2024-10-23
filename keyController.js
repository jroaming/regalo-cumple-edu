/*
    nombre: keyController.js
    descripcion: clase encargada de controlar las acciones del teclado

    funciones:
        - gestionar las teclas pulsadas y actualizar los bools del player acorde
    
    goals:
        o movimiento del jugador (input)    [x]
        o controlar fov del jugador (input) [x]
        o fisheye effect del fov (input)   [x]
    
    estado:
        > terminado
*/


const KeyW = 87; // p1 jump
const KeyA = 65; // p1 left
const KeyS = 83; // p1 attack
const KeyD = 68; // p1 right
const KeyQ = 81; // p1 special


const KeyArrowUp = 38; // p2 jump
const KeyArrowDown = 40; // p2 left
const KeyArrowLeft = 37; // p2 attack
const KeyArrowRight = 39; // p2 right
const keyRightCtrl = 17; // p2 special

const KeyE = 69;
const KeyF = 70;
const KeySpace = 32;
const KeyShift = 16;

function checkInput() {
    if (gameIsOver) return;

    // P1 controls
    if (keyIsDown(KeyA))    { p1.dxTo(-1); }
    if (keyIsDown(KeyD))    { p1.dxTo(1); }
    if (keyIsDown(KeyQ))    { /* p1 jump */ }
    if (keyIsDown(KeyS))    { p1.attack(p2) }
    if (keyIsDown(KeyW))    { p1.special(p2) }
    
    // P2 controls
    if (keyIsDown(KeyArrowLeft))    { p2.dxTo(-1); }
    if (keyIsDown(KeyArrowRight))   { p2.dxTo(1); }
    if (keyIsDown(keyRightCtrl))    { /* p2 jump */ }
    if (keyIsDown(KeyArrowDown))    { p2.attack(p1) }
    if (keyIsDown(KeyArrowUp))      { p2.special(p1) }

}