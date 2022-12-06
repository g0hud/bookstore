
export interface ISale {
  id: number;

  customer_id: number;
  product_id: number;

  quantity: number;
  unity_price: number;
  total_price: number;

  created_at: Date;
  updated_at: Date;
}
