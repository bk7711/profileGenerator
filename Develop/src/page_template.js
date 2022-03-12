module.exports = employees => {
    let data = "";
    for( let i = 0; i < employees.length; i++){
        if("manager" in employees[i]){
            data = data + managerQuestions(employees[i])
        }
    }
    return``
}