<?php

$a = 1;

// $pdo = new PDO( $dsn = "mysql:host=localhost;dbname=workBD;charset=utf8mb4",'root', '');
// $stmt = $pdo->prepare( "SELECT * FROM advertisement WHERE id = ?");
// $stmt->execute(  [2]);
// $newOne = $stmt->fetchAll();
// $newOne = $newOne[0];
// $newOne = base64_encode($newOne['image']);
// $newOne = 1;
$pdo = new PDO( $dsn = "mysql:host=localhost;dbname=workBD;charset=utf8mb4",'root', '');
if(isset( $_POST['param'])){
    $param = $_POST['param'];
}


switch($param){

    case 'id':
        $stmt = $pdo->prepare( "SELECT * FROM imageshop WHERE id = ?");
        $stmt->execute(  [$_POST['id']]);
        $linkImage = $stmt->fetchAll();
        $linkImage = $linkImage[0];
        $linkImage = $linkImage['linkImage'];
        echo json_encode( $linkImage, JSON_UNESCAPED_UNICODE);
        break;
    
    
    default:
    $stmt = $pdo->prepare( "SELECT `linkImage1`,`linkImage2` FROM imageshop WHERE id = ?");
    $stmt->execute(  [1]);
    $linkImage = $stmt->fetchAll();
    $linkImage = $linkImage[0];
    $arr = [];
    array_push($arr, $linkImage['linkImage1']);
    array_push($arr, $linkImage['linkImage2']);
    //$linkImage = $linkImage['linkImage1'];
    echo json_encode( $arr, JSON_UNESCAPED_UNICODE);
}
/*$stmt = $pdo->prepare( "SELECT * FROM imageshop WHERE id = ?");
$stmt->execute(  [1]);
$linkImage = $stmt->fetchAll();
$linkImage = $linkImage[0];
$linkImage = $linkImage['linkImage'];
echo json_encode( $linkImage, JSON_UNESCAPED_UNICODE);*/
?>