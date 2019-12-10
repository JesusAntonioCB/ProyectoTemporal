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
      $modules = [
        [
          "type" => "sn_base",
          "template" => "bottom_text_growable",
          "id" => 110,
          "title" => "Dulce María presumió su figura en bikini y sorprendió a sus seguidores",
          "abstract" => "",
          "body" => "",
          "thumbnailClippingLarger" => [

                "width" => 978,
                "height" => 557,
                "x" => 6,
                "y" => 0,
                "quality" => 93,
                "id" => 1975,
                "fileType" => "image/jpeg",
                "publishedVersion" => [
                  "id" => 5457,
                  "title" => "Dulce María",
                  "providerReference" => "dulce-maria.jpg"
                ],
                "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_6_0_978_557.jpg"
          ],
          "media" => [],
          "heading" => [],
          "extraData" => [
            "mediaTitle" => "",
            "headingTitle" => "",
            "mediaIconVisible" => "hidden"
          ],
          "thumbnail" => [
            "width" => 474,
            "height" => 557,
            "x" => 258,
            "y" => 0,
            "quality" => 93,
            "id" => 1974,
            "fileType" => "image/jpeg",
            "publishedVersion" => [
              "id" => 5457,
              "title" => "Dulce María",
              "providerReference" => "dulce-maria.jpg"
            ],
            "src" => "https://cdn.revistafama.com/uploads/media/2019/12/09/dulce-maria_258_0_474_557.jpg"
          ],
          "content" => [
            "id" => 2251,
            "slug" => "/celebridades/dulce-maria-presumio-figura-bikini-sorprendio-seguidores",
            "xalokId" => null,
            "author" => null
          ],
          "clippings" => [
            "default" => [
              "window_width" => 320,
              "width" => 300
            ],
            "size_1272" => [
              "window_width" => 638,
              "width" => 618
            ]
          ],
          "modules" => []
        ]
      ];
        // $modules = array(
        //     array(
        //       "type" => "sn_base",
        //       "template" => "base",
        //       "id" => 614497,
        //       "title" => "IP fue marginada de negociación de cambios al T-MEC: Coparmex",
        //       "abstract" => "Gustavo de Hoyos dijo que afectaciones se pactaron sólo por el gobierno de AMLO",
        //       "body" => "",
        //       "link" => "",
        //       "extraData" => [
        //           "mediaTitle" => "",
        //           "headingTitle" => "",
        //           "mediaIconVisible" => "hidden",
        //           "mediaVisible" => "hidden"
        //       ],
        //       "thumbnailClippingLarger" => [],
        //       "media" => [],
        //       "heading" => [],
        //       "content" => [
        //           "id" => 982544,
        //           "slug" => "/negocios/en-negociacion-del-t-mec-cuarto-de-junto-fue-marginado-coparmex",
        //           "xalokId" => "",
        //           "author" => [
        //               "id" => 1,
        //               "name" => ""
        //           ]
        //       ],
        //       "modules" => [],
        //     ),
        //  );
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
          'number' => 100
        ));
        return $responseRender;
    }

}
