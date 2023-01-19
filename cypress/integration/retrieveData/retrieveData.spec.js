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
	const temporatureLoc = 'div > div:nth-child(%s) [data-testid="ConditionsSummary"] > div > span';
	const humidityLoc = 'div > div:nth-child(%s) [data-testid="HumidityTitle"] + span';

	cy.wait(5000);
	cy.contains('.layout-centered a:nth-child(3)', '10 Day').click();
	cy.get('[data-testid="DailyForecast"] strong')
		.should('contain.text', '10-Day Weather')
		.get('[data-testid="PresentationName"]')
		.should('contain.text', 'Singapore');

	cy.get('[data-testid="DailyForecast"] details').each((element, index) => {
		if (index === MAX_DAY) return false;

		let isShowNightOnly = Cypress.$(element.find('div > div h3 span')).length === 1;

		let data = {
			date: Cypress.$(element.find('div > div:nth-child(1) h3 span')).text(),
			temporature: {
				Day: isShowNightOnly
					? ''
					: Cypress.$(element.find(temporatureLoc.replace('%s', '1'))).text(),
				Night: Cypress.$(
					element.find(temporatureLoc.replace('%s', `${isShowNightOnly ? '1' : '3'}`))
				).text(),
			},
			humidity: {
				Day: isShowNightOnly ? '' : Cypress.$(element.find(humidityLoc.replace('%s', '2'))).text(),
				Night: Cypress.$(
					element.find(humidityLoc.replace('%s', `${isShowNightOnly ? '2' : '4'}`))
				).text(),
			},
		};

		cy.log(JSON.stringify(data));
		obj.result.push(data);
	});

	cy.writeFile('htmlresult/WeatherData.json', obj);
});