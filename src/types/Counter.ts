import { ApiProperty } from '@nestjs/swagger';
import { tags } from 'typia';

type countType = number & tags.Type<'uint64'>;

export type CounterResponse = {
  counter: countType;
};

export class CounterDto {
  @ApiProperty({
    description: 'Name property',
    type: '',
  })
  name: string & tags.MinLength<3>;

  @ApiProperty({
    description: 'Count number property',
  })
  count: countType;
}
