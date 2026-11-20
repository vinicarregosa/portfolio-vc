const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById ("taskList");
const taskInput = document.getElementById("taskInput");

addTaskBtn.addEventListener("click", function (){
     
   if (taskInput.value == ""){

         alert("Digite uma tarefa!");
      }

   else{
      const li = document.createElement("li");
      
      li.textContent = taskInput.value;
      const btnDelete = document.createElement("button");
      btnDelete.textContent = "x";
      li.appendChild(btnDelete);
      taskList.appendChild(li);

      btnDelete.addEventListener("click", () => {
         li.remove();
         taskInput.value = "";
      })
      
         alert("Tarefa adicionada!");
         }
        
}) 
    


