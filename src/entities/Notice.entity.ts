import { BaseEntity, Entity, Column } from 'typeorm';

@Entity()
export class Notice extends BaseEntity {
    @Column()
    player!: number;

    @Column()
    mission!: number;

    @Column()
    comment!: string;

    @Column()
    rating!: number;
}
