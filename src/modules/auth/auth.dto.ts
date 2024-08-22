import { ApiProperty } from '@nestjs/swagger';
import { tags } from 'typia';

export class AuthCounterDto {
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

export const authCounterDtoMessages = [
  {
    message: 'Minimal length name is 3!',
    path: '$input.name',
    expected: 'MinLength<3>',
  },
  {
    message: 'Count property must be number!',
    path: '$input.count',
    expected: 'uint64',
  },
];
