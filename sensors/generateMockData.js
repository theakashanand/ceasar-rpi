var db = require('../config/database');

for (var day=14; day<17; day++){
    for (var hour=0; hour<24; hour+=1){
        let timestamp = `2021-05-${day}T${hour}:00:00.00Z`
        let temperature, moisture, humidity
        let co2 = (Math.random() * (420 - 400 + 1)) + 400;
        
        maxT = -(33/48)*Math.abs(hour-13) + 33
        minT = maxT - 0.5
        temperature =(Math.random() * (maxT - minT + 1)) + minT;
        maxH =  (33/7) *Math.abs(hour-13) + 33
        minH = maxH - 2
        humidity =(Math.random() * (maxH - minH + 1)) + minH;

        if(hour<13){
            moisture = -Math.abs(hour) + 33
        }
        else{
            moisture = -Math.abs(hour-12) + 100
        }

        db.query("INSERT INTO measurements (temperature,humidity, moisture, co2, timestamp) \
                    VALUES ($1, $2, $3, $4, $5);", [temperature,humidity, moisture, co2, timestamp], (err, res)=>{
            if(err){
                console.log("error writing to db: ", err)
            }
            else{
                console.log("success writing to db: ", res)
            }
        })
    }
}

// db.query("INSERT INTO measurements (temperature,humidity) VALUES ($1, $2);", [temperature, humidity], (err, res)=>{
        //     if(err){
        //         console.log("error writing to db: ", err)
        //     }
        //     else{
        //         console.log("success writing to db: ", res)
        //     }
        // })