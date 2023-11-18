import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './enums/role.enum';
import { DailyRecord } from 'src/modules/emotional-record/entities/daily-record.entity';
import { TranscendentalRecord } from 'src/modules/emotional-record/entities/transcendental-record.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => DailyRecord, (dailyrecord) => dailyrecord.user_id)
  dailyRecords: DailyRecord[];

  @OneToMany(
    () => TranscendentalRecord,
    (transcendentalRecord) => transcendentalRecord.user_id,
  )
  transcendentalRecords: TranscendentalRecord[];
}
