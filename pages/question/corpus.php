<?php
if(isset($_GET["corpus"])){
    $action = "corpus";
} 
?>
<?php if ( $action == "corpus") : ?>
    <div class="questionText">
        <h3>Уточните неисправность</h3>
    </div>
    <div class="question">
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;?>&arr[]=cap" class="bottonQuestion">Задняя крышка</a>
        <a href="../../pages/question.php<?php echo "?arr[]". '=' . $action;;?>&arr[]=frame" class="bottonQuestion">Рамка</a>
        <a href="../../pages/question.php<?php echo "?arr[]". '=' . $action;;?>&arr[]=buttons" class="bottonQuestion">Кнопки</a>
    </div>
<?php endif; ?>