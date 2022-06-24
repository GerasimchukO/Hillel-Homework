const calculatorAdd = require("./add")
const calculatorMinus = require("./minus")
const calculatorDivision = require("./division")
const calculatorMultiplication = require("./multiplication")

module.exports = {
    calculatorAdd,
    calculatorMinus,
    calculatorDivision,
    calculatorMultiplication,
};

// console.log(cA.add(1,4), "add")
// console.log(cMi.minus(10,4), "minus")
// console.log(cD.division(9,3), "division")
// console.log(cM.multiplication(2,2), "multiplication" )
