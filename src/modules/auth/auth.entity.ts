import { tags } from 'typia';

export type AuthCounterResponse = {
  counter: number & tags.Type<'uint64'>;
};
