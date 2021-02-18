import {
    PrimaryGeneratedColumn,
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Quest } from './Quest.entity';
import { User } from './User.entity';
import { IsDate } from 'class-validator';

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    comment!: string;

    @Column()
    rating!: number;

    @ManyToOne(() => User, (user: User) => user.reviews)
    user!: User;

    @OneToMany(() => Quest, (quest: Quest) => quest.reviews)
    quest!: Quest;

    @Column()
    @CreateDateColumn()
    @IsDate()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    @IsDate()
    updatedAt!: Date;
}
