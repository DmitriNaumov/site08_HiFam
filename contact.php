<?php
$recepient = "hifam.club@gmail.com";
$sitename = "HiFam";

$name = ($_POST["name"]);
$tel = ($_POST["tel"]);

$name = trim($name);
$tel = trim($tel);

$name = htmlspecialchars($name);
$tel = htmlspecialchars($tel);

$name = urldecode($name);
$tel = urldecode($tel);

$message = "Имя: $name \nТелефон: $tel";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
