const fs = require("fs")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Download file from VM', () => {
    it('Download file from VM', async function() {
        browser.url(`https://the-internet.herokuapp.com/download`);

        //download our file
        const downloadLink = await $("//a[@href='download/luminoslogo.png']")
        await downloadLink.click()

        //TODO: Implement browser-specific code to check download status rather than a hard wait.
        //Using a hard wait is too flaky 
        await sleep(10000)

        //First visit is to notify our pre-run that the download is complete
        //Only call this once we know for sure the file is completely downloaded.
        await browser.url("http://localhost:500")

        //Using hard waits is bad. don't do it.
        //I only use it here to give our prerun time to execute
        await sleep(1000)

        //This visit, the second visit, is to actually display and retrieve the Base64 data.
        await browser.url("http://localhost:501")
        
        //Grab Base64 data, store in variable
        let b64data = await $("p")
        b64data = await b64data.getText()

        //Convert Base64 data back to our original download data
        let converted_data = Buffer.from(b64data, "base64")

        //Creates file, appends the converted Base64 data
        fs.appendFile("test.png", converted_data, (err) => {
            if (err) throw err;
        })
    });
});

