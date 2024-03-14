<?php

namespace App\Repository;

use App\Entity\LuckyNumber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LuckyNumber>
 *
 * @method LuckyNumber|null find($id, $lockMode = null, $lockVersion = null)
 * @method LuckyNumber|null findOneBy(array $criteria, array $orderBy = null)
 * @method LuckyNumber[]    findAll()
 * @method LuckyNumber[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LuckyNumberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LuckyNumber::class);
    }

       /**
        * @return LuckyNumber[] Returns an array of LuckyNumber objects
        */
       public function findLuckyNumberByUserId($userId): array
       {
           return $this->createQueryBuilder('u')
               ->andWhere('u.userId = :userId')
               ->setParameter('userId', $userId)
               ->orderBy('u.id', 'ASC')
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }

    //    public function findOneBySomeField($value): ?LuckyNumber
    //    {
    //        return $this->createQueryBuilder('l')
    //            ->andWhere('l.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
