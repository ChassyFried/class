function Vehicle(color) {
    this.color = color;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`The vehicle is now going ${speed} miles per hour`);
};

Vehicle.prototype.print = function () {
    console.log(`This ${this.color} vehicle is now going ${this.speed} miles per hour`);
};

function Plane(color) {
    Vehicle.call(this, color);
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`The plane is now flying ${speed} miles per hour`);
};

let vehicle1 = new Vehicle("blue");
vehicle1.go(50);
vehicle1.print();

let plane1 = new Plane("white");
plane1.go(500);
plane1.print();
class NewVehicle {
    constructor(color) {
        this.color = color;
    }

    go(speed) {
        this.speed = speed;
        console.log(`The vehicle is going ${speed} miles per hour`);
    }

    print() {
        console.log(`The ${this.color} vehicle is going ${this.speed} miles per hour`);
    }
}

const vehicle2 = new NewVehicle("blue");

vehicle2.go(50);
vehicle2.print();


class NewPlane extends NewVehicle {
    constructor(color) {
        super(color);
    }

    go(speed) {
        this.speed = speed;
        console.log(`The plane is flying ${speed} miles per hour`);
    }
}

const plane2 = new NewPlane("orange");

plane2.go(500);
plane2.print();