import { tags } from 'typia';

export type CounterResponse = {
  counter: number & tags.Type<'uint64'>;
};
