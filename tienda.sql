CREATE TABLE productos(
id int(11) auto_increment not null,
tipo_producto varchar(180) not null,
valor int(20) not null,
CONSTRAINT pk_productos PRIMARY KEY (id)
);
CREATE TABLE compradores(
id int(10) auto_increment not null,
nombre varchar(100) not null,
apellido varchar(150) not null,
telefono varchar(100) not null,
email varchar(100) not null,
dirección varchar(200) not null,
codigoCompraCliente int (10) not null,
contraseña varchar(100) not null,
CONSTRAINT pk_clientes PRIMARY KEY (id)
);
CREATE TABLE pedidos(
id int(10) auto_increment not null,
compradores_id int(10) not null,
productos_id int(10) not null,
codigo_compra int(10) not null,
cantidad int(255) not null, 
fecha date,
CONSTRAINT pk_pedidos PRIMARY KEY (id),
CONSTRAINT fk_compradores FOREIGN KEY (compradores_id) REFERENCES compradores(id),
CONSTRAINT fk_productos FOREIGN KEY (productos_id) REFERENCES productos(id)
);

/*Carga de Productos*/

INSERT INTO productos values(NULL, 'libra de arroz', 333333);
INSERT INTO productos values(NULL, 'libra de azucar', 444444);
INSERT INTO productos values(NULL, 'libra de harina', 555555);
INSERT INTO productos values(NULL, 'libra de papa', 666666);

/*Carga de Compradores*/

INSERT INTO compradores values(NULL,'miguel', 'perez', '3556778', 'maria@der.com','Bogotá calle 45 No. 70-80', 1234,'1234');
INSERT INTO compradores values(NULL,'alfredo', 'villa','4539870', 'fernando@der.com','Medellin calle 60 No. 22-90', 4567,'4567');
INSERT INTO compradores values(NULL,'augusto', 'garzon','8734593', 'augusto@der.com','Barranquilla calle 20 No. 50-40', 8901,'8901');
INSERT INTO compradores values(NULL,'ruben',  'lopez','5957318', 'ricardo@der.com','Cali calle 30 No. 50-10', 3673,'3673');
INSERT INTO compradores values(NULL,'diego',  'perez','6057318', 'diedar@hotmail.com','Bogota calle 166 No. 9-70', 2673,'2373');

/*Carga de Pedidos*/

INSERT INTO pedidos values(NULL, 1, 1, 5842, 5,'2018-01-10');
INSERT INTO pedidos values(NULL, 2, 2, 6124, 7,'2013-01-10');
INSERT INTO pedidos values(NULL, 3, 3, 7983, 8,'2012-01-10');
INSERT INTO pedidos values(NULL, 4, 4, 8126, 9,'2010-01-10');

