<?php session_start(); ?>
<script>
    //убрал скрипт повторнойотправки формы
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
<?php
    /*----------------------Сессия старт------------------------*/
    
    /*----------------------Сессия старт------------------------*/   
	/*----------------------ПЕРЕМЕННЫЕ ОБЛАСТИ ВИДИМОСТИ ------------------------*/
	$registration_email = 0;
	$registration_code = 0;
	$MenuMobil = 0;
    $adminAvtorizacia = 0;
    $correctTel = 1;
    $client = 0;
    $errorCode = 0;
    $clientVhod = 1;
    //$_SESSION['clientAvtorizacia'] = 'workkkkkk';
    /*echo $_SESSION['clientAvtorizacia'];
    /*echo 'wwwwwwwwwwwww';
    $adminAvtorizacia2 = $_SESSION['AdminAvtorizacia'];*/
	/*----------------------ПЕРЕМЕННЫЕ ОБЛАСТИ ВИДИМОСТИ ------------------------*/

	/*---------------------- ПОДКЛЮЧЕНИЕ БАЗЫ ДАННЫХ ------------------------*/
	// $host = 'localhost';
    // $database = 'test';
    // $user = "root";
    // $password = "root";
    //$pdo = new PDO( $dsn = "mysql:host=localhost;dbname=u1534790_default;charset=utf8mb4",'u1534790_default', 'tP78yXMUX1nzUO9g');
    $pdo = new PDO( $dsn = "mysql:host=localhost;dbname=workBD;charset=utf8mb4",'root', 'root');
	/*---------------------- ПОДКЛЮЧЕНИЕ БАЗЫ ДАННЫХ ------------------------*/
	/*---------------------- НАЧАЛО ПРОГРАММЫ РЕГИСТРАЦИИЯ ------------------------*/

    if(isset($_POST["registration"])){
    	$registration_tel = 1;
    }

    if(isset($_POST["tel"])){
        $registration_tel = 1;

    	$name = urldecode(htmlspecialchars( $_POST["Имя"]));
        $tel = $_POST["Телефон"];
        $tel = str_replace(" ","",$tel);
        $tel = str_split($tel);

        
        /*if($tel[0] != 8 && $tel[0] != '7' && count($tel) == 11){
            $correctTel = 0;
            //echo 'work';
        }
        if(count($tel) == 12 && ($tel[0] != '+' || $tel[1] != '7')){
            $correctTel = 0;
            //echo 'work';
        }
        if(count($tel) != 12 && count($tel) != 11){
            $correctTel = 0;
            //echo 'work';
        }
        if($correctTel == 0){
            $registration_tel = 1;
        }


        if(($tel[0] == 8 || $tel[0] == '7') && count($tel) == 11){
            $tel[0] = '+7';
        }*/
        $tel  = implode($tel);


        $stmt = $pdo->prepare( "SELECT * FROM `clients` WHERE `telephone` = ?");
        $stmt->execute(  [$tel/*'+79253887267'*/]);
        $tellClient = $stmt->fetchAll();
        if(count($tellClient) == 1){
            $client = 1;
        }

        if($client == 0 && $correctTel == 1){
            $arr_code =[0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];

            for( $i = 0; $i<4; $i++){
                $code = $code . rand(0,9); 
            }

            /*include("sendingSms/api.php");
            send_sms( $tel, $code );*/
            mail(/*$emali*/$tel, "Регистрация", "Проверочный код регистрации : ". $code,"From: luna.grupp@luna.grupp \r\n");
            $_SESSION['code'] = $code;
            $registration_tel = 0;
            $registration_code = 1;
        }
    	
    	 
       // mail($emali, "Регистрация", "Проверочный код регистрации : ". $code,"From: ibc365@ibc365.net \r\n");
    }
    /*echo '<pre>'; 
    print_r(  $_SESSION['code'] ); 
    echo '</pre>';*/
    
    if(isset($_POST["checkcode"])){
        $registration_code = 1;
    	$vvod_code =  urldecode(trim(htmlspecialchars($_POST["vvod_code"])));
        $name = $_POST["Имя"];
        $tel  = $_POST["Телефон"];
        $code = $_SESSION['code'];
         /*echo '<pre>'; 
        print_r(  $code ); 
        echo '</pre>';
        echo '<pre>'; 
        print_r(  $_SESSION['code'] ); 
        echo '</pre>';*/
        $vvod_code = (int) $vvod_code;
        $code =  (int) $code;


        if ($vvod_code == $code){
        $stmt = $pdo->prepare( "INSERT INTO clients ( `name`, `telephone`) VALUE( ?,?)");
        $stmt->execute(  [$name, $tel]);
            $registration_code = 0;
            $_SESSION['client'] = $tel;
        } else {
            $errorCode = 1;
        }
 
    }

    if(isset($_POST["telVhod"])){
        $vhod = 1;

        $tel = $_POST["Телефон"];
        $tel = str_replace(" ","",$tel);
        $tel = str_split($tel);

        
        /*if($tel[0] != 8 && $tel[0] != '7' && count($tel) == 11){
            $correctTel = 0;
            //echo 'work';
        }
        if(count($tel) == 12 && ($tel[0] != '+' || $tel[1] != '7')){
            $correctTel = 0;
            //echo 'work';
        }
        if(count($tel) != 12 && count($tel) != 11){
            $correctTel = 0;
            //echo 'work';
        }
        if($correctTel == 0){
            $registration_tel = 1;
        }


        if(($tel[0] == 8 || $tel[0] == '7') && count($tel) == 11){
            $tel[0] = '+7';
        }*/
        $tel  = implode($tel);


        $stmt = $pdo->prepare( "SELECT * FROM `clients` WHERE `telephone` = ?");
        $stmt->execute(  [$tel/*'+79253887267'*/]);
        $tellClient = $stmt->fetchAll();
        if(count($tellClient) != 1){
            $clientVhod = 0;
        }

        if($clientVhod == 1 && $correctTel == 1){
            $arr_code =[0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];

            for( $i = 0; $i<4; $i++){
                $code = $code . rand(0,9); 
            }

            /*include("sendingSms/api.php");
            send_sms( $tel, $code );*/
            mail(/*$emali*/$tel, "Регистрация", "Проверочный код входа : ". $code,"From: luna.grupp@luna.grupp \r\n");
            $_SESSION['code'] = $code;
            $vhod = 0;
            $vhod_code = 1;
        }

    }

    if(isset($_POST["checkcodeVhode"])){
        $vhod_code = 1;
    	$prover_code =  urldecode(trim(htmlspecialchars($_POST["vvod_code"])));
        /*$name = $_POST["Имя"];*/
        $tel  = $_POST["Телефон"];
        $code = $_SESSION['code'];
        /*echo '<pre>'; 
        print_r(   $prover_code); 
        echo '</pre>';
        echo '<pre>'; 
        print_r(   $code); 
        echo '</pre>';*/

        $prover_code = (int) $prover_code;
        $code =  (int) $code;


        if ($prover_code == $code){
        //$stmt = $pdo->prepare( "INSERT INTO clients ( `name`, `telephone`) VALUE( ?,?)");
        //$stmt->execute(  [$name, $tel]);
            $vhod_code = 0;
            $_SESSION['client'] = $tel;
            /*echo '<pre>'; 
            print_r(   $_SESSION['client']); 
            echo '</pre>';
            echo '<pre>'; 
            print_r(  $tel); 
            echo '</pre>';*/

        } else {
            $errorCode = 1;
        }
 
    }

    if(isset($_POST["exit"])){
        echo 'работает';
    	$registration_email = 0;
    	$registration_code = 0;
    }

   /*---------------------- КОНЕЦ ПРОГРАММЫ РЕГИСТРАЦИИЯ ------------------------*/
   /*---------------------- НАЧАЛО ПРОГРАММЫ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ------------------------*/
    /*---------------------- КОНЕЦ ПРОГРАММЫ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ------------------------*/

   /*---------------------- НАЧАЛО ПРОГРАММЫ ШАПКА ------------------------*/
   if(isset($_POST["button"])){
    $MenuMobil = 1;  
    }
    
    if(isset($_POST["button2"])){ 
    $MenuMobil = 0;  
    }

    /*---------------------- НАЧАЛО ПРОГРАММЫ ШАПКА ------------------------*/
    if(isset($_POST["vhod"])){
    	$vhod = 1;
    }
    /*---------------------- НАЧАЛО ПРОГРАММЫ АВТОРИЗАЦИИ------------------------*/
    if(!$adminAvtorizacia2){
    if(isset($_POST["AdminAvtorizacia"])){
    $password = urldecode(htmlspecialchars($_POST["password"]));
    $login = urldecode(htmlspecialchars($_POST["login"]));

    $stmt = $pdo->prepare( "SELECT * FROM Admin");
    $stmt->execute();
    $adminArray = $stmt->fetchAll();
    for ($i =0; $i<count($adminArray);$i++){
      if ($login == $adminArray[$i]['login'] && $password == $adminArray[$i]['password']){
        $adminAvtorizacia = 1;
        $_SESSION['AdminAvtorizacia'] = 1;
        $adminAvtorizacia2 = $_SESSION['AdminAvtorizacia'];
        break;
      }
    }
    }
  }
  //echo 'd  '. $_SESSION['AdminAvtorizacia'];
  //echo 'd  '. $adminAvtorizacia2;
  /*if($adminAvtorizacia2 == 1){
    echo "<script>self.location='administrator.php';</script>";
  }*/
   //BestAdmin2021 Andrey
   //German 2022SaranskBestSite
  /*---------------------- КОНЕЦ ПРОГРАММЫ АДМИН АВТОРИЗАЦИИ------------------------*/
  /*---------------------- НАЧАЛО ПРОГРАММЫ ПОДСЧЕТА ПОЛЬЗОВАТЕЛЕЙ------------------------*/
  //echo ( isset($_SESSION['v']));
  if (!isset($_SESSION['v'])) {
    $_SESSION['v'] = 'work';
    //echo $_SESSION['v'];
            $stmt = $pdo->prepare( "INSERT INTO `counting` ( sesion) VALUE( 1 )");
        $stmt->execute(  []);
  }
  /*---------------------- КОНЕЦ ПРОГРАММЫ ПОДСЧЕТА ПОЛЬЗОВАТЕЛЕЙ------------------------*/




  
  ?>

  <?php if ( $registration_tel == 1 ) : ?>
	

        <div id="registration" >
        <form action="" method="post">
            <div> <input type="submit" name="registration" value="Регистрация" class="Alfabutton" > <input type="submit" name="vhod" value="Вход" class="Alfabutton" ></div>
        </form>
        <form action="#" method="post">

        <!--<p>По почте <br></p>-->

        <br><br>
        <p>Введите имя: <br><input type="text" name="Имя" style="color: #000" required/></p>
        <?php if ( $correctTel != 0 ) : ?>
            <br>
        <?php endif; ?>
        <?php if ( $client != 0 ) : ?>
            <br>
        <?php endif; ?>
        <?php if ( $correctTel == 0 ) : ?>
            <p>Введен не верный формат телефона</p>
        <?php endif; ?>
        <?php if ( $client == 1 ) : ?>
            <p>Ваш номер уже зарегестрирован</p>
        <?php endif; ?>
        <p>Введите email: <br><input type="email"  name="Телефон" style="color: #000"  required/>
        </p>
        <br>



            <input type="submit" name="tel" value="Отправить" class="Alfabutton" >

        <br>

        </form> 
        <form action="#" method="post">
            <input type="submit" name="exit" value="Закрыть" class="BettaButtonRegistration" >
        </form>
        </div>

              
<?php endif; ?>


<?php if ( $registration_code == 1 ) : ?>

        <div id="code" >
        <form action="#" method="post">
        <br><br><br><br>
        <?php if ( $errorCode != 1 ) : ?>
            <br>
        <?php endif; ?>
        <?php if ( $errorCode == 1 ) : ?>
            <p>Введен не верный код</p>
        <?php endif; ?>
        <p>Введите код: <br><input type="text" name="vvod_code" style="color: #000"/></p>
        <input  style="display: none;" type="text" name="Имя" value=<?php echo $name; ?> />
        <input  style="display: none;"  type="text"  name="Телефон" value=<?php echo $tel; ?> />
        <br>


            <input type="submit" name="checkcode" value="Отправить" class="Alfabutton" >       
        <br><br>
        </form>
        <form action="#" method="post">
            <input type="submit" name="exit" value="Закрыть" class="BettaButtonRegistration" >
        </form>

        </div>

    
<?php endif; ?>

<?php if ( $vhod == 1 ) : ?>
	

    <div id="registration" >
    <form action="#" method="post">

    <!--<p>По почте <br></p>-->
        <div> <input type="submit" name="registration" value="Регистрация" class="Alfabutton" > <input type="submit" name="vhpd" value="Вход" class="Alfabutton" ></div>
    </form>
    <br><br><br>

    <?php if ( $correctTel != 0 ) : ?>
            <br>
    <?php endif; ?>
    <?php if ( $correctTel == 0 ) : ?>
            <p>Введен не верный формат телефона</p>
    <?php endif; ?>
    <?php if ( $clientVhod != 0 ) : ?>
            <br>
    <?php endif; ?>
    <?php if ( $clientVhod == 0 && $correctTel != 0) : ?>
            <p>Ваш email не зарегестрирован, пройдите пожалуйста регистрацию</p>
    <?php endif; ?>




    <form action="#" method="post">
    <br>
    <p>Введите email: <br><input  type="email"  name="Телефон" style="color: #000"  required/>
    </p>
    <br>



        <input type="submit" name="telVhod" value="Отправить" class="Alfabutton" >

    <br>

    </form> 
    <form action="#" method="post">
        <input type="submit" name="exit" value="Закрыть" class="BettaButtonRegistration" >
    </form>
    </div>

          
<?php endif; ?>

<?php if ( $vhod_code == 1 ) : ?>

<div id="code" >
<form action="#" method="post">
<br><br><br><br>
<?php if ( $errorCode != 1 ) : ?>
    <br>
<?php endif; ?>
<?php if ( $errorCode == 1 ) : ?>
    <p>Введен не верный код</p>
<?php endif; ?>
<p>Введите код: <br><input type="text" name="vvod_code" style="color: #000"/></p>
<input  style="display: none;"   type="email"  name="Телефон" value=<?php echo $tel; ?> />
<br>


    <input type="submit" name="checkcodeVhode" value="Отправить" class="Alfabutton" >       
<br><br>
</form>
<form action="#" method="post">
    <input type="submit" name="exit" value="Закрыть" class="BettaButtonRegistration" >
</form>

</div>


<?php endif; ?>