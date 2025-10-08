<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$host = "localhost";
$user = "root";
$pass = "";
$db   = "students";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// lire les données envoyées par React
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$first_name = $data["first_name"] ?? '';
$last_name  = $data["last_name"] ?? '';
$email      = $data["email"] ?? '';

if ($id && $first_name && $last_name && $email) {
    // requête sécurisée avec prepared statement
    $stmt = $conn->prepare("UPDATE registration SET first_name=?, last_name=?, email=? WHERE id=?");
    $stmt->bind_param("sssi", $first_name, $last_name, $email, $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "valid", "message" => "Student updated successfully"]);
    } else {
        echo json_encode(["status" => "invalid", "message" => "Update failed"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "invalid", "message" => "Missing required fields"]);
}

$conn->close();
?>
