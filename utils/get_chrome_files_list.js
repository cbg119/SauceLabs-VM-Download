const { sleep } = require("./sleep")

let get_chrome_files_list = async (browser_proxy) => {
    if (await browser_proxy.getUrl() != "chrome://downloads") {
            await browser_proxy.url("chrome://downloads")
        }

    let _downloads_are_complete = async () => {
        return await browser_proxy.execute("return document.querySelector('downloads-manager')\
        .shadowRoot.querySelector('#downloadsList')\
        .items.every((download) => download.state === 'COMPLETE')")
    }

    while (true) {
        browser.execute("sauce:context=Waiting for files to download...")
        if (await _downloads_are_complete() == true) {
            return await browser_proxy.execute("return document.querySelector('downloads-manager')\
            .shadowRoot.querySelector('#downloadsList')\
            .items.map((download) => {return {name: download.fileName, path: (download.filePath || download.fileUrl)}})")
        }
        sleep(1000)
    }
}

module.exports = get_chrome_files_list