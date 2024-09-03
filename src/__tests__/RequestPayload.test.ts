import { RequestPayload } from "@lib/AsyncRequest";
import { describe, expect, test } from '@jest/globals';

describe('RequestPayload class', () => {
  const payload = new RequestPayload({
    "name": "test 1",
    "lastname": "test 2"
  });

  test('Testing keys to be a Query String', () => {
    expect(payload.toQueryString(true)).toEqual("?name=test%201&lastname=test%202");
  });

  test('payload to be an instance of FormData', () => {
    expect(payload.toFormData()).toBeInstanceOf(FormData);
  });

  test('FormData to have 2 keys', () => {
    expect(Array.from(payload.toFormData().keys()).length).toEqual(2);
  });

  test('FormData to have name key', () => {
    expect(payload.toFormData().get('name')).toEqual('test 1');
  });
});

