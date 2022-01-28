const fs = require("fs");
const get_chrome_files_list = require("../../utils/get_chrome_files_list")
const get_chrome_files_b64 = require("../../utils/get_chrome_files_b64")
const decode_b64_files = require("../../utils/decode_b64_files")
const sleep = require("../../utils/sleep")

describe("Download multiple files from VM", async function() {
    it("Download file from VM", async function() {
        await browser.url("https://the-internet.herokuapp.com/download")

        let downloadLinks = await $$("//a[contains(@href, 'download/')]")
        browser.execute("sauce:context=Downloading File #1")
        await downloadLinks[0].click()
        downloadLinks = await $$("//a[contains(@href, 'download/')]")
        browser.execute("sauce:context=Downloading File #2")
        await downloadLinks[1].click()
        downloadLinks = await $$("//a[contains(@href, 'download/')]")
        browser.execute("sauce:context=Downloading File #2")
        await downloadLinks[2].click()


        //checks download progress
        let files_list = await get_chrome_files_list(browser)
        let b64_list = await get_chrome_files_b64(browser, files_list)
        decode_b64_files(browser, b64_list)
    })
})