import {Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user";

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column()
    expires_in: number

    @OneToOne(() => User, user => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "id_user"
    })
    user: User
}