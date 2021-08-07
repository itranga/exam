<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Category;
use App\Entity\Product;

use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;


class DefaultController extends AbstractController
{
    /**
     * 
     * @Route("/{reactRouting}", name="home", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})

     */



    public function index()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/categories", name="categories")
     */

    public function getCategories()
    {

        $repository = $this->getDoctrine()->getRepository(Category::class);

        $products = $repository->findAll();

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $arrayCollection = array();

        foreach ($products as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name' => $item->getTitle(),
            );
        }

        $response->setContent(json_encode($arrayCollection));

        return $response;
    }

    /**
     * @Route("/api/products/{cateId}", name="products")
     */

    public function getProducts(int $cateId)
    {

        $repository = $this->getDoctrine()->getRepository(Product::class);

        $products = $repository->findBy(array('category_id' => $cateId));

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $arrayCollection = array();

        foreach ($products as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name' => $item->getName(),
                'price' => $item->getPrice(),
                'category' => $item->getCategoryId(),
            );
        }

        $response->setContent(json_encode($arrayCollection));

        return $response;
    }
}