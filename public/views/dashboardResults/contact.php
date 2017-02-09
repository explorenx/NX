<?
ob_start();
if(isset($_POST['btnSubmit']))
{
require("class.phpmailer.php");

$mail = new PHPMailer();

//Your SMTP servers details

$mail->IsSMTP();               // set mailer to use SMTP
$mail->Host = "localhost";  // specify main and backup server or localhost
$mail->SMTPAuth = true;     // turn on SMTP authentication
$mail->Username = "enquiry@nxsearch.com";  // SMTP username
$mail->Password = "pune123##"; // SMTP password
//It should be same as that of the SMTP user

$redirect_url = "http://nxsearch.com/showResults/".$_SERVER['localhost']; //Redirect URL after submit the form

$mail->From = $mail->Username;	//Default From email same as smtp user
$mail->FromName = "enquiryForm";

$mail->AddAddress("enquiry@nxsearch.com", "NXsearch Enquiry"); //Email address where you wish to receive/collect those emails.

$mail->WordWrap = 50;                                 // set word wrap to 50 characters
$mail->IsHTML(true);                                  // set email format to HTML
$to ='enquiry@nxsearch.com';



$message = "Name of the enquirer :".$_POST['username']." \r\n <br>Email Adrress :".$_POST['useremail']." \r\n <br> Mobile No. :".$_POST['usermobile']." 
            \r\n <br>Selected Enquiry Date :".$_POST['date']." \r\n <br>Selected Enquiry Time :".$_POST['time'];
$mail->Body    = $message;

if(!$mail->Send())
{
   echo "Message could not be sent. <p>";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "Message has been sent";
header("Location: $redirect_url");
}
?>