"use strict";

const account = require('./account');
const utils = require('./utils');

/* Create a new account */
exports.create = (req, resp) => {
    let balance = 0;

    // Verify correct parameters were given
    if (!req.body || !req.body.account_id ) return resp.status(400).send('Request requires account_id.');
    if(req.body.balance) {
        balance = utils.getVerifiedBalance(req.body.balance)
        if(!balance) return resp.status(400).send('Balance must be a positive number');
    }
    const accountID = req.body.account_id
    // Verify account doesn't already exist before saving
    account.getAccount(accountID, (result) => {
        if (result) {
            return resp.status(400).send('Account already exists.');
        }
        account.saveAccount(accountID, balance, (err, res) => {
            if(err || res !== 'OK') {
                return res.status(500).send('Error creating account. Try again later');
            }
        });
        return resp.status(201).send();
    })
    
}

/* Get details of the account */
exports.get = (req, resp) => {
    if (!req.params || !req.params.accountID ) return resp.status(400).send('Request requires account_id.');
    account.getAccount(req.params.accountID, (result) => {
        if(!result) {
            return resp.status(404).send(`Account ${req.params.accountID} not found.`)
        }
        const data = {
            account_id: req.params.accountID,
            balance: result
        }
        return resp.send(data);
    });
}

/* Update an account */
exports.update = (req, resp) => {
    const accountID = req.params.accountID;
    if (!req.params || !req.params.accountID ) return resp.status(400).send('Request requires account_id.');
    // Validate that the right parameters were given
    if (!req.body || !req.body.ammount ) return resp.status(400).send('"ammount" is a required input');
    if (!req.body || !req.body.action ) return resp.status(400).send('"action" is a required input');
    const ammount = req.body.ammount;
    const action = req.body.action;
    
    // Validate that the inputs are valid
    if (!utils.verifyActionInput(action)) return resp.status(400).send('action must either be "withdraw" or "deposit"');
    const parsedAmmount = utils.getVerifiedBalance(ammount);
    if(!parsedAmmount) return resp.status(400).send('Ammount must be a positive number');
    
    // Get current account balance
    account.getAccount(accountID, (result) => {
        let newBalance;
        if(!result) {
            // If there was no result, account does not exist
            return resp.status(404).send(`Account ${accountID} not found.`)
        }

        // Result comes back as a string so need to parse it back to a Float
        const oldBalance = parseFloat(result);

        // Update account balance
        if (action === 'withdraw') {
            newBalance = oldBalance - parsedAmmount;
            if (newBalance < 0) return resp.status(400).send('You cannot withdraw more than your current balance');
        } else {
            newBalance = oldBalance + parsedAmmount;
        }
        account.saveAccount(accountID, newBalance, (err, res) => {
            if(err || res !== 'OK') {
                return res.status(500).send('Error updating account. Try again later');
            }
        });
        const data = {
            account_id: accountID,
            balance: newBalance,
        }
        return resp.send(data);
    });
}
