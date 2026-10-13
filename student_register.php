<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 0);

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$timestamp = date("m-d-Y H:i:s");

$email_address = trim($data['email_address'] ?? '');
$full_name = trim($data['full_name'] ?? '');
$whatsapp_number = trim($data['whatsapp_number'] ?? '');
$email_id = trim($data['email_id'] ?? $email_address);
$country = trim($data['country'] ?? '');
$highest_qualification = trim($data['highest_qualification'] ?? '');
$year_of_passing = trim($data['year_of_passing'] ?? '');
$college_university_name = trim($data['college_university_name'] ?? '');
$internship_domain = trim($data['internship_domain'] ?? '');
$internship_start_date = trim($data['internship_start_date'] ?? '');
$internship_tenure = trim($data['internship_tenure'] ?? '');
$reference_name = trim($data['reference_name'] ?? '');
$column_1 = trim($data['column_1'] ?? '');

if ($email_address == '' || $full_name == '' || $whatsapp_number == '') {
    echo json_encode([
        "status" => "error",
        "message" => "Required fields missing"
    ]);
    exit;
}

$sql = "INSERT INTO interns (
    timestamp,
    email_address,
    full_name,
    whatsapp_number,
    email_id,
    country,
    highest_qualification,
    year_of_passing,
    college_university_name,
    internship_domain,
    internship_start_date,
    internship_tenure,
    reference_name,
    column_1
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Prepare failed: " . mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    "ssssssssssssss",
    $timestamp,
    $email_address,
    $full_name,
    $whatsapp_number,
    $email_id,
    $country,
    $highest_qualification,
    $year_of_passing,
    $college_university_name,
    $internship_domain,
    $internship_start_date,
    $internship_tenure,
    $reference_name,
    $column_1
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => "success",
        "message" => "Registration saved successfully",
        "insert_id" => mysqli_insert_id($conn)
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Execute failed: " . mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>