<?php if ( $adminAvtorizacia2 == 1 ) : ?>


<div class="container">
    <div class="mainMenu">
        <br><br><br>
        <div class="links">
            <!--<a href="../../pages/admPanelVhod.php?clients" class="link">Клиенты</a>-->
            <br><br>
            <a href="../../pages/admPanelVhod.php?advertisement" class="link">Объявления</a>
            <br>
            <a href="../../pages/admPanelVhod.php?3d" class="link">Приложение 3D</a>
        </div>
    </div>
    
    <div class="content">
        <?php /*if ( !$_GET || isset( $_GET['clients'] ) ) :*/ ?>
            <?php /*include('clients.php');*/?>
        <?php /*endif;*/?>

        <?php if ( isset($_GET['advertisement']) ) : ?>
            <?php include('advertisement.php');?>
        <?php  endif;?>
        <?php if ( isset($_GET['3d']) ) : ?>
            <?php include('index.html');?>
        <?php  endif;?>
    </div>
</div>
<!--<h1>Добро пожаловать в личный кабинет</h1>-->


<?php endif;?>