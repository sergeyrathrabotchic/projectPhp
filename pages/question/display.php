<?php
if(isset($_GET["display"])){
    $action = "display";
} 
?>
<?php if ( $action == "display") : ?>
    <div class="questionText">
        <h3>Уточните неисправность</h3>
    </div>
    <div class="question">
    
        <a href="../../pages/question.php<?php echo "?arr[]" . '=' . $action;?>&arr[]=сrack" class="bottonQuestion">Трещина на стекле</a>
        <a href="../../pages/question.php<?php echo "?arr[]". '=' . $action;;?>&arr[]=replacement" class="bottonQuestion">Замена дисплея</a>
    </div>
<?php endif; ?>