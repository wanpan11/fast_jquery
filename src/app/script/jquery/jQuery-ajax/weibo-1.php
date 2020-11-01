<?php
$speakText = $_GET['speakText'];
$speackTime = $_GET['speackTime'];
$timeStamp = $_GET['timeStamp'];
$txt= array('speakText'=>$speakText ,'speackTime'=>$speackTime ,'timeStamp'=>$timeStamp);

$file = "json/data.json";
if(file_exists($file))
{
    $myfile = fopen('json/data.json', "a+") or die("Unable to open file!");
    fwrite($myfile, ',');
    fwrite($myfile, json_encode($txt));
}
else
{  
    $myfile = fopen('json/data.json', "a+") or die("Unable to open file!");
    fwrite($myfile, '[');
    fwrite($myfile, json_encode($txt));
}
fclose($myfile);
exit(json_encode($txt));

?>