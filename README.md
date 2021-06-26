# SauceLabs-VM-Download
This repository is a proof-of-concept of "downloading" a file from a Sauce Labs test VM.

The main concept is that we use netcat, a utility included with macOS by default, as a single-request "web server".
This "web server" allows us to control the execution of a pre-run script, as well as return the Base64 encoding of
a file located on the remote test VM.

We then use JS/Node **on the local machine/testrunner** to decode the Base64 string, then we create a file with the contents
of the decoded Base64 data.

While developing, I've found/thought the netcat solution can be used for more than just "downloading" a file: **controlling/pausing the execution of a pre-run script**.

This is independently developed from Sauce Labs. No functionality is guaranteed or supported by Sauce Labs.
