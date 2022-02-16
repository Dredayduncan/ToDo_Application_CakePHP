<?php


    // // echo $_GET['date']. "yes";

    // Get date 
    $date = $_GET['date'];

    // Store all the results from the search
    $result = [];

    /* iterate through all the tasks and append each task with the
    * searched date to the result array
    */
    foreach ($tasks as $task){
        if (strcmp($task->date->format('Y-m-d'), $date) == 0){
            array_push($result, $task);
        }
    }

    if (count($result) == 0){
        die('');
    }

    // Return the results
    die(json_encode($result));

?>