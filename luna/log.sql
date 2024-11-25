CREATE TABLE `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` varchar(100) ,
  `password` varchar(100),
  PRIMARY KEY (id) 
) 
CREATE TABLE `advertisement` (
    id INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(100),
    `image` longblob,
    PRIMARY KEY (id)
);
CREATE TABLE `advertisement` (
    id INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(100),
    `image` longblob,
    PRIMARY KEY (id)
);
CREATE TABLE `telegramClients` (
    id INT NOT NULL AUTO_INCREMENT,
    `chat_id` INT,
    `state` INT,
    `date_tame` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE `imageShop` (
    id INT NOT NULL AUTO_INCREMENT,
    `linkImage1` VARCHAR(100),
    `linkImage2` VARCHAR(100),
    `linkImage3` VARCHAR(100),
    `linkImage4` VARCHAR(100),
    `linkImage5` VARCHAR(100),
    `linkImage6` VARCHAR(100),
    `linkImage7` VARCHAR(100),
    PRIMARY KEY (id)
);
DROP TABLE `telegramClients`;
DROP TABLE `imageShop`;
../images/shop/1marka1chislo.jpg
../images/shop/1marka2chislo.jpg
../images/shop/1marka3chislo.jpg
../images/shop/1marka4chislo.jpg
../images/shop/1marka5chislo.jpg
../images/shop/1marka6chislo.jpg
../images/shop/1marka7chislo.jpg


