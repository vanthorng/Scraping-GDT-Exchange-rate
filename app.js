const puppeteer = require('puppeteer')

async function scrape() {
    const broswer = await puppeteer.launch({})
    const page = await broswer.newPage()

    await page.goto('https://www.tax.gov.kh/en/exchange-rate')    
    let currentRate = await page.evaluate(() => {
        let rate = document.querySelector(".current-rate").innerText
        let date = document.querySelector(".current-date").innerText
        return [date, rate]
    })
    let dataRows = await page.evaluate(() => {
        let rows = Array.from(document.querySelectorAll("#data-container tr"))
        return Array.from(rows, row => {
            let cols = row.querySelectorAll('td')
            return Array.from(cols, col => col.innerText)
        })
    })
    console.log(currentRate)
    console.log(dataRows)
    broswer.close()
}
scrape()