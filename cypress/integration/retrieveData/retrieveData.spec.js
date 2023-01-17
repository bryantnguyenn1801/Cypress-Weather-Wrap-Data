import { Given , Then , When} from "cypress-cucumber-preprocessor/steps";


Given('Open the Weather Page', () => {
    cy.visit('https://weather.com/en-SG')
})

When ('Choose the search field and input key Singapore, then click Search button', () => {
    cy.wait(10000)
    cy.get("#LocationSearch_input").type("Singapore")
    cy.wait(5000)
    cy.get('#LocationSearch_listbox-0').click()
})

Then ('Retrive 10 days data of the weather', () => {
    cy.wait(10000)
    cy.contains('.layout-centered a:nth-child(3)', '10 Day').click()
    cy.get('[data-testid="DailyForecast"] strong').should('contain.text', '10-Day Weather')
      .get('[data-testid="PresentationName"]').should('contain.text', 'Singapore')

    let i = 0;
    while (i <  10) {
        cy.get(`#detailIndex${i} [data-testid="DailyContent"] h3`).then(($el) => { 
            const itemCount = Cypress.$($el).length;
            if (itemCount === 1) {
                cy.get(`#detailIndex${i} [data-testid="DailyContent"]:nth-child(1) h3`).then(function($a) {
                    cy.log($a.text())
                    cy.get(`#detailIndex${i} [data-testid="DailyContent"]:nth-child(1) [data-testid="TemperatureValue"]`).then(function($temp1) {
                        cy.log($temp1.text())
                    })
                })
            }
            else {
                daypart.invoke('text')
                cy.get(`#detailIndex${i} [data-testid="DailyContent"]:nth-child(1) [data-testid="TemperatureValue"]`).then(function($tempDay) {
                    cy.log($tempDay.text())
                }) 
                cy.get(`#detailIndex${i} [data-testid="DailyContent"]:nth-child(2) [data-testid="TemperatureValue"]`).then(function($tempNight) {
                    cy.log($tempNight.text())
                }) 
            }
                
            })
            cy.wait(5000)
            cy.get(`#detailIndex${i + 1} summary [data-testid="DetailsSummary"]`).click({force:true})
            console.log(i)   
        }
        i++;
    })
    
    

    // cy.get("//strong[contains(text(),'10-Day Weather')]").eq('10-Day Weather');
    // cy.get('[data-testid="DailyContent"] h3 span').each((item, index, list) => {
    //     // Returns the elements from the cy.get command
    //     expect(list).to.have.length(3);
    
    //     // Returns the current element from the loop
    //     expect(Cypress.$(item).text()).to.eq(labels[index]);
    // });