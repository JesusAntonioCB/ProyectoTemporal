<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
  /**
   * @Route("/lucky/number")
   */
    public function number()
    {
        $number = random_int(0, 100);

        return $this -> render ( 'base/base.html.twig' , [
            'number' => $number ,
        ]);
    }
}