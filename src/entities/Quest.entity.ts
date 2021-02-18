import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { User } from './User.entity';
import { Review } from './Review.entity';

enum Level {
    Easy = 'EASY',
    Medium = 'MEDIUM',
    Hard = 'HARD',
}

@Entity()
export class Quest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({
        type: 'enum',
        enum: Level,
    })
    level!: Level;

    @Column({ type: 'float' })
    latitude!: number;

    @Column({ type: 'float' })
    longitude!: number;

    @Column()
    solution!: string;

    @Column({ nullable: true })
    tip!: string;

    @ManyToOne(() => User, user => user.quests)
    user!: User;

    @OneToMany(() => Review, (review: Review) => review.quest)
    reviews!: Review[];

    @Column()
    @CreateDateColumn()
    @IsDate()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    @IsDate()
    updatedAt!: Date;
}
