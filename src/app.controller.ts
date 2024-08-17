import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { ApiResponse } from './types/ApiResponse';

@Controller()
export class AppController {
  private counter = 0;

  @TypedRoute.Get()
  async getCount(): Promise<ApiResponse> {
    return {
      counter: ++this.counter,
    };
  }

  @TypedRoute.Get('/heavy')
  async getCountHeavy(): Promise<ApiResponse> {
    for (let i = 0; i <= 10000000000; i++) {
      this.counter++;
    }

    return {
      counter: this.counter,
    };
  }
}
