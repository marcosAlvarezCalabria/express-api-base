const employeesJson = require("../data/employees.json")

module.exports.list = (req, res, next) => {
const page = req.query.page;
const user = req.query.user
const badgesBlack = req.query.badges
if(page){
    const num1 = (2*(page-1))
    const num2 = (2*(page-1) +1)
    const result = employeesJson.slice(num1,num2+1)
    res.json(result)
} else if (user) {
   const userFiltered = employeesJson.filter((employee => employee.privileges === "user" ))
    res.json(userFiltered)


}else if (badgesBlack ) {
    const badgeFiltered= employeesJson.filter((employee => employee.badges.includes(badgesBlack) ))
    res.json(badgeFiltered)


} else {
    res.json(employeesJson)
}
}

module.exports.oldest = (req, res, next) => {
   
   
    
    const sortedEmployees = employeesJson.sort((a, b) => b.age - a.age);
    const oldestEmployee = sortedEmployees[0];
    res.json(oldestEmployee);
}
module.exports.doList = (req, res, next) => {
const {name, age, phone, privilege, favorites, finished, badges, points} = req.body;
if(name&& age && phone && privilege && favorites && finished && badges && points){
    const newEmployee ={
        name, 
        age,
         phone, 
         privilege, 
         favorites, 
         finished, 
         badges, 
         points

    } ;
    employeesJson.push(newEmployee)
     res.json(employeesJson)
}else {
  res.status(400).json({"code": "not_found"})
}

}
module.exports.listName = (req, res, next) => {
   const nameSearch = req.params.name;
   const namesFiltered = employeesJson.filter(employee => employee.name.toLowerCase() === nameSearch.toLowerCase())
   console.log(namesFiltered)

   if (namesFiltered.length <= 0){
    res.status(404).json({"code": "not_found"})
   }else{
    res.json(namesFiltered)
   }
   
}
