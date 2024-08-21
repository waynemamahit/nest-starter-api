import { ApiProperty } from '@nestjs/swagger';
import { tags } from 'typia';

export class CounterDto {
  @ApiProperty({
    description: 'Name property',
    type: '',
  })
  name: string & tags.MinLength<3>;

  @ApiProperty({
    description: 'Count number property',
  })
  count: number & tags.Type<'uint64'>;
}
