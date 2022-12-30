Feature: Create Read Edit Delete Customer

  Background:
    Given system error codes are following
      | Code | Description                                                |
      | 101  | Invalid Mobile Number                                      |
      | 102  | Invalid Email address                                      |
      | 103  | Invalid Bank Account Number                                |
      | 201  | Duplicate customer by First-name, Last-name, Date-of-Birth |
      | 202  | Duplicate customer by Email address                        |


  Scenario: Create Read Edit Delete Customer
    When user creates a customer with following data
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber |
      | John      | Doe      | john@doe.com | +989121234567 | 01-JAN-2000 | IR000000000000001 |
    Then user can see customer in the table and filter with below data to get "1" record
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber |
      | John      | Doe      | john@doe.com | +989121234567 | 01-JAN-2000 | IR000000000000001 |
    When user creates a customer with following data
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber |
      | john      | doe      | jane@doe.com | +989121234567 | 01-JAN-2000 | IR000000000000001 |
    Then user must receive an error with code of "201"
    When user edit customer with new data
      | FirstName | LastName | Email            | PhoneNumber | DateOfBirth | BankAccountNumber |
      | Jane      | William  | jane@william.com | +3161234567 | 01-FEB-2010 | IR000000000000002 |
    Then user can lookup all customers and filter by below properties and get "0" records
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber |
      | John      | Doe      | john@doe.com | +989121234567 | 01-JAN-2000 | IR000000000000001 |
    And user can lookup all customers and filter by below properties and get "1" records
      | FirstName | LastName | Email            | PhoneNumber | DateOfBirth | BankAccountNumber |
      | Jane      | William  | jane@william.com | +3161234567 | 01-FEB-2010 | IR000000000000002 |
    When user delete customer by Email of "new@email.com"
    Then user can get all records and get "0" records
