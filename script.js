
const addBtn = document.querySelector(".add-btn")
const removeBtn = document.querySelector(".remove-btn")
const modalCont = document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let textareaCont = document.querySelector(".textarea-cont")
let toolBoxColors = document.querySelectorAll(".color")

let allPriorityColors = document.querySelectorAll(".priority-color")
let colors = ["lightpink","lightblue","lightgreen","black"]
let modalPriorityColor = colors[colors.length-1]

let modalFlag = false
let removeFlag = false

let lockClass = "fa-lock"
let unlockClass = "fa-lock-open"

let ticketsArr = []

//listener for toolbox priority color
for(let i=0;i<toolBoxColors.length;i++){
    toolBoxColors[i].addEventListener("click",function(e){
        let currentToolboxColor = toolBoxColors[i].classList[0]

        let filteredTickets = ticketsArr.filter((ticketObj,ind)=>{
            return currentToolboxColor === ticketObj.ticketColor
        })
        //remove all previous tickets
        let allTicketCont = document.querySelectorAll(".ticket-cont")
        for(let i =0;i<allTicketCont.length;i++){
            allTicketCont[i].remove()
        }
        //display new filtered tickets
        filteredTickets.forEach((ticketObj ,idx )=>{
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketId)
        })
    })

    toolBoxColors[i].addEventListener("dblclick",function(e){
        //remove all tickets
        let allTicketCont = document.querySelectorAll(".ticket-cont")
        for(let i =0;i<allTicketCont.length;i++){
            allTicketCont[i].remove()
        }
        //display all tickets
        ticketsArr.forEach((ticketObj ,idx )=>{
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketId)
        })
    })
}

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
        modalPriorityColor = colorElem.classList[0]
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

removeBtn.addEventListener("click",(e) => {
    removeFlag = !removeFlag
})

modalCont.addEventListener("keydown",function(e){
    let key = e.key;
    if(key === "Shift"){
        createTicket(modalPriorityColor,textareaCont.value)
        setModalToDefault()
        modalFlag= false
    }
})

function createTicket(ticketColor,ticketTask,ticketId){
    let id = ticketId || shortid()
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute("class","ticket-cont")
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
        <i class="fas fa-lock"></i>
    </div>
    `

    mainCont.appendChild(ticketCont)
    if(!ticketId)  ticketsArr.push({ticketColor,ticketTask,ticketId:id})
    handleRemoval(ticketCont,id)
    handleLock(ticketCont)
    handleColor(ticketCont,id)
}

function handleRemoval(ticket,id){
    ticket.addEventListener("click",function(e){
        if(removeFlag) {
            ticket.remove()
            let newticketsArr = ticketsArr.filter((ticketObj,ind)=>{
                return id != ticketObj.ticketId
            })
            ticketsArr = newticketsArr
        }
    })
}

function handleLock(ticket){
    let ticketLockElem = ticket.querySelector(".ticket-lock")
    let ticketLock = ticketLockElem.children[0]
    let ticketTaskArea = ticket.querySelector(".task-area")
    ticketLock.addEventListener("click",function(e){
        if(ticketLock.classList.contains(lockClass)){
            ticketLock.classList.remove(lockClass)
            ticketLock.classList.add(unlockClass)
            ticketTaskArea.setAttribute("contenteditable","true")
        }else{
            ticketLock.classList.remove(unlockClass)
            ticketLock.classList.add(lockClass)
            ticketTaskArea.setAttribute("contenteditable","false")

        }
    })
}
//contenteditable is an attribute :
//true -> content of textarea can be edited
//false -> content of textarea can not be edited


function handleColor(ticket,id){
    let ticketColor = ticket.querySelector(".ticket-color")
    ticketColor.addEventListener("click",function(e){
        let currentTicketColor = ticketColor.classList[1]
        let currentTicketColorIdx = colors.findIndex((color)=>{
            return color === currentTicketColor
        })
        let newTicketColorIdx = (currentTicketColorIdx+1)%colors.length
        let newTicketColor = colors[newTicketColorIdx]
        ticketColor.classList.remove(currentTicketColor)
        ticketColor.classList.add(newTicketColor)

        for(let i=0;i<ticketsArr.length;i++){
           if(id == ticketsArr[i].ticketId){
               ticketsArr[i].ticketColor = newTicketColor
           }
        }
    })
}

function setModalToDefault(){
    modalCont.style.display ="none"
    textareaCont.value = "";
    modalPriorityColor = colors[colors.length-1]
    allPriorityColors.forEach((priorityColorElem ,idx)=>{
        priorityColorElem.classList.remove("border")
    })
    allPriorityColors[allPriorityColors.length-1].classList.add("border")
    
}