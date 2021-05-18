# ceasar-rpi
Controlled Environment Agriculture System with Automated Recording.

Clone this repository locally to get started.

To start up the backend webserver navigate to the root directory of this repo on your machine and run 
```
$ npm start
```
To start up the frontend app, open a separate terminal parallelly, and cd into this root directory and then run 
```
$ cd ceasar-react 

$ npm start
```
Please note, most functionalities of this app will not work if you are not within range of Akash's raspberry pi

To send a message notification (to Akash and Shivangi), pip install twilio, and then cd to the root directory of this repo and run 
```
$ python message.py
```

The image classifier can be found at Image_Classfier_healthy_vs_Non-healthy.ipynb. The associated dataset can be found in the Google Drive folder corresponding to this submission. 

The Arduino code can be found at ceasarSerialData.ino
