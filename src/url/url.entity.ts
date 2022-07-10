import {PrimaryColumn, Column, Index, Entity} from 'typeorm';

@Entity('urls')
export class UrlEntity {
    @Index()
    @PrimaryColumn('varchar')
    code: string;

    @Column('varchar')
    original_url: string;

    @Index({ unique: true })
    @Column('varchar')
    short_url: string;

    @Column()
    clicks_num: number;
}
