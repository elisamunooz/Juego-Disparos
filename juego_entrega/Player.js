/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */

const PLAYER_PICTURE = "assets/bueno.png"; // Imagen del jugador cuando está vivo
const PLAYER_PICTURE_DEAD = "assets/bueno_muerto.png"; // Imagen del jugador cuando está muerto

class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el jugador
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;
    
        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.lives = INITIAL_LIVES;
    
        this.image = new Image();
        this.image.src = myImage;
    
        this.imageDead = new Image();
        this.imageDead.src = myImageDead;
    }
    
    render() {
        const ctx = this.game.context;
        if (ctx) {
            const img = this.dead ? this.imageDead : this.image;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }
    
    
    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update () {
        if (!this.dead) {
            switch (this.game.keyPressed) {
            case KEY_LEFT:
                if (this.x > this.speed) {
                    this.x -= this.speed;
                }
                break;
            case KEY_RIGHT:
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                }
                break;
            case KEY_SHOOT:
                this.game.shoot(this);
                break;
            }
        }
    }

    /**
     * Mata al jugador
     */
    collide() {
        if (this.lives > 0) {
            this.lives--;
            this.dead = true;
    
            if (this.lives > 0) {
                setTimeout(() => {
                    this.dead = false;
                }, 2000);
            }
        } else {
            this.game.endGame();
        }
    
        document.getElementById('lives-display').innerHTML = `Vidas: ${this.lives}`;
    }
    
    
}