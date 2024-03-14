<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Entity\User;

class AdminController extends AbstractController
{

    #[Route('/admin', name: 'app_admin')]
    public function index(Request $request, UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        return $this->render('admin/admin.html.twig', [
            'users' => $users,    
        ]);
    }

    #[Route('/delete_user/{id}', name: 'app_admin_delete')]
    public function deleteUser(int $id, UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        $user = $userRepository->find($id);
        if ($user) {
            $em->remove($user);
            $em->flush();
        }
        return $this->redirectToRoute('app_admin');
    }

}