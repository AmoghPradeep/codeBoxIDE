
<?php
	if (isset($_FILES["profilepic"])){
		echo "here";
		session_start();
		$user_id = $_SESSION["user_id"];
		$info = pathinfo($_FILES['profilepic']['name']);
		$ext = $info['extension'];
		$newname = $user_id.".".$ext;

		$target = "../UserPhotos/".$newname;
		move_uploaded_file( $_FILES['profilepic']['tmp_name'], $target);
		include_once "../login-backend/connector.php";

		$makeEntry = "select count(*) as count from photo_data where user_id = ".$user_id.";";

		$result = $connection->query($makeEntry);
		$count = null;
		while ($row = $result->fetch_assoc()){
			$count = $row["count"];
		}

		$sql = null;
		if ($count == 1){
			$sql = "update photo_data set file_name = '".$target."' where user_id = ".$user_id.";";
		}
		else{
			$sql = "insert into photo_data values (".$user_id.", '".$target."');";
		}
        echo $sql;
		$connection->query($sql);
		unset($_FILES["profilepic"]);

        header("Location: file-manager-main.php?update=true");
	}
	else
		echo "not set!\n";
?>