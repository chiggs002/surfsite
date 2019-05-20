//graphics
  var iheightY ;
  var iwidthX ;
  var iX;
  var iY;
  
  var bRX4;
  var bRY4;  
  var tRX3;
  var tRY3;
  var bLX1;
  var bLY1;
  var tLX2;
  var tLY2;
  
  var latMin;
  var latMax;
  var latMinY;
  var latMaxY;
  
  
  var longMin;
  var longMax;
  var longMinX;
  var longMaxX ;
  
  
  

let img;



//get text input of city and data
var citylong;
var citylat;
var cityname;
var weather;
var Aweather;

var xlon = [];
var xlat = [];
var ztemp= [];
var zwindspeed = [];
var zwinddir = [];
var zname = []

var count;
var Aname = [];
var Atemp = [];
var Awind = [];
var Adir  = [];
var Alon  = [];
var Alat  = [];
var select = [];
       
 



 

// get skill surfer level
var radiovalue;



//input json data and store in json surfdadat arraylists

var surfsites;
var lat1;
var lat2;
var difflat;
var rdifflat;
var data = 0;
let jdata ;
// let mdata =[];
// keep values in memory
var surfDistance =[];
let SurfData = [];
let SurfWindspeed = [];
var timer;





function preload() {
  //load map of uk
  img = loadImage("assets/uk.jpg");
 ztemp =0;
 zwindspeed =0;
 zwinddir =0;
  zname ='';
  //LOAD SURFING DATA IN JSON
  
   jdata= loadJSON("assets/uksurfsites.json");
  
 surfsites= jdata.sites;

  
  print("surfsites length =",jdata);
  
  
//   for (var i = 0; i < 5; i++) {
  
//   xlon[i] = jdata.sites[i].coord.lon;
//   xlat[i] = jdata.sites[i].coord.lat;
//     print ("LOAD lat and long =", xlon[i],xlat[i]);
    
//     Afetchlonglat(xlon[i],xlat[i]);
//   }
  
  
  
  
  

}


function setup() {
  //load map of uk
  //image(img, width/2,height/2 , width/2, height/2);
  count =-1;
  timer = millis() ;
  cityname ="";
  
 // createCanvas(400, 400);
   createCanvas(700, 800);
   
  
  // INPUT NEAREST CITY FIELD
  fill(0);
  textSize(20);
  textFont('helvetica');
  text('Find Suitable UK Surf Sites', width/2, 40);
  
  textSize(12);
  text('Nearest City: travel point?', 20, 105);
  
  input = createInput();
  input.position(20, 115);
  
  button = createButton('submit');
  button.position(input.x + input.width, 115);
  button.mousePressed(fetchlonglat);
  
  //iput radio buttons  sufrimg skill level
   text("Your Skill Level: " ,20, 55);
  
  radio = createRadio();
  radio.option('Novice', 1);
  radio.option('Intermediate', 2);
  radio.option('Expert', 3);
  radio.style('width', '360px');
  radio.position(20, 60);
  radio._getInputChildrenArray()[0].checked = true;
 
  //radio.value(1);
 // radio.size(12);
  
  
   lat1=3.43;
   lat2=50.87;
 // difflat =abs(lat1-lat2);
   //print("lat1 =",lat1);
  //rdifflat = radians(difflat);
 // print("fuck it rdifflat =",rdifflat );
  
   for (var i = 0; i < 15; i++) {
  //count =i;
    xlon[i] = jdata.sites[i].coord.lon;
    xlat[i] = jdata.sites[i].coord.lat;
    print ("LOAD lat and long =", xlon[i],xlat[i]);
    
    Afetchlonglat(xlon[i],xlat[i]);
  }
  
  iheightY = height/2;
  iwidthX = width/2;
  iX = width/2;
  iY= height/6;
  push;
  //rotateY(0.01);
  tint(255,255,255,40);
  image(img, iX-95 ,iY-60 , iwidthX+60 , iheightY+150);
  pop;
  //image(img, 200 ,200 , 500 , 500);
  
}//END SETUP




function gotData(mdata) {
  print("inside GOTData weather");
    weather = mdata;
  if (weather ) {
     citylong  = weather.coord.lon;
     citylat  = weather.coord.lat;
     cityname = weather.name;
    //  print("data =",weather);
    // print("weather.wind.speed =",weather.wind.speed);
    //  print("weather.main.temp =",weather.main.temp);
    //  print("weather.main.humidity =",weather.main.humidity);
    fill(0);
  
     
    textSize(12);
    noStroke();
    fill(255,255,255,255);
   rect(134,138,200,15);
     fill(0);
  text("Your Current position: " + nf(citylat,2,2) + " Lat ," +   nf(citylong,2,2) + " Long" , 20, 150);
  
    noStroke();
    fill(255,255,255,255);
   rect(95,158,203,15);
    
    fill(0);
    text("Closest Town: " + cityname ,20, 170);
  }
}//gotData







function fetchlonglat() {
 name = input.value();
  var urlc;
  print('INSIDE FETECH name=',input.value());
  if ( name !=='') {
     var url3a ='https://api.openweathermap.org/data/2.5/weather?'; 
     var url3b ='&units=metric&APPID=19c26d7e4b93e26449c9f99f93636ebf';
     urlc = url3a + 'q='+ name + url3b;
     textSize(12);
     textSize(12);
     noStroke();
     fill(255,255,255,255);
     //rect(140,190,600,15);
     fill(0);
    
     //text("input value =",20,200);
     //text(urlc,150,200);
     input.value('')
  }///set up search position string
  
  
      print("call open weather");
      loadJSON(urlc,gotData);
      print("called open weather");
      print(urlc);
  
} //fetchlonglat




  function Afetchlonglat(zlon,zlat) {
     print(" -------------    CALLED AFETCHLONLAT     ----------");
     print("------------->  LOCAL LON LAT i xci : ",zlon,zlat,"count =",count);
     var murl3a ='https://api.openweathermap.org/data/2.5/weather?'; 
     var murl3b ='&units=metric&APPID=19c26d7e4b93e26449c9f99f93636ebf';
     var murlc = murl3a + '&lon='+ zlon + '&lat='+ zlat + murl3b;
    
    
      //print("CALL REAL WETAHER");
      print("------------->  REAL URL : ");
      loadJSON(murlc,AgetData);
      print("called REAL WETAHER");
  
} //fetchlonglat
  
  
  
  
  
  
  
  
  function AgetData(Adata) {
    print(" -------------    CALLED AGETDATA     ----------");
    count++;
   Aweather = Adata;
    
    if ( Adata ) {
        Alon[count]= Aweather.coord.lon;
        print("Alon[count]=",  Alon[count],"COUNT =",count);
        Alat[count]= Aweather.coord.lat;
        print("Alat[count]=",  Alat[count],"COUNT =",count);
        Aname[count]= Aweather.name;
        print("Aname[count]=",  Aname[count],"COUNT =",count);
  
        Atemp[count] = Aweather.main.temp;
        print("Atemp[count]=",  Atemp[count],"COUNT =",count);
   
       //real wind * 1.9438449
       
       Awind[count]= Aweather.wind.speed ;
       print("Awind[count]=", Awind[count],"COUNT =",count);
      
       Adir[count] =Aweather.wind.deg;
       print("Adir[count] =",Adir[count],"COUNT =",count );
     
    
  }//mydata
     
    
  
}//AgetData(Adata)




































function draw() {
 iheightY = height/2;
iwidthX = width/2;
iX = width/2;
 iY= height/6;
  
  bRX4= iX + iwidthX/2;
 bRY4= iY - iheightY/2;  
  tRX3= iX + iwidthX/2;
  tRY3= iY + iheightY/2;
 bLX1= iX - iwidthX/2;
  bLY1= iY - iheightY/2;
 tLX2= iX - iwidthX/2;
  tLY2= iY + iheightY/2;
  
  latMin = 50.1031;
  latMax = 60.15456;
latMinY = iY - iheightY/2;
 latMaxY = iY + iheightY/2;
  
  
   longMin = -7.6413;
  longMax = 1.751596;
 longMinX = iX - iwidthX/2;
  longMaxX = iX + iwidthX/2;
  
  
  
 //image(img, iX ,iY , iwidthX , iheightY);
  var xname ;
  var xtemp ;
  var xwindspeed ;
  var xwinddir;
  var xlon ;
  var xlat ;
  
  
  
 
    //GET SKILL OF SURFER 
  radiovalue = radio.value();
 
  if  ( radiovalue =='') radiovalue = 1;
  
//print("RADIO VALUE =", radiovalue );
  
      //print("-----jdata.sites.length----------*****----",jdata.sites.length);
  
  
  //do not do anything if city name is nothing
  if (cityname !=="") {
    

    print("valid city bame input");
    print("-----jdata.sites.length----------*****----",jdata.sites.length);
    print("jdata.sites[1].name=",jdata.sites[1].name);
    
       // reset length of internal suurf array to zero evry loop
      // wait for for input of position to do somthine
      // SurfData.length=0;
      // xlon.length=0 ;
      // xlat.length=0;
      // ztemp.length=0;
      // zwindspeed.length=0 ;
      // zwinddir.length=0;
      // zname.length =0;
 
      var fuck_distance =0;
      //var lo1=  0.1278;
      //var la2 = 0.1372;
      // var la1 = 51.5074;
      var lo1=  citylong;
      //var la2 = 0.1372;
      var la1 = citylat;
  
      
    
    var jdLength = jdata.sites.length;
    print("jdLength ==========",jdLength);
    
      //input jsosn data in array lists
      for (var i = 0; i < jdata.sites.length; i++) {
           //print("surfsites names=",data.sites[i].name,"i=",i,"data.sites.length=",data.sites.length);
            //print("surfsites names=",data.sites[i].wind.speed);
        
        


           xname = Aname[i];
           // xlon[i] = jdata.sites[i].coord.lon;
           // xlat[i] = jdata.sites[i].coord.lat;
           xlon = Alon[i];
           xlat = Alat[i];
           xtemp = Atemp[i];
           xwindspeed = Awind[i];
        
           xwinddir = Adir[i] ;
           // print(xname,xlon,xlat,xtemp,xwinds,xwindd );
          //print("SurfData.length  =",SurfData.length );
        
   
        
        
          if ( SurfData.length < jdata.sites.length) {
            
            
                  //print("BEFORE PUSH SurfData.length=",SurfData.length,"xlon len=",xlon.length);
                
             SurfData.push(new       surfData(xname,xlon,xlat,xtemp,xwindspeed,xwinddir,lo1,la1,i));
            
            
                 // print("AFTER PUSH");
                 // print("PUSHED A SURFDATA",jdata.sites[i].name);
            
                //  print(" ===  CALL OPENWEATHER OUTSIDE FUNCTION -----");
            
                  //TRY GET DATA OUTSIDE OF FUNCTION
            
            
//                  // SET UP GLOBAL COUNTER FOR ARRAY
//                  count = i;
//                  print("COUNT VALUE =",count);
            
            
//                 // CALL GLOBAL OPENWETAHER
//                 Afetchlonglat(xlon[i],xlat[i]);
            
            
            
                
            
            
            
            
                 //GET REAL LOCATION DATA
                 //print(" ==     CALLED OPENWEATHER OUTSIDE FUNCTION   -");
            
            
            
           }// if STATEMENT NO MORE THAN JSON ARRAY
        
        
      }//end for
    
   
  
     print("------   SURF DATA LENGTH -------",SurfData.length);
    
    
    

      

  
          // // //   //CALC SURF DATA
          for (var j = 0; j < SurfData.length; j++) {
              
           
//            // //GET REAL LOCATION DATA
//            //  SurfData[j].myfetchlonglat(xlon[j],xlat[j]);
               
            surfDistance[j] = SurfData[j].distbetween();
//             // SurfWindspeed[j] = SurfData[j].mwindspeed;
           SurfWindspeed[j] = SurfData[j].mwindspeed;

           }//end for loop around stored json data
    
    
           //calc best best surfer spots
           //best_surfspots(int(radiovalue),k);
            best_surfspots(int(radiovalue),1);
          
      
      
    } //end got dtata if
    
    
    
    //reset city name to null string
  
    cityname ="";
  
  
    //SurfData.resize(0);
    //print("SurfData[0].mname=",SurfData[0].mname);
    
    
   
    
    
    
    
    
  
  
  
  
}//end draw











function best_surfspots(skill,j) {
  //convert m/x to knots *1.94384
  
  var mskill = skill;
  
  //Sort by distance 
  var sort_surf_dist = [];
   var my_surf_dist = [] ;
  
  // sort by wi_windnd
  var sort_surf_wind =[];
  var my_surf_wind =[];
  
  
  //my_surf_dist = surfDistance.sort();
   //my_surf_wind = SurfWindspeed.sort();
  
  
  //my_surf_dist= surfDistance.sort();
  
  //create 2d array so we can out sort out the orignal order
  
  for (i=0; i < surfDistance.length; i++) {
    //my_surf_dist = surfDistance.sort();
    sort_surf_dist[i]= [surfDistance[i],i];
    print("No orderDIST array=",sort_surf_dist[i]);
    sort_surf_wind[i]= [SurfWindspeed[i],i];
    //print("SORT_surf_disT =",sort_surf_dist[i]);
    
  }
  
  //print("sort_surf_dist[i]=
  // sort 
   my_surf_dist = sort_surf_dist.sort();
   my_surf_wind = sort_surf_wind.sort();
  
  
  // sort distcances in order of distance keeping original array order data
  
  fill(0);
  text("Closest Surfing sites:",20,300);
  text("Km:",150,300);
  text("Knots:",180,300);
  
    fill(255,255,255,255);
    noStroke();
    rect(20,310,270,70);
  
  for (i=0; i < surfDistance.length; i++) {
 
   
     print("DISTANCE ARRAY ORDER=",my_surf_dist[i]);
     //var y_value = my_surf_dist[i][1];
     //var pname = SurfData[i].mname
    // print("1st =",my_surf_dist[0] [1]);
     //     print("second =",my_surf_dist[1] [1]);
     
     var y_name = my_surf_dist[i][1];
     select[i] = y_name;
    
    
     var x_km = int(my_surf_dist[i][0]);
     var closet_order_place = SurfData[y_name].mname;
     var closet_order_km = x_km;
     var reverse = int(surfDistance.length-i-1);
    
    //print("reverse = ",reverse  );
    
     //sorted
     var x_wind1 = int(my_surf_wind[i][0]);
     var x_wind2 = int(my_surf_wind[reverse][0]);
     //not sorted
     var x_wind3 = SurfData[y_name].mwindspeed ;
    
    
     
      
    // var wind_spd = int(my_surf_wind[1][0]);
     //  convert m/x to knots *1.94384
     wind_spd = x_wind3 * 1.94384;
     wind_spd = nf(wind_spd,2,2);
     
     fill(0);
     text(str(i+1)+".  " + closet_order_place,20,320+(13*i));
     text(closet_order_km,150,320+(13*i));
     text(wind_spd,180,320+(13*i));
     
     //draw_surfsites(y_name) ;
     
    
  }
   
   
  for (n=0; n < surfDistance.length; n++) {
    
    print("DRAWING CIRCLES ON MAP....","I=",n);
    
    draw_surfsites(select[n]);

     //print("WIND ARRAY ORDER =",my_surf_wind[i]);
     
  }
  
  // draw mypos
  // citylong  = weather.coord.lon;
  //    citylat  = weather.coord.lat;
  //    cityname = weather.name;
  draw_mypos(citylong,citylat,cityname) ;
 
  
  
 // print("MY_surf_dist =",my_surf_dist);
  
 // print("BEST SURF SPOTS FUNCTIONS=",mskill,"j=",j);
  

  
  switch(mskill) {
      
    case 1:  
       print("selected skill level =",skill);
       
      
       break;
            
    case 2:  
       print("selected skill level =",skill);
       break;
      
    case 3:
       print("selected skill level =",skill);
       break;
                
  }//end switch
      
      
}//best_surfspots









function draw_surfsites(index) {
  
  print("CIRCLE index=",index);
//   var latMin = 50.1031;
//   var latMax = 60.15456;
//   var latMinY = iY - iheightY/2;
//   var latMaxY = iY + iheightY/2;
  
  
//   var longMin = -7.6413;
//   var longMax = 1.751596;
//   var longMinX = iX - iwidthX/2;
//   var longMaxX = iX + iwidthX/2;
//   xlon[i] = jdata.sites[i].coord.lon;
//   xlat[i] = jdata.sites[i].coord.lat;
  
 //var x_rray = {
  push();
  //   var latMin = 50.1031;
  //   var latMax = 60.15456;
  // var x = map(Alon[index],longMin,longMax,longMinX+200,longMaxX+400);
  // var y = map(Alat[index],latMax,latMin,latMinY-600 ,latMaxY+300);
  translate(175,180);
  var x = map(Alon[index],longMin,longMax,longMinX,longMaxX);
  var y = map(Alat[index],latMax,latMin,latMinY ,latMaxY+100);
  
  print("index=", index,"Aname[index]=",Aname[index],"x=",x,"y=",y);
  
  print("Aname[index]=",Aname[index],"Alon[index]=",Alon[index],"Alat[index]=",Alat[index]);
    
    
    
    
  fill(random(255),random(255),random(255),80);
  strokeWeight(0.1);
  stroke(0);
  ellipse(x ,y,7,7);
  //scarborough
  // rect(600,350,20,20);
  // //bournemouth
  // rect(120,600,20,20);
  // //senen
  // rect(80,700,20,20);
  //polzPolzeath 
  
  //SurfData[y_name].mnametextSize(20);
  fill(80,255);
  strokeWeight(0);
  textSize(8);
  text(Aname[index],x-50,y+5);
  pop();
  
  
}//draw circles







function draw_mypos(clong,clat,ccity) {
  // citylong  = weather.coord.lon;
  //    citylat  = weather.coord.lat;
  //    cityname = weather.name;
  
  print("DRAWING MY CITY");
//   var latMin = 50.1031;
//   var latMax = 60.15456;
//   var latMinY = iY - iheightY/2;
//   var latMaxY = iY + iheightY/2;
  
  
//   var longMin = -7.6413;
//   var longMax = 1.751596;
//   var longMinX = iX - iwidthX/2;
//   var longMaxX = iX + iwidthX/2;
//   xlon[i] = jdata.sites[i].coord.lon;
//   xlat[i] = jdata.sites[i].coord.lat;
  
 //var x_rray = {
  
  //   var latMin = 50.1031;
  //   var latMax = 60.15456;
  // var x = map(Alon[index],longMin,longMax,longMinX+200,longMaxX+400);
  // var y = map(Alat[index],latMax,latMin,latMinY-600 ,latMaxY+300);
  translate(160,180);
  push();
  fill(255,255,255,255);
  noStroke();
  
  var x = map(clong,longMin,longMax,longMinX,longMaxX);
  var y = map(clat,latMax,latMin,latMinY ,latMaxY+100);
  
  rect(x,y,2,2);
  
  print("city name =",cityname,"x=",x,"y=",y);
  
  print("city name=",cityname,"citylong=",citylong,"citylat=",citylat);
    
    
    
    
  fill(random(255),random(255),random(255),40);
  strokeWeight(1);
  stroke(0);
  //ellipse(x ,y,20,20);
  rect(x,y-12,20,20);
  //scarborough
  // rect(600,350,20,20);
  // //bournemouth
  // rect(120,600,20,20);
  // //senen
  // rect(80,700,20,20);
  //polzPolzeath 
  
  //SurfData[y_name].mnametextSize(20);
  fill(80,255);
  strokeWeight(1);
  textSize(12);
  text(ccity,x-20,y-12);
  pop();
  
  
}//draw mypos

































// SET UP A CLASS
function surfData (sname,slon,slat,stemp,swindspeed,swinddir,clon,clat,ci) {
  
  let vdata;
// print("INSIDE SUFDATA");
  this.zzwindspeed =0;
  let  zzname =[];
  let  zztemp =[];
  let  zzwinddir =[];
  //var myweather;
  
  this.mname = sname;
  print ("---------------->   SNAME =",this.mname);
  this.mlon = slon;
  this.mlat = slat;
   this.mtemp = stemp;
  
  
  this.mclon = clon;
  this.mclat = clat;
  
  //covert m/s to knotts
  //this.mwindspeed = swindspeed * 1.9438449;
  this.mwindspeed = swindspeed ;
  this.mwinddir= swinddir;
  this.i =ci;
  
  
  //this.distbetween = 0; 
  
// this.mydist = dist_2_points(this.mlon,this.mlat,this.mclat,this.mclon);
  
  // // SurfData[i].distbetween();
  
  
  
  
  
  
  //call lng lat distance calc
  this.distbetween = function() {
    var calc =5;
   // calc = dist_2_points(this.mlon,this.mlat,this.mclat,this.mclon);
    //print("INSIDE CALC LONGLAT =",this.mlat,this.mlon,"WHAT CITY?=",this.mclat,this.mclon);
   calc = this.dist_2_points(this.mlat,this.mlon,this.mclat,this.mclon);
    
    //print("CALC = ",calc);
    
    return calc;
  }
  
  
  this.dist_2_points = function (lat1,long1,lat2,long2) {
  // Haversine distance between to points along the earth
  //https://www.movable-type.co.uk/scripts/latlong.html
    print("INSIDE 2 POINSTS CALCN");
  this.R = 6371; // km
  this.φ1 = radians(lat1);
  this.φ2 = radians(lat2);
  this.difflat =abs(lat1)-abs(lat2);
  this.Δφ =  radians(this.difflat);
  this.difflong = abs(long2)-abs(long1);
  this.Δλ = radians(this.difflong);
  //print ("Δλ = ",Δλ);
   // print("this.difflat=",this.difflat,"this.difflong=",this.difflong );
  //  print(" this.Δφ =", this.Δφ ,"this.Δλ=",this.Δλ);
  this.a = sin(this.Δφ/2) * sin(this.Δφ/2) +
          cos(this.φ1) * cos(this.φ2) *
          sin(this.Δλ/2) * sin(this.Δλ/2);
  this.c = 2 * atan2(sqrt(this.a), sqrt(1-this.a));
   // print("a = ",this.a, "c = ",this.c);

 this.d = (this.R * this.c);
  //this.d = 0;
  return this.d;
}//calc lon latdistance
  
  
  
  
  
  
  
  
  
  
  
 this.myfetchlonglat=function(zlon,zlat,i) {
   this.xci =i;
     print("------------->  LOCAL LON LAT i xci : ",zlon,zlat,i,this.xci);
     var murl3a ='https://api.openweathermap.org/data/2.5/weather?'; 
     var murl3b ='&units=metric&APPID=19c26d7e4b93e26449c9f99f93636ebf';
     var murlc = murl3a + '&lon='+ zlon + '&lat='+ zlat + murl3b;
    
    
      //print("CALL REAL WETAHER");
      print("------------->  REAL URL : ");
      loadJSON(murlc,this.mygotData);
      print("called REAL WETAHER");
  
} //fetchlonglat
  
  
  
  
  
  
  
  
  this.mygotData =function (mydata) {
    //print("INSIDE MY GOTDATA");
     
    vdata=mydata;
   // print("I= ", this.i);
    
    //print("VDATA=",vdata);
    
    //let  zzwindspeed =[];
     
    myweather = mydata;
    
    // ztemp.length=0;
    //   zwindspeed.length=0 ;
    //   zwinddir.length=0;
    //   zname.length =0;
   //print("-------------> INSIDE JSON REAL WEATHER","i=",this.xci);
  // if (mydata) {
       this.mname = myweather.name;
    zzname= myweather.name;
   // print("zname[xci] = ",zname[xci]);
       //real temp
       this.mtemp = myweather.main.temp;
        zztemp = myweather.main.temp;
   //  print("--------------> MYTOWN=",myweather.name ,"REAL TEMP=",this.mtemp);
    
       //real wind * 1.9438449
       this.mwindspeed = myweather.wind.speed ;
     this.zzwindspeed = myweather.wind.speed ;
     //  print("zwindspeed=", this.zzwindspeed,"mwindspeed=", this.mwindspeed);
       print("-MYTOWN=",myweather.name,"REAL wind=",this.mwindspeed);
       
       this.mwinddir= myweather.wind.deg;
       zzwinddir =myweather.wind.deg;
       //print("------------->  MYTOWN=",myweather.name ,"REAL winddirn=",this.mwinddir);
     
    
  // }//mydata
     
    
  
}//mgotData


  
}//end class surfData 





