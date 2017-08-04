const utils = require('../../server/utils');

describe('verifyActionType()', () => {
  it('returns true when action is withdraw', () => {
    expect(utils.verifyActionInput('withdraw')).toBe(true);
  });
  it('returns true when action is deposit', () => {
    expect(utils.verifyActionInput('deposit')).toBe(true);
  });
  it('returns false when not an accepted action', () => {
    expect(utils.verifyActionInput('take-everything')).toBe(false);
  });
  it('returns false when action is close but not right', () => {
    expect(utils.verifyActionInput('withdrawal')).toBe(false);
  });
  it('returns false when null is passed in', () => {
    expect(utils.verifyActionInput(null)).toBe(false);
  });
  it('returns false something other than a string is passed in', () => {
    expect(utils.verifyActionInput(100)).toBe(false);
  });
});

describe('getVerifiedBalance()', () => {
  it('returns the new balance when input is a number as a string', () => {
    expect(utils.getVerifiedBalance('5')).toBe(5);
  });
  it('returns the new balance when input is a number', () => {
    expect(utils.getVerifiedBalance(10.55)).toBe(10.55);
    expect(utils.getVerifiedBalance(111)).toBe(111);
  });
  it('returns false when input is not a number', () => {
    expect(utils.getVerifiedBalance('five-hundred')).toBe(false);
    expect(utils.getVerifiedBalance('FF2F')).toBe(false);
    expect(utils.getVerifiedBalance('!@#$%^&@a')).toBe(false);
  });
  it('returns false when input is a negative number', () => {
    expect(utils.getVerifiedBalance('-600')).toBe(false);
    expect(utils.getVerifiedBalance(-90)).toBe(false);
  });
})
