<?php
    $dbServerName = "localhost";
    $dbUserName = "amogh";
    $dbPassword = "1234";
    $dbDatabaseName = "codebox";

    $connection = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbDatabaseName);

    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
      }
?>