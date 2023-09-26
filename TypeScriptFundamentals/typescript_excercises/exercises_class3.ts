// exercise 1
function helloWorld1(str: string) {
    console.log(str);
};
// exercise 2
let aName: string = 'Sarah'

//exercise 3
function mathFun(length:number, width:number) {
    return length * width;
};

// exercise 4
function oddOrEven(num: number){
    if (num%2 == 0) {
        return "even";
    } else {
        return "odd";
    };
};

// exercise 7
function funFactorial(num: number) {
    let factorial = num;
    for (let i=0; i< num; i++) {
        num -= 1;
        factorial *= num;
    };
    return factorial

}

//exercise 8
function leapyear(year: number) {
    if (year % 4 == 0) {
        console.log("It's a leap year");
    } else {
        console.log("Not a leap year!");
    };
};
// exercise 10

function fourBasicOps(num1: number, num2:number) {
    console.log(num1 * num2);
    console.log(num1 + num2);
    console.log(num1 - num2);
    console.log(num1 / num2);
}

// exercises 11

let string1: string = "Tomato";
let number1: number = 4;
let aBool: boolean = true;
let aNull: null = null;
let anUndefined: undefined;
let anObject: object = {
    objName: "name",
    objID: 56454,
};
let anArray: [] = [];

// exercise 12
let saleItem: {
    name: string;
    price: number;
};

let saleItems: {
    name: string;
    price: number;
}[];

saleItems = [
    {name: "pizza",
    price: 56,},
    {name: "hamburger",
    price: 96},
    {name: "fries",
    price: 10}
]

// const ulElm = document.getElementById("ul");


// saleItems.forEach(item=> {
//     const liElm = document.createElement("li");
//     liElm.innerText = item.name;
//     ulElm?.appendChild(liElm);
// });

function arrayMultiples1(num: number, length: number) {
    let anArray: number[] = [];
    for (let i = 1; i <= length; i++) {
        let multiple = i * num;
        anArray.push(multiple);
    } 
    return anArray;
}

function determine(num: number){
    if (num < 0){
        console.log("number is negative");
    } else if (num == 0) {
        console.log("number is zero");
    } else { 
        console.log("number is positive")
    }
}

function isPrime(num: number) {
    let till = Math.floor(num/2);
    for (let i=1; i <= till; i++) {
        let result = num % i;
        return result ===0;
    }
};

isPrime(2);
isPrime(15);
isPrime(13);