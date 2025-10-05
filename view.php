<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // autoriser React à accéder
header("Access-Control-Allow-Methods: GET");

// connexion MySQL
$host = "localhost";
$user = "root";
$pass = "";
$db   = "students"; // ⚠️ ton nom de base

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

// récupérer tous les étudiants
$sql = "SELECT id, first_name, last_name, email FROM registration"; // ⚠️ la table que tu utilises
$result = $conn->query($sql);

$students = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

// renvoyer le tableau JSON
echo json_encode($students);

$conn->close();
?>
