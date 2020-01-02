<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Camus\AssetsBundle\Twig\ModelModuleExtension;
use App\lib\MDZenfolioConnection;

class DefaultController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
      $urlId= "847382622";
      $galeria= $this->getGroup($urlId);
      $modules = [];
      $arrayCss = array();
      $resultFileCss = array();
      // dump($galeria);
      // die;
      if (!empty($galeria["Elements"]["Group"])) {
        foreach ($galeria["Elements"]["Group"] as $value) {
          $r = "";
          $imagenes=[
            "type"=> "sn_base",
            "template"=> "bottom_text",
              "id"=> 110,
              "title"=> (isset($value["Title"])) ? $value["Title"]: '',
              "abstract"=> "",
              "body"=> "",
              "thumbnailClippingLarger"=> [
                "width"=> 600,
                "height"=> 341,
                "x"=> 0,
                "y"=> 13,
                "quality"=> 100,
                "id"=> 1989,
                "fileType"=> "image/jpeg",
                "publishedVersion"=> [
                  "id"=> 8385,
                  "title"=> "Bodas",
                  "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
                ],
                "src"=> "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg"
              ],
              "media"=> [],
              "heading"=> [],
              "extraData"=> [
                "mediaTitle"=> "",
                "headingTitle"=> "",
                "mediaIconVisible"=> "hidden"
              ],
              "thumbnail"=> [
                "width"=> 318,
                "height"=> 373,
                "x"=> 251,
                "y"=> 0,
                "quality"=> 100,
                "id"=> 1988,
                "fileType"=> "image/jpeg",
                "publishedVersion"=> [
                  "id"=> 8385,
                  "title"=> "Bodas",
                  "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
                ],
                "src"=> "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg"
              ],
              "content"=> [
                "id"=> 2260,
                "slug"=> "/".str_replace("https://fotos.chicmagazine.com.mx/f","",$value["PageUrl"]),
                "xalokId"=> null,
                "author"=> null
              ],
              "clippings"=> [
                "default"=> [
                  "window_width"=> 320,
                  "width"=> 300
                ],
                "size_1272"=> [
                  "window_width"=> 638,
                  "width"=> 618
                ]
              ],
              "modules"=> []
          ];
          array_push($modules,$imagenes);
        }
      }
      $this->getListModules($modules,$arrayCss);
      if(count($arrayCss)){
        $resultFileCss = array_values(array_unique($arrayCss));
      }
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
        'meta' => "",
        'site_name' => "FotoChic by chic Magazine",
        'site_short_domain' => "FotoChic",
        'modules' => $modules,
        'headerType' => 1,
        'currentSection' => "",
        'page' => 1,
        'boardColor' => "#b10b1f",
        'amp_domain' => "none",
        'piano_domain' => "none",
        'fileCSS' => $resultFileCss,
        'number' => 100
      ));
      return $responseRender;
    }
    /**
     * @Route("/lucky/number")
     */
    public function luckyAction()
    {
        $number = random_int(0, 100);

        return $this -> render ( 'base/base2.html.twig' , [
            'number' => $number ,
        ]);
    }

    /**
     * @Route("/prueba-modulos-estadisticos")
     */
    public function getPruebaModulosAction(){
        $string = file_get_contents("./bundles/camusassets/modulos.json");
        $modules = json_decode($string, true)["modules"];
        $arrayCss = array();
        $resultFileCss = array();
        $this->getListModules($modules,$arrayCss);
        if(count($arrayCss)){
          $resultFileCss = array_values(array_unique($arrayCss));
        }
        $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
          'meta' => "",
          'site_name' => "Milenio",
          'site_short_domain' => "Milo",
          'modules' => $modules,
          'headerType' => 1,
          'currentSection' => "",
          'page' => 1,
          'boardColor' => "#b10b1f",
          'amp_domain' => "none",
          'piano_domain' => "none",
          'fileCSS' => $resultFileCss,
          'number' => 100
        ));
        return $responseRender;
    }

    /**
      * @Route("/prueba")
     */
    public function pruebaApi(){
      $myXMLData = new MDZenfolioConnection;
      $method= "LoadGroup";
      $urlId= "847382622";
      $prueba= $myXMLData->getCategories($method,$urlId);
      // dump($prueba);
      // die;
      $xml   = simplexml_load_string($prueba, 'SimpleXMLElement', LIBXML_NOCDATA);
      $photos = $xml->Photos->Photo;

  		$xml = json_decode(json_encode((array)$xml), TRUE);
      dump($xml);
      die;
      return $xml;
    }

    /**
      * @Route("/{galery}")
     */
    public function showGaleryAction($galery){
      // dump($galery);
      $galeria= $this->getGroup($galery);
      $modules = [];
      $arrayCss = array();
      $resultFileCss = array();

      // ?sn=".$value['Sequence']."&tk=".$value['UrlToken']
      // ?sn=".$value['Sequence']."&tk=".$value['UrlToken']
      // dump($galeria);
      // die;
      if (!empty($galeria["Elements"])) {
        if (!empty($galeria["Elements"]["Group"])) {
          foreach ($galeria["Elements"]["Group"] as $value) {
            $r = "";
            $imagenes=[
              "type"=> "sn_base",
              "template"=> "bottom_text",
                "id"=> 110,
                "title"=> (isset($value["Title"])) ? $value["Title"]: '',
                "abstract"=> "",
                "body"=> "",
                "media"=> [],
                "heading"=> [],
                "extraData"=> [
                  "mediaTitle"=> "",
                  "headingTitle"=> "",
                  "mediaIconVisible"=> "hidden"
                ],
                "thumbnail"=> [
                  "width"=> 318,
                  "height"=> 373,
                  "x"=> 251,
                  "y"=> 0,
                  "quality"=> 100,
                  "id"=> 1988,
                  "fileType"=> "image/jpeg",
                  "publishedVersion"=> [
                    "id"=> 8385,
                    "title"=> "Bodas",
                    "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
                  ],
                  "src"=> "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg"
                ],
                "content"=> [
                  "id"=> 2260,
                  "slug"=> "/".str_replace("https://fotos.chicmagazine.com.mx/f","",$value["PageUrl"]),
                  "xalokId"=> null,
                  "author"=> null
                ],
                "clippings"=> [
                  "default"=> [
                    "window_width"=> 320,
                    "width"=> 300
                  ],
                  "size_1272"=> [
                    "window_width"=> 638,
                    "width"=> 618
                  ]
                ],
                "modules"=> []
            ];
            array_push($modules,$imagenes);
          }
        }elseif (!empty($galeria["Elements"]["PhotoSet"])) {
          // dump($galeria["Elements"]["PhotoSet"]);
          // die;
          foreach ($galeria["Elements"]["PhotoSet"] as $value) {
            dump($value);
            $r = "";
            $imagenes=[
              "type"=> "sn_base",
              "template"=> "bottom_text",
                "id"=> 110,
                "title"=> (isset($value["Title"])) ? $value["Title"]: '',
                "abstract"=> "",
                "body"=> "",
                "media"=> [],
                "heading"=> [],
                "extraData"=> [
                  "mediaTitle"=> "",
                  "headingTitle"=> "",
                  "mediaIconVisible"=> "hidden"
                ],
                "thumbnail"=> [
                  "width"=> 318,
                  "height"=> 373,
                  "x"=> 251,
                  "y"=> 0,
                  "quality"=> 100,
                  "id"=> 1988,
                  "fileType"=> "image/jpeg",
                  "publishedVersion"=> [
                    "id"=> 8385,
                    "title"=> "Bodas",
                    "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
                  ],
                  "src"=> (isset($value["TitlePhoto"])) ? "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg": ''
                ],
                "content"=> [
                  "id"=> 2260,
                  "slug"=> "/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
                  "xalokId"=> null,
                  "author"=> null
                ],
                "clippings"=> [
                  "default"=> [
                    "window_width"=> 320,
                    "width"=> 300
                  ],
                  "size_1272"=> [
                    "window_width"=> 638,
                    "width"=> 618
                  ]
                ],
                "modules"=> []
            ];
            array_push($modules,$imagenes);
          }
        }
      }
      $this->getListModules($modules,$arrayCss);
      if(count($arrayCss)){
        $resultFileCss = array_values(array_unique($arrayCss));
      }
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
        'meta' => "",
        'site_name' => "FotoChic by chic Magazine | ".$galeria["Title"],
        'site_short_domain' => "Milo",
        'modules' => $modules,
        'headerType' => 1,
        'currentSection' => "",
        'page' => 1,
        'boardColor' => "#b10b1f",
        'amp_domain' => "none",
        'piano_domain' => "none",
        'fileCSS' => $resultFileCss,
        'number' => 100
      ));
      return $responseRender;
    }

    public function getGalery($galery){
      $myXMLData = new MDZenfolioConnection;
      $prueba= $myXMLData->getPhotoSetById($galery);
      $xml   = simplexml_load_string($prueba, 'SimpleXMLElement', LIBXML_NOCDATA);
      $photos = $xml->Photos->Photo;

      // dump($photos);
      // foreach ($photos as $value) {
      //   dump($value);
      // }
  		$xml = json_decode(json_encode((array)$xml), TRUE);
      // dump($xml);
      // die;
      return $xml;
      // dump($xml["Photos"]["Photo"]);
      // $photos = $xml["Photos"]["Photo"];


      //id de la galeria
      //4041378296509351132

      //equivalente en la pagina
      //p107594972
      $myXMLData = $myXMLData->getPhotoSetById("4041378296509351132");
      dump($myXMLData);
      $xml = simplexml_load_string($myXMLData) or die("Error: Cannot create object");
      dump($xml);
      $photos = $xml -> Photos -> Photo;
      die;
      // if ($xml === false) {
      //   echo "Failed loading XML: ";
      //   foreach(libxml_get_errors() as $error) {
      //       echo "<br>", $error -> message;
      //   }
      // } else {
      // $photos = $xml -> Photos -> Photo;
      // $dir = $xml -> Id . '-' . $xml -> Title;
      // if (!file_exists($dir)) {
      //   mkdir($dir, 0777, true);
      // }
      // echo $dir . PHP_EOL;
      // for ($i = 0; $i < count($photos); $i++) {
      //   $name = $photos[$i] -> Id . '-' . $photos[$i] -> FileName;
      //   file_put_contents($dir . '/' . $photos[$i] -> FileName, file_get_contents($photos[$i] -> OriginalUrl));
      //   echo PHP_EOL . 'downloaded--> '. $photos[$i] -> Title;// . PHP_EOL;
      // }
      // echo PHP_EOL . '------------ terminado ------------';
      // }
    }

    public function getGroup($urlId){
      $myXMLData = new MDZenfolioConnection;
      $resultGroup= $myXMLData->loadGroup($urlId);
      $xml   = simplexml_load_string($resultGroup, 'SimpleXMLElement', LIBXML_NOCDATA);
  		$group = json_decode(json_encode((array)$xml), TRUE);
      return $group;
    }
    public function splitTemplate($template){
      $type = explode("_",$template);
      $group = $type[0];
      unset($type[0]);
      array_keys($type);
      $moduleType = join("_",$type);

      return array(
        0 => $group,
        1 => $moduleType
      );
    }
    public function getListModules($modules,& $arrayModules){
      foreach ($modules as $module) {
        $type = $this->splitTemplate($module["type"]);
        $template = $module["template"];
        // $template = $this->splitTemplate($module->template);
        // if($template[0] == end($type[1])){
        //   $template = $template[1];
        // }else{
        //   $template = implode("-", $template);
        // }
        $fileCSS = $type[0]."/".str_replace("_","-",$type[1])."/".str_replace("_","-",$template).".css";
        array_push($arrayModules,$fileCSS);
        // dump($arrayModules);
        // $this->getListModules($module,$arrayModules);
      }
    }

}
