<?php
namespace App\Controller;

//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LuckyController extends AbstractController
{

    /**
     * @Route{"/lucky/number"}
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function numberAction()
    {
        $number = rand(0, 100);
        //return new Response('<html><body>Lucky Number:' . $number . '</body></html>');
        return $this->render('lucky/number.html.twig', [
            'number' => $number
        ]);
    }
}
