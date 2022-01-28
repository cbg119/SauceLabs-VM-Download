const fs = require("fs");

let decode_b64_files = (browser, b64_list) => {
    let b64_converted;
    for (let i = 0; i < b64_list.length; i++) {
        browser.execute(`sauce:context=Writing ${b64_list[i].name} to disk...`)

        b64_converted = Buffer.from(b64_list[i].b64_string, "base64")
        fs.appendFileSync(b64_list[i].name, b64_converted, (error) => {
            if (error) throw err;
        })
    }
}

module.exports = decode_b64_files