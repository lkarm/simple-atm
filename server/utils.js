
exports.verifyActionInput = action => {
  const actionTypes = ['withdraw', 'deposit'];
  return actionTypes.indexOf(action) !== -1;
}

exports.getVerifiedBalance = balance => {
  const parsedBalance = parseFloat(balance);
  if (!isNaN(parsedBalance) && parsedBalance > 0) {
    return parsedBalance
  }
  return false;
}
