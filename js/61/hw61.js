function bankAccount(balance) {
    function performTransaction(amount) {
        this.balance += amount;
        return this.balance;
    }

    return {
        balance: balance,
        performTransaction: performTransaction
    };
}
const account1 = bankAccount(100);
console.log(account1.performTransaction(50));

const account2 = bankAccount(1000);
console.log(account2.performTransaction(200));

///////

function bankAccount2(balance) {
    return {
        balance: balance,
        transaction: transaction
    };
}
function transaction(amount) {
    this.balance += amount;
    return this.balance;
}
const account3 = bankAccount2(500);

transaction.call(account3, 50);

const depositFiftyInSavings = transaction.bind(account3, 50);
depositFiftyInSavings();