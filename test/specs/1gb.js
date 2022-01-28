const fs = require("fs");
const get_chrome_files_list = require("../../utils/get_chrome_files_list")
const get_chrome_files_b64 = require("../../utils/get_chrome_files_b64")
const decode_b64_files = require("../../utils/decode_b64_files")
const sleep = require("../../utils/sleep")

describe("Download 1GB file", function() {
    this.timeout(180000)
    it("Download 1GB file", async function() {
        await browser.url("https://fastest.fish/test-files")

        const downloadLink = await $("//a[text() = '1GB']")
        await downloadLink.click()

        let files_list = await get_chrome_files_list(browser)
        let b64_list = await get_chrome_files_b64(browser, files_list)
        decode_b64_files(browser, b64_list)

    })
})