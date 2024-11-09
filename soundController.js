const globalVolume = 0.1;

class SoundController {

    constructor() {
        this.isEnabled = false;

        this.music;
        this.musicSilenced;
    }

    init() {
        this.music = loadSound('sfx/backgroundMusic.mp3');
        this.hitSFX = loadSound('sfx/hit.wav');
        this.specialSFX = loadSound('sfx/special.wav');
        this.music.setVolume(globalVolume);
    }
    
    enableAudio() {
        this.enable = true;
    }

    toggleMusic() {
        if (this.music == null || !this.enable) return

        if (!this.musicSilenced) { // .isPlaying() returns a boolean
            this.music.setVolume(0);
            this.musicSilenced = true;
            
        } else {
            this.music.setVolume(globalVolume);
            this.musicSilenced = false;
        }
    }

    playHitSFX() { this.hitSFX.play(); }

    playSpecialSFX() { this.specialSFX.play(); }

    checkBackgroundMusic() {
        if (this.music == null || !this.enable) return

        if (this.music.isPlaying()) { // .isPlaying() returns a boolean
            return
        } else {
            this.music.play();
        }
    }
}