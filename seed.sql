use employee;
insert into department (name) values
 ("sales"),
 ("engineering"), 
 ("finace"),
 ("legal");
 insert into role ( title, salary, department_id) values
 ("sales lead",100000,1),
 ("salesperson",80000,1),
 ("lead engineer",150000,2),
 ("software engineer",120000,2),
 ("accountant", 125000,3),
 ("legal team lead",250000,4),
 ("lawyer",190000,4);
 
 insert into employee (first_name,last_name,role_id) values
 ("john","doe",1 ),
 ("Mike", "chan",2 ),
 ("ashley", "rodriguez",3 ),
 ("kevin", "tupik",3 ),
 ("malia", "brown",5),
 ("sarah", "lourd",6),
 ("tom","allen",6);
 
 update employee set manager_id = 3 where id = 1;
 update employee set manager_id = 1 where id = 2;
 update employee set manager_id =3 where id =4;
update employee set manager_id =  7 where id =8;
 
 