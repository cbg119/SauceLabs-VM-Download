#!/bin/bash

#The only reason this is here is to basically set up a listener.
#When the connection is made to localhost:500, we know that the file has been downloaded
#This basically pauses the pre-run until the call has been made
echo -e "HTTP/1.1 200 OK\n\n Proceeding with script execution..." | nc -l 500;

#Once the initial call is made, the pre-run resumes. The below command
#Sets up another listener, and sends out the Base64 data.
echo -e "HTTP/1.1 200 OK\n\n<html><body><p id='results'>$(base64 '/Users/chef/Downloads/luminoslogo.png')</p></body></html>" | nc -l 501