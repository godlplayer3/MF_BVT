/*
    LambdaTest selenium automation sample example
    Configuration
    ----------
    username: Username can be found at automation dashboard
    accessKey:  AccessKey can be generated from automation dashboard or profile section
 
    Result
    -------
    Execute NodeJS Automation Tests on LambdaTest Distributed Selenium Grid
*/
const swd = require('selenium-webdriver');
 
/*
    Setup remote driver
    Params
    ----------
    platform : Supported platform - (Windows 10, Windows 8.1, Windows 8, Windows 7,  macOS High Sierra, macOS Sierra, OS X El Capitan, OS X Yosemite, OS X Mavericks)
    browserName : Supported platform - (chrome, firefox, Internet Explorer, MicrosoftEdge, Safari)
    version :  Supported list of version can be found at https://www.lambdatest.com/capabilities-generator/
*/
 
// username: Username can be found at automation dashboard
const USERNAME = 'mr.coolshahrukhkhan';
 
// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = 'PhTfmbFz5E2xqU6NvlU6VZbl9XJwptGJHc8epqW7AvOxKTwIqc';
 
// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';



var data,tab,caps,browser, counterTgn=0;

caps = {
    platform: 'windows 10',
    browserName: 'chrome',
    version: '100.0',
    resolution: '1280x800',
    network: true,
    visual: true,
    console: true,
    video: true,
    name: 'Vod test', // name of the test
    build: 'NodeJS build' // name of the build
}

// URL: https://{username}:{accessKey}@hub.lambdatest.com/wd/hub
const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

 browser = new swd.Builder();
//const caps =swd.Capabilities.chrome();
//caps.set('goog:loggingPrefs', {'performance':'ALL'});
// tab = browser.forBrowser("chrome").withCapabilities(caps).build();

// setup and build selenium driver object
 tab = new swd.Builder()
    .usingServer(gridUrl)
    .withCapabilities(caps)
    .build();


// Include the chrome driver
require("chromedriver");

//const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until");


//var fs = require("fs");
loginTest();





async function loginTest(){
    // Include selenium webdriver
      
 
    data=  require("../ConfigurationFiles/tgn_data.json");
  
    // Step 1 - Opening the reach client sign in page
    let tabToOpen =tab.get(data.login.url);
    tabToOpen
        .then(function () {
      
            // Timeout to wait if connection is slow
            let findTimeOutP =
                tab.manage().setTimeouts({
                    implicit: 30000, // 10 seconds
                });
            return findTimeOutP;
        })
        .then(function () {
      
            // Step 2 - Finding the username input
            let promiseUsernameBox =
                tab.findElement(swd.By.id(data.login.UserName));
            return promiseUsernameBox;
        })
        .then(function (usernameBox) {
      
            // Step 3 - Entering the username
            let promiseFillUsername =
                usernameBox.sendKeys(data.login.email);
            return promiseFillUsername;
        })
        .then(function () {
            console.log(
                "Username entered successfully"
               
            );
      
            // Step 4 - Finding the password input
            let promisePasswordBox =
                tab.findElement(swd.By.id(data.login.Password));
                
            return promisePasswordBox;
        })
        .then(function (passwordBox) {
      
            // Step 5 - Entering the password
            let promiseFillPassword =
                passwordBox.sendKeys(data.login.pass);
            return promiseFillPassword;
        })
        .then(function () {
            console.log(
                "Password entered successfully" 
                
            );
      
            // Step 6 - Finding the Sign In button
            let promiseSignInBtn = tab.findElement(
                swd.By.id(data.login.submitButton)
            );
            return promiseSignInBtn;
        })
        .then(function (signInBtn) {
             
    
            // Step 7 - Clicking the Sign In button
            let promiseClickSignIn = signInBtn.click();
            return promiseClickSignIn;
            
        })
        .then(function () {
            console.log("Checking credentials...");
            setTimeout(checkCredentialTest, 15000);
            
        })
        
        .catch(function (err) {
            console.log("Error ", err, " occurred!");
        });
    
    }
 
function checkCredentialTest(){

        var url = tab.getCurrentUrl();
    
        url.then((text) => {
            
            if(text.includes(data.login.checkUrl)){
                console.log("invalid credentials");
            }
            else{
                console.log("login successful");
                setTimeout(identityTest,20000); 
            }
            });
        }

function identityTest(){
    
            console.log("callling");
                let promiseOkButton =
                    tab.findElement(swd.By.id(data.login.buttonGroup));
              
                    promiseOkButton.click();
        
                    console.log("success");
        
                    setTimeout(userAccountTest,5000);
        
            
        }
        
function userAccountTest(){
            
            console.log("Again...");
            let profileCardButton = tab.findElement(swd.By.xpath(data.login.userAccountXpath));
            profileCardButton.click();
            setTimeout(VodChannelTest,5000);
            
        }


function VodChannelTest(){
    console.log("Testing VOD...");
    let vodButton = tab.findElement(swd.By.xpath(data.vod.vodTabPath));
    vodButton.click();
    setTimeout(navigateMovieVod,5000);    
   
}



function navigateMovieVod(){ 
    let vodButton = tab.findElement(swd.By.xpath(data.vod.navigateMovieVod));
    vodButton.click();
    
    setTimeout(playRandomVodChannel,5000);
}

function playRandomVodChannel(){
    let vodPlayButton = tab.findElement(swd.By.xpath(data.vod.movieVod));
    vodPlayButton.click();
    setTimeout(closePlayerTest,30000);

}

function closePlayerTest(){

    //printBrowserLogs();
    console.log("closing player");

    let promiseScreenButton =
            tab.findElement(swd.By.id(data.liveTv.screen));
      
            promiseScreenButton.click();
            setTimeout(exitButtonClick,4000);
 }

function exitButtonClick(){
    let promiseExitButton =
            tab.findElement(swd.By.id(data.liveTv.exit));
      
            promiseExitButton.click();
            setTimeout(backButtonTest, 10000);

}
           


function backButtonTest(){
    let promiseBackButton =
    tab.findElement(swd.By.id(data.liveTv.backButton));

    promiseBackButton.click();
    
    console.log("Finallllyyy");
    counterTgn=counterTgn +1;
    //tgn

        if(counterTgn==1){
            setTimeout(vodTvShowsTest, 5000);
        }
        else{
            setTimeout(settingsTest,5000);
        }
}


function vodTvShowsTest(){
    let vodTvShowButton = tab.findElement(swd.By.xpath(data.vod.navigateTvShowVod));
    vodTvShowButton.click();
    setTimeout(playVodTvShowTest, 5000);
    
}

function playVodTvShowTest(){
    let vodTvShowPlayButton = tab.findElement(swd.By.xpath(data.vod.tvShowVod));
    vodTvShowPlayButton.click();
    setTimeout(closePlayerTest,10000);
    
}

function settingsTest(){
    console.log("going to settings");
    let settingButton =
    tab.findElement(swd.By.id(data.login.settingsButton));

    settingButton.click();
    setTimeout(profileSignOutTest, 10000);
}

function profileSignOutTest(){
    console.log("logout in process....");
    let profileSignOutButton =
    tab.findElement(swd.By.id(data.login.profileSignOut));

    profileSignOutButton.click();

    setTimeout(logOutTest, 5000);

}

function logOutTest(){
    console.log("logout in process....");
    let logOutButton =
    tab.findElement(swd.By.id(data.login.profileSignOutButton));

    logOutButton.click();

    setTimeout(confirmLogOutTest, 5000);
}

function confirmLogOutTest(){
    console.log("confirming logout....");
    let confirmLogOutButton =
    tab.findElement(swd.By.id(data.login.FEEDBACKDIALOGYES));

    confirmLogOutButton.click();

    console.log("Logout Successful");
    tab.executeScript('lambda-status=passed').then(function(return_value) {
        console.log('returned ', return_value)
    });
    setTimeout(closeDriver, 5000);
}

function closeDriver(){
    tab.quit();
}



function printBrowserLogs(){
    var count =0;
    tab.manage().logs().get('performance').then(function (entries) {
        entries.forEach(function(entry) {
            if(entry.message.includes("Manifest?start=LIVE&end=END") && entry.message.includes("status") && entry.message.includes("statusText")){
                count++;
                
            //console.log('%s, [%s]',  entry.level,entry.message);
            }
         
          });
    });
    if(count>0){
        console.log("VOD working fine.")
    }
    else{
        console.log("VOD test failed. Please check the logs.");
    }

}