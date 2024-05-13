
create database skill_manager;
use skill_manager;

CREATE TABLE employee (
  employee_id int NOT NULL,
  employee_name varchar(50)  NOT NULL,
  email varchar(100) NOT NULL
) ;





CREATE TABLE employee_skill (
  id int NOT NULL,
  employee_id int NOT NULL,
  skill_id int NOT NULL
) ;





CREATE TABLE skill (
  skill_id int NOT NULL,
  skill_name varchar(50) NOT NULL
) ;






ALTER TABLE employee
  ADD PRIMARY KEY (employee_id),
  ADD UNIQUE KEY `UNIQUE` (email);


ALTER TABLE employee_skill
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY employee_id (employee_id,skill_id),
  ADD UNIQUE KEY unique_index (skill_id,employee_id);


ALTER TABLE skill
  ADD PRIMARY KEY (skill_id);



--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE employee
  MODIFY employee_id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `employee_skill`
--
ALTER TABLE employee_skill
  MODIFY id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


ALTER TABLE skill
  MODIFY skill_id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;




ALTER TABLE employee_skill
  ADD CONSTRAINT employee_skill_ibfk_1 FOREIGN KEY (employee_id) REFERENCES employee (employee_id) ON DELETE CASCADE,
  ADD CONSTRAINT employee_skill_ibfk_2 FOREIGN KEY (skill_id) REFERENCES skill (skill_id) ON DELETE CASCADE;
COMMIT;


