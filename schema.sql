Drop Database if exists Employee;
Create DATABASE Employee;
use employee;
create table department (
  id int not null auto_increment primary key,
  name varchar(30)
);
create table role (
  id int not null auto_increment primary key,
  title varchar(30),
  salary decimal (10, 2),
  department_id int not null,
  foreign key(department_id) references department(id)
);
Create table employee (
  id int not null auto_increment primary key,
  first_name varchar(30),
  last_name varchar(30),
  role_id  int not null,
  foreign key( role_id) references role(id),
  manager_id int not null,
  foreign key (manager_id) references employee(id)
  );

  