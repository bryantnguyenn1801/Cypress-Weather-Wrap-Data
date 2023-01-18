Feature: Wrap Weather Data in Singapore
I want to get information of the weather in 10 days in Singapore

Scenario: Retrieve 10 days weather in Singapore

    Given Open the Weather Page
    When Choose the search field and input key Singapore, then click Search button
    Then Retrive 10 days data of the weather