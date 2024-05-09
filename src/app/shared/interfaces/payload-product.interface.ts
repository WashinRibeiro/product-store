import { IProduct } from "./product.inferface";

export type ProductPayload = Omit<IProduct, 'id'>;