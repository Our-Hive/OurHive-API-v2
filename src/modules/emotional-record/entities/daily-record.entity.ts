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
  @Column('varchar', { length: 255 })
  emotion: string;
  @Column('varchar', { length: 30 })
  title: string;
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
