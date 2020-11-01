<?php
//定义变量
// $wanp=12;
//打印 echo不能打印多个值
// echo $wanp;
// echo '<br>';
//print_r()可以打印多个值
// print_r();

// print_r($_GET);
print_r($_POST);
echo '<br>';
print_r($_FILES);

$fileInfo = $_FILES['upFile'];
$fileName = $fileInfo['name'];
$filePath = $fileInfo['tmp_name'];

echo $fileInfo;
echo '<br>';
echo $fileName;
echo '<br>';
echo $filePath;



// move_uploaded_file();

?>