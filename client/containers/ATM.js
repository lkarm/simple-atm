import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currencyFormatter from 'currency-formatter';

import { setPin, setBalance } from '../actions/atm';
import PINForm from '../components/PINForm';
import Actions from '../components/Actions';
import styles from '../styles/atm.css';

export class ATMRaw extends React.Component {
  constructor(props) {
    super(props);
    this.resetPin = this.resetPin.bind(this);
  }
  
  resetPin() {
    this.props.setPinHandler(null);
    this.props.setBalanceHandler(null);
  }
  
  render() {
    const {
      pin,
      balance,
      setPinHandler,
      setBalanceHandler
    } = this.props;

    if (!pin) {
      // If there is no pin yet, show the welcome screen
      return (
        <div id="atm-welcome">
          <h1>Welcome to the Automated Teller Machine!</h1>
          <p>Enter PIN to get started.</p>
          <PINForm setPinHander={setPinHandler} setBalanceHander={setBalanceHandler} />
        </div>
      )
    }
    return (
      <div className={styles.atm}>
        <h1>Account Information</h1>
        <p>PIN: {pin}</p>
        <p>Balance: {currencyFormatter.format(balance, {code: 'USD'})}</p>
        <h2>Actions</h2>
        <Actions 
          pin={pin}
          setBalanceHandler={setBalanceHandler}
          setPinHandler={setPinHandler}
        />
        <button className={styles.logout} type="button" value="logout" onClick={this.resetPin}>Logout</button>
      </div>
    );
  }
}

ATMRaw.propTypes = {
  pin: PropTypes.string,
  balance: PropTypes.string,
  setPinHandler: PropTypes.func.isRequired,
  setBalanceHandler: PropTypes.func.isRequired,
}

ATMRaw.defaultProps = {
  pin: null,
  balance: null,
}

const mapStateToProps = (state) => ({
    pin: state.pin,
    balance: state.balance
});

const mapDispatchToProps = (dispatch) => ({
  setPinHandler: pin => {
    dispatch(setPin(pin));
  },
  setBalanceHandler: balance => {
    dispatch(setBalance(balance));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ATMRaw);
