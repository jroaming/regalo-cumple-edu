// si anadimos mas imagenes al proyecto, debemos agregarlas a esta constante para ser leidas
const IMG_LIST = [
    "char_ruben_idle.png",
    "char_ruben_walk.png",
    "char_ruben_attack.png",
    "char_ruben_special.png",
    "char_edu_idle.png",
    "char_edu_walk.png",
    "char_edu_attack.png",
    "char_edu_special.png",
    "char_corbi_idle.png",
    "char_corbi_walk.png",
    "char_corbi_attack.png",
    "char_corbi_special.png",
    "char_gabi_idle.png",
    "char_gabi_walk.png",
    "char_gabi_attack.png",
    "char_gabi_special.png",
    "char_mariam_idle.png",
    "char_mariam_walk.png",
    "char_mariam_attack.png",
    "char_mariam_special.png",
    "char_anna_idle.png",
    "char_anna_walk.png",
    "char_anna_attack.png",
    "char_anna_special.png",
    "char_mario_idle.png",
    "char_mario_walk.png",
    "char_mario_attack.png",
    "char_mario_special.png",
    "char_carlos_idle.png",
    "char_carlos_walk.png",
    "char_carlos_attack.png",
    "char_carlos_special.png"
];

const STANCES = {
    idle: 0,
    walk: 1,
    attack: 2,
    special: 3
};

class ImageLoader {

    constructor() {
        // imagenes distribuidas por personaje
        this.rubenImages = [];
        this.eduImages = [];
        this.corbiImages = [];
        this.gabiImages = [];
        this.mariamImages = [];
        this.annaImages = [];
        this.marioImages = [];
        this.carlosImages = [];
        this.backgroundImage;
    }

    init() {
        // load background image
        this.backgroundImage = loadImage('img/bckg.png');

        // (0) por cada imagen del array:
        for (var iImg = 0; iImg < IMG_LIST.length; iImg++) {
            let url = 'img/' + IMG_LIST[iImg];

            // (1) generar imagen y guardar el tipo (stance) antes de leerla
            //      index 0 => idle / index 1 => walk / index 2 => attack / index 3 => special 
            var currentImageStance = 0
            if ( IMG_LIST[iImg].includes('idle')) currentImageStance = STANCES.idle;
            else if (IMG_LIST[iImg].includes('walk')) currentImageStance = STANCES.walk;
            else if (IMG_LIST[iImg].includes('attack')) currentImageStance = STANCES.attack;
            else if (IMG_LIST[iImg].includes('special')) currentImageStance = STANCES.special;
            
            // (2) leemos la imagen del archivo local y la añadimos al array que toque, según el personaje
            var imgData = loadImage(url);

            var insertIntoCharacter;
            if (IMG_LIST[iImg].includes('char_ruben')) insertIntoCharacter = this.rubenImages;
            else if (IMG_LIST[iImg].includes('char_edu')) insertIntoCharacter = this.eduImages;
            else if (IMG_LIST[iImg].includes('char_corbi')) insertIntoCharacter = this.corbiImages;
            else if (IMG_LIST[iImg].includes('char_gabi')) insertIntoCharacter = this.gabiImages;
            else if (IMG_LIST[iImg].includes('char_mariam')) insertIntoCharacter = this.mariamImages;
            else if (IMG_LIST[iImg].includes('char_anna')) insertIntoCharacter = this.annaImages;
            else if (IMG_LIST[iImg].includes('char_mario')) insertIntoCharacter = this.marioImages;
            else if (IMG_LIST[iImg].includes('char_carlos')) insertIntoCharacter = this.carlosImages;

            insertIntoCharacter.push(
                {
                    stance: currentImageStance, // tipo de imagen
                    data: imgData, // aun no podemos acceder a la imagen
                    path: url,
                    height: 0,
                    width: 0
                }
            );
        }
    }

}