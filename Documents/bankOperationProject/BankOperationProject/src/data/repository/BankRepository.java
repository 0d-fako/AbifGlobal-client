package data.repository;

import data.model.Account;

import java.util.List;
import java.util.Set;

public interface BankRepository  {

    List<Account> accounts();
    Set<String> accountNumbers();
    Account save (Account account);
    Account findByAccountNumber(String accountNumber);
    Account findAccountByLastName(String lastName);
    Account findAccountByFirstName(String firstName);
    List<Account> getAllAccounts();
    Account deleteAccount(Account account);
    Account confirmPin(String pin);

    long generateAccountId();
    void delete(Account account);
    void deleteAccountById(long accountId);
    long count();


}
