package services;

import data.model.Account;


public class AccountServiceImpl implements AccountServices{

    @Override
    public Account createAccount(Account account) {
        return null;
    }

    @Override
    public double getBalance(String pin, String accountNumber) {
        return 0;
    }

    @Override
    public void closeAccount(String pin, String accountNumber) {

    }

    @Override
    public Account findAccountByAccountNumber(String accountNumber) {
        return null;
    }

    @Override
    public Account deposit(String pin, String accountNumber, double amount) {
        return null;
    }

    @Override
    public Account withdraw(String pin, String accountNumber, double amount) {
        return null;
    }

    @Override
    public Account changePin(String accountNumber, String oldPin, String newPin) {
        return null;
    }
}
