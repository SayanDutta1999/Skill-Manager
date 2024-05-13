// importing the pool connection object 
const con = require('../Database/mysql_connection');

// Add new Employee to database controller
module.exports.addEmployee = (req, res)=>{
    let {employee_name, employee_email, skills} = req.body;
    let query1 = 'insert into employee (employee_name, email) values (?, ?)';
    con.query(query1, [employee_name, employee_email], (err, result)=> {
        if (err) {
            res.status(err.code).json({
                status: 'error',
                message : err.message
            });
        }else{
            let em_id = result.insertId;
            skills.forEach((skill_name) => {
                let query2 = 'insert into skill (skill_name) values (?)';
                con.query(query2, [skill_name], (err, result)=>{
                    let skill_id = result.insertId;
                    let query3 = 'insert into employee_skill (employee_id, skill_id) values (?, ?)';
                    con.query(query3, [em_id, skill_id]);
                });
            });
            // if no error occurs then render operation page for further operations
            res.status(202).render('operation', {title : 'Operation', heading : "Data Insert successfully"})
        }
    });
}

// Update existed Employee in database controller
module.exports.updateEmployee = (req, res)=>{
    let {employee_email, skills} = req.body;
    
    let query = `select count(*) from employee where email = ?`;
    con.query(query,[employee_email], (err, result)=>{
        if(err){
            res.status(err.code).json({
                status: 'error',
                message : err.message
            });
        } 
        else if(result[0]['count(*)'] == 0){
            res.render('operation', {title : 'Operation', heading : "Email address does not exist , try with valid email address"})
        }
        else{
            let query1 = `select skill_id from (SELECT em_sk.skill_id  
            from employee_skill em_sk join skill sk on em_sk.skill_id = sk.skill_id 
            where em_sk.employee_id =  (select em.employee_id from employee em WHERE em.email = ?)) as C`;
            
            con.query(query1, [employee_email], (err, result)=>{
                if(err){
                    res.status(err.code).json({ 
                    status: 'error',
                    message : err.message
                    });
                }else{
                    // Iterate each skills at a time and update it with specific employee
                    skills.forEach((sk_name)=>{
                        for(let sk = 0; sk < result.length; sk++){
                            let query2 = `update  skill set skill_name = ? where skill_id = ?`;
                            con.query(query2, [sk_name, result[sk].skill_id]);
                            // remove skill id from starting of result to get each id at a time.
                            result.shift();
                            break;
                        }
                    });
                }
                // if no error occurs then render operation page for further operations
                res.status(202).render('operation', {title : 'Operation', heading : "Data Insert successfully"})
            });
        }
    });  
}

// // Delete Employee from  database controller
module.exports.deleteEmployee = (req, res)=>{
    let {employee_email} = req.body;
    
    let query = `select count(*) from employee where email = ?`;
    con.query(query,[employee_email], (err, result)=>{
        if(err){
            res.status(err.code).json({
                status: 'error',
                message : err.message
            });
        } // if the email address not exists in the database then send 
        // a message to enter valid email address
        else if(result[0]['count(*)'] == 0){
            res.render('operation', {title : 'Operation', heading : "This Email address does not exist , try with valid email address"})
        }else{
           let query1 =  `delete from skill WHERE skill_id in (select skill_id from 
            (SELECT em_sk.skill_id from employee_skill em_sk join employee em on 
                em_sk.employee_id = em.employee_id where em.email = ? 
            ) as c) `;
           
            

            con.query(query1, [employee_email], (err, result)=>{
                if(err){
                    res.status(err.code).json({
                        status: 'error',
                        message : err.message
                    });
                }else{
                    let query2 = `delete from employee where email = ?`;
                    con.query(query2, [employee_email], (err, result)=>{
                       if(!err){
                            // if no error occurs then render operation page for further operations
                            res.status(202).render('operation', {title : 'Operation', heading : "Employee information get deleted successfully"})
                       }
                    });
                }
                
            });
        }
  
    });
}

// Show Employee information based on more skills controller
module.exports.showEmployee = (req, res)=>{
    let {search} = req.body;
    // converting the form input into a word array
    const skills = search.split(" ");
  
    let query1 = `select distinct employee_name from employee em JOIN employee_skill em_sk on 
    em.employee_id = em_sk.employee_id WHERE em_sk.skill_id = 
    ANY (select skill_id from skill where skill_name in (?))`;

        con.query(query1, [skills], (err, result)=>{
            if(err){
                res.status(err.code).json({ 
                    status: 'error',
                    message : err.message
                });
            }else{
                // if no error occurs then render operation page for further operations
                res.status(202).render('show', {title : 'Show', heading : "Employee details", employees : result})
            }
        });
}