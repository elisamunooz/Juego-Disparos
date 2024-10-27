class Boss extends Opponent {
    constructor(game) {
        super(game);
        this.speed *= 2;  // Duplicar la velocidad del oponente final
        this.myImage = 'assets/boss.png';  // Imagen del jefe
        this.myImageDead = 'assets/malo_muerto.png';  // Imagen del jefe cuando está muerto
        this.direction = "horizontal";  // Movimientos más complejos para el jefe
    }

    // Sobrescribir el método update() para agregar comportamiento único del jefe
    update() {
        // Movimientos específicos del jefe (p.ej. movimiento horizontal más rápido)
        this.x += this.speed;
        if (this.x + this.width > this.game.width || this.x < 0) {
            this.speed *= -1; // Cambiar dirección cuando choca con los bordes
        }
        
        // Llamar al método de actualización del oponente
        super.update();
    }

    // Método para manejar la muerte del jefe
    die() {
        this.dead = true;
        this.image.src = this.myImageDead;  // Cambiar la imagen al jefe muerto
        // Implementar cualquier lógica adicional cuando el jefe muere
    }
}