import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import bcrypt from "bcrypt";

import { Post } from "./posts.entity";
import { BaseEntity } from "./base.entity";
import { Comment } from "./comments.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public password!: string;

  // (target relation similar to 'references' <table> ('column')) in sql
  @OneToMany((_) => Post, (post) => post.user)
  public posts: Post[];

  @OneToMany((_) => Comment, (comment) => comment.user)
  public comments: Comment[];

  makePassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }

  checkPassword(raw_password: string) {
    return bcrypt.compareSync(raw_password, this.password);
  }
}
