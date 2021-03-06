const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolvePtr, ADDRGETNETWORKPARAMS } = require("dns");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const askQuestions = () => {
        
    return inquirer
    .prompt([
        {
            type:'list',
            name:'role',
            message:'What is your role?',
            choices:['Manager', 'Engineer', 'Intern']
            
        },
        {
            type:'input',
            name: 'name',
            message: 'Enter the employee name.'
        },
        {
            type:'input',
            name: 'id',
            message:'What is the employee ID?'
        },
        {
            type:'input',
            name: 'email',
            message:"What is the employee's email address?"
        },
        
        {
            type:'input',
            name: 'officeNumber',
            message:'What is the office number?',
            when:(answers) => {
                return answers.role === 'Manager'
            } 
        },
        {
            type:'input',
            name:'githubUser',
            message: 'What is your Github username?',
            when:(answers) => {
                return answers.role === 'Engineer'
            } 
        },
        {
            type:'input',
            name:'school',
            message: 'What is your school name?',
            when:(answers) => {
                return answers.role === 'Intern'
            } 
        }
    ]).then((answers) =>{
        if(answers.role === 'Manager'){
            console.log ("manager");
           const manager =  new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
           employees.push(manager);
           return employees;
        }else if(answers.role === 'Engineer'){
            console.log ("engineer");
           const engineer =  new Engineer(answers.name, answers.id, answers.email, answers.githubUser);
           employees.push(engineer);
           return employees;
        }
        else if(answers.role === 'Intern'){
            console.log ("intern");
           const intern =  new Intern(answers.name, answers.id, answers.email, answers.school);
           employees.push(intern);
           return employees;
        }   
        console.log(employees)
    }).then(answers => {
        return inquirer.prompt([
         {
            type:'confirm',
            name:'nextEmployee',
            message:'Would you like to enter another employee?',
            default: true,
        }
    ]).then((response) => {
        if(response.nextEmployee){
            return askQuestions()
        }else{
            return (employees);
        }
    });
    })
    }
 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const generateFile = () => {
    askQuestions()
    .then(render( => {
        console.log(Process.argv);
    }) )
    
    // .then(fs.writeFileSync('./team.html', data, err => {
    //     if(err) throw err;
    //     console.log ('html complete')
    
    //     if(!fs.existsOutput(dir)){
        
    // }
        
    } 
   generateFile()
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
