let data = {
    name : "Bala",
    age : 19,
    passion : "vibe coding",
    marks : [90, 85, 88],
    func : function(){
        console.log("this is a function inside object ");
        console.log(`this name is ${this.name} and age is ${this.age} , the marks are ${this.marks}`);    
    }
};
console.log(data);
data.func();
data.name =  "king";
let update = {...data , age : 20 , func : function(){
    console.log("this is updated function");
    console.log(`this name is ${this.name} and age is ${this.age}`);
}
};
console.log(update);
update.func();
for(let key in data){
    console.log(`${key} : ${data[key]}`);
}
data.percentage = 90;
console.log("after adding percentage:",data);
delete data.passion;
console.log("after deleting passion:",data)