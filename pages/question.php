<?php include("../php/registrationAndMysql.php");?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<?php include("../php/header.php");?>
<?php
$action = "main"; 

if(isset($_GET["blocking"])){
    $action = "blocking";
    /*$stmt = $pdo->prepare( "SELECT * FROM tarif WHERE id = ?");
    $stmt->execute(  [$_POST["id"]]);
    $newOne = $stmt->fetchAll();
    $newOne = $newOne[0];*/
    /*if(isset($_GET["googl"])){
        $action = "googl";
    }
    if(isset($_GET["key"])){
        $action = "key";
    }
    if(isset($_GET["password"])){
        $action = "password";
    }*/
}


if(isset($_GET["arr"])){
    /*print_r($_GET["arr"]);*/
    $arr = $_GET["arr"];
    $action = "model";
}
if(isset($_GET["model"])){
    $action = "quality";
}
if(isset($_GET["original"])){
    $action = "original";
}
if(isset($_GET["replica"])){
    $action = "replica";
}

include("../php/sendingSms/api.php");
if(isset($_POST["sms"])){
    send_sms("","work");
    //s(89253887267,"work");
    //echo "woek";

}


?>
<?php include("question/charging.php");?>
<?php include("question/corpus.php");?>
<?php include("question/display.php");?>
<?php if ( $action == "main") : ?>
    <div class="questionText">
        <h3>Укажите неисправность</h3>
    </div>
    
    <div class="question">
    <form action="" method="post">
    <div style="display: flex;justify-content: center;">
    <input type="submit" class="bottonQuestion" name="sms" value="sms">
    </div>
    </form>
    
    <a href="../../pages/question.php?blocking=blocking" class="bottonQuestion">Разблокировка</a>
    <a href="../../pages/question.php?restart=restart" class="bottonQuestion">Перезагрузка</a>
    <a href="../../pages/question.php?charging=charging" class="bottonQuestion">Зарядка</a>
    <a href="../../pages/question.php?display=display" class="bottonQuestion">Дисплей</a>
    <a href="../../pages/question.php?sound=sound" class="bottonQuestion">Звук</a>
    <a href="../../pages/question.php?corpus=corpus" class="bottonQuestion">Диффекты корпуса</a>
    <a href="../../pages/question.php?camera=camera" class="bottonQuestion">Камера</a>
    
</div>
<?php endif; ?>
<?php if ( $action == "blocking") : ?>
    <div class="questionText">
        <h3>Уточните неисправность</h3>
    </div>
    <div class="question">
    
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;?>&arr[]=googl" class="bottonQuestion">Гугл аккаунт</a>
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;;?>&arr[]=key" class="bottonQuestion">Графический ключ</a>
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;;?>&arr[]=password" class="bottonQuestion">Парооль</a>
    </div>
<?php endif; ?>
<?php if ( $action == "model")  : ?>
    <div class="questionText">
        <h3>Уточните модель</h3>
    </div>
    <div class="question">
        <a href="../../pages/question.php?<?php 
        for ( $i=0; $i < count($arr);$i++){
            echo "&arr[]=" . $arr[$i];
        }
        ?>&model=IPhone10" class="bottonQuestion">IPhone10</a>
    </div>
<?php endif; ?>
<?php if ( $action == "quality") : ?>
    <div class="questionText">
        <h3>Качество запчастей?</h3>
    </div>
    <div class="question">
        <a href="../../pages/question.php?original=original<?php
            for ( $i=0; $i < count($arr);$i++){
                echo "&arr[]=" . $arr[$i];
            }
            echo "&arr[]=" . $_GET["model"];
        ;?>" class="bottonQuestion">Оригинальные</a>
            <a href="../../pages/question.php?replica=replica<?php
            for ( $i=0; $i < count($arr);$i++){
                echo "&arr[]=" . $arr[$i];
            }
            echo "&arr[]=" . $_GET["model"];
        ;?>" class="bottonQuestion">Реплика</a>
</div>
<?php endif; ?>
<?php if ( $action == "original" || $action == "replica") : ?>
    <div class="questionText">
        <h3>Способ получения?</h3>
    </div>
    <div class="question">
        <a href="../../pages/question.php?arr[]=<?php echo $action;?><?php
        for ( $i=0; $i < count($arr);$i++){
            echo "&arr[]=" . $arr[$i];
        }
       ;?>&delivery=delivery" class="bottonQuestion">Доставка на дом</a>
       <a href="../../pages/question.php?arr[]=<?php echo $action;?><?php
        for ( $i=0; $i < count($arr);$i++){
            echo "&arr[]=" . $arr[$i];
        }
       ;?>&pickup=pickup" class="bottonQuestion">Самовывоз</a>
    </div>
<?php endif; ?>
</body>
</html>