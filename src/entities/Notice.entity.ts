import { BaseEntity, Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quest } from './Quest.entity';
import { User } from './User.entity';

@Entity()
export class Notice extends BaseEntity {
    @ManyToOne(() => User, (user: User) => user.id)
    @Column()
    player!: User;

    @OneToMany(() => Quest, (quest: Quest) => quest.idQuest)
    @Column()
    mission!: Quest;

    @Column()
    comment!: string;

    @Column()
    rating!: number;
}
