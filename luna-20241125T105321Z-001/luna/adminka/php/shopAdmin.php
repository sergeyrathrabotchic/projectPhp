<?php 


//send('sendMessage', ['chat_id' => $arr[$i]['chat_id'], 'photo' => 'https://lunagrupp.ru/imagesTelegram/8144ggg.jpg']);
function can_upload($file){
    // если имя пустое, значит файл не выбран
      if($file['name'] == '')
      return 'Вы не выбрали файл.';
    
    /* если размер файла 0, значит его не пропустили настройки 
    сервера из-за того, что он слишком большой */
    if($file['size'] == 0)
      return 'Файл слишком большой.';
    
    // разбиваем имя файла по точке и получаем массив
    $getMime = explode('.', $file['name']);
    // нас интересует последний элемент массива - расширение
    $mime = strtolower(end($getMime));
    // объявим массив допустимых расширений
    $types = array('jpg', 'png', 'gif', 'bmp', 'jpeg');
    
    // если расширение не входит в список допустимых - return
    if(!in_array($mime, $types))
      return 'Недопустимый тип файла.';
    
    return true;
    }
    $name = 0;
  
    function make_upload($file, $file2, $file3, $file4, $file5, $file6, $file7){
      $pdo = new PDO( $dsn = "mysql:host=localhost;dbname=u1534790_default;charset=utf8mb4",'u1534790_default', 'tP78yXMUX1nzUO9g');
      //$pdo = new PDO( $dsn = "mysql:host=localhost;dbname=workBD;charset=utf8mb4",'root', '');	
   
      // формируем уникальное имя картинки: случайное число и name
      
      $name = mt_rand(0, 1000000) . 1 . $file['name'];
      $name2 = mt_rand(0, 1000000) . 2 . $file2['name'];
      $name3 = mt_rand(0, 1000000) . 3 . $file3['name'];
      $name4 =mt_rand(0, 1000000) . 4 . $file4['name'];
      $name5 =mt_rand(0, 1000000) . 5 . $file5['name'];
      $name6 =mt_rand(0, 1000000) . 6 . $file6['name'];
      $name7 = mt_rand(0, 1000000) . 7 . $file7['name'];

     //echo $name;
     //echo ("$_SERVER[DOCUMENT_ROOT]/img/photo/photo.jpg");
     //echo $name;
      copy($file['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name);
      copy($file2['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name2);
      copy($file3['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name3);
      copy($file4['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name4);
      copy($file5['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name5);
      copy($file6['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name6);
      copy($file7['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/images/shop/" . $name7);
      $name = "../images/shop/" . $name;
      $name2 ="../images/shop/" . $name2;
      $name3 ="../images/shop/" . $name3;
      $name4 ="../images/shop/" . $name4;
      $name5 ="../images/shop/" . $name5;
      $name6 ="../images/shop/" . $name6;
      $name7 ="../images/shop/" . $name7;
      $stmt = $pdo->prepare("INSERT INTO `imageShop` (`linkImage1`, 
      `linkImage2`, `linkImage3` , `linkImage4`,
      `linkImage5`,`linkImage6` , `linkImage7`)  VALUE(?,?,?,?,?,?,?)");
      $stmt->bindParam( 1, $name , PDO::PARAM_STR );
      $stmt->bindParam( 2, $name2 , PDO::PARAM_STR);
      $stmt->bindParam( 3, $name3 , PDO::PARAM_STR);
      $stmt->bindParam( 4, $name4 , PDO::PARAM_STR);
      $stmt->bindParam( 5, $name5 , PDO::PARAM_STR);
      $stmt->bindParam( 6, $name6 , PDO::PARAM_STR);
      $stmt->bindParam( 7, $name7 , PDO::PARAM_STR);
      /*$data = $_POST['data'];
      $stmt->bindParam( 3, $data, PDO::PARAM_STR );
      $shortDescription = $_POST['shortDescription'];
      $stmt->bindParam( 4, $shortDescription, PDO::PARAM_STR );
      $description = $_POST['description'];
      $stmt->bindParam( 5, $description, PDO::PARAM_STR );*/
      /*$d = "Работает";
      $stmt->bindParam( 2,$d,PDO::PARAM_STR );*/
      $pdo->beginTransaction();
      $stmt->execute();
      $pdo->commit();
      // $stmt = $pdo->prepare( "SELECT * FROM telegramClients");
      // $stmt->execute();
      // $clientsArray = $stmt->fetchAll();

      // for ($i = 0;$i<count($clientsArray); $i++){
      //   send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'photo' => 'https://lunagrupp.ru/imagesTelegram/' . $name]);
      // }
    
  
    
    }

  
    if( /*isset( $_FILES['image'])*/isset( $_POST['Опубликовать'] ) && !empty( $_FILES['image']['name'] ) ) {
    
      // проверяем, можно ли загружать изображение
      $check = can_upload($_FILES['image'] );
      $check2 = can_upload($_FILES['image2'] );
      $check3 = can_upload($_FILES['image3'] );
      $check4 = can_upload($_FILES['image4'] );
      $check5 = can_upload($_FILES['image5'] );
      $check6 = can_upload($_FILES['image6'] );
      $check7 = can_upload($_FILES['image7'] );
    
      if($check === true && $check2 === true && $check3 === true && $check4 === true
      && $check5 === true && $check6 === true && $check7 === true){
        // загружаем изображение на сервер
        
        make_upload($_FILES['image'], $_FILES['image2'], $_FILES['image3'] , $_FILES['image4'],
        $_FILES['image5'] , $_FILES['image6'], $_FILES['image7'] );
        
        
        /*echo "<strong>Файл успешно загружен!</strong>";*/
      }
      else{
        // выводим сообщение об ошибке
        echo "<strong>$check</strong>";  
      }
    }

    // if( isset( $_POST['Опубликовать'] ) ){

    //     if( !empty( $_FILES['image']['name'] ) ) {
      
    //         // Проверяем, что при загрузке не произошло ошибок
    //         if ( $_FILES['image']['error'] == 0 ) {
      
    //             // Если файл загружен успешно, то проверяем - графический ли он
    //             if( substr($_FILES['image']['type'], 0, 5) == 'image' ) {
    //                 //$image = fopen( $_FILES['image']['tmp_name'], 'rb');
    //                 $image =
    //                 $stmt = $pdo->prepare("INSERT INTO `imageshop` ( `text`,`image`) VALUE(?,?)");
    //                 $text = $_POST['text'];
    //                 $stmt->bindParam( 1, $text, PDO::PARAM_STR );
    //                 $stmt->bindParam( 2, $image, PDO::PARAM_LOB );
    //                 /*$data = $_POST['data'];
    //                 $stmt->bindParam( 3, $data, PDO::PARAM_STR );
    //                 $shortDescription = $_POST['shortDescription'];
    //                 $stmt->bindParam( 4, $shortDescription, PDO::PARAM_STR );
    //                 $description = $_POST['description'];
    //                 $stmt->bindParam( 5, $description, PDO::PARAM_STR );*/
    //                 /*$d = "Работает";
    //                 $stmt->bindParam( 2,$d,PDO::PARAM_STR );*/
    //                 $pdo->beginTransaction();
    //                 $stmt->execute();
    //                 $pdo->commit();



    //                 // $Clients = 'SELECT `chat_id` FROM TelegramClients WHERE `subscription` = 1 AND `period` =3';
    //                 // $result = mysqli_query($conn, $Clients);
    //                 // $Clients_subscription = mysqli_fetch_all($result , MYSQLI_ASSOC);
    //                 // echo "<pre>"; print_r( $Clients_subscription); echo "</pre>";
    //                 // for($i = 0;$i<count($Clients_subscription); $i++){
    //                 //       send('sendMessage', ['chat_id' => $Clients_subscription[$i]['chat_id'], 'text' => $usd]);
    //                 //       $inser_history = 'INSERT INTO `TelegramHistory`(`chat_id`,`history`) VALUE( ' . $Clients_subscription[$i]['chat_id'] . ' , ' . $usd . ')';
    //                 //       $result4 = mysqli_query($conn, $inser_history);
    //                 // }
                    
    //                 $stmt = $pdo->prepare( "SELECT * FROM telegramClients");
    //                 $stmt->execute();
    //                 $clientsArray = $stmt->fetchAll();

    //                 for ($i = 0;$i<count($clientsArray); $i++){
    //                   //echo ($clientsArray[$i]['chat_id']);
    //                   //echo 1;
                    
    //                     send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'text' => $text]);
    //                     //send('sendPhoto', ['chat_id' => $clientsArray[$i]['chat_id'], 'photo' => "https://lunagrupp.ru/imagesTelegram/" . $name/*'https://yandex.ru/images/search?pos=1&img_url=https%3A%2F%2Fget.wallhere.com%2Fphoto%2Flandscape-lake-water-nature-reflection-sky-river-Canada-national-park-fjord-valley-wilderness-Alps-Alberta-Bank-mount-scenery-crater-lake-nature-reserve-Glacial-Lake-cloud-tree-travel-mountain-watercourse-reservoir-tarn-highland-mountainlake-computer-wallpaper-mountainous-landforms-mountain-range-moraine-hill-station-glacial-landform-water-feature-fell-cirque-elevation-lakemoraine-water-resources-868604.jpg&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0&lr=42&rpt=simage&source=wiz'*/ /*base64_encode($news[$i]['image'])*/]);
    //                 }
    //             } 
    //         }

    //     }

    // }
?>


<form enctype="multipart/form-data" method="post" action="">
    <div class="boxNews">
        <!--<input type="text" name="zagolovok" class="textadmin" placeholder="Введите заголовок" required>
        <input type="text" name="shortDescription" class="textadmin" placeholder="Введите краткое описание" required>-->
        Изображение1: <input type="file" name="image" class="textadmin"/>
        Изображение2: <input type="file" name="image2" class="textadmin"/>
        Изображение3: <input type="file" name="image3" class="textadmin"/>
        Изображение4: <input type="file" name="image4" class="textadmin"/>
        Изображение5: <input type="file" name="image5" class="textadmin"/>
        Изображение6: <input type="file" name="image6" class="textadmin"/>
        Изображение7: <input type="file" name="image7" class="textadmin"/>
        <!-- <input type="text" name="data" class="textadmin" placeholder="Введите дату" required>-->
        <textarea name="text" class="textadmin" cols="30" rows="10" placeholder="Введите описание" required></textarea>
        <input type="submit" value="Опубликовать" name="Опубликовать" class="textadmin buttonNews"/>
    </div>
</form>