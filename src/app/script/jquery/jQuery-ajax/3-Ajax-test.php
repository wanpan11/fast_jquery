<?php
/*
$products = array('nz'=>array('title'=>'精品女装','info'=>'好漂亮啊,我好想要呀！！！'),'bb'=>array('title'=>'精品包包','info'=>'此包只应天上有，你值得拥有。'),'tx'=>array('title'=>'精品拖鞋','info'=>'来啊，买啊，快活啊！！'));

$peoduct=$products [$_GET['name']];
echo $peoduct['title'];
echo '|';
echo $peoduct['info'];
*/
echo file_get_contents('4-ajax.txt');
?>