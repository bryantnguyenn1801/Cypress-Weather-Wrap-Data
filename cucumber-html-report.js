const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "cypress/reports/cucumber-json",
    reportPath: "cypress/reports/",
    ignoreBadJsonFile: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "109",
        },
        device: "Local test machine",
        platform: {
            name: "mac",
            version: "big sur",
        },
    },  
});