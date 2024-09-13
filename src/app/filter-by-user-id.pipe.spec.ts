import { FilterByUserIdPipe } from './filter-by-user-id.pipe';

describe('FilterByUserIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByUserIdPipe();
    expect(pipe).toBeTruthy();
  });
});
