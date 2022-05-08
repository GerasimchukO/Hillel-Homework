// Сеть фастфудов предлагает несколько видов гамбургеров:

// маленький (50 тугриков, 20 калорий)
// средний (75 тугриковб 30 каллорий)
// большой (100 тугриков, 40 калорий)

// Гамбургер может быть с одним из нескольких видов начинок:

// сыром (+ 10 тугриков, + 20 калорий)
// салатом (+ 20 тугриков, + 5 калорий)
// картофелем (+ 15 тугриков, + 10 калорий)
// посыпать приправой (+ 15 тугриков, 0 калорий)
// полить майонезом (+ 20 тугриков, + 5 калорий).

// При этом начинок можно добавить несколько или не быть совсем

// Напишите программу, расчитывающую стоимость и калорийность гамбургера.
// Используй ООП подход (подсказка: нужен класс Гамбургер, статические константы,
//   методы для выбора опций и рассчета нужных величин).

const HAMBURGER_SIZES = {
  SMALL: {
    price: 50,
    calories: 20,
  },

  MEDIUM: {
    price: 75,
    calories: 30,
  },

  BIG: {
    price: 100,
    calories: 40,
  },
};

const TOPPINGS = {
  CHEESE: {
    price: 10,
    calories: 20,
  },

  SALAD: {
    price: 20,
    calories: 5,
  },

  POTATOES: {
    price: 15,
    calories: 10,
  },
  
  SAUCE: {
    price: 15,
    calories: 0,
  },

  MAYON: {
    price: 20,
    calories: 5,
  },

};

function CreateHamburger (size){
  this.size = size;
  this.toppings = [];
}

CreateHamburger.prototype.addTopping = function (topping){
  this.toppings.push(topping);
};

CreateHamburger.prototype.getPrice = function(){
  return this.toppings.reduce((a,e) => (a+= e.price), this.size.price);
};

CreateHamburger.prototype.getCalories = function(){
  return this.toppings.reduce((a,e) => (a+= e.calories), this.size.calories);
};

const smallHamburger = new CreateHamburger(HAMBURGER_SIZES.SMALL);
const mediumHamburger = new CreateHamburger(HAMBURGER_SIZES.MEDIUM);
const bigHamburger = new CreateHamburger(HAMBURGER_SIZES.BIG);

smallHamburger.addTopping(TOPPINGS.CHEESE)
smallHamburger.addTopping(TOPPINGS.POTATOES)
smallHamburger.addTopping(TOPPINGS.MAYON)
smallHamburger.addTopping(TOPPINGS.SAUCE)

mediumHamburger.addTopping(TOPPINGS.SALAD)
mediumHamburger.addTopping(TOPPINGS.SALAD)
mediumHamburger.addTopping(TOPPINGS.CHEESE)
mediumHamburger.addTopping(TOPPINGS.SAUCE)

bigHamburger.addTopping(TOPPINGS.SAUCE)
bigHamburger.addTopping(TOPPINGS.POTATOES)
bigHamburger.addTopping(TOPPINGS.POTATOES)
bigHamburger.addTopping(TOPPINGS.MAYON)
bigHamburger.addTopping(TOPPINGS.CHEESE)

const totalPriceS = smallHamburger.getPrice();
const totalPriceM = mediumHamburger.getPrice();
const totalPriceB = bigHamburger.getPrice();

const totalCaloriesS = smallHamburger.getCalories();
const totalCaloriesM = mediumHamburger.getCalories();
const totalCaloriesB = bigHamburger.getCalories();

console.log("Price small Hamburger", totalPriceS);
console.log("Calories small Hamburger", totalCaloriesS);

console.log("Price medium Hamburger", totalPriceM);
console.log("Calories medium Hamburger", totalCaloriesM);

console.log("Price big Hamburger", totalPriceB);
console.log("Calories big Hamburger", totalCaloriesB);

