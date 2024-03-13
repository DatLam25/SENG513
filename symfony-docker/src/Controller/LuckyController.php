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
            'message' => 'Your lucky number is:'
        ]);
    }

    #[Route('/lucky/number/{max}', name: 'app_lucky_number_max', requirements: ['max' => '\d+'])]
    public function numberMax($max): Response
    {
        $number = random_int(0, $max);

        return $this->render('lucky/number.html.twig', [
            'number' => $number,
            'title' => 'Lucky Number',
            'message' => 'Hey<br>lucky number is:'
        ]);
    }
}