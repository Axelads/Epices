import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity({ name: "users" }) // Spécifie que cette entité correspond à la table "users"
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["user", "admin"], // Les rôles possibles
    default: "user", // Rôle par défaut
  })
  role: "user" | "admin"; // Typage strict des rôles

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;
}
