<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Camus\AssetsBundle\Twig\ModelModuleExtension;
use App\lib\MDZenfolioConnection;
use phpZenfolio\Client;

class DefaultController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
      $urlId= "847382622";
      $modules = $this->getGroupElements($urlId,2,null,"level1");
      $arrayCss = array();
      $resultFileCss = array();
      $this->getListModules($modules,$arrayCss);
      if(count($arrayCss)){
        $resultFileCss = array_values(array_unique($arrayCss));
      }
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
        'meta' => "",
        'site_name' => "FotoChic by chic Magazine",
        'topContenDisplay' => "block",
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
        // dump($modules);
        // $modules = json_decode(json_encode((array)$modules), TRUE);
        // dump($modules);
        // die;
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
      // dump($xml);
      die;
      return $xml;
    }

    /**
    * @Route("/{gallery}", name="gallery")
    * @Route("/{gallery}/{year}", name="gallery_year")
    * @Route("/{gallery}/{year}/{fullGalery}", name="gallery_year_gallery")
     */
    public function showGaleryAction($gallery,$year="",$fullGalery="",Request $request){
      $slug = $request->getPathInfo();
      $pushGrupo = [];
      $modules = [];
      $arrayCss = [];
      $resultFileCss = [];
      $pageTitle="";
      $grupos = file_get_contents("./bundles/camusassets/grupos.json");
      $json_grupos= json_decode($grupos, true);
      dump($json_grupos);
      // die;
      if (!empty($json_grupos)) {
        if (isset($json_grupos[$gallery])) {
          if (!empty($year)) {
            //si el año es definido
            if (!empty($fullGalery)) {
              // si una galeria es definida
              if (isset($json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery])) {
                $codeId=$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["codeId"];
                $type= $json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["type"];
                $pageTitle= $json_grupos[$gallery]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["titulo"];
                if ($type==1) {
                  $modules= $this->getGaleryElements($codeId,2,$slug);
                  dump($modules);
                }else {
                  $modules= $this->getGroupElements($codeId,2,$slug);
                }
              }else {
                $this->addCategori($json_grupos,$gallery,3,$year,$fullGalery);
                exit;
              }
            }else {
              if (isset($json_grupos[$gallery]["year"][$year])) {
                $codeId=$json_grupos[$gallery]["year"][$year]["codeId"];
                $type= $json_grupos[$gallery]["year"][$year]["type"];
                $pageTitle= $json_grupos[$gallery]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["titulo"];
                if ($type==1) {
                  $modules= $this->getGaleryElements($codeId,2,$slug);
                }else {
                  $modules= $this->getGroupElements($codeId,2,$slug);
                }
              }else {
                $this->addCategori($json_grupos,$gallery,2,$year);
                exit;
              }
            }
          }else {
            // si el año no esta definido hay que ver que es lo que llego puede ser codigo de año
            $codeId=$json_grupos[$gallery]["codeId"];
            $type= $json_grupos[$gallery]["type"];
            $pageTitle= $json_grupos[$gallery]["titulo"];
            if ($type==1) {
              $modules= $this->getGaleryElements($codeId,2,$slug);
            }else {
              $modules= $this->getGroupElements($codeId,2,$slug);
            }
          }
        }else {
          // crear galeria tomando en cuneta que puede venir desde el año
          $this->addCategori($json_grupos,$gallery,1);
          exit;
        }
      }else {
        // si esta vacio hay que crearlo igual viendo  desde donde viene puede ser un año o galeria direcramente
        $this->addCategori($json_grupos,$gallery,1);
        exit;
      }

      $this->getListModules($modules,$arrayCss);
      if(count($arrayCss)){
        $resultFileCss = array_values(array_unique($arrayCss));
      }
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
        'meta' => "",
        'site_name' => "FotoChic by chic Magazine | ".$pageTitle,
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

    public function getGalery($gallery){
      $myXMLData = new MDZenfolioConnection;
      $prueba= $myXMLData->getPhotoSetById($gallery);
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
      // dump($myXMLData);
      $xml = simplexml_load_string($myXMLData) or die("Error: Cannot create object");
      // dump($xml);
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

    public function getGroupElements($groupId, $type=1, $slug="", $level="full", $includeChildren="true"){
      $client= new Client('fotoChic App/1.0 (https://fotos.chicmagazine.com.mx/)');
      $modules = [];
      $resultGroup = $client->LoadGroup($groupId, $level, $includeChildren);
      // $xml   = simplexml_load_string($resultGroup, 'SimpleXMLElement', LIBXML_NOCDATA);
  		// $group = json_decode(json_encode((array)$xml), TRUE);
      if ($type == 1) {
        return $resultGroup;
      }else {
        if (!empty($resultGroup->Elements)) {
          foreach ($resultGroup->Elements as $value) {
            $imagenes=[
              "type"=> "sn_base",
              "template"=> "bottom_text",
                "id"=> 110,
                "title"=> (isset($value->Title)) ? $value->Title: '',
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
                  "src"=> (isset($value->TitlePhoto)) ? "http://".$value->TitlePhoto->UrlHost."".$value->TitlePhoto->UrlCore."-2.jpg": '',
                ],
                "media"=> [],
                "heading"=> [],
                "extraData"=> [
                  "mediaTitle"=> "",
                  "headingTitle"=> "",
                  "mediaIconVisible"=> "hidden",
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
                  "src"=> (isset($value->TitlePhoto)) ? "http://".$value->TitlePhoto->UrlHost."".$value->TitlePhoto->UrlCore."-2.jpg": '',
                ],
                "content"=> [
                  "id"=> 2260,
                  "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value->PageUrl),
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
        return $modules;
      }
    }

    public function getGaleryElements($groupId, $type=1, $slug="", $level="full", $includeChildren="true"){
      $client= new Client('fotoChic App/1.0 (https://fotos.chicmagazine.com.mx/)');
      $modules = [];
      $resultGroup = $client->LoadPhotoSet($groupId, $level, $includeChildren);
      // $xml   = simplexml_load_string($resultGroup, 'SimpleXMLElement', LIBXML_NOCDATA);
  		// $group = json_decode(json_encode((array)$xml), TRUE);
      if ($type == 1) {
        return $resultGroup;
      }else {
        dump($resultGroup);
        if (!empty($resultGroup->Photos)) {
          foreach ($resultGroup->Photos as $value) {
            $r = "";
            $imagenes=[
              "type"=> "oo_background_image",
              "template"=> "top_text",
                "id"=> 110,
                "title"=> (isset($value->Title)) ? $value->Title: '',
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
                  "src"=> "http://".$value->UrlHost."".$value->UrlCore."-2.jpg"
                ],
                "content"=> [
                  "id"=> 2260,
                  "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value->PageUrl),
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
        return $modules;
      }
    }

    public function addCategori($grupos,$codeId,$depth,$subCategori="",$subSubCategori=""){
      if ($depth==1) {
        $type=2;
        $galleryId= substr( $codeId, 1, 100 );
        if (substr( $codeId, 0, 1 ) === "p") {
          $galeria= $this->getGaleryElements($galleryId, 1, null, "full", "false");
          $type=1;
        }else {
          $galeria= $this->getGroupElements($galleryId, 1, null, "full", "false");
          $type=2;
        }
        if (isset($galeria->faultcode)) {
          throw $this->createNotFoundException();
        }else {
          $pushGrupo= $grupos;
          $titleNorm= $this->normalizeText($galeria->Title);
          $newGrupo=[
            "titulo"=>$titleNorm,
            "codeId"=>$galleryId,
            "type"=>$type
          ];
          $pushGrupo[$titleNorm]= $newGrupo;
          $grupos = json_encode($pushGrupo);
          $file = './bundles/camusassets/grupos.json';
          file_put_contents($file, $grupos);
          header("Status: 301 Moved Permanently");
          header("Location: /".$titleNorm);
        }
      }elseif ($depth==2) {
        $pushGrupo= $grupos;
        $grupId= substr( $subCategori, 1, 100 );
        // $grupset= $this->getGroup($grupId, 'full', "false");
        $grupset= $this->getGroupElements($grupId, 1, null, "full", "false");
        $titleNorm= $this->normalizeText($grupset->Title);
        $addYear=[
          "titulo"=>$titleNorm,
          "codeId"=>$grupId,
          "type"=>2
        ];
        $pushGrupo[$codeId]["year"][$titleNorm]= $addYear;
        $grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$codeId."/".$titleNorm);
      }elseif ($depth==3) {
        $type=2;
        $galleryId= substr( $subSubCategori, 1, 100 );
        if (substr( $subSubCategori, 0, 1 ) === "p") {
          $galeria= $this->getGaleryElements($galleryId, 1, null, "full", "false");
          $type=1;
        }else {
          $galeria= $this->getGroupElements($galleryId, 1, null, "full", "false");
          $type=2;
        }
        if (isset($galeria->faultcode)) {
          throw $this->createNotFoundException();
        }else {
          $pushGrupo= $grupos;
          $titleNorm= $this->normalizeText($galeria->Title);
          $newGalery=[
            "titulo"=>$titleNorm,
            "codeId"=>$galleryId,
            "type"=>$type
          ];
          // $pushGrupo[$titleNorm]= $newGrupo;
          $pushGrupo[$codeId]["year"][$subCategori]["gallery"][$titleNorm]=$newGalery;
          $grupos = json_encode($pushGrupo);
          $file = './bundles/camusassets/grupos.json';
          file_put_contents($file, $grupos);
          header("Status: 301 Moved Permanently");
          header("Location: /".$codeId."/".$subCategori."/".$titleNorm);
        }
      }
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

    public function normalizeText($string){
      $string = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $string
      );
      $string = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $string
      );
      $string = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
        $string
      );
      $string = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $string
      );
      $string = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $string
      );
      $string = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'),
        array('n', 'N', 'c', 'C',),
        $string
      );
      $string = str_replace(
        " ",
        "-",
        $string
      );
      $string = str_replace(
        array("\\", "¨", "º", "~", "#",
              "@", "|", "!", "\"", "·",
              "$", "%", "&", "/", "(",
              ")", "?", "'", "¡", "¿",
              "[", "^", "<code>", "]",
              "+", "}", "{", "¨", "´",
              ">", "< ", ";", ",", ":",
              "."),
        '',
        $string
      );
      $string = strtolower($string);
      return $string;
    }

}
