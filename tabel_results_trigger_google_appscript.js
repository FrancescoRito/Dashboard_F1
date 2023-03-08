function table_results() 
{
    var today = new Date();
    var year = today.getFullYear();// use getFullYear() method
    parseInt(year);

    console.log(year);

    // DECLARE SHEET
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var mainSheet = ss.getSheetByName("results");


    //FIND THE LAST ROW
    var lastRow=mainSheet.getLastRow();
    var lastRow=lastRow+1;
    if((lastRow)<2) {
    var lastRow=2;
    } else {
    var lastRow;
    }
    console.log(lastRow);


    var LASTSEASON = mainSheet.getRange(lastRow-1,2).getValue()
    var LASTROUND = mainSheet.getRange(lastRow-1,3).getValue()


    //START CHECKING THE LAST ROUND OR THE STAR OF NEW SEASON
    var URL_STRING = "http://ergast.com/api/f1/"+year+"/results.json?limit=1000";

    var response = UrlFetchApp .fetch(URL_STRING);
    var json = response.getContentText();
    var data = JSON.parse(json);
    var results = [];
    var results_Array = data.MRData.RaceTable.Races;
    var results_Array_round = data.MRData.RaceTable.Races;
    var results_Array_season = data.MRData.RaceTable.Races;

    var APILASTSEASON = null;
    var APILASTROUND = null;
        if (results_Array_season.length > 0) {
            APILASTSEASON = results_Array_season.pop().season;
            
            }
        parseInt(APILASTSEASON)
        if (results_Array_round.length>0) {
            APILASTROUND = results_Array_round.pop().round;
            } else APILASTROUND = 1




    if (APILASTSEASON==LASTSEASON && APILASTROUND>LASTROUND){
    var URL_STRINGCURRENTSEASON="http://ergast.com/api/f1/"+APILASTSEASON+"/"+APILASTROUND+"/results.json?limit=1000"
    //CALL API
    var responsecurrentseason = UrlFetchApp .fetch(URL_STRINGCURRENTSEASON);
    var json_cs = responsecurrentseason.getContentText();
    var data_cs = JSON.parse(json_cs);

    var results_cs = [];
    var results_cs2 = [];

    //GET results info
      for (var i = 0; i < data_cs.MRData.RaceTable.Races.length; i++) 
      { 
        var results_Array_cs = data_cs.MRData.RaceTable.Races;


        //STORING RESULTS INFO
        results_cs.push(results_Array_cs[i].season); 
        results_cs.push(results_Array_cs[i].round);
        results_cs.push(results_Array_cs[i].raceName);
        results_cs.push(results_Array_cs[i].Circuit.circuitId);

            for (var j = 0; j < data_cs.MRData.RaceTable.Races[i].Results.length; j++)
            {
                var result_array_cs_2=data_cs.MRData.RaceTable.Races[i].Results;

                results_cs2.push(result_array_cs_2[j].Driver.driverId); 
                results_cs2.push(result_array_cs_2[j].position);
                results_cs2.push(result_array_cs_2[j].points);
                results_cs2.push(result_array_cs_2[j].Constructor.constructorId);
                results_cs2.push(result_array_cs_2[j].status);
                results_cs2.push(result_array_cs_2[j].laps); 
                results_cs2.push(result_array_cs_2[j].FastestLap.Time.time);

                //SAVING IT 
                mainSheet.getRange(lastRow, 1).setValue("id.race_"+results_Array_cs[i].season+"-"+results_Array_cs[i].round);
              mainSheet.getRange(lastRow, 2).setValue(results_Array_cs[i].season);
              mainSheet.getRange(lastRow, 3).setValue(results_Array_cs[i].round);
              
              if ( (results_Array_cs[i].season==2023 && results_Array_cs[i].round==4 )  ||
                    (results_Array_cs[i].season==2023 && results_Array_cs[i].round==10 ) ||
                    (results_Array_cs[i].season==2023 && results_Array_cs[i].round==13 ) ||
                    (results_Array_cs[i].season==2023 && results_Array_cs[i].round==18 )  ||
                    (results_Array_cs[i].season==2023 && results_Array_cs[i].round==19 ) ||
                    (results_Array_cs[i].season==2023 && results_Array_cs[i].round==21 ) 
                  )
                {
                  mainSheet.getRange(lastRow, 4).setValue("sprint");
                } else 
                {mainSheet.getRange(lastRow, 4).setValue("classic");}

                mainSheet.getRange(lastRow, 5).setValue(results_Array_cs[i].raceName);
                mainSheet.getRange(lastRow, 6).setValue(results_Array_cs[i].Circuit.circuitId);
                mainSheet.getRange(lastRow, 7).setValue(result_array_cs_2[j].Driver.driverId);
                mainSheet.getRange(lastRow, 8).setValue(result_array_cs_2[j].position);
                mainSheet.getRange(lastRow, 9).setValue(result_array_cs_2[j].points);
                mainSheet.getRange(lastRow, 10).setValue(result_array_cs_2[j].status);
                mainSheet.getRange(lastRow, 11).setValue(result_array_cs_2[j].Constructor.constructorId);
                mainSheet.getRange(lastRow, 12).setValue(result_array_cs_2[j].laps);
               if (result_array_cs_2[j].FastestLap.Time.time!=null){
                  mainSheet.getRange(lastRow, 13).setValue(result_array_cs_2[j].FastestLap.Time.time)
                  } else mainSheet.getRange(lastRow, 13).setValue(' ');
                
                var lastRow = mainSheet.getLastRow()+1;
            }

      
      }
    } else if(APILASTSEASON>LASTSEASON && APILASTROUND==1) {
    var URL_STRINGNEXTSEASON="http://ergast.com/api/f1/"+APILASTSEASON+"/"+APILASTROUND+"/results.json?limit=1000"
    //CALL API
    var responsenextseason = UrlFetchApp .fetch(URL_STRINGNEXTSEASON);
    var json_ns = responsenextseason.getContentText();
    var data_ns = JSON.parse(json_ns);

    var results_ns = [];
    var results_ns2 = [];

    //GET results info
      for (var i = 0; i < data_ns.MRData.RaceTable.Races.length; i++) 
      { 
        var results_Array_ns = data_ns.MRData.RaceTable.Races;


        //STORING RESULTS INFO
        results_ns.push(results_Array_ns[i].season); 
        results_ns.push(results_Array_ns[i].round);
        results_ns.push(results_Array_ns[i].raceName);
        results_ns.push(results_Array_ns[i].Circuit.circuitId);

            for (var j = 0; j < data_ns.MRData.RaceTable.Races[i].Results.length; j++)
            {
                var result_array_ns_2=data_ns.MRData.RaceTable.Races[i].Results;

                results_ns2.push(result_array_ns_2[j].Driver.driverId); 
                results_ns2.push(result_array_ns_2[j].position);
                results_ns2.push(result_array_ns_2[j].points);
                results_ns2.push(result_array_ns_2[j].Constructor.constructorId);
                results_ns2.push(result_array_ns_2[j].status);
                results_ns2.push(result_array_ns_2[j].laps); 
                results_ns2.push(result_array_ns_2[j].FastestLap.Time.time);
                
                //SAVING IT 
                mainSheet.getRange(lastRow, 1).setValue("id.race_"+results_Array_ns[i].season+"-"+results_Array_ns[i].round);
              mainSheet.getRange(lastRow, 2).setValue(results_Array_ns[i].season);
              mainSheet.getRange(lastRow, 3).setValue(results_Array_ns[i].round);
              
              if ( (results_Array_ns[i].season==2023 && results_Array_ns[i].round==4 ) ||
                    (results_Array_ns[i].season==2023 && results_Array_ns[i].round==10 ) ||
                    (results_Array_ns[i].season==2023 && results_Array_ns[i].round==13 ) ||
                    (results_Array_ns[i].season==2023 && results_Array_ns[i].round==18 ) ||
                    (results_Array_ns[i].season==2023 && results_Array_ns[i].round==19 ) ||
                    (results_Array_ns[i].season==2023 && results_Array_ns[i].round==21 )
                  )
                {
                  mainSheet.getRange(lastRow, 4).setValue("sprint");
                } else 
                {mainSheet.getRange(lastRow, 4).setValue("classic");}

                mainSheet.getRange(lastRow, 5).setValue(results_Array_ns[i].raceName);
                mainSheet.getRange(lastRow, 6).setValue(results_Array_ns[i].Circuit.circuitId);
                mainSheet.getRange(lastRow, 7).setValue(result_array_ns_2[j].Driver.driverId);
                mainSheet.getRange(lastRow, 8).setValue(result_array_ns_2[j].position);
                mainSheet.getRange(lastRow, 9).setValue(result_array_ns_2[j].points);
                mainSheet.getRange(lastRow, 10).setValue(result_array_ns_2[j].status);
                mainSheet.getRange(lastRow, 11).setValue(result_array_ns_2[j].Constructor.constructorId);
                mainSheet.getRange(lastRow, 12).setValue(result_array_ns_2[j].laps);
               if (result_array_ns_2[j].FastestLap.Time.time!=null){
                  mainSheet.getRange(lastRow, 13).setValue(result_array_ns_2[j].FastestLap.Time.time)
                  } else mainSheet.getRange(lastRow, 13).setValue(' ');
                
                var lastRow = mainSheet.getLastRow()+1;
            }
      }
    }
}
