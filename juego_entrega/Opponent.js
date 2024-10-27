/**
 * Monstruo al que tenemos que destruir
 */
class Opponent extends Character {
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    constructor(game) {        
        const height = OPPONENT_HEIGHT * game.width / 100,
            width = OPPONENT_WIDTH * game.width / 100,
            x = getRandomNumber(game.width - width / 2),
            y = 0,
            speed = OPPONENT_SPEED,
            myImage = OPPONENT_PICTURE,
            myImageDead = OPPONENT_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.image = new Image();
        this.image.src = myImage;
        this.imageDead = new Image();
        this.imageDead.src = myImageDead;
        this.game = game; // Almacena la referencia al juego
        this.direction = "R"; // Dirección hacia la que se mueve el oponente
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    /**     
     * Dibuja el oponente en el canvas
     */
    render() {
        const ctx = this.game.context;
        if (ctx) {
            const img = this.dead ? this.imageDead : this.image;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }    

    /**
     * Crea un nuevo disparo
     */
    shoot () {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
        }
    }

    /**
     * Actualiza los atributos de posición del oponente
     */
    update () {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Cambia de sentido
            }
        }
    }

    /**
     * Mata al oponente
     */
    collide(shot) {
        if (!this.dead) {
            this.myImage = "assets/malo_muerto.png"; // Esto ya no es necesario si pre-cargamos la imagen
            this.dead = true;
    
            // Incrementar la puntuación del juego y actualizar la pantalla
            this.game.score += 1;
            document.getElementById('score-display').innerText = `Puntos: ${this.game.score}`;
    
            // Eliminar al oponente después de 2 segundos
            setTimeout(() => {
                this.game.removeOpponent();
            }, 2000);
    
            // Llamar al método original para manejar la lógica base de colisión
            super.collide();
        }
    }    
}
