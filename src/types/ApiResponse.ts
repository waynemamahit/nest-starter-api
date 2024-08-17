import { tags } from 'typia';

export type ApiResponse = {
  counter: number & tags.Type<'uint64'>;
};
