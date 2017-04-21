<?php
define("CONTACT_FORM", 'elizaveta.kryazhkova@it-grad.ru');
 
$post = (!empty($_POST)) ? true : false;
 
if($post){
 
    $name = stripslashes($_POST['name']);
    $phone = stripslashes($_POST['phone']);
    $email = stripslashes($_POST['email']);
    $city = stripslashes($_POST['city']);
    $company = stripslashes($_POST['company']);
    $post = stripslashes($_POST['post']);
    $comment = stripslashes($_POST['comment']);
    $config = stripslashes($_POST['config']);
    
    $subject = 'Config';
    $from = "marketing@it-grad.ru";
    $error = '';    
    $message = '
        <html>
                <head>
                        <title>Заявка</title>
                </head>
                <body>
                        <p>Имя: '.$name.'</p>
                        <p>Телефон : '.$phone.'</p> 
                        <p>Email : '.$email.'</p>
                        <p>Город: '.$city.'</p>
                        <p>Компания : '.$company.'</p> 
                        <p>Должность : '.$post.'</p>
                        <p>Комментарий : '.$comment.'</p> 
                        <p>Конфигурация : '.$config.'</p> 
                </body>
        </html>';
 
    /*if (!ValidateEmail($email)){
        $error = 'Email введен неправильно!';
    }*/
 
    if(!$error){
        $mail = mail(CONTACT_FORM, $subject, $message,
             "From: <".$from.">\r\n"
            ."Reply-To: ".$email."\r\n"
            ."Content-type: text/html; charset=utf-8 \r\n"
            ."X-Mailer: PHP/" . phpversion(), "-f " . $from);
 
        if($mail){
            echo 'OK';
        }
    }else{
        echo '<div class="bg-danger">'.$error.'</div>';
    }
 
}
?>
