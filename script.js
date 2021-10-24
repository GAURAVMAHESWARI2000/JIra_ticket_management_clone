
const addBtn = document.querySelector(".add-btn")
const modalCont = document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let textareaCont = document.querySelector(".textarea-cont")

let allPriorityColors = document.querySelectorAll(".priority-color")
let colors = ["lightpink","lightblue","lightgreen","black"]
let modalPriorityColor = colors[colors.length-1]

let modalFlag = false

//listener for modal priority coloring
allPriorityColors.forEach(function(colorElem,idx){
    colorElem.addEventListener("click",function(e){
        allPriorityColors.forEach((priorityColorElem,index)=>{
            priorityColorElem.classList.remove("border")
        })
        //      or
        // for(let elem of allPriorityColors){
        //     elem.classList.remove("border")
        // }
        colorElem.classList.add("border")
    })
})



addBtn.addEventListener("click",function(e){
    //display modal
    //generate ticket

    //flag -> true => show modal
    //flag -> flase => hide modal
    modalFlag = ! modalFlag
    if(modalFlag){
        modalCont.style.display="flex"
    }else{
        modalCont.style.display="none"
    }
})

modalCont.addEventListener("keydown",function(e){
    let key = e.key;
    if(key === "Shift"){
        createTicket()
        modalCont.style.display ="none"
        modalFlag= "false"
        textareaCont.value = "";
    }
})

function createTicket(){
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute("class","ticket-cont")
    ticketCont.innerHTML = `
    <div class="ticket-color"></div>
    <div class="ticket-id">ticket_id</div>
    <div class="task-area">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, facere nostrum id eum inventore nihil, at
        animi quidem amet vel, harum tenetur nam deserunt similique molestias ad error laborum officiis?
    </div>
    `;
    mainCont.appendChild(ticketCont)
}