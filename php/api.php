<?php

require_once __DIR__.'/creds.php';
require_once __DIR__.'/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");

function stop($response_code) {
    http_response_code($response_code); die();
}

function get_account($google_id, $email) {
    $data = [
        'google_id' => $google_id,
        'email' => $email,
        'bugs' => [
            'catched' => [1,3],
            'museum' => [1],
        ],
        'fishes' => [
            'catched' => [2,4],
            'museum' => [4],
        ],
        'fossils' => ['amber', 'ankylo_torso'],
        'villagers' => [5,6,7],
        'turnip_rates' => [
            'bought_qty' => 1150,
            'bought_price' => 91,
            'rates' => [
                81, 77, 110, 165, 235, 162, null, null, null, null, null, null
            ]
        ],
        'island' => [
            'name' => 'Kishi',
            'player' => 'Raknam',
            'hemisphere' => 'south' //north
        ]
    ];

    return $data;
}

if (!isset($_GET['act'])) stop(403);
switch($_GET['act']) {
    case 'login':
        if (!isset($_POST['token'])) stop(403);
        $token = $_POST['token'];

        $client = new Google_Client(['client_id' => GOOGLE_CLIENTID]);
        $payload = $client->verifyIdToken($token);
        if ($payload === false || $payload['aud'] != GOOGLE_CLIENTID)
            stop(401);

        $email = $payload['email'];
        $google_id = $payload['sub'];

        header("Content-Type: application/json");
        echo json_encode(["valid"=>true,"user"=>get_account($google_id,$email)]);
        die();
    default:
        stop(403);
}