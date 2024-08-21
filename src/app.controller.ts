import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FormFilter } from './shared/filters/form.filter';
import { CounterDto, CounterResponse } from './types/Counter';

@Controller('v1')
@ApiTags('app')
export class AppController {
  private counter = 0;

  @TypedRoute.Post()
  @UseFilters(
    new FormFilter([
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
    ]),
  )
  @ApiBody({
    type: CounterDto,
  })
  @ApiOperation({ summary: 'Increment the counter' })
  @ApiCreatedResponse({ description: 'Get increment counter' })
  async getCount(@TypedBody() { count }: CounterDto): Promise<CounterResponse> {
    this.counter += count as number;
    return {
      counter: this.counter,
    };
  }

  @TypedRoute.Get('/heavy')
  @ApiOperation({ summary: 'Compute heavy counting' })
  @ApiOkResponse({ description: 'Get heavy counter' })
  async getCountHeavy(): Promise<CounterResponse> {
    for (let i = 0; i <= 10000000000; i++) {
      this.counter++;
    }

    return {
      counter: this.counter,
    };
  }
}
