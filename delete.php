<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// connexion MySQL
$host = "localhost";
$user = "root";
$pass = "";
$db   = "students"; // nom de ta base

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// récupérer l'id envoyé par React
$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? null;

if ($id) {
    $sql = "DELETE FROM registration WHERE id = $id"; // ⚠️ pas sécurisé pour l'instant
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "valid", "message" => "Student deleted successfully"]);
    } else {
        echo json_encode(["status" => "invalid", "message" => "Delete failed: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "invalid", "message" => "Missing id"]);
}

$conn->close();
?>
