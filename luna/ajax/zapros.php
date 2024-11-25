<?php

$stmt = $pdo->prepare( "SELECT * FROM advertisement WHERE id = ?");
$stmt->execute(  [2]);
$newOne = $stmt->fetchAll();
$newOne = $newOne[0];
?>