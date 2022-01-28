let get_chrome_files_b64 = async (browser_proxy, urlList) => {
    
    let fileInput;
    let result = []

    let _get_file_content = async (url) => {

        browser.execute(`sauce:context=Converting ${url.name}`)
        browser_proxy.execute("var input = window.document.createElement('INPUT');\
        input.setAttribute('type', 'file');\
        input.id = 'sauce-file-input';\
        input.onchange = function(e) { e.stopPropagation() };\
        return window.document.documentElement.appendChild(input);")

        fileInput = await $("#sauce-file-input")

        await fileInput.setValue(url.path)

        //MIGHT NEED TO EDIT 70; ADD REMOVE AT END
        let b64String = await browser_proxy.executeAsync("var input = arguments[0], callback = arguments[1];\
        var reader = new FileReader();\
        reader.onload = function(ev) { callback(reader.result) };\
        reader.onerror = function(ex) { callback(ex.message) };\
        reader.readAsDataURL(input.files[0]);", fileInput)

        return (b64String.startsWith("data")) ? b64String.split(",")[1] : null
    }

    for (let i = 0; i < urlList.length; i++) {
        await result.push({name: urlList[i].name, b64_string: await _get_file_content(urlList[i])})
    }

    return result
    //return urlList
    //return await urlList.map(async (url) => {return {name: url.name, b64_string: await _get_file_content(url.path)}})
}

module.exports = get_chrome_files_b64