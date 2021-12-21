// CODE EXPLAINED channel

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


const Check = "far fa-check-circle";
const Uncheck = "far fa-circle";
const Line = " lineThrough";

let List =[],id=0;

let data = localStorage.getItem("TODO");

if(data){
   List = JSON.parse(data);
   id=List.length;
   loadList(List);
}else{
    List = [];
    id=0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    }); 
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

const options = {weekday : "long", month:"short", day:"numeric"}; 
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",options);

function addToDo(toDo, id, done, trash){
  if(trash){ return; }

  const Done = done ? Check : Uncheck;

  const Li = done ? Line : "";

    const item = `
    <li class="item">
    <i class="far ${Done} co" job="com" id=${id}></i>
    <p class="text ${Li}">${toDo}</p>
    <i class="fas fa-trash de" job="delete" id=${id}></i>
    <li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode ==13){
        const toDo=input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            List.push({
                name : toDo,
                id: id,
                done : false,
                trash : false
            });
            localStorage.setItem("TODO",JSON.stringify(List));
            id++; 
        }
        input.value=""; 
    }
});

function completeToDo(element){
     element.classList.toggle('fa-circle');
     element.classList.toggle('fa-check-circle');
     element.parentNode.querySelector(".text").classList.toggle('lineThrough');

    List[element.id].done = List[element.id].done ? false : true;

}

function removeTo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash = true;
}

list.addEventListener("click",function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "com"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeTo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(List));
});
