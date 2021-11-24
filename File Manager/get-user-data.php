<?php
session_start();
$user_id = $_SESSION["user_id"];
include_once "../login-backend/connector.php";

$get_files_sql = "select file_id, name, lang, modified from code_database where user_id = ".$user_id.";";
$result = $connection->query($get_files_sql);

$response = "";
while($row = $result->fetch_assoc()){
    $response = $response.$row["name"].",".$row["lang"].",".$row["modified"].", ".$row["file_id"]."&&";
}
echo substr($response, 0, strlen($response) - 2);
?>
