Create database zoo;
use zoo;

Create table zoos (
    id integer PRIMARY KEY AUTO_INCREMENT,
    zoo VARCHAR(40) NOT NULL,
    visitors integer NOT NULL,
    animals integer NOT NULL
);

insert into zoos (zoo, visitors, animals)
values
("zoo", 120, 44);

insert into zoos (zoo, visitors, animals)
values
("Mega zoo", 400, 144);
