import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DailyRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  primaryEmotion: string;

  @Column({ length: 255, nullable: true })
  secondaryEmotion: string;

  @Column('varchar', { length: 255 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.dailyRecords)
  user: User;
}
