<?php include("../php/registrationAndMysql.php");?>
<?php include("../php/bot.php");?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styleAdminka.css" type="text/css" media="all" />	
    <title>Document</title>
</head>
<body>
<?php
    $stmt = $pdo->prepare( "SELECT * FROM clients");
    $stmt->execute();
    $clientsArray = $stmt->fetchAll();
    //echo '<pre>';print_r('вывод' . $clientsArray[0]['id']);echo '</pre>';


?>

<?php if ( $adminAvtorizacia == 0 && !$adminAvtorizacia2) : ?>
<form action="" method="post">
<div class="box">
        <input type="text" name="login" class="textadmin" placeholder="Введите логин">
        <input type="password" name="password" class="textadmin" placeholder="Введите пароль">
        <input type="submit" class="textadmin buttonadmin" name="AdminAvtorizacia" value="Войти" id ="textgrid">
    </div>
    </form>
<?php endif; ?>

<?php include('../adminka/php/mainMenu.php'); ?>

</body>
</html>