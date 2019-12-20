<?php
namespace App\lib;

class MDZenfolioConnection {

	static $urlBase = 'https://api.zenfolio.com/api/1.8/zfapi.asmx';
	static $action = 'AuthenticatePlain';
	static $userAgent = 'Acme PhotoEdit plugin for Zenfolio v1.0';
	static $user = 'chicmagazine';
	static $pass = 'ch1c2011';

	public static function getPhotoSetById($idPhotoSet) {
		$urlCon = self::$urlBase . '/LoadPhotoSet';
		$params = array(
			'photosetId' => $idPhotoSet,
			'includePhotos' => 'true',
			'level' => 'Full'
		);
		$postString = http_build_query($params, '', '&');
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		$output = curl_exec($ch);
		return $output;
	}

	public static function getDownloadOriginalKey($photos) {
		$urlCon = self::$urlBase . '/GetDownloadOriginalKey';
		$params = array(
			'photoIds' => $photos,
			'password' => self::$pass
		);
		$postString = http_build_query($params, '', '&');
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		$output = curl_exec($ch);

		echo $output;
		echo "_________";
		return $output;
	}

	private static function getChallenge() {
		$urlCon = self::$urlBase . '/GetChallenge';

	}

	public static function getTokenXML() {
		$urlCon = self::$urlBase . '/' . self::$action;
		$params = array(
			'loginName' => self::$user,
			'password' => self::$pass
		);
		$postString = http_build_query($params, '', '&');
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		$output = curl_exec($ch);
		return $output;
	}

	public static function getToken() {
		$urlCon = self::$urlBase . '/' . self::$action;
		$params = array(
			'loginName' => self::$user,
			'password' => self::$pass
		);
		$params = array(
			self::$user,
			self::$pass
		);
		$message = json_encode(array('method'=>'AuthenticatePlain', 'params'=>$params, 'id'=>1));
		$headers = array('Content-Type: application/json', 'Content-Length: 0');
		$ch = curl_init(self::$urlBase);
//		$postString = http_build_query($message, '', '&');
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $message);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$output = curl_exec($ch);
		curl_close($ch);
		return json_encode($output);
	}

	private static function sendRequest($method) {
		$urlCon = self::$urlBase . '/' . $method;
		//$token = str_replace(' ', '', self::getToken());
		$token = self::getTokenXML();
		$token   = simplexml_load_string($token, 'SimpleXMLElement', LIBXML_NOCDATA);
		$token = json_decode(json_encode((array)$token), TRUE);
		// return $token[0];
		$token = $token[0];
//		$token = 'UtO1nqsbdmuM1lX81k3RJ93Olzaivxcy-8BBHNAAiDylbcLWQTwZiP4aN4-PI5_qPHkE_EjuUKM9XOJYLNzTQWNk0eovEP1xQoaAFfEHU5HJ4RqQmzJlLw3F-8mQb-kpn7LcWL_Mqo8PxbKtY-xiKp1YrwlQB0Si7INA4kRwOK3y_oiQ_Nc9LljRpGOI9DU_2CVpjrqRC0OSKCbK17XXptG0fJPwVwx2EAQx_FIJqio=';
//		$token = trim(self::getToken());
//		echo $token;
//		return;
		$headers = array('X-Zenfolio-Token: '.$token, 'Content-Length: 0');
		//print_r($headers);
		//return;
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}

	public static function getCategories() {
//		echo 'entrando-->';
		return self::sendRequest('GetRecentSets');
	}
}

?>
