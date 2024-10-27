/**
 *  Cada uno de los personajes del juego, es decir, aquellos elementos que tienen “vida”.
 *  @extends Entity
 */
class Character extends Entity {
    /**
     * Inicializa un personaje
     * @param game {Game} La instancia del juego al que pertenece el personaje
     * @param width {Number} Ancho del personaje
     * @param height {Number} Alto del personaje
     * @param x {Number} Posición horizontal del personaje
     * @param y {Number} Posición vertical del personaje
     * @param speed {Number} Velocidad del personaje
     * @param myImage {String} Ruta de la imagen del personaje
     * @param myImageDead {String} Ruta de la imagen del personaje cuando muere
     */

    constructor(game, width, height, x, y, speed, myImage, myImageDead) {
        super(game, width, height, x, y, speed, myImage);
        this.dead = false;
        this.myImageDead = myImageDead;
    
        this.image = new Image();
        this.image.src = this.myImage;
    
        this.imageDead = new Image();
        this.imageDead.src = this.myImageDead;
    }
    
    render() {
        const ctx = this.game.context; // Asegúrate de que el contexto del canvas esté bien definido
        if (ctx) {
            const img = this.dead ? this.imageDead : this.image;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }
    
    
    /**
     * Mata a un personaje
     */

    collide() {
        this.dead = true;
    } 
}