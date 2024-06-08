create database registro;

use registro;

CREATE TABLE IF NOT EXISTS registros(
	id int primary key auto_increment,
	dadosCriptografados TEXT NOT NULL,
	chaveCriptografia VARCHAR(255) NOT NULL
    

);

select*from registros;

DESC registros;

drop table registros;

