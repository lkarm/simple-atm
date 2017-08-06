import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../styles/atm.css';

class PINForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const pin = this.state.value;
    // Get the account for the given PIN
    axios.get(`/account/${pin}`)
      .then((response) => {
        this.props.setPinHander(response.data.account_id);
        this.props.setBalanceHander(response.data.balance);
      })
      .catch((error) => {
        const message = `${error}\n${error.response.data}`
        alert(message);
      })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="pin" className={styles.pininput}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

PINForm.propTypes = {
  setPinHander: PropTypes.func.isRequired,
  setBalanceHander: PropTypes.func.isRequired,
}


export default PINForm;