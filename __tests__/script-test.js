// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥 DO NOT MODIFY THIS FILE!!!!! 🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

if (typeof TextEncode === 'undefined' || typeof TextDecoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('text-encoding');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder; 
}

const { fireEvent, getByText, queryByText, getByTestId, screen } = require('@testing-library/dom')
require('@testing-library/jest-dom')
const { JSDOM } = require('jsdom')

const fs = require('fs')
const path = require('path')

const htmlFile = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')
const jsFile = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8')
// console.log("jsFile:", jsFile);


// let container

describe(`Weekend Salary Calculator:`, () => {
  let dom;

  beforeAll(() => {
    // Silence console.log statements while the tests run:
    console.log = () => {}
  })

  beforeEach(() => {
    dom = new JSDOM(htmlFile, { runScripts: 'dangerously' })
    // Execute script.js within the context of our jsdom instance:
    dom.window.eval(jsFile)

    screen.debug = dom.window.console.log.bind(console);
    console.log("the employee table:", screen.getByTestId("employeeTable"));
    // container = dom.window.document.body;

    // console.log("inside beforeEach - container:", screen);
  })

  const testEmployees = [
    {
      firstName: 'Annemiek',
      lastName: 'van Vleuten',
      id: '10101',
      title: 'Professional Cyclist',
      annualSalary: '120012'
    },
    {
      firstName: 'Coco',
      lastName: 'Gauff',
      id: '20202',
      title: 'Professional Tennis Player',
      annualSalary: '96000'
    },
    {
      firstName: 'Marta',
      lastName: 'Vieira da Silva',
      id: '30303',
      title: 'Professional Soccer Player',
      annualSalary: '72007' //24001.58
    }
  ]

  // This helper function:
    // 1. Selects all five employee inputs.
    // 2. Populates the inputs with data from the employee that
    //    gets passed in as an argument.
    // 3. Selects the submit button.
    // 4. Clicks the submit button.
  function submitEmployee(table, employee) {
    // console.log("within submitEmployee - screen:", screen, "employee:", employee);

    // Select all five employee inputs:
    const firstNameInput = getByTestId(screen, 'firstNameInput')
    const lastNameInput = getByTestId(screen, 'lastNameInput')
    const idInput = getByTestId(screen, 'idInput')
    const titleInput = getByTestId(screen, 'titleInput')
    const annualSalaryInput = getByTestId(screen, 'annualSalaryInput')
    
    // Populate the inputs with employee data:
    fireEvent.change(firstNameInput, {target: {value: employee.firstName}})
    fireEvent.change(lastNameInput, {target: {value: employee.lastName}})
    fireEvent.change(idInput, {target: {value: employee.id}})
    fireEvent.change(titleInput, {target: {value: employee.title}})
    fireEvent.change(annualSalaryInput, {target: {value: employee.annualSalary}})
    
    // Select the submit button:
    const submitButton = getByTestId(table, 'submitButton')
    
    // Click the submit button:
    submitButton.click()
  }

  it.only(`Adds a single new employee's data to the table`, () => {
    console.log("the employee table:", screen.getByTestId("employeeTable"));
    const table = screen.getByTestId('employeeTable');
    
    submitEmployee(table, testEmployees[0])

    // Verify that the new employee's info is in the table:
    expect(getByText(screen, /Annemiek/)).toBeInTheDocument()
    expect(getByText(screen, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(screen, /10101/)).toBeInTheDocument()
    expect(getByText(screen, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(screen, /120012|120,012/)).toBeInTheDocument()
  })

  it(`Adds multiple new employees' data to the table`, () => {
    const table = screen.getByTestId('employeeTable');
    
    submitEmployee(table, testEmployees[0])

    // Verify that the first new employee's info is in the table:
    expect(getByText(table, /Annemiek/)).toBeInTheDocument()
    expect(getByText(table, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(table, /10101/)).toBeInTheDocument()
    expect(getByText(table, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(table, /120012|120,012/)).toBeInTheDocument()

    submitEmployee(table, testEmployees[1])

    // Verify that the second new employee's info is in the table:
    expect(getByText(table, /Coco/)).toBeInTheDocument()
    expect(getByText(table, /Gauff/)).toBeInTheDocument()
    expect(getByText(table, /20202/)).toBeInTheDocument()
    expect(getByText(table, /Professional Tennis Player/)).toBeInTheDocument()
    expect(getByText(table, /96000|96,000/)).toBeInTheDocument()
  })

  it(`Clears out the form inputs after a new employee is submitted`, () => {
    const table = screen.getByTestId('employeeTable');
    
    submitEmployee(table, testEmployees[0])

    // Select all five employee inputs:
    const firstNameInput = getByTestId(table, 'firstNameInput')
    const lastNameInput = getByTestId(table, 'lastNameInput')
    const idInput = getByTestId(table, 'idInput')
    const titleInput = getByTestId(table, 'titleInput')
    const annualSalaryInput = getByTestId(table, 'annualSalaryInput')

    // Verify that each input has been cleared:
    expect(firstNameInput).not.toHaveValue()
    expect(lastNameInput).not.toHaveValue()
    expect(idInput).not.toHaveValue()
    expect(titleInput).not.toHaveValue()
    expect(annualSalaryInput).not.toHaveValue()
  })

  it(`Updates the total monthly salary value when a single employee is added`, () => {
    const table = screen.getByTestId('employeeTable');
    const footer = screen.getByTestId("employeeTableFooter");
    
    submitEmployee(table, testEmployees[0])

    expect(getByText(footer, /10001|10,001/)).toBeInTheDocument()
  })

  it(`Updates the total monthly salary value when multiple employees are added`, () => {
    const table = screen.getByTestId('employeeTable');
    const footer = screen.querySelector('footer');

    submitEmployee(table, testEmployees[0])
    submitEmployee(table, testEmployees[1])

    expect(getByText(footer, /18001|18,001/)).toBeInTheDocument()
  })

  it(`Applies the 'over-budget' CSS class to the footer when the total monthly salary exceeds $20,000`, () => {
    const table = screen.getByTestId('employeeTable');
    const footer = screen.querySelector('footer');
    
    submitEmployee(table, testEmployees[0])
    submitEmployee(table, testEmployees[1])
    submitEmployee(table, testEmployees[2])

    expect(footer).toHaveClass('over-budget')
  })

  it(`Removes the correct employee table row when a delete button is clicked`, () => {
    const table = screen.getByTestId('employeeTable');
    
    submitEmployee(table, testEmployees[0])
    submitEmployee(table, testEmployees[1])
    submitEmployee(table, testEmployees[2])
    
    const tableButtons = table.querySelectorAll('button')
    const secondRowsButton = tableButtons[1]

    secondRowsButton.click()

    // Expect the second row to have been deleted:
    expect(queryByText(table, /Coco/)).not.toBeInTheDocument()
    expect(queryByText(table, /Gauff/)).not.toBeInTheDocument()
    expect(queryByText(table, /20202/)).not.toBeInTheDocument()
    expect(queryByText(table, /Professional Tennis Player/)).not.toBeInTheDocument()
    expect(queryByText(table, /96000|96,000/)).not.toBeInTheDocument()

    // Expect that the first row was not deleted:
    expect(getByText(table, /Annemiek/)).toBeInTheDocument()
    expect(getByText(table, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(table, /10101/)).toBeInTheDocument()
    expect(getByText(table, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(table, /120012|120,012/)).toBeInTheDocument()

    // Expect that the third row was not deleted:
    expect(getByText(table, /Marta/)).toBeInTheDocument()
    expect(getByText(table, /Vieira da Silva/)).toBeInTheDocument()
    expect(getByText(table, /30303/)).toBeInTheDocument()
    expect(getByText(table, /Professional Soccer Player/)).toBeInTheDocument()
    expect(getByText(table, /72007|72,007/)).toBeInTheDocument()
  })

  // TODO Stretch Tests:
    // Total monthly salary is correctly calculated after deleting an employee.
    // Check for rounding logic.
        // 24001.583 becomes 24001.58
    // Check for money formatting:
        // 24001 becomes $24,001.00
        // 24001.583 becomes $24,000.58
    // A new employee is not added to the DOM if:
        // An input was not provided text
        // A duplicate id value was provided
})
