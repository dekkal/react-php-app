<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// connexion MySQL
$host = "localhost";
$user = "root";         
$pass = "";            
$db   = "students"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// lire les données envoyées par React (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data["first_name"] ?? '';
$last_name  = $data["last_name"] ?? '';
$email      = $data["email"] ?? '';

if ($first_name && $last_name && $email) {
    // requête SQL directe (⚠️ pas sécurisé)
    $sql = "INSERT INTO registration (first_name, last_name, email) 
            VALUES ('$first_name', '$last_name', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "valid", "message" => "Student added successfully"]);
    } else {
        echo json_encode(["status" => "invalid", "message" => "Insert failed: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "invalid", "message" => "Missing required fields"]);
}

$conn->close();
?>
