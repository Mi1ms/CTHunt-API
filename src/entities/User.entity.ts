import { Quest } from './Quest.entity';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from 'typeorm';
import { Length, IsDate } from 'class-validator';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import { Review } from './Review.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column({ select: false })
    @Length(4, 100)
    password!: string;

    @OneToMany(() => Quest, (quest: Quest) => quest.user)
    quests!: Quest[];

    @OneToMany(() => Review, (review: Review) => review.user)
    reviews!: Review[];

    @Column()
    @CreateDateColumn()
    @IsDate()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    @IsDate()
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void {
        this.password = hashSync(this.password, genSaltSync());
    }

    isPasswordValid(password: string): boolean {
        return compareSync(password, this.password);
    }

    checkId(id: string): boolean {
        return this.id === id;
    }

    checkIds(currentId: string, id: string): boolean {
        return currentId === id;
    }
}
