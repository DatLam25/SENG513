<?php
namespace App\Controller;

use App\Repository\LuckyNumberRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 
use App\Entity\LuckyNumber;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class LuckyController extends AbstractController
{
    #[Route('/lucky/number', name: 'app_lucky_number')]
    public function number(EntityManagerInterface $em): Response
    {
        $number = random_int(0, 100);

        $luckyNumber = new LuckyNumber();
        $luckyNumber->setValue($number);
        $luckyNumber->setGeneratedAt(new \DateTimeImmutable());

        $em->persist($luckyNumber);
        $em->flush(); //This will save the lucky number to the database

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

    #[Route(path: '/lucky/number/save', name: 'app_lucky_number_save')]
    public function save(EntityManagerInterface $em, Request $request, LuckyNumberRepository $rep): Response
    {
        //url?id=19&max=100
        $max = $request->query->get('max', 100);
        $id = $request->query->get('id');
        
        $number = random_int(0, $max);

        $luckyNumber = new LuckyNumber();
        $luckyNumber->setValue($number);
        $luckyNumber->setGeneratedAt(new \DateTimeImmutable());
        $luckyNumber->setUserId($id);

        $em->persist($luckyNumber);
        $em->flush(); //This will save the lucky number to the database

        $history = $rep->findLuckyNumberByUserId($id);

        return $this->render('lucky/number_save.html.twig', [
            'number' => $number,
            'title' => 'Lucky Number',
            'message' => 'Welcome to the lucky number page!',
            'id' => $id,
            'history' => $history
        ]);
    }
}