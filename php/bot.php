<?php


const TOKEN = '5155241973:AAEpqldgxiHpelZFJUaaaJ6weZyvg11EkPE';
$method = 'setWebhook';
$url = 'https://api.telegram.org/bot' . TOKEN . '/' . $method;

$options = [
  'url' => 'https://lunagrupp.ru'
];

$response = file_get_contents($url . '?' . http_build_query($options));

//file_put_contents(__DIR__ . '/log.txt ' , file_get_contents('php://input'));

const URL = 'https://api.telegram.org/bot' . TOKEN . '/';

$update =  json_decode(file_get_contents('php://input'), JSON_OBJECT_AS_ARRAY);


function send ($method, $params = []){
  if (!empty($params)){
    $url = URL . $method . '?' . http_build_query($params);
  } else {
    $url = URL . $method;
  }
  return @json_decode(file_get_contents($url), JSON_OBJECT_AS_ARRAY);
}

$text  = $update['message']['text'];
$chat_id = $update['message']['chat']['id'];

if( $text == 'Привет' ){
    send('sendMessage', ['chat_id' => $chat_id, 'text' => "Привет"]);
} else if ($text == 'Телефоны'){
    send('sendMessage', ['chat_id' => $chat_id, 'text' => "Напишите модель"]);
} else if ($text == 'Аксессуары'){
    send('sendMessage', ['chat_id' => $chat_id, 'text' => "Выберите аксессуары"]);
} else if ($text == 'Ремонт'){
    send('sendMessage', ['chat_id' => $chat_id, 'text' => "Укажите неисправность"]);
} else {
    send('sendMessage', ['chat_id' => $chat_id,
    'text' => 'Команда не понятна',
    "reply_markup" => json_encode( [
        'resize_keyboard' => true,
        'keyboard' =>
            [
                [
                    ['text' => 'Телефоны'],
                    ['text' => 'Аксессуары'],
                ],
                [
                    ['text' => 'Ремонт'],
                ]
            ]
        ])
    ]);
}

$stmt = $pdo->prepare( "SELECT * FROM telegramClients");
$stmt->execute();
$clientsArray = $stmt->fetchAll();


$new = 1;

for($i = 0;$i<count($clientsArray);$i++){
    if($clientsArray[$i]['chat_id'] == $chat_id){
        $new = 0;   
    }
}

if($new == 1 && $chat_id !=0 ){
   
    $stmt = $pdo->prepare( "INSERT INTO telegramClients ( `chat_id`, `state`) VALUE( ?,?)");
    $stmt->execute(  [$chat_id, 1]);
    // $insert_chat_id = 'INSERT INTO `TelegramClients`(`chat_id`, `subscription`) VALUE( ' . $chat_id . ',  0 )';
    // $result2 = mysqli_query($conn, $insert_chat_id);
    send('sendMessage', ['chat_id' => $chat_id,
    'text' => 'Выберите раздел',
    "reply_markup" => json_encode( [
        'resize_keyboard' => true,
        'keyboard' =>
            [
                [
                    ['text' => 'Телефоны '],
                    ['text' => 'Аксессуары'],
                ],
                [
                    ['text' => 'Ремонт'],
                ]
            ]
        ])
    ]);
}
