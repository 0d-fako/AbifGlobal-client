package data.repository;

import data.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AccountsTest {

    BankRepository bankRepository;

    @BeforeEach
    public void setUp() {
        bankRepository = new Banks();
    }

    @Test
    public void testCreateEmptyAccount_countIsZero() {
        assertEquals(0, bankRepository.count());
    }

    @Test
    public void testCreateOneAccount_countIsOne() {
        Account account = new Account();
        account.setFirstName("John");
        account.setLastName("John");
        account.setPin("1234");
        bankRepository.save(account);
        assertEquals(1, bankRepository.count());
    }

    @Test
    public void testCreateTwoAccounts_countIsTwo() {
        Account account = new Account();
        account.setFirstName("John");
        account.setLastName("John");
        account.setPin("1234");
        bankRepository.save(account);
        assertEquals(1, bankRepository.count());


        Account account2 = new Account();
        account2.setFirstName("Yusuf");
        account2.setLastName("Yusuf");
        account2.setPin("1234");
        bankRepository.save(account2);
        assertEquals(2, bankRepository.count());
    }

    @Test
    public void testCreateOneAccount_findAccountByFirstNameAndLastName() {
        Account account = new Account();
        account.setFirstName("John");
        account.setLastName("Yusuf");
        account.setPin("1234");
        bankRepository.save(account);
        assertEquals(1, bankRepository.count());

        Account accountFirstName = bankRepository.findAccountByFirstName("John");
        assertEquals(accountFirstName.getFirstName(), account.getFirstName());
        Account accountLastName = bankRepository.findAccountByLastName("Yusuf");
        assertEquals(accountLastName.getLastName(), account.getLastName());
    }

    @Test
    public void testCreateOneAccount_accountGetAnId_deleteAccount_countIsZero() {
        Account account = new Account();
        account.setFirstName("John");
        account.setLastName("Yusuf");
        account.setPin("1234");

        bankRepository.deleteAccount(account);
        assertEquals(0, bankRepository.count());
    }

    @Test
    public void testCreateOneAccount_deleteAccountById_countIsZero() {
        Account account = new Account();
        account.setFirstName("John");
        account.setLastName("Yusuf");
        account.setPin("1234");
        bankRepository.save(account);
        assertEquals(1, bankRepository.count());
        account.setAccountId(bankRepository.generateAccountId());
        assertEquals(1, account.getAccountId());
        bankRepository.deleteAccountById(account.getAccountId());
        assertEquals(0, bankRepository.count());
    }


}