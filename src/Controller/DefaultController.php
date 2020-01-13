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
      $parameters=$this->getListParameters();
      $dataGrup= $this->getGroupElements($urlId,2,null,"level1");
      // array_push($parameters,$dataGrup);
      foreach ($dataGrup as $key => $data) {
        $parameters[$key]=$data;
      }
      $parameters["site_name"]="FotoChic by chic Magazine";
      $parameters["isRuteContentHiden"]="none";
      $parameters["isFolderContentHiden"]="none";
      $parameters["ruteInfo"]=[
        [
          'titulo'=>"FotoChic by chic Magazine",
          'slug'=>"/"
        ]
      ];
      // $parameters["modules"] = $dataGrup["modules"];
      $arrayCss = array();
      $resultFileCss = array();
      $this->getListModules($parameters["modules"],$arrayCss);
      if(count($arrayCss)){
        $parameters["fileCSS"] = array_values(array_unique($arrayCss));
      }
      // dump($parameters);
      // die;
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', $parameters);
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
    * @Route("/{gallery}/{year}/{fullGalery}/{openGalery}", name="gallery_year_gallery_intoGalery")
     */
    public function showGaleryAction($gallery,$year="",$fullGalery="",$openGalery="",Request $request){
      $slug = $request->getPathInfo();
      $pushGrupo = [];
      $modules = [];
      $arrayCss = [];
      $resultFileCss = [];
      $ruteInfo = [];
      $pageTitle="";
      $grupos = file_get_contents("./bundles/camusassets/grupos.json");
      $json_grupos= json_decode($grupos, true);
      $parameters=$this->getListParameters();
      // dump($json_grupos);
      // dump($gallery);
      // dump(isset($json_grupos[$gallery]));
      // die;
      if (!empty($json_grupos)) {
        $ComparateCodeId=substr($gallery, 1, 100);
        //comprobar si ya existe
        if (!isset($json_grupos[$gallery])) {
          foreach ($json_grupos as $category) {
            $respuesta= in_array($ComparateCodeId, $category, true);
            // dump($respuesta);
            // dump($ComparateCodeId);
            // dump($category);
            if (!$respuesta) {
              if (isset($category["year"])) {
                foreach ($category["year"] as $arrYear) {
                  $respuesta= in_array($ComparateCodeId, $arrYear, true);
                  // dump($respuesta);
                  // dump($arrYear);
                  if (!$respuesta) {
                    if (isset($arrYear["gallery"])) {
                      foreach ($arrYear["gallery"] as $intoGallery) {
                        $respuesta= in_array($ComparateCodeId, $intoGallery, true);
                        // dump($respuesta);
                        // dump($intoGallery);
                        if ($respuesta) {
                          // dump("es galeria");
                          $gallery= $category["titulo"];
                          $year= $arrYear["titulo"];
                          $fullGalery= $intoGallery["titulo"];
                          header("Status: 301 Moved Permanently");
                          header("Location: /".$gallery."/".$year."/".$fullGalery);
                          exit;
                        }
                      }
                    }
                  }else {
                    // dump("es año");
                    $gallery= $category["titulo"];
                    $year= $arrYear["titulo"];
                    header("Status: 301 Moved Permanently");
                    header("Location: /".$gallery."/".$year);
                    exit;
                    // dump($gallery);
                    // dump($year);
                  }
                }
              }
            }else {
              // dump("es categoria");
              $gallery= $category["titulo"];
              header("Status: 301 Moved Permanently");
              header("Location: /".$gallery);
              exit;
              // dump($gallery);
            }
          }
        }
        if (isset($json_grupos[$gallery])) {
          if (!empty($year)) {
            //si el año es definido
            if ($json_grupos[$gallery]["type"]==1) {
              // dump("okey ahora que????");
              // dump("piensa hijo de tu mama");
              $codeId=$json_grupos[$gallery]["codeId"];
              $ruteInfo= [
                [
                  'titulo'=>"INICIO",
                  'slug'=>"/"
                ],[
                  'titulo'=>$json_grupos[$gallery]["titulo"],
                  'slug'=>"#"
                ]
              ];
              $dataGallery= $this->getGaleryElements($codeId, 3, $slug, "full", "true", $year);
              // dump($dataGallery);
              // die;
            }else {
              if (!empty($fullGalery)) {
                // si una galeria es definida
                if ($json_grupos[$gallery]["year"][$year]["type"]==1) {
                  // dump("okey ahora que????");
                  // dump("piensa hijo de tu mama");
                  $codeId=$json_grupos[$gallery]["year"][$year]["codeId"];
                  $ruteInfo= [
                    [
                      'titulo'=>"INICIO",
                      'slug'=>"/"
                    ],[
                      'titulo'=>$json_grupos[$gallery]["titulo"],
                      'slug'=>"/".$json_grupos[$gallery]["titulo"]
                    ],[
                      'titulo'=>$json_grupos[$gallery]["year"][$year]["titulo"],
                      'slug'=>"#"
                    ]
                  ];
                  $dataGallery= $this->getGaleryElements($codeId, 3, $slug, "full", "true", $fullGalery);
                  // dump($codeId);
                  // die;
                }else {
                  if (!empty($openGalery)) {
                    // si se abrio una imagen
                    if (isset($json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery])) {
                      $codeId=$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["codeId"];
                      $type= $json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["type"];
                      $pageTitle= $json_grupos[$gallery]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["titulo"];
                      $ruteInfo= [
                        [
                          'titulo'=>$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["titulo"],
                          'slug'=>"#"
                        ]
                      ];
                      if ($type==1) {
                        $dataGallery= $this->getGaleryElements($codeId, 3, $slug, "full", "true", $openGalery);
                      }else {
                        $dataGallery= $this->getGroupElements($codeId,2,$slug);
                      }
                    }else {
                      $this->addCategori($json_grupos,$gallery,3,$year,$fullGalery);
                      exit;
                    }
                  }else {
                    if (!isset($json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery])) {
                      if (isset($json_grupos[$gallery]["year"][$year]["gallery"])) {
                        $comparateCodeId=substr($fullGalery, 1, 100);
                        foreach ($json_grupos[$gallery]["year"][$year]["gallery"] as $intoGallery) {
                          $respuesta= in_array($comparateCodeId, $intoGallery, true);
                          if ($respuesta) {
                            $fullGalery= $intoGallery["titulo"];
                            header("Status: 301 Moved Permanently");
                            header("Location: /".$gallery."/".$year."/".$fullGalery);
                            exit;
                          }
                        }
                      }
                    }
                    if (isset($json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery])) {
                      $codeId=$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["codeId"];
                      $type= $json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["type"];
                      $pageTitle= $json_grupos[$gallery]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["titulo"];
                      $ruteInfo= [
                        [
                          'titulo'=>$json_grupos[$gallery]["year"][$year]["gallery"][$fullGalery]["titulo"],
                          'slug'=>"#"
                        ]
                      ];
                      if ($type==1) {
                        $dataGallery= $this->getGaleryElements($codeId,2,$slug);
                      }else {
                        $dataGallery= $this->getGroupElements($codeId,2,$slug);
                      }
                    }else {
                      $this->addCategori($json_grupos,$gallery,3,$year,$fullGalery);
                      exit;
                    }
                  }
                }
              }else {
                if (!isset($json_grupos[$gallery]["year"][$year])) {
                  if (isset($json_grupos[$gallery]["year"])) {
                    $comparateCodeId=substr($year, 1, 100);
                    foreach ($json_grupos[$gallery]["year"] as $arrYear) {
                      $respuesta= in_array($comparateCodeId, $arrYear, true);
                      if ($respuesta) {
                        $year= $arrYear["titulo"];
                        header("Status: 301 Moved Permanently");
                        header("Location: /".$gallery."/".$year);
                        exit;
                      }
                    }
                  }
                }
                if (isset($json_grupos[$gallery]["year"][$year])) {
                  $codeId=$json_grupos[$gallery]["year"][$year]["codeId"];
                  $type= $json_grupos[$gallery]["year"][$year]["type"];
                  $pageTitle= $json_grupos[$gallery]["titulo"]." | ".$json_grupos[$gallery]["year"][$year]["titulo"];
                  $ruteInfo= [
                    [
                      'titulo'=>"INICIO",
                      'slug'=>"/"
                    ],[
                      'titulo'=>$json_grupos[$gallery]["titulo"],
                      'slug'=>"/".$json_grupos[$gallery]["titulo"]
                    ],[
                      'titulo'=>$json_grupos[$gallery]["year"][$year]["titulo"],
                      'slug'=>"#"
                    ]
                  ];
                  if ($type==1) {
                    $dataGallery= $this->getGaleryElements($codeId,2,$slug);
                  }else {
                    $dataGallery= $this->getGroupElements($codeId,2,$slug);
                  }
                }else {
                  $this->addCategori($json_grupos,$gallery,2,$year);
                  exit;
                }
              }
            }
          }else {
            // si el año no esta definido hay que ver que es lo que llego puede ser codigo de año
            $codeId=$json_grupos[$gallery]["codeId"];
            $type= $json_grupos[$gallery]["type"];
            $pageTitle= $json_grupos[$gallery]["titulo"];
            $ruteInfo= [
              [
                'titulo'=>"INICIO",
                'slug'=>"/"
              ],[
                'titulo'=>$json_grupos[$gallery]["titulo"],
                'slug'=>"#"
              ]
            ];
            if ($type==1) {
              $dataGallery= $this->getGaleryElements($codeId,2,$slug);
            }else {
              $dataGallery= $this->getGroupElements($codeId,2,$slug);
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
      foreach ($dataGallery as $key => $data) {
        $parameters[$key]=$data;
      }
      $this->getListModules($dataGallery["modules"],$arrayCss);
      if(count($arrayCss)){
        $parameters["fileCSS"] = array_values(array_unique($arrayCss));
      }
      $parameters["site_name"]= "FotoChic by chic Magazine | ".$pageTitle;
      $parameters["ruteInfo"]= $ruteInfo;
      $responseRender = $this->render('@CamusAssets/Content/content.html.twig', $parameters);
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
      // dump($groupId);
      $resultGroup = $client->LoadGroup($groupId, $level, $includeChildren);
      // dump($resultGroup);
      // die;
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
                  "slug"=> str_replace("/todas-la-fotos","",$slug)."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value->PageUrl),
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
        $dataGrup= [
          "site_name"=> (isset($resultGroup->Title)) ? "FotoChic by chic Magazine | ".$resultGroup->Title: 'FotoChic by chic Magazine',
          "modules"=>$modules,
          "isRuteContentHiden"=>"block",
          "isFolderContentHiden"=>"block ruby",
          "galleryCount"=> (isset($resultGroup->GalleryCount)) ? $resultGroup->GalleryCount: 0,
          "collectionCount"=> (isset($resultGroup->CollectionCount)) ? $resultGroup->CollectionCount: 0,
          "subGroupCount"=> (isset($resultGroup->SubGroupCount)) ? $resultGroup->SubGroupCount: 0
        ];
        return $dataGrup;
      }
    }

    public function getGaleryElements($groupId, $type=1, $slug="", $level="full", $includeChildren="true", $comparateString=""){
      $client= new Client('fotoChic App/1.0 (https://fotos.chicmagazine.com.mx/)');
      $modules = [];
      $resultGroup = $client->LoadPhotoSet($groupId, $level, $includeChildren);
      // $xml   = simplexml_load_string($resultGroup, 'SimpleXMLElement', LIBXML_NOCDATA);
  		// $group = json_decode(json_encode((array)$xml), TRUE);
      if ($type == 1) {
        return $resultGroup;
      }elseif ($type == 2) {
        // dump($resultGroup);
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
                  "slug"=> $slug."/".str_replace($resultGroup->PageUrl."/","",$value->PageUrl),
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
        $dataGrup= [
          "site_name"=> (isset($resultGroup->Title)) ? "FotoChic by chic Magazine | ".$resultGroup->Title: 'FotoChic by chic Magazine',
          "modules"=>$modules,
          "isRuteContentHiden"=>"block",
          "isFolderContentHiden"=>"none",
          "galleryCount"=> (isset($resultGroup->GalleryCount)) ? $resultGroup->GalleryCount: 0,
          "collectionCount"=> (isset($resultGroup->CollectionCount)) ? $resultGroup->CollectionCount: 0,
          "subGroupCount"=> (isset($resultGroup->SubGroupCount)) ? $resultGroup->SubGroupCount: 0
        ];
        return $dataGrup;
      }else {
        if (!empty($resultGroup->Photos)) {
          $media=[];
          $imageActual= "active";
          foreach ($resultGroup->Photos as $value) {
            if (!empty($comparateString)) {
              if (strpos($value->PageUrl, $comparateString)) {
                $imageActual = "active";
              }
            }
            $tempoMedia=[
              "id"=> $value->Id,
              "xalokId"=> "",
              "providerName"=> "camus.media.image_provider",
              "fileType"=> (isset($value->MimeType)) ? $value->MimeType: '',
              "publishedVersion"=> [
                "id"=> $value->Id,
                "title"=> (isset($value->Title)) ? $value->Title: '',
                "providerReference"=> (isset($value->FileName)) ? $value->FileName: '',
                "isActual"=> $imageActual,
              ],
              "src"=> "http://".$value->UrlHost."".$value->UrlCore."-4.jpg"
            ];
            array_push($media,$tempoMedia);
            $imageActual=false;
          }
          $carrusel= [
            "type"=> "sli_opening",
            "template"=> "gallery",
            "title"=> "Vacía y con mala calidad del aire, así recibe la CdMx año",
            "abstract"=> "El Sistema de Monitoreo Atmosférico informó que la calidad del aire en la Ciudad de México hoy va de regular a mala.",
            "sizes"=> [
              "template_1254"=> [
                "width"=> 4,
                "height"=> 1
              ],
              "template_1024"=> [
                "width"=> 3,
                "height"=> 1
              ],
              "template_720"=> [
                "width"=> 2,
                "height"=> 1
              ],
              "template_320"=> [
                "width"=> 1,
                "height"=> 1
              ]
            ],
            "content"=> [
              "id"=> null,
              "slug"=> null,
              "xalokId"=> null,
              "column"=> null,
              "publishedHour"=> null,
              "publishedDate"=> "01-01-2020",
              "author"=> [
                "id"=> null,
                "name"=> "Milenio Digital",
                "media"=> [
                  "src"=> "http://fotos.chicmagazine.com.mx/img/s/v-10/p3754851953-4.jpg"
                ],
                "slug"=> null
              ]
            ],
            "modules"=> null,
            "heading"=> [
              "background"=> "rgb(51,51,51)",
              "title"=> null
            ],
            "extra"=> [
              "media"=> [
                "icon"=> null,
                "title"=> null
              ],
              "heading"=> [
                "title"=> null
              ]
            ],
            "show"=> [
              "board"=> false,
              "content"=> false,
              "inner"=> false
            ],
            "subtitle"=> "",
            "media"=> $media
          ];
          array_push($modules,$carrusel);
        }
        $dataGrup= [
          "site_name"=> (isset($resultGroup->Title)) ? "FotoChic by chic Magazine | ".$resultGroup->Title: 'FotoChic by chic Magazine',
          "modules"=>$modules,
          "isRuteContentHiden"=>"none",
          "isFolderContentHiden"=>"none",
          "galleryCount"=> (isset($resultGroup->GalleryCount)) ? $resultGroup->GalleryCount: 0,
          "collectionCount"=> (isset($resultGroup->CollectionCount)) ? $resultGroup->CollectionCount: 0,
          "subGroupCount"=> (isset($resultGroup->SubGroupCount)) ? $resultGroup->SubGroupCount: 0
        ];
        return $dataGrup;
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
          $i = 0;
          $oldCategoryNorm="";
          $oldCategory=[];
          $oldYearNorm="";
          if (!empty($galeria->ParentGroups) && count($galeria->ParentGroups) > 1) {
            foreach ($galeria->ParentGroups as $value) {
              if ($i >= 1) {
                $oldGalery= $this->getGroupElements($value, 1, null, "level1", "false");
                if (empty($oldCategoryNorm)) {
                  $oldCategoryNorm= $this->normalizeText($oldGalery->Title);
                  $oldCategory= $oldGalery;
                }else {
                  $oldYearNorm=$this->normalizeText($oldGalery->Title);
                }
                if (!empty($grupos)) {
                  if (isset($grupos[$oldCategoryNorm])) {
                    if (!empty($oldYearNorm)) {
                      if (isset($grupos[$oldCategoryNorm]["year"][$oldYearNorm])) {
                        $this->addCategori($grupos,$oldCategoryNorm,3,$oldYearNorm,$codeId);
                      }else {
                        // aqui existe la categoria pero no el año ni la galeria
                        $this->addIndividualCategory($grupos,$oldCategoryNorm,$oldGalery,3,$galeria,$type);
                        break;
                      }
                    }elseif (count($galeria->ParentGroups) < 3) {
                      // dump("esto siginifca que tengo que crear el archivo solo con el año");
                      $this->addIndividualCategory($grupos,$oldCategoryNorm,null,1,$galeria,$type);
                      break;
                    }
                  }else {
                    if (!empty($oldYearNorm)) {
                      $this->addIndividualCategory($grupos,$oldCategory,$oldGalery,4,$galeria,$type);
                      break;
                    }elseif (count($galeria->ParentGroups) < 3) {
                      // dump("esto siginifca que tengo que crear el archivo solo con la primera galeria");
                      $this->addIndividualCategory($grupos,$oldCategory,null,2,$galeria,$type);
                      break;
                    }
                  }
                }else {
                  if (!empty($oldYearNorm)) {
                    $this->addIndividualCategory($grupos,$oldCategory,$oldGalery,4,$galeria,$type);
                    break;
                  }elseif (count($galeria->ParentGroups) < 3) {
                    // dump("esto siginifca que tengo que crear el archivo solo con la primera galeria y el año");
                    $this->addIndividualCategory($grupos,$oldCategory,null,2,$galeria,$type);
                    break;
                  }
                }
                // dump($oldGalery);
              }
              $i++;
            }
            return;
          }
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

    public function addIndividualCategory($grupos,$oldGalleryCategory,$oldGalleryYear="",$depth=0,$actualGalery=[],$actualType=2,$subCategori="",$subSubCategori=""){
      if ($depth==1) {
        $pushGrupo= $grupos;
        $newTitleNorm= $this->normalizeText($actualGalery->Title);
        $newCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$actualGalery->PageUrl);
        $addYear=[
          "titulo"=>$newTitleNorm,
          "codeId"=>$newCodeId,
          "type"=>$actualType
        ];
        $pushGrupo[$oldGalleryCategory]["year"][$newTitleNorm]= $addYear;
        $grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$oldGalleryCategory."/".$newTitleNorm);
        exit;
      }elseif ($depth==2) {
        $pushGrupo= $grupos;
        $oldGCTitleNorm= $this->normalizeText($oldGalleryCategory->Title);
        $newTitleNorm= $this->normalizeText($actualGalery->Title);
        $oldGCCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$oldGalleryCategory->PageUrl);
        $newCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$actualGalery->PageUrl);
        $newGrupo=[
          "titulo"=>$oldGCTitleNorm,
          "codeId"=>$oldGCCodeId,
          "type"=>2,
          "year"=> [
            $newTitleNorm=>[
              "titulo"=>$newTitleNorm,
              "codeId"=>$newCodeId,
              "type"=>$actualType
            ]
          ]
        ];
        $pushGrupo[$oldGCTitleNorm]= $newGrupo;
        $grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$oldGCTitleNorm."/".$newTitleNorm);
        exit;
      } elseif ($depth==3) {
        $pushGrupo= $grupos;
        $oldGYTitleNorm= $this->normalizeText($oldGalleryYear->Title);
        $newTitleNorm= $this->normalizeText($actualGalery->Title);
        $oldGYCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$oldGalleryYear->PageUrl);
        $newCodeId= str_replace("https://fotos.chicmagazine.com.mx/p","",$actualGalery->PageUrl);
        $addYear=[
          "titulo"=>$oldGYTitleNorm,
          "codeId"=>$oldGYCodeId,
          "type"=>2,
          "gallery"=> [
            $newTitleNorm=>[
              "titulo"=>$newTitleNorm,
              "codeId"=>$newCodeId,
              "type"=>$actualType
            ]
          ]
        ];
        $pushGrupo[$oldGalleryCategory]["year"][$oldGYTitleNorm]= $addYear;
        $grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$oldGalleryCategory."/".$oldGYTitleNorm."/".$newTitleNorm);
        exit;
      }elseif ($depth==4) {
        $pushGrupo= $grupos;
        $oldGCTitleNorm= $this->normalizeText($oldGalleryCategory->Title);
        $oldGYTitleNorm= $this->normalizeText($oldGalleryYear->Title);
        $newTitleNorm= $this->normalizeText($actualGalery->Title);
        $oldGCCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$oldGalleryCategory->PageUrl);
        $oldGYCodeId= str_replace("https://fotos.chicmagazine.com.mx/f","",$oldGalleryYear->PageUrl);
        $newCodeId= str_replace("https://fotos.chicmagazine.com.mx/p","",$actualGalery->PageUrl);
        $addYear=[
          "titulo"=>$oldGCTitleNorm,
          "codeId"=>$oldGCCodeId,
          "type"=>2,
          "year"=>[
            $oldGYTitleNorm=>[
              "titulo"=>$oldGYTitleNorm,
              "codeId"=>$oldGYCodeId,
              "type"=>2,
              "gallery"=> [
                $newTitleNorm=>[
                  "titulo"=>$newTitleNorm,
                  "codeId"=>$newCodeId,
                  "type"=>$actualType
                ]
              ]
            ]
          ]
        ];
        $pushGrupo[$oldGCTitleNorm]= $addYear;
        $grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$oldGCTitleNorm."/".$oldGYTitleNorm."/".$newTitleNorm);
        exit;
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
      $string = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $string);
      $string = strtolower($string);
      return $string;
    }

    public function getListParameters(){
      $parameters= array(
        'meta' => "",
        'site_name' => "",
        'topContenDisplay' => "block",
        'site_short_domain' => "FotoChic",
        'modules' => [],
        'headerType' => 1,
        'currentSection' => "",
        'page' => 1,
        'boardColor' => "#b10b1f",
        'amp_domain' => "none",
        'piano_domain' => "none",
        'fileCSS'=> [],
        'number' => 100
      );
      return $parameters;
    }

}
