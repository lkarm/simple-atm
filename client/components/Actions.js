import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../styles/actions.css';

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'withdraw',
      ammount: '0',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const ammount = this.state.ammount
    const action = this.state.action
    // Update account based on action and ammount
    axios.put(`account/${this.props.pin}`, {
      ammount,
      action
    })
    .then((response) => {
      alert('Balance was updated successfully');
      this.props.setPinHandler(this.props.pin)
      this.props.setBalanceHandler(response.data.balance.toString())
      event.preventDefault();
      event.returnValue = false;
    })
    .catch((error) => {
      const message = `${error}\n${error.response.data}`
      alert(message);
    })
  }

  render() {
    return (
      <div className={styles.actions}>
        <p> Pick which action you would like to perform: </p>
        <form>
          <label htmlFor="action" className={styles.dropdown}>
            <select name="action" value={this.state.value} onChange={this.handleInputChange}>
              <option value="withdraw">Withdraw</option>
              <option value="deposit">Deposit</option>
            </select>
          </label>
          <label htmlFor="pin" className={styles.textinput}>
            Ammount (in USD)
            <input name="ammount" type="text" value={this.state.value} onChange={this.handleInputChange} />
          </label>
          <button type="button" value="Submit" onClick={this.handleSubmit}> Submit </button>
        </form>
      </div>
    )
  }
}

Actions.propTypes = {
  pin: PropTypes.string.isRequired,
  setBalanceHandler: PropTypes.func.isRequired,
  setPinHandler: PropTypes.func.isRequired,
}

export default Actions;