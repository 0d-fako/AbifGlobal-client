package data.repository;

import data.model.Account;

import java.util.List;
import java.util.Set;

public class Banks implements BankRepository {
    @Override
    public List<Account> accounts() {
        return List.of();
    }

    @Override
    public Set<String> accountNumbers() {
        return Set.of();
    }

    @Override
    public Account save(Account account) {
        return null;
    }

    @Override
    public Account findByAccountNumber(String accountNumber) {
        return null;
    }

    @Override
    public Account findAccountByLastName(String lastName) {
        return null;
    }

    @Override
    public Account findAccountByFirstName(String firstName) {
        return null;
    }

    @Override
    public void delete(Account account) {

    }

    @Override
    public void deleteAccountById(long accountId) {

    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public List<Account> getAllAccounts() {
        return List.of();
    }

    @Override
    public Account deleteAccount(Account account) {
        return null;
    }

    @Override
    public Account confirmPin(String pin) {
        return null;
    }

    @Override
    public long generateAccountId() {
        return 0;
    }
}
