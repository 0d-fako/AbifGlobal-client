package services;

import data.model.Account;

public interface AccountServices {

    Account createAccount(Account account);
    double getBalance(String pin, String accountNumber);
    void closeAccount(String pin, String accountNumber);
    Account findAccountByAccountNumber(String accountNumber);
    Account deposit(String pin, String accountNumber, double amount);
    Account withdraw(String pin, String accountNumber, double amount);
    Account changePin(String accountNumber, String oldPin, String newPin);

}
