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

	public static function LoadPhotoId($idPhotoSet) {
		$urlCon = self::$urlBase;
		$params = '{"method": "LoadGroup","params": ['.$idPhotoSet.',"full",true],"id": 1}';
		dump($params);
		$headers = array('Content-Type: application/json', 'Content-Length: 75');
		// $postString = http_build_query($params, '', '&');
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
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

	private static function sendRequest($method,$urlId="") {

		$token = self::getTokenXML();
		$token   = simplexml_load_string($token, 'SimpleXMLElement', LIBXML_NOCDATA);
		$token = json_decode(json_encode((array)$token), TRUE);
		$token = $token[0];
		if ($urlId != "") {
			//parametros para los url de la pagina
			$params = array(
				'groupId' => $urlId,
				'level' => "Full",
				'includeChildren' => "true"
			);
		}
		else {
			// parametros para GetPopularSets
			$params = array(
				'type' => "Collection",
				'offset' => 0,
				'limit' => 15
			);
		}
		// https://api.zenfolio.com/api/1.8/zfapi.asmx/LoadGroup?groupId=847382622&level=full&includeChildren=1
		// https://api.zenfolio.com/api/1.8/zfapi.asmx/LoadGroup?groupId=847382622&level=full&includeChildren=string
		//otro codigo con el header y usuario
		//$headers = array('X-Zenfolio-Token: '.$token, 'Content-Type: text/xml; charset=utf-8', 'Content-Length: 0');
		$postString = http_build_query($params, '', '&');
		$headers = array('Content-Type: text/xml; charset=utf-8', 'Content-Length: 0');
		$urlCon = self::$urlBase . '/' . $method . '?' . $postString;
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}

	public static function loadGroup($idGroup){
		$params = array(
			'groupId' => $idGroup,
			'level' => "full",
			'includeChildren' => "true"
		);
		$postString = http_build_query($params, '', '&');
		$headers = array('Content-Type: text/xml; charset=utf-8', 'Content-Length: 0');
		$urlCon = self::$urlBase . '/LoadGroup?' . $postString;
		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}

	public static function loadGalery($idGalery){
		$params = array(
			'groupId' => $idGalery,
			'level' => "Full",
			'includeChildren' => "true"
		);
		$postString = http_build_query($params, '', '&');
		$headers = array('Content-Type: text/xml; charset=utf-8', 'Content-Length: 0');
		$urlCon = self::$urlBase . '/LoadPhotoSet?' . $postString;

		$ch = curl_init($urlCon);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, self::$userAgent);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}

	public static function getCategories($method,$urlId="") {
//		echo 'entrando-->';
		return self::sendRequest($method,$urlId);
	}
}

?>
