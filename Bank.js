// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

   // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit) {
        let newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    
    deposit(amount) {
        this.balance += amount;
        let newTransaction = new transaction({transactionType: "Deposit", amount: amount});
        this.transactionHistory.push(newTransaction);
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    withdraw(amount) {
        this.balance -= amount;
        let newTransaction = new transaction({transactionType: "Withdrawal", amount: amount});
        this.transactionHistory.push(newTransaction);
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }

    transfer(amount, recipientAccount) {
        this.balance -= amount;
        recipientAccount.balance += amount;
        let newTransaction = new transaction({transactionType: "Transfer", amount: amount, to: recipientAccount.name});
        this.transactionHistory.push(newTransaction);
        newTransaction = new transaction({transactionType: "Received", amount: amount, from: this.name});
        recipientAccount.transactionHistory.push(newTransaction);
    }
    
    // Example: checkBalance()

    checkBalance() {
        return this.balance;
    }
}

class transaction {
    constructor(transactionData) {
        this.transactionType = transactionData["transactionType"];
        this.amount = transactionData["amount"];

        if (this.transactionType == "Transfer"){ 
            this.to = transactionData["to"];
        } else if (this.transactionType == "Received") {
                this.from = transactionData["from"];
        }
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

console.log(testBankOperations());

