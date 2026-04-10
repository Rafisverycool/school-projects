<?php
header('Content-Type: application/json');

$host     = 'db';                          // matches service name in docker-compose
$db       = 'inzendingen_db';
$user     = 'gebruiker';
$password = 'wachtwoord';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        INSERT INTO inzendingen (naam, email, school, opleiding, hobbys, opmerkingen)
        VALUES (:naam, :email, :school, :opleiding, :hobbys, :opmerkingen)
    ");

    $stmt->execute([
        ':naam'        => htmlspecialchars(trim($_POST['name'] ?? '')),
        ':email'       => htmlspecialchars(trim($_POST['email'] ?? '')),
        ':school'      => htmlspecialchars(trim($_POST['school'] ?? '')),
        ':opleiding'   => htmlspecialchars(trim($_POST['opleiding'] ?? '')),
        ':hobbys'      => htmlspecialchars(trim($_POST['hobbys'] ?? '')),
        ':opmerkingen' => htmlspecialchars(trim($_POST['message'] ?? '')),
    ]);

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}