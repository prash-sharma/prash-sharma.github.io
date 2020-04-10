class Car {
    constructor(brand, modal, color) {
        this.brand = brand;
        this.modal = modal;
        this.color = color;
    }

    statement() {
        return `You have ${this.color} ${this.brand} ${this.modal}.`;
    }
}

const car1 = new Car('Kia', 'SOrento', 'Ha ha')
// car1.brand = 'Kia';
// car1.modal = 'Sorento';
// car1.color = 'gray';
console.log(car1.statement());

