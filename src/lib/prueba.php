<?php

if (!empty($json_grupos)) {
  if (!empty($year)) {
    if (isset($json_grupos[$gallery])) {
      if (isset($json_grupos[$gallery]["year"][$year])) {
        dump($json_grupos);
        dump("existe");
        if ($json_grupos[$gallery]["type"]["year"][$year]["type"] == 1) {
          $codeId=$json_grupos[$gallery]["codeId"];
          $galeria= $this->getGalery($codeId);
          if (!empty($galeria["Photos"])) {
            if (!empty($galeria["Photos"]["Photo"])) {
              foreach ($galeria["Photos"]["Photo"] as $value) {
                $r = "";
                $imagenes=[
                  "type"=> "oo_background_image",
                  "template"=> "top_text",
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
                      "src"=> "http://".$value['UrlHost']."".$value['UrlCore']."-2.jpg"
                    ],
                    "content"=> [
                      "id"=> 2260,
                      "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
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
        }else {
          $codeId=$json_grupos[$gallery]["year"][$year]["codeId"];
          // $galeria= $this->getGroup($codeId);
          $modules= $this->getGroupElements($codeId, 2, "full", "true");
          // if (!empty($galeria["Elements"])) {
          //   if (!empty($galeria["Elements"]["PhotoSet"])) {
          //     // dump($galeria["Elements"]["PhotoSet"]);
          //     // die;
          //     foreach ($galeria["Elements"]["PhotoSet"] as $value) {
          //       $r = "";
          //       $imagenes=[
          //         "type"=> "oo_background_image",
          //         "template"=> "top_text",
          //           "id"=> 110,
          //           "title"=> (isset($value["Title"])) ? $value["Title"]: '',
          //           "abstract"=> "",
          //           "body"=> "",
          //           "media"=> [],
          //           "heading"=> [],
          //           "extraData"=> [
          //             "mediaTitle"=> "",
          //             "headingTitle"=> "",
          //             "mediaIconVisible"=> "hidden"
          //           ],
          //           "thumbnail"=> [
          //             "width"=> 318,
          //             "height"=> 373,
          //             "x"=> 251,
          //             "y"=> 0,
          //             "quality"=> 100,
          //             "id"=> 1988,
          //             "fileType"=> "image/jpeg",
          //             "publishedVersion"=> [
          //               "id"=> 8385,
          //               "title"=> "Bodas",
          //               "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
          //             ],
          //             "src"=> (isset($value["TitlePhoto"])) ? "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg": ''
          //           ],
          //           "content"=> [
          //             "id"=> 2260,
          //             "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
          //             "xalokId"=> null,
          //             "author"=> null
          //           ],
          //           "clippings"=> [
          //             "default"=> [
          //               "window_width"=> 320,
          //               "width"=> 300
          //             ],
          //             "size_1272"=> [
          //               "window_width"=> 638,
          //               "width"=> 618
          //             ]
          //           ],
          //           "modules"=> []
          //       ];
          //       array_push($modules,$imagenes);
          //     }
          //   }elseif (!empty($galeria["Elements"]["Group"])) {
          //     foreach ($galeria["Elements"]["Group"] as $value) {
          //       $r = "";
          //       $imagenes=[
          //         "type"=> "sn_base",
          //         "template"=> "bottom_text",
          //           "id"=> 110,
          //           "title"=> (isset($value["Title"])) ? $value["Title"]: '',
          //           "abstract"=> "",
          //           "body"=> "",
          //           "media"=> [],
          //           "heading"=> [],
          //           "extraData"=> [
          //             "mediaTitle"=> "",
          //             "headingTitle"=> "",
          //             "mediaIconVisible"=> "hidden"
          //           ],
          //           "thumbnail"=> [
          //             "width"=> 318,
          //             "height"=> 373,
          //             "x"=> 251,
          //             "y"=> 0,
          //             "quality"=> 100,
          //             "id"=> 1988,
          //             "fileType"=> "image/jpeg",
          //             "publishedVersion"=> [
          //               "id"=> 8385,
          //               "title"=> "Bodas",
          //               "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
          //             ],
          //             "src"=> "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg"
          //           ],
          //           "content"=> [
          //             "id"=> 2260,
          //             "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
          //             "xalokId"=> null,
          //             "author"=> null
          //           ],
          //           "clippings"=> [
          //             "default"=> [
          //               "window_width"=> 320,
          //               "width"=> 300
          //             ],
          //             "size_1272"=> [
          //               "window_width"=> 638,
          //               "width"=> 618
          //             ]
          //           ],
          //           "modules"=> []
          //       ];
          //       array_push($modules,$imagenes);
          //     }
          //   }
          // }
        }
        // dump($galeria);
        // die;
      }else {
        dump("no existe");
        $pushGrupo= $json_grupos;
        $grupId= substr( $year, 1, 100 );
        // $grupset= $this->getGroup($grupId, 'full', "true");
        $grupset= $this->getGroupElements($grupId, 1, "full", "true");
        $titleNorm= $this->normalizeText($grupset->Title);
        $addYear=[
          "titulo"=>$titleNorm,
          "codeId"=>$grupId,
          "type"=>2
        ];
        dump($grupset);
        $pushGrupo[$gallery]["year"][$titleNorm]= $addYear;
        dump($pushGrupo[$gallery]);
        die;
        $json_grupos = json_encode($pushGrupo);
        $file = './bundles/camusassets/grupos.json';
        file_put_contents($file, $json_grupos);
        header("Status: 301 Moved Permanently");
        header("Location: /".$gallery."/".$titleNorm);
        exit;
      }
    }else {
      dump("no existe");
    }
    // dump($json_grupos);
    // die;
    // $banderaSeccion= true;
    // $gallery= substr( $year, 1, 100 );
    // $grupset = $client->LoadGroup(777139220, 'full', "true");
    // $parentset = $client->LoadGroup(4041378297216861443, 'Level1', "false");
    // $xml   = simplexml_load_string($resultGroup, 'SimpleXMLElement', LIBXML_NOCDATA);
    // $parentset = json_decode(json_encode((array)$xml), TRUE);
    // $parentset = json_decode(json_encode((array)$parentset), TRUE);
    // dump($parentset);
    // $parentset = $client->LoadGroup(4041378297249138782, 'Level1', "false");
    // // $galeria= $this->getGroup($gallery);
    // dump(get_class_methods($grupset));
    // $pushGrupo= $json_grupos;
    // $titleNorm= $this->normalizeText($galeria["Title"]);
    // $newGrupo=[
    //   "titulo"=>$titleNorm,
    //   "codeId"=>$gallery,
    //   "type"=>1
    // ];
    // $pushGrupo[$titleNorm]= $newGrupo;
    // $json_grupos = json_encode($pushGrupo);
    // $file = './bundles/camusassets/grupos.json';
    // file_put_contents($file, $json_grupos);
    // header("Status: 301 Moved Permanently");
    // header("Location: /".$titleNorm);
    // dump($parentset);
    // dump($grupset);
    // die;
    // if (isset($galeria["faultcode"])) {
    //   throw $this->createNotFoundException();
    // }else {
    //   $titleNorm= $this->normalizeText($galeria["Title"]);
    //   $newGrupo=[
    //     "titulo"=>$titleNorm,
    //     "codeId"=>$gallery,
    //     "type"=>2
    //   ];
    //   // dump($titleNorm);
    //   // die;
    //   $pushGrupo[$titleNorm]= $newGrupo;
    //   $json_grupos = json_encode($pushGrupo);
    //   $file = './bundles/camusassets/grupos.json';
    //   file_put_contents($file, $json_grupos);
    //   header("Status: 301 Moved Permanently");
    //   header("Location: /".$titleNorm);
    //   exit;
    // }
  }else {
    if (isset($json_grupos[$gallery])) {
      if ($json_grupos[$gallery]["type"] == 1) {
        $codeId=$json_grupos[$gallery]["codeId"];
        $galeria= $this->getGalery($codeId);
        if (!empty($galeria["Photos"])) {
          if (!empty($galeria["Photos"]["Photo"])) {
            foreach ($galeria["Photos"]["Photo"] as $value) {
              $r = "";
              $imagenes=[
                "type"=> "oo_background_image",
                "template"=> "top_text",
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
                    "src"=> "http://".$value['UrlHost']."".$value['UrlCore']."-2.jpg"
                  ],
                  "content"=> [
                    "id"=> 2260,
                    "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
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
      }else {
        $codeId=$json_grupos[$gallery]["codeId"];
        $modules= $this->getGroupElements($codeId, 2, "full", "true");
        // if (!empty($galeria["Elements"])) {
        //   if (!empty($galeria["Elements"]["PhotoSet"])) {
        //     // dump($galeria["Elements"]["PhotoSet"]);
        //     // die;
        //     foreach ($galeria["Elements"]["PhotoSet"] as $value) {
        //       $r = "";
        //       $imagenes=[
        //         "type"=> "oo_background_image",
        //         "template"=> "top_text",
        //           "id"=> 110,
        //           "title"=> (isset($value["Title"])) ? $value["Title"]: '',
        //           "abstract"=> "",
        //           "body"=> "",
        //           "media"=> [],
        //           "heading"=> [],
        //           "extraData"=> [
        //             "mediaTitle"=> "",
        //             "headingTitle"=> "",
        //             "mediaIconVisible"=> "hidden"
        //           ],
        //           "thumbnail"=> [
        //             "width"=> 318,
        //             "height"=> 373,
        //             "x"=> 251,
        //             "y"=> 0,
        //             "quality"=> 100,
        //             "id"=> 1988,
        //             "fileType"=> "image/jpeg",
        //             "publishedVersion"=> [
        //               "id"=> 8385,
        //               "title"=> "Bodas",
        //               "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
        //             ],
        //             "src"=> (isset($value["TitlePhoto"])) ? "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg": ''
        //           ],
        //           "content"=> [
        //             "id"=> 2260,
        //             "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
        //             "xalokId"=> null,
        //             "author"=> null
        //           ],
        //           "clippings"=> [
        //             "default"=> [
        //               "window_width"=> 320,
        //               "width"=> 300
        //             ],
        //             "size_1272"=> [
        //               "window_width"=> 638,
        //               "width"=> 618
        //             ]
        //           ],
        //           "modules"=> []
        //       ];
        //       array_push($modules,$imagenes);
        //     }
        //   }elseif (!empty($galeria["Elements"]["Group"])) {
        //     foreach ($galeria["Elements"]["Group"] as $value) {
        //       $r = "";
        //       $imagenes=[
        //         "type"=> "sn_base",
        //         "template"=> "bottom_text",
        //           "id"=> 110,
        //           "title"=> (isset($value["Title"])) ? $value["Title"]: '',
        //           "abstract"=> "",
        //           "body"=> "",
        //           "media"=> [],
        //           "heading"=> [],
        //           "extraData"=> [
        //             "mediaTitle"=> "",
        //             "headingTitle"=> "",
        //             "mediaIconVisible"=> "hidden"
        //           ],
        //           "thumbnail"=> [
        //             "width"=> 318,
        //             "height"=> 373,
        //             "x"=> 251,
        //             "y"=> 0,
        //             "quality"=> 100,
        //             "id"=> 1988,
        //             "fileType"=> "image/jpeg",
        //             "publishedVersion"=> [
        //               "id"=> 8385,
        //               "title"=> "Bodas",
        //               "providerReference"=> "yuridia-caso-guapa-lucio-vestida.jpg"
        //             ],
        //             "src"=> "http://".$value['TitlePhoto']['UrlHost']."".$value['TitlePhoto']['UrlCore']."-2.jpg"
        //           ],
        //           "content"=> [
        //             "id"=> 2260,
        //             "slug"=> $slug."/".str_replace("https://fotos.chicmagazine.com.mx/","",$value["PageUrl"]),
        //             "xalokId"=> null,
        //             "author"=> null
        //           ],
        //           "clippings"=> [
        //             "default"=> [
        //               "window_width"=> 320,
        //               "width"=> 300
        //             ],
        //             "size_1272"=> [
        //               "window_width"=> 638,
        //               "width"=> 618
        //             ]
        //           ],
        //           "modules"=> []
        //       ];
        //       array_push($modules,$imagenes);
        //     }
        //   }
        // }
      }
    }else {
      if (substr( $gallery, 0, 1 ) === "p") {
        $banderaGaleria= true;
        $gallery= substr( $gallery, 1, 100 );
        // $galeria= $this->getGalery($gallery);
        $galeria= $this->getGroupElements($gallery, 1, "full", "true");
        // dump($galeria);
        // die;
        if (isset($galeria->faultcode)) {
          throw $this->createNotFoundException();
        }else {
          $pushGrupo= $json_grupos;
          $titleNorm= $this->normalizeText($galeria->Title);
          $newGrupo=[
            "titulo"=>$titleNorm,
            "codeId"=>$gallery,
            "type"=>1
          ];
          $pushGrupo[$titleNorm]= $newGrupo;
          $json_grupos = json_encode($pushGrupo);
          $file = './bundles/camusassets/grupos.json';
          file_put_contents($file, $json_grupos);
          header("Status: 301 Moved Permanently");
          header("Location: /".$titleNorm);
          exit;
        }
      }else {
        $banderaSeccion= true;
        $gallery= substr( $gallery, 1, 100 );
        // dump($gallery);
        // $galeria= $this->getGroup($gallery);
        $galeria= $this->getGroupElements($gallery, 1, "full", "true");
        // dump($galeria);
        // die;
        if (isset($galeria->faultcode)) {
          throw $this->createNotFoundException();
        }else {
          $pushGrupo= $json_grupos;
          $titleNorm= $this->normalizeText($galeria->Title);
          $newGrupo=[
            "titulo"=>$titleNorm,
            "codeId"=>$gallery,
            "type"=>2
          ];
          $pushGrupo[$titleNorm]= $newGrupo;
          // dump($pushGrupo);
          // die;
          $json_grupos = json_encode($pushGrupo);
          $file = './bundles/camusassets/grupos.json';
          file_put_contents($file, $json_grupos);
          header("Status: 301 Moved Permanently");
          header("Location: /".$titleNorm);
          exit;
        }
      }
    }
  }
}else {
  if (substr( $gallery, 0, 1 ) === "p") {
    $banderaGaleria= true;
    $gallery= substr( $gallery, 1, 100 );
    // $galeria= $this->getGalery($gallery);
    $galeria= $this->getGroupElements($gallery, 1, "full", "true");
    if (isset($galeria->faultcode)) {
      throw $this->createNotFoundException();
    }else {
      $titleNorm= $this->normalizeText($galeria->Title);
      $newGrupo=[
        "titulo"=>$titleNorm,
        "codeId"=>$gallery,
        "type"=>1
      ];
      $pushGrupo[$titleNorm]= $newGrupo;
      $json_grupos = json_encode($pushGrupo);
      $file = './bundles/camusassets/grupos.json';
      file_put_contents($file, $json_grupos);
      header("Status: 301 Moved Permanently");
      header("Location: /".$titleNorm);
      exit;
    }
  }else {
    $banderaSeccion= true;
    $gallery= substr( $gallery, 1, 100 );
    // $galeria= $this->getGroup($gallery);
    $galeria= $this->getGroupElements($gallery, 1, "full", "true");
    if (isset($galeria->faultcode)) {
      throw $this->createNotFoundException();
    }else {
      $titleNorm= $this->normalizeText($galeria->Title);
      $newGrupo=[
        "titulo"=>$titleNorm,
        "codeId"=>$gallery,
        "type"=>2
      ];
      // dump($titleNorm);
      // die;
      $pushGrupo[$titleNorm]= $newGrupo;
      $json_grupos = json_encode($pushGrupo);
      $file = './bundles/camusassets/grupos.json';
      file_put_contents($file, $json_grupos);
      header("Status: 301 Moved Permanently");
      header("Location: /".$titleNorm);
      exit;
    }
  }
}

 ?>
