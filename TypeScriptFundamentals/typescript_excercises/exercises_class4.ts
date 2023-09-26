// exercise1
function greet(name: string) {
    return `Hello, ${name}`;
}

console.log(greet('Satan'));

// exercise 2
function multiply(num1: number, num2: number) {
    return num1 * num2;
}

console.log(multiply(4,4));

// exercise 3
let person: {
    name: string;
    age: number;
    gender: string;
};

person = {
    name: "Sam",
    age: 33,
    gender: "Female"
};

// exercise 4
let car: {
    make: string;
    model: string;
    year: number;
};

car = {
    make: "Aptera",
    model: "forgot",
    year: 2022,
}
console.log(car.make, car.model, car.year)