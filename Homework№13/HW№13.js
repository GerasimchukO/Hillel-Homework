// Написать два класса Group и Student, чтобы их можно было использовать так
// У группы должны быть методы

// addStudent() - который принимает студента и сохрнаняет их его у себя в массиве
// getAverageMark() - который возвращает среднее из всех оценок
// и readonly "свойство"

// students в котором должен быть массив всех студентов



class Group {
  #students = [];
  get students(){
    return this.#students
  }
  addStudent(newStudent){
    this.#students.push(newStudent)
  }
  getAverageMark() {
    const ratingAllStudents = [];
    const allStudents = [...this.#students];
    allStudents.forEach((el) =>{
      ratingAllStudents.push(el.rating);
    });
   const ratingAllStudentsTwo = ratingAllStudents.flat();
   const sum = ratingAllStudentsTwo.reduce((a,e) => {
     a+= e;
     return a;
    },0);

    const result = sum/ratingAllStudentsTwo.length;
    return result;

  }
  
};

class Student {
  #name = "";
  #rating = undefined;
  constructor(name,rating){
    this.#name = name;
    this.#rating = rating;
  }
  get name(){
    return this.#name
  }

  get rating(){
    return this.#rating
  }
}

const feGroup = new Group();
const firstStudent = new Student('John Doe', [10, 102, 0]);

feGroup.addStudent( new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));

console.log(feGroup.students);

console.log(feGroup.getAverageMark());


