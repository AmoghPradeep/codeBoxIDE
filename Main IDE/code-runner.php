<?php
    // processing request from client...
    $dataObj = file_get_contents("php://input");
    $dataJSON = json_decode($dataObj);

    $idx = 0;
    $data = [];

    foreach ($dataJSON as $key => $value){
        $data[$idx ++] = $value;
    }

    // preparing files...
    if ($data[2] === "C++"){
        $inputfile = fopen("input.txt", "w");
        $codefile = fopen("user-code.cpp", "w");
        fwrite($inputfile, $data[1]);
        fwrite($codefile, $data[0]);

        // executing code locally...
        function my_shell_exec($cmd, &$stdout=null, &$stderr=null) {
            $proc = proc_open($cmd,[
                1 => ['pipe','w'],
                2 => ['pipe','w'],
            ],$pipes);
            $stdout = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            $stderr = stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            return proc_close($proc);
        }
        $stderr = null;
        $stdout = null;
        $returnval = my_shell_exec("g++ user-code.cpp", $stdout, $stderr);

        // if compile error
        if ($returnval === 1){
            echo "exit code : ".$returnval;
            echo ",stdout : ".$stdout;
            echo ",stderr : ".$stderr;
            exit;
        }

        // responding with output if compile successful...
        shell_exec("a");
        $output = file_get_contents("output.txt");
        echo $output;
    }
    else if ($data[2] === 'py'){
        $inputfile = fopen("input.txt", "w");
        $codefile = fopen("user-code.py", "w");
        fwrite($inputfile, $data[1]);
        fwrite($codefile, $data[0]);

        function my_shell_exec($cmd, &$stdout=null, &$stderr=null) {
            $proc = proc_open($cmd,[
                1 => ['pipe','w'],
                2 => ['pipe','w'],
            ],$pipes);
            $stdout = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            $stderr = stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            return proc_close($proc);
        }

        $stderr = null;
        $stdout = null;
        $returnval = my_shell_exec("python user-code.py", $stdout, $stderr);
        if ($returnval === 1){
            echo "exit code : ".$returnval;
            echo ",stdout : ".$stdout;
            echo ",stderr : ".$stderr;
            exit;
        }

        $output = file_get_contents("output.txt");
        echo $output;
    }
?>