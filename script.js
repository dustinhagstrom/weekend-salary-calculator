// console.log("hello javascript!");

// get the tbody
let tbody = document.querySelector("tbody");
console.log("tbody obj:",tbody);

// get the form
let form = document.querySelector("form");

// get all of the input fields
let formInputs = document.querySelectorAll("input");
// get the input fields
let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let id = document.getElementById("id");
let title = document.getElementById("title");
let salary = document.getElementById("salary");
let submitButton = document.getElementById("submit");

// console.log input objects
console.log("input field obj fName: ", fName);
console.log("input field obj lName: ", lName);
console.log("input field obj id: ", id);
console.log("input field obj title: ", title);
console.log("input field obj salary: ", salary);
console.log("submit button obj: ", submitButton);

// this function will process the taking of input data
// and creating a new row in the table.
function submitHandler(event){
    // prevent the page refresh
    event.preventDefault();

    console.log("made it inside of submit");

    // make and append row with data
    appendsNewRow();

    // call the calculation function when new data added
    calculateTotal();
}

// this function will delete the row with which the pressed
// delete button is associated with.
function deleteHandler(event){

    console.log("made it inside of delete");

    // get the button from the event

    // navigate up the DOM tree to the tr

    // remove the tr from the tbody

    // call the calculation function when data is deleted.
    calculateTotal();
}

function appendsNewRow() {
    // make a tr
    let newRow = document.createElement("tr");
    // make tds from the input data

    for (const input of formInputs) {
        // make tds
        let data = document.createElement("td");
        data.setAttribute("headers", `${input.name}-header`);
        console.log("input obj's value:", input.value);
        // set td text to input values
        data.innerText = input.value;
        // add a $ sign to salary
        if (input.name === "salary") {
            data.innerText = "$ " + data.innerText;
        }
        //reset input obj's text boxes
        input.value = "";
        // append tds to tr
        newRow.appendChild(data);
    }
    // make a td for the button
    let deleteCell = document.createElement("td");
    deleteCell.setAttribute("headers", "delete-header");
    // make a button to append to td
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteHandler()");
    // set the text of the delete button
    deleteButton.innerText = "Delete";
    //append delete button to cell
    deleteCell.appendChild(deleteButton);
    
    // append delete cell to tr
    newRow.appendChild(deleteCell);
    // append tr to tbody
    tbody.append(newRow);
}

// this function will loop through the row entries in the
// table and it will tabulate the total annual salaries
// and put that data into a text box.
function calculateTotal(){
    console.log("we must of added or deleted something!");
    
    // loop through tbody
    
    // loop through rows
    // get last td in each row and add them together

    // return the total 
}