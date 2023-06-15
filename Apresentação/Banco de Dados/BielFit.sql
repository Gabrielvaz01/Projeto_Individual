create database bielfit;

use bielfit;

create table usuario(
	id int primary key auto_increment,
    nome varchar(50),
    email varchar(50),
    senha varchar(50)
);

create table musculo(
idMusculo int primary key auto_increment,
peito int,
ombro int,
trcipes int,
costas int,
bicipes int,
perna int,
fkUsuario int,
constraint fkUsuario foreign key (fkUsuario)
	references usuario(id)
);


select*from usuario;
select *from musculo;

select *from usuario join musculo 
	on id = fkUsuario;