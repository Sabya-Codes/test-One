CREATE DATABASE Travel_Chatbot;
USE Travel_Chatbot;

CREATE TABLE States (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  state_code VARCHAR(10) NOT NULL UNIQUE,
  country_code VARCHAR(10)
);

CREATE TABLE Cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  state_code VARCHAR(10),
  country_code VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  FOREIGN KEY (state_code) REFERENCES States(state_code)
);
select * from cities
where state_code = "OR"
select * from prices
where state_code = 'OR'

CREATE TABLE Museums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city_id INT,
  city_name VARCHAR(255) NOT NULL,
  state_code VARCHAR(10),
  country_code VARCHAR(10),
  opening_time TIME,
  closing_time TIME,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  FOREIGN KEY (city_id) REFERENCES Cities(id)
);
CREATE TABLE Prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  museum_id INT,
  child float,
  adult float,
  FOREIGN KEY (museum_id) REFERENCES Museums(id)
);
INSERT INTO Museums (name, city_id, city_name, state_code, country_code, opening_time, closing_time, latitude, longitude)
VALUES 
('Odisha State Museum', 616, 'Bhubaneshwar', 'OR', 'IN', '10:00:00', '17:30:00', 20.2568373264081, 85.84115822721392),
('Kalabhumi', 616, 'Bhubaneshwar', 'OR', 'IN', '10:00:00', '17:30:00', 20.252136011804804, 85.80729266475592)

INSERT INTO Prices (museum_id, child, adult)
VALUES 
(1, 10.00, 20.00),
(2, 50.00, 50.00);

-- 616 --

UPDATE museums
SET city_id = 616
WHERE id = 2 

SELECT * FROM cities
where state_code = "OR"

ALTER TABLE Cities ADD state_name VARCHAR(255);

select * from states
