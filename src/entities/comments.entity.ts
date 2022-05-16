import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "./base.entity";
import { Post } from "./posts.entity";
import { User } from "./users.entity";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "text" })
  public description!: string;

  @ManyToOne((_) => Post, (post) => post.comments, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "post_id", referencedColumnName: "id" })
  public post: Post;

  @Column({ type: "int", nullable: false })
  post_id?: number;

  @Column({ type: "int", nullable: false })
  user_id?: number;

  @ManyToOne((_) => User, (user) => user.comments, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  public user: User;
}
