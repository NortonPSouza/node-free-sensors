import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user";

@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToOne(()=> User, user => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "id_user"
    })
    user: User
}