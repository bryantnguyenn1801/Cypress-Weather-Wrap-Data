import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

let obj = {};
obj.result = [];

Given('Open the Weather Page', () => {
	cy.visit('https://weather.com/en-SG');
});

When('Choose the search field and input key Singapore, then click Search button', () => {
	cy.wait(10000);
	cy.get('#LocationSearch_input').type('Singapore');
	cy.wait(5000);
	cy.get('#LocationSearch_listbox-0').click();
});

Then('Retrive 10 days data of the weather', () => {
	const MAX_DAY = 10;
	cy.wait(5000);
	cy.contains('.layout-centered a:nth-child(3)', '10 Day').click();
	cy.get('[data-testid="DailyForecast"] strong')
		.should('contain.text', '10-Day Weather')
		.get('[data-testid="PresentationName"]')
		.should('contain.text', 'Singapore');

	// let count = 0;
	cy.get('[data-testid="DailyForecast"] details').each((element, index) => {
		if (index === MAX_DAY) return false;
		let data = {
			date: Cypress.$(element.find('div > div:nth-child(1) h3 span')).text(),
			temporature: {
				Day: Cypress.$(
					element.find('div > div:nth-child(1) [data-testid="ConditionsSummary"] > div > span')
				).text(),
				Night: Cypress.$(
					element.find('div > div:nth-child(3) [data-testid="ConditionsSummary"] > div > span')
				).text(),
			},
			humidity: {
				Day: Cypress.$(
					element.find('div > div:nth-child(2) [data-testid="HumidityTitle"] + span')
				).text(),
				Night: Cypress.$(
					element.find('div > div:nth-child(4) [data-testid="HumidityTitle"] + span')
				).text(),
			},
		};

		cy.log(JSON.stringify(data));
		obj.result.push(data);
	});

	cy.writeFile('htmlresult/WeatherData.json', obj);
	
});