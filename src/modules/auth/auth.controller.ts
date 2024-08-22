import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FormFilter } from '../../common/filters/form.filter';
import { AuthCounterDto, authCounterDtoMessages } from './auth.dto';
import { AuthCounterResponse } from './auth.entity';

@Controller('v1/auth')
@ApiTags('auth')
export class AuthController {
  private counter = 0;

  @TypedRoute.Post()
  @UseFilters(new FormFilter(authCounterDtoMessages))
  @ApiBody({
    type: AuthCounterDto,
  })
  @ApiOperation({ summary: 'Increment the counter' })
  @ApiCreatedResponse({ description: 'Get increment counter' })
  async getCount(
    @TypedBody() { count }: AuthCounterDto,
  ): Promise<AuthCounterResponse> {
    this.counter += count as number;
    return {
      counter: this.counter,
    };
  }

  @TypedRoute.Get('/heavy')
  @ApiOperation({ summary: 'Compute heavy counting' })
  @ApiOkResponse({ description: 'Get heavy counter' })
  async getCountHeavy(): Promise<AuthCounterResponse> {
    for (let i = 0; i <= 10000000000; i++) {
      this.counter++;
    }

    return {
      counter: this.counter,
    };
  }
}
