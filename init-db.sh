#!/bin/bash

# Esperar a que MySQL esté listo
until mysql -h db -u root -p'' -e "SELECT 1" &> /dev/null; do
  echo "Esperando a que MySQL esté listo..."
  sleep 1
done

# Insertar categorías en la base de datos
mysql -h db -u root -p'' -e "
USE automatizacion;
INSERT INTO categories (name) VALUES ('Furnituredddd');
INSERT INTO categories (name) VALUES ('Electronicsssss');
INSERT INTO categories (name) VALUES ('Clothing');
INSERT INTO categories (name) VALUES ('Books');
INSERT INTO categories (name) VALUES ('Toys');
"