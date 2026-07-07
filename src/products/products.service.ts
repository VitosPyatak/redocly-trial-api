import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private readonly productNames = [
    'Widget',
    'Gadget',
    'Gizmo',
    'Doohickey',
    'Thingamajig',
  ];

  private randomProduct(id: number): Product {
    return {
      id,
      name: this.productNames[Math.floor(Math.random() * this.productNames.length)],
      price: Math.round(Math.random() * 10000) / 100,
    };
  }

  findAll(limit: number): Product[] {
    return Array.from({ length: limit }, (_, i) => this.randomProduct(i + 1));
  }

  findOne(id: number): Product {
    return this.randomProduct(id);
  }

  search(query: string): { query: string; results: Product[] } {
    const count = Math.floor(Math.random() * 3) + 1;
    return {
      query,
      results: Array.from({ length: count }, (_, i) => this.randomProduct(i + 1)),
    };
  }
}
