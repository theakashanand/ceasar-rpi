//Libraries
#include <DHT.h>
#include "MQ135.h"
#include <BH1750.h>

BH1750 lightMeter;

//Constants
#define DHTPIN 7     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino


//Variables
int chk;
float hum;  //Stores humidity value
float temp; //Stores temperature value
const int AirValue = 560;   //you need to replace this value with Value_1
const int WaterValue = 215;  //you need to replace this value with Value_2
int soilMoistureValue = 0;
int soilmoisturepercent=0;

void setup()
{
    Serial.begin(9600);
    dht.begin();
    Serial.println("Running...");

}

void loop()
{
    MQ135 gasSensor = MQ135(A0); // Attach sensor to pin A0
    float ppm = gasSensor.getPPM();
    //Read data and store it to variables hum and temp
    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
    
    
    soilMoistureValue = analogRead(A0);  //put Sensor insert into soil
    soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
    if(soilmoisturepercent >= 100)
    {
      soilmoisturepercent = 100;
    }
    else if(soilmoisturepercent <=0)
    {
      soilmoisturepercent = 0;
    }
    char *fields[5] ={'\0'};
    fields[0] = "humidity";
    fields[1] = "temperature";
    fields[2] = "moisture";
    fields[3]="co2";
    float values[] = {hum, temp, soilmoisturepercent, ppm};
    Serial.println(stringify(fields, values, 4));
    
    delay(15*60*1000); //Delay 15 mins.
}

String stringify(char **fields, float values[], int len){
  
  //fields: an array eg:["temperature","humidity", "moisture", "co2"]
  //values: values eg:[32, 64, 44, 300]
  String jsonString = "{";
  for (int i=0; i<len - 1; i++){
    jsonString += "\"" +String(fields[i])+ "\": " + String(values[i]) + ", ";
  }
  jsonString += "\"" +String(fields[len -1]) + "\": " + String(values[len-1])+"}";
  return jsonString;
}
