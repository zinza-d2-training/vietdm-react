import CounterSlice from './CounterSlice';
import {
  plus,
  minus,
  setPositiveNumber,
  setDefaultValue,
  plusByAmount,
  minusByAmount,
  CounterInterface,
  counterReader
} from './CounterSlice';

describe('Counter Slice testing...', function () {
  const DefaultState: CounterInterface = {
    value: 10,
    positive_number: false
  };
  it('check function read: getPositiveNumber', function () {
    //value default in store
    expect(counterReader.getPositiveNumber()).toEqual(false);
  });
  it('check function read: count', function () {
    //value default in store
    expect(counterReader.count()).toEqual(0);
  });
  it('check plus number', function () {
    const result = CounterSlice(DefaultState, plus());
    expect(result.value).toEqual(11);
    expect(result.positive_number).toEqual(false);
  });
  it('check plus by amount', function () {
    const result = CounterSlice(DefaultState, plusByAmount(9));
    expect(result.value).toEqual(19);
    expect(result.positive_number).toEqual(false);
  });
  it('check minus number', function () {
    const result = CounterSlice(DefaultState, minus());
    expect(result.value).toEqual(9);
    expect(result.positive_number).toEqual(false);
  });
  it('check minus with positive_number true', function () {
    const useState = { ...DefaultState };
    useState.positive_number = true;
    const result = CounterSlice(useState, minus());
    expect(result.value).toEqual(9);
    expect(result.positive_number).toEqual(true);
  });
  it('check minus with positive_number true and incorrect value', function () {
    const useState = { ...DefaultState };
    useState.positive_number = true;
    useState.value = 0;
    const result = CounterSlice(useState, minus());
    expect(result.value).toEqual(0);
    expect(result.positive_number).toEqual(true);
  });
  it('check minus by amount with positive_number true and correct value', function () {
    const useState = { ...DefaultState };
    useState.positive_number = true;
    const result = CounterSlice(useState, minusByAmount(5));
    expect(result.value).toEqual(5);
    expect(result.positive_number).toEqual(true);
  });
  it('check minus by amount with positive_number true and incorrect value', function () {
    const useState = { ...DefaultState };
    useState.positive_number = true;
    const result = CounterSlice(useState, minusByAmount(50));
    expect(result.value).toEqual(0);
    expect(result.positive_number).toEqual(true);
  });
  it('check set position false', function () {
    const useState = { ...DefaultState };
    const result = CounterSlice(useState, setPositiveNumber(false));
    expect(result.positive_number).toEqual(false);
  });
  it('check set position true', function () {
    const useState = { ...DefaultState };
    const result = CounterSlice(useState, setPositiveNumber(true));
    expect(result.positive_number).toEqual(true);
  });
  it('check set position true and reset value to 0', function () {
    const useState = { ...DefaultState };
    useState.value = -10;
    const result = CounterSlice(useState, setPositiveNumber(true));
    expect(result.positive_number).toEqual(true);
    expect(result.value).toEqual(0);
  });
  it('check set default value with positive_number false', function () {
    const useState = { ...DefaultState };
    let result = CounterSlice(useState, setDefaultValue(7));
    expect(result.value).toEqual(7);

    result = CounterSlice(useState, setDefaultValue(-3));
    expect(result.value).toEqual(-3);
  });
  it('check set default value with positive_number true', function () {
    const useState = { ...DefaultState };
    useState.positive_number = true;
    const result = CounterSlice(useState, setDefaultValue(-3));
    expect(result.value).toEqual(0);
  });
});
