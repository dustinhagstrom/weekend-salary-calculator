// console.log("hello javascript!");

// get the tbody
let tbody = document.querySelector("tbody");
console.log("tbody obj:",tbody);

// get the input fields
let fName = document.getElementById("first-name");
let lName = document.getElementById("last-name");
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
function submitHandler(){

    console.log("made it inside of submit");

    // make tds from the input data

    // make a tr

    // append tds to tr

    // append tr to tbody

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