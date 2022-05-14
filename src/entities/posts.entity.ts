import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "./base.entity";
import { Comment } from "./comments.entity";
import { User } from "./users.entity";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column({ type: "text" })
  public description!: string;

  @Column({ type: "boolean", default: true })
  public publish: boolean;

  @Column({ type: "int", nullable: false })
  public user_id?: number;

  @ManyToOne((_) => User, (user) => user.posts, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  public user: User;

  @OneToMany((_) => Comment, (comment) => comment.post)
  public comments: Comment[];
}
