import { BaseEntity, Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

enum Level {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'Hard',
}

@Entity()
export class Quest extends BaseEntity {
    @PrimaryGeneratedColumn()
    idQuest!: string;

    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn()
    creator!: User;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    level!: Level;

    @Column()
    latittude!: number;

    @Column()
    longitude!: number;

    @Column()
    solution!: string;

    @Column()
    tips!: string;
}
