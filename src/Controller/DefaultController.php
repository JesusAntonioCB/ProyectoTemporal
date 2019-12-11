<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Camus\AssetsBundle\Twig\ModelModuleExtension;

class DefaultController extends AbstractController
{
    /**
     * @Route("/lucky/number")
     */
    public function indexAction()
    {
        $number = random_int(0, 100);

        return $this -> render ( 'base/base2.html.twig' , [
            'number' => $number ,
        ]);
    }
    /**
     * @Route("/prueba-modulos-estadisticos")
     */
    public function getPruebaModulos(){
        // $modules = [
        //   [
        //     "type" => "sn_base",
        //     "template" => "bottom_text_growable",
        //     "id" => 110,
        //     "title" => "Dulce María presumió su figura en bikini y sorprendió a sus seguidores",
        //     "abstract" => "",
        //     "body" => "",
        //     "thumbnailClippingLarger" => [
        //           "width" => 978,
        //           "height" => 557,
        //           "x" => 6,
        //           "y" => 0,
        //           "quality" => 93,
        //           "id" => 1975,
        //           "fileType" => "image/jpeg",
        //           "publishedVersion" => [
        //             "id" => 5457,
        //             "title" => "Dulce María",
        //             "providerReference" => "dulce-maria.jpg"
        //           ],
        //           "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_6_0_978_557.jpg"
        //     ],
        //     "media" => [],
        //     "heading" => [],
        //     "extraData" => [
        //       "mediaTitle" => "",
        //       "headingTitle" => "",
        //       "mediaIconVisible" => "hidden"
        //     ],
        //     "thumbnail" => [
        //       "width" => 474,
        //       "height" => 557,
        //       "x" => 258,
        //       "y" => 0,
        //       "quality" => 93,
        //       "id" => 1974,
        //       "fileType" => "image/jpeg",
        //       "publishedVersion" => [
        //         "id" => 5457,
        //         "title" => "Dulce María",
        //         "providerReference" => "dulce-maria.jpg"
        //       ],
        //       "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_258_0_474_557.jpg"
        //     ],
        //     "content" => [
        //       "id" => 2251,
        //       "slug" => "/celebridades/dulce-maria-presumio-figura-bikini-sorprendio-seguidores",
        //       "xalokId" => null,
        //       "author" => null
        //     ],
        //     "clippings" => [
        //       "default" => [
        //         "window_width" => 320,
        //         "width" => 300
        //       ],
        //       "size_1272" => [
        //         "window_width" => 638,
        //         "width" => 618
        //       ]
        //     ],
        //     "modules" => []
        //   ],
        //   [
        //     "type" => "sn_base",
        //     "template" => "top_text",
        //     "id" => 110,
        //     "title" => "Dulce María presumió su figura en bikini y sorprendió a sus seguidores",
        //     "abstract" => "",
        //     "body" => "",
        //     "thumbnailClippingLarger" => [
        //           "width" => 978,
        //           "height" => 557,
        //           "x" => 6,
        //           "y" => 0,
        //           "quality" => 93,
        //           "id" => 1975,
        //           "fileType" => "image/jpeg",
        //           "publishedVersion" => [
        //             "id" => 5457,
        //             "title" => "Dulce María",
        //             "providerReference" => "dulce-maria.jpg"
        //           ],
        //           "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_6_0_978_557.jpg"
        //     ],
        //     "media" => [],
        //     "heading" => [],
        //     "extraData" => [
        //       "mediaTitle" => "",
        //       "headingTitle" => "",
        //       "mediaIconVisible" => "hidden"
        //     ],
        //     "thumbnail" => [
        //       "width" => 474,
        //       "height" => 557,
        //       "x" => 258,
        //       "y" => 0,
        //       "quality" => 93,
        //       "id" => 1974,
        //       "fileType" => "image/jpeg",
        //       "publishedVersion" => [
        //         "id" => 5457,
        //         "title" => "Dulce María",
        //         "providerReference" => "dulce-maria.jpg"
        //       ],
        //       "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_258_0_474_557.jpg"
        //     ],
        //     "content" => [
        //       "id" => 2251,
        //       "slug" => "/celebridades/dulce-maria-presumio-figura-bikini-sorprendio-seguidores",
        //       "xalokId" => null,
        //       "author" => null
        //     ],
        //     "clippings" => [
        //       "default" => [
        //         "window_width" => 320,
        //         "width" => 300
        //       ],
        //       "size_1272" => [
        //         "window_width" => 638,
        //         "width" => 618
        //       ]
        //     ],
        //     "modules" => []
        //   ]
        // ];
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
