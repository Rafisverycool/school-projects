<?php
header('Content-Type: application/json');

require_once '/var/www/html/vendor/autoload.php';

try {
    $client = new MongoDB\Client("mongodb://root:rootwachtwoord@db:27017/");
    $collection = $client->inzendingen_db->inzendingen;

    $collection->insertOne([
        'naam'        => htmlspecialchars(trim($_POST['name'] ?? '')),
        'email'       => htmlspecialchars(trim($_POST['email'] ?? '')),
        'school'      => htmlspecialchars(trim($_POST['school'] ?? '')),
        'opleiding'   => htmlspecialchars(trim($_POST['opleiding'] ?? '')),
        'hobbys'      => htmlspecialchars(trim($_POST['hobbys'] ?? '')),
        'opmerkingen' => htmlspecialchars(trim($_POST['message'] ?? '')),
        'aangemaakt'  => new MongoDB\BSON\UTCDateTime()
    ]);

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}