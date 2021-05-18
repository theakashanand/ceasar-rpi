import RPi.GPIO as GPIO
import time
import os
import glob
from twilio.rest import Client

def main():

    base_dir = '/sys/bus/home/devices/'
    device_folder = glob.glob(base_dir + '28*')[0]
    device_file = device_folder + '/serial_com_data'

    account_sid = 'AC3aff6ea245611d976baf976cfad67b52’
    auth_token = '0be57bf6969a1e57054041519c9487d4'

    client = Client(account_sid, auth_token)

    temp_channel = 4
    temp = GPIO.setmode(GPIO.BCM)
    temp = GPIO.setup(temp_channel, GPIO.IN)

    moisture_channel = 5
    moisture = GPIO.setmode(GPIO.BCM)
    moisture = GPIO.setup(moisture_channel, GPIO.IN)

    light_channel = 6
    light = GPIO.setmode(GPIO.BCM)
    light = GPIO.setup(light_channel, GPIO.IN)


    def read_temp_raw():
        f = open(device_file, 'r')
        lines = f.readlines()
        f.close()
        return lines

   def read_moisture_raw():
        f = open(device_file, 'r')
        lines = f.readlines()
        f.close()
        return lines

   def read_light_raw():
        f = open(device_file, 'r')
        lines = f.readlines()
        f.close()
        return lines

    def read_temp():
        lines = read_temp_raw()
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = read_temp_raw()
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            temp_string = lines[1][equals_pos+2:]
            temp_c = float(temp_string) / 1000.0
            return temp_c

    def read_moisture():
        lines = read_moisture_raw()
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = read_moisture_raw()
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            moisture_string = lines[1][equals_pos+2:]
            moisture_c = float(moisture_string) / 1000.0
            return moisture_c

    def read_light():
        lines = read_temp_raw()
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = read_light_raw()
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            light_string = lines[1][equals_pos+2:]
            light_c = float(light_string) / 1000.0
            return light_c

    def hot_message():
          client.messages.create(
            to='+919731692444',
            from_='+12107624229’,
            body="It's too hot! (currently " + str(read_temp()) + " degrees) so I just turned the fan on")
        
    def water_message():
          client.messages.create(
            to='+919731692444',
            from_='+12107624229’,
            body="Soil moisture was less. So I've watered the plant")

    def light_message():
          client.messages.create(
            to='+919731692444',
            from_='+12107624229’,
            body="Just turned the lights on! The plant is growing :)")

    while True:
        if read_temp() > 34:
            hot_message()
        if read_moisture() < 20:
            water_message()
        if read_light() == 1 :
            light_message
        time.sleep(300)
        
main()
