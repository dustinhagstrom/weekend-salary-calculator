// console.log("hello javascript!");

// get the tbody
let tbody = document.querySelector("tbody");

// get all of the input fields
let formInputs = document.querySelectorAll("input");
// get the input fields
let fName = document.getElementById("firstNameInput");
let lName = document.getElementById("lastNameInput");
let id = document.getElementById("idInput");
let title = document.getElementById("titleInput");
let salary = document.getElementById("annualSalaryInput");
let submitButton = document.getElementById("submitButton");

// get the total monthly p element
let totalMonthlySalaryParagraph = document.getElementById("total-monthly");

// call the handlesDataCalculationsOnLoad function
handlesDataCalculationsOnLoad();

// this function will run on the load of the app
function handlesDataCalculationsOnLoad() {
    calculateTotalMonthlySalaries();
}

// this function will process the taking of input data
// and creating a new row in the table.
function submitHandler(event) {
    // prevent the page refresh
    event.preventDefault();

    // make and append row with data
    appendsNewRow();

    // call the calculation function when new data added
    calculateTotalMonthlySalaries();
}

// this function will delete the row with which the pressed
// delete button is associated with.
function deleteHandler(event) {
    // stop default behavior
    event.preventDefault();

    // declare variable to store row to delete, set to delete button.
    let currentDomNode = event.target;
    // get the row to remove by traversing up the DOM tree to
    // the row that contains the delete button
    while ((currentDomNode = currentDomNode.parentNode).nodeName !== "TR") {
        // spin;
    }

    // store the tbody parent of the tr that we isolated
    let parentOfRow = currentDomNode.parentNode;
    // remove the tr from the tbody
    parentOfRow.removeChild(currentDomNode);
    // call the calculation function when data is deleted.
    calculateTotalMonthlySalaries();
}

function appendsNewRow() {
    // make a tr
    let newRow = document.createElement("tr");
    // make tds from the input data

    for (const input of formInputs) {
        // make tds
        let data = document.createElement("td");
        data.setAttribute("headers", `${input.name}-header`);
        // set td text to input values
        data.innerText = input.value;
        // add a $ sign to salary
        if (input.name === "annualSalaryInput") {
            let salary = parseInt(data.innerText);
            // create a formatter for to represent the US number format
            const formatter = new Intl.NumberFormat("en-US", {
                minimumFractionDigits2: 2,
                maximumFractionDigits: 2,
            });

            // format our monthly salary expense to US number format
            salary = formatter.format(salary);
            data.innerText = "$ " + salary;
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
    deleteButton.setAttribute("onclick", "deleteHandler(event)");
    deleteButton.setAttribute("class", "delete");
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
function calculateTotalMonthlySalaries() {
    // named constant to divide yearly salaries
    const MONTHS_IN_A_YEAR = 12;

    // buffer to store result
    let monthlySalaryExpense = 0;

    // rows in the tbody
    let rowsArray = tbody.children;

    // loop through tbody rows
    for (const row of rowsArray) {
        // put the data within each row into an array
        let dataArray = row.children;
        // grab the salary data from the current row
        let salary = dataArray[4].innerText;
        // use regex to remove non-numerical chars
        let salaryWithoutFormatting = salary.replace(/[^0-9]/g, "");

        // parse the salary string and turn into a number type
        salaryWithoutFormatting = parseInt(salaryWithoutFormatting);

        // add the salary
        monthlySalaryExpense += salaryWithoutFormatting / MONTHS_IN_A_YEAR;
    }

    monthlySalaryExpense = parseFloat(monthlySalaryExpense).toFixed(2);
    let classes = totalMonthlySalaryParagraph.classList;
    if (
        monthlySalaryExpense > 20000 &&
        classes.contains("within-budget")
    ) {
        totalMonthlySalaryParagraph.classList.replace(
            "within-budget",
            "over-budget"
        );
    } else if (monthlySalaryExpense <= 20000 && classes.contains("over-budget")){
        totalMonthlySalaryParagraph.classList.replace(
            "over-budget",
            "within-budget"
        );
    }

    // create a formatter for to represent the US number format
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits2: 2,
        maximumFractionDigits: 2,
    });

    // format our monthly salary expense to US number format
    monthlySalaryExpense = formatter.format(monthlySalaryExpense);

    totalMonthlySalaryParagraph.innerText =
        "Total Monthly: $" + monthlySalaryExpense;
}
