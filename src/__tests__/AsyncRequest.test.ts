import { describe, expect, test } from '@jest/globals';
import AsyncRequest from '@lib/AsyncRequest';

describe('AsyncRequest module', () => {
  const req = new AsyncRequest("https://google.com");
  req.setMethod("GET")
  req.onSuccess(function(event: any) {
    console.log(event);
  })
  req.send();

  test('Request method is GET', () => {
    expect(req.getMethod()).toEqual("GET");
  });
});
