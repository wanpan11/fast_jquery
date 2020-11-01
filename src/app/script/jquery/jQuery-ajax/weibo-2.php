<?php

$myfile = fopen('json/data.json', "r");
$flieContent = fread($myfile,filesize("json/data.json"));
print_r($flieContent.']'); 
// ?>