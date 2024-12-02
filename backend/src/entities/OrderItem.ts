import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column("decimal")
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.orderItems, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
  order: Order;
}
