<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {


        $category = new Category();
        $category->setTitle('Children');
        $manager->persist($category);

        $category = new Category();
        $category->setTitle('Fiction');
        $manager->persist($category);


        $product = new Product();
        $product->setCategoryId(1);
        $product->setName('Children book 1');
        $product->setPrice(100);
        $manager->persist($product);

        $product = new Product();
        $product->setCategoryId(1);
        $product->setName('Children book 2');
        $product->setPrice(135.50);
        $manager->persist($product);


        $product = new Product();
        $product->setCategoryId(2);
        $product->setName('Fiction book 1');
        $product->setPrice(100.75);
        $manager->persist($product);


        $product = new Product();
        $product->setCategoryId(2);
        $product->setName('Fiction book 2');
        $product->setPrice(200.75);
        $manager->persist($product);



        $manager->flush();
    }
}