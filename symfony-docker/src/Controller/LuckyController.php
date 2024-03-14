<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 

class LuckyController extends AbstractController
{
    #[Route('/lucky/number', name: 'app_lucky_number')]
    public function number(): Response
    {
        $number = random_int(0, 100);

        return $this->render('lucky/number.html.twig', [
            'number' => $number,
            'title' => 'Lucky Number',
            'message' => 'Your lucky number is:',
        ]);
    }
}