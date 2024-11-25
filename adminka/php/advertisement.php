<?php 

$stmt = $pdo->prepare( "SELECT * FROM telegramClients");
$stmt->execute();
$clientsArray = $stmt->fetchAll();
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
  
    function make_upload($file , $arr){	
   
    // формируем уникальное имя картинки: случайное число и name
    
    $name = mt_rand(0, 10000) . $file['name'];
     //echo $name;
     //echo ("$_SERVER[DOCUMENT_ROOT]/img/photo/photo.jpg");
     //echo $name;
      copy($file['tmp_name'],"$_SERVER[DOCUMENT_ROOT]/imagesTelegram/" . $name);
      // $stmt = $pdo->prepare( "SELECT * FROM telegramClients");
      // $stmt->execute();
      // $clientsArray = $stmt->fetchAll();

      // for ($i = 0;$i<count($clientsArray); $i++){
      //   send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'photo' => 'https://lunagrupp.ru/imagesTelegram/' . $name]);
      // }
      for ($i = 0;$i<count($arr); $i++){
        send('sendPhoto', ['chat_id' => $arr[$i]['chat_id'], 'photo' => 'https://lunagrupp.ru/imagesTelegram/' . $name]);
      }
  
    
    }

  
    if( isset( $_FILES['image']) && !empty( $_FILES['image']['name'] ) ) {
    
      // проверяем, можно ли загружать изображение
      $check = can_upload($_FILES['image'] );
    
      if($check === true){
        // загружаем изображение на сервер
        
        make_upload($_FILES['image'] , $clientsArray );
        
        
        /*echo "<strong>Файл успешно загружен!</strong>";*/
      }
      else{
        // выводим сообщение об ошибке
        echo "<strong>$check</strong>";  
      }
    }

    if( isset( $_POST['Опубликовать'] ) ){

        if( !empty( $_FILES['image']['name'] ) ) {
      
            // Проверяем, что при загрузке не произошло ошибок
            if ( $_FILES['image']['error'] == 0 ) {
      
                // Если файл загружен успешно, то проверяем - графический ли он
                if( substr($_FILES['image']['type'], 0, 5) == 'image' ) {
                    $image = fopen( $_FILES['image']['tmp_name'], 'rb');
                    $stmt = $pdo->prepare("INSERT INTO `advertisement` ( `text`,`image`) VALUE(?,?)");
                    $text = $_POST['text'];
                    $stmt->bindParam( 1, $text, PDO::PARAM_STR );
                    $stmt->bindParam( 2, $image, PDO::PARAM_LOB );
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



                    // $Clients = 'SELECT `chat_id` FROM TelegramClients WHERE `subscription` = 1 AND `period` =3';
                    // $result = mysqli_query($conn, $Clients);
                    // $Clients_subscription = mysqli_fetch_all($result , MYSQLI_ASSOC);
                    // echo "<pre>"; print_r( $Clients_subscription); echo "</pre>";
                    // for($i = 0;$i<count($Clients_subscription); $i++){
                    //       send('sendMessage', ['chat_id' => $Clients_subscription[$i]['chat_id'], 'text' => $usd]);
                    //       $inser_history = 'INSERT INTO `TelegramHistory`(`chat_id`,`history`) VALUE( ' . $Clients_subscription[$i]['chat_id'] . ' , ' . $usd . ')';
                    //       $result4 = mysqli_query($conn, $inser_history);
                    // }
                    
                    $stmt = $pdo->prepare( "SELECT * FROM telegramClients");
                    $stmt->execute();
                    $clientsArray = $stmt->fetchAll();

                    for ($i = 0;$i<count($clientsArray); $i++){
                      //echo ($clientsArray[$i]['chat_id']);
                      //echo 1;
                    
                        send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'text' => $text]);
                        //send('sendPhoto', ['chat_id' => $clientsArray[$i]['chat_id'], 'photo' => "https://lunagrupp.ru/imagesTelegram/" . $name/*'https://yandex.ru/images/search?pos=1&img_url=https%3A%2F%2Fget.wallhere.com%2Fphoto%2Flandscape-lake-water-nature-reflection-sky-river-Canada-national-park-fjord-valley-wilderness-Alps-Alberta-Bank-mount-scenery-crater-lake-nature-reserve-Glacial-Lake-cloud-tree-travel-mountain-watercourse-reservoir-tarn-highland-mountainlake-computer-wallpaper-mountainous-landforms-mountain-range-moraine-hill-station-glacial-landform-water-feature-fell-cirque-elevation-lakemoraine-water-resources-868604.jpg&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0&lr=42&rpt=simage&source=wiz'*/ /*base64_encode($news[$i]['image'])*/]);
                    }
                } 
            }

        } else {
          $stmt = $pdo->prepare( "INSERT INTO `advertisement` ( `text`) VALUE(?)");
          $stmt->execute(  [$_POST['text']]);

          $stmt = $pdo->prepare( "SELECT * FROM telegramClients");
                    $stmt->execute();
                    $clientsArray = $stmt->fetchAll();

                    for ($i = 0;$i<count($clientsArray); $i++){
                    
                      send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'text' => $_POST['text']]);
                        
                    }
          /*$stmt = $pdo->prepare( "SELECT * FROM telegramClients");
          $stmt->execute();
          $clientsArray = $stmt->fetchAll();

          for ($i = 0;$i<count($clientsArray); $i++){
              send('sendMessage', ['chat_id' => $clientsArray[$i]['chat_id'], 'text' => $text]);
          }*/
        }

    }
?>


<form enctype="multipart/form-data" method="post" action="">
    <div class="boxNews">
        <!--<input type="text" name="zagolovok" class="textadmin" placeholder="Введите заголовок" required>
        <input type="text" name="shortDescription" class="textadmin" placeholder="Введите краткое описание" required>-->
        Изображение: <input type="file" name="image" class="textadmin"/>
        <!-- <input type="text" name="data" class="textadmin" placeholder="Введите дату" required>-->
        <textarea name="text" class="textadmin" cols="30" rows="10" placeholder="Введите описание" required></textarea>
        <input type="submit" value="Опубликовать" name="Опубликовать" class="textadmin buttonNews"/>
    </div>
</form>