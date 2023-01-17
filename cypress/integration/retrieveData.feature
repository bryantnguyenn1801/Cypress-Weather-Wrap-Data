Feature: Searching on Google 
I want to search some information on Google

Scenario: Retrieve 10 days weather in Singapore

    Given Open the Weather Page
    When Choose the search field and input key Singapore, then click Search button
    Then Retrive 10 days data of the weather