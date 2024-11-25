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
CREATE TABLE `clients` (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30),
    `telephone` VARCHAR(20),
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
    `price` TEXT,
    `descripthin` TEXT,
    PRIMARY KEY (id)
);
DROP TABLE `telegramClients`;
DROP TABLE `clients`;
../images/shop/1marka1chislo.jpg
../images/shop/1marka2chislo.jpg
../images/shop/1marka3chislo.jpg
../images/shop/1marka4chislo.jpg
../images/shop/1marka5chislo.jpg
../images/shop/1marka6chislo.jpg
../images/shop/1marka7chislo.jpg
INSERT INTO `clients`(`name`, 
`teephone`) VALUE ('Sergey','+79253887267')

INSERT INTO `imageShop`(`linkImage1`, 
`linkImage2`, `linkImage3` , `linkImage4`,
`linkImage5`,`linkImage6` , `linkImage7`) VALUE ("../images/shop/1marka1chislo.jpg",
"../images/shop/1marka2chislo.jpg",
"../images/shop/1marka3chislo.jpg","../images/shop/1marka4chislo.jpg",
"../images/shop/1marka5chislo.jpg","../images/shop/1marka6chislo.jpg","../images/shop/1marka7chislo.jpg");
INSERT INTO `imageShop`(`linkImage1`, 
`linkImage2`, `linkImage3` , `linkImage4`,
`linkImage5`,`linkImage6` ) VALUE ("../images/shop/1marka1chislo.jpg",
"../images/shop/1marka2chislo.jpg",
"../images/shop/1marka3chislo.jpg","../images/shop/1marka4chislo.jpg",
"../images/shop/1marka5chislo.jpg","../images/shop/1marka6chislo.jpg");
   INSERT INTO `accaunt_lists`(`title`) VALUE ("Проверочный список");
