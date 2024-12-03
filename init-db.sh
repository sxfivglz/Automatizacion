#!/bin/bash

# Esperar a que MySQL esté listo
echo "Esperando a que MySQL esté listo..."
until mysql -h mysql -u root --password='' -e "SELECT 1" &> /dev/null; do
  sleep 1
done

echo "MySQL está listo. Configurando la base de datos..."

# Crear la base de datos si no existe
mysql -h mysql -u root --password='' -e "
USE automatizacion;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT IGNORE INTO categories (name) VALUES 
('Furnitures'), 
('Electronicsw'), 
('Clothing'), 
('Books'), 
('Toys');
"

echo "Datos insertados en la base de datos correctamente."
