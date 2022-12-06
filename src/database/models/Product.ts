
export interface IProduct {
  id: number;

  title: string;
  synopsis: string;
  author: string;
  cover: string;
  category: string;
  language: string;
  publisher: string;
  pages: number;
  isbn: string;
  stock: number;

  price: number;

  available: boolean;

  created_at: Date;
  updated_at: Date;
}
