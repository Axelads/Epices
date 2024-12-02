import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ nullable: true })
  weight: number; // Assurez-vous d'ajouter cette propriété si vous l'utilisez.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
