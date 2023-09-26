// exercise 1
function helloWorld1(str) {
    console.log(str);
}
;
// exercise 2
var aName = 'Sarah';
//exercise 3
function mathFun(length, width) {
    return length * width;
}
;
// exercise 4
function oddOrEven(num) {
    if (num % 2 == 0) {
        return "even";
    }
    else {
        return "odd";
    }
    ;
}
;
// exercise 7
function funFactorial(num) {
    var factorial = num;
    for (var i = 0; i < num; i++) {
        num -= 1;
        factorial *= num;
    }
    ;
    return factorial;
}
//exercise 8
function leapyear(year) {
    if (year % 4 == 0) {
        console.log("It's a leap year");
    }
    else {
        console.log("Not a leap year!");
    }
    ;
}
;
// exercise 10
function fourBasicOps(num1, num2) {
    console.log(num1 * num2);
    console.log(num1 + num2);
    console.log(num1 - num2);
    console.log(num1 / num2);
}
// exercises 11
var string1 = "Tomato";
var number1 = 4;
var aBool = true;
var aNull = null;
var anUndefined;
var anObject = {
    objName: "name",
    objID: 56454,
};
var anArray = [];
// exercise 12
var saleItem;
var saleItems;
saleItems = [
    { name: "pizza",
        price: 56, },
    { name: "hamburger",
        price: 96 },
    { name: "fries",
        price: 10 }
];
// const ulElm = document.getElementById("ul");
// saleItems.forEach(item=> {
//     const liElm = document.createElement("li");
//     liElm.innerText = item.name;
//     ulElm?.appendChild(liElm);
// });
function arrayMultiples1(num, length) {
    var anArray = [];
    for (var i = 1; i <= length; i++) {
        var multiple = i * num;
        anArray.push(multiple);
    }
    return anArray;
}
function determine(num) {
    if (num < 0) {
        console.log("number is negative");
    }
    else if (num == 0) {
        console.log("number is zero");
    }
    else {
        console.log("number is positive");
    }
}
function isPrime(num) {
    var till = Math.floor(num / 2);
    for (var i = 2; i <= till; i++) {
        var result = num % i;
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

