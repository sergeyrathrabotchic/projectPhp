<?php
if(isset($_GET["charging"])){
    $action = "charging";
} 
?>
<?php if ( $action == "charging") : ?>
    <div class="questionText">
        <h3>Уточните неисправность</h3>
    </div>
    <div class="question">
    
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;?>&arr[]=usb" class="bottonQuestion">USB разьем</a>
        <a href="../../pages/question.php<?php echo "?arr[]". '=' . $action;;?>&arr[]=battery" class="bottonQuestion">Аккумулятор</a>
    </div>
<?php endif; ?>