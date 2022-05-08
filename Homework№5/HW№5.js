const products = [

    {
      price: 200,
      name: "TV",
      amount: 3,
      discount: 5,
      availableIn: ["Odessa", "Kyiv", "Lviv"],
    },
  
    {
      price: 300,
      name: "Phone",
      amount: 5,
      discount: 10,
      availableIn: ["Baden-baden", "Kyiv", "Lviv"],
    },
  
    {
      price: 200,
      name: "oven",
      amount: 10, 
      discount: 13,
      availableIn: ["Chernobaivka", "Lviv", "Zaporoje"],
    },
  
    {
      price: 400,
      name: "iron",
      amount: 32,
      discount: 0,
      availableIn: ["Kharkiv", "Vilnus", "Mykolaiv"],
    },
  ];
  const allInfo = {
    sum : sum(),
    sumWithDiscount : sumDiscount(),
  }

function sum(){
  return products.reduce((a,e) =>{
    a += e.price * e.amount; 
    return a;
  },0)
};

function sumDiscount(){
  return products.reduce((a,e) =>{
    a += e.price * e.amount*(100-e.discount)/100; 
    return a;
  },0)
};
console.log(allInfo);


function addTowns(massive){
  const allCities = massive.reduce((acc,elem) =>{
      acc.unshift(elem.availableIn);
      return acc;
  },[]);
  let filteredСities = allCities.flat();
  let result = filteredСities.reduce((acc,elem,index)=> {
      if (filteredСities.indexOf(elem) === index){
          acc.unshift(elem);
      }
      return acc;
  },[]);
  return result;
}

const city = addTowns(products);

console.log(city);

function addTownsProducts(massive){
  let citiesProd = [];
  citiesProd = massive.reduce((acc,elem) =>{
      acc.unshift(elem.availableIn);
      return acc;
  },[]);
  
  let citiesSecond = citiesProd.flat();
  let result = citiesSecond.reduce((acc,elem,index)=> {
      if (citiesSecond.indexOf(elem) !== index && !acc.includes(elem)){
          acc.unshift(elem);
      }
      return acc;
  },[]);
  return result;
}
const user = addTownsProducts(products);

console.log(user);
  
//   Есть вот такой список продуктов.
  
//   Нужно получить следующие переменные:
  
//   сумму всех денег по продуктам
//   Сумму всех денег по продуктам с учетом скидки
//   список всех городов где представлены продукты
//   список городов, по которым продукты пересекаются (Львов, Киев итд