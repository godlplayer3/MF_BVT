var data, tab, swd, browser, caps, env;


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Which customer to test?`, name => {
    console.log(`Hi ${name}!`)
    env = name;
    readline.close()
  })




setTimeout(init,10000);


function init(){

const { WebDriver } = require("selenium-webdriver");
const { WebElement } = require("selenium-webdriver");

// Include the chrome driver
require("chromedriver");
swd = require("selenium-webdriver");
//const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until");
browser = new swd.Builder();
caps =swd.Capabilities.chrome();
caps.set('goog:loggingPrefs', {'performance':'ALL'});
tab = browser.forBrowser("chrome").withCapabilities(caps).build();
//var fs = require("fs");

console.log(env);
loginTest();

}



async function loginTest(){
    // Include selenium webdriver
    data=  require("../ConfigurationFiles/tlx_data.json");
    
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
    
    
    
    
    //loginTest();
    //identityTest();
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
                   
                //setTimeout(LiveChannelTest,5000);
                  setTimeout(GuideTest,5000);     
        }
        
  
        function GuideTest(){
            console.log("Guide Open...");
            let guideButton = tab.findElement(swd.By.xpath('/html/body/div[1]/div[6]/div[2]/div[4]/div[3]/div/div[1]'));
            guideButton.click();

            setTimeout(clickRandomChannels,5000);

        }

function clickRandomChannels(){
    console.log("Trying channel 1...");
    let channelOne = tab.findElement(swd.By.xpath('/html/body/div[1]/div[6]/div[3]/div[2]/div[13]/div/canvas')).get[0];
    channelOne.click();
}













function LiveChannelTest(){
    console.log("Testing Live TV...");
    let liveTvButton = tab.findElement(swd.By.xpath(data.liveTv.liveChannelTabPath));
    liveTvButton.click();

    setTimeout(playLiveTvDivClick,5000);
    
    
}

function playLiveTvDivClick(){
    let liveTvDivButton = tab.findElement(swd.By.xpath(data.liveTv.liveChannelTabPath));
    liveTvDivButton.click();
    setTimeout(playRandomLiveChannel,5000);

}


function playRandomLiveChannel(){
    console.log("Playing Live TV...");
    let playButton = tab.findElement(swd.By.xpath(data.liveTv.liveChannelOnePath));
    playButton.click();
    setTimeout(closePlayerTest, 60000);
}

function closePlayerTest(){

    printBrowserLogs();
    console.log("closing player");

    let promiseScreenButton =
            tab.findElement(swd.By.id(data.liveTv.screen));
      
            promiseScreenButton.click();


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

    setTimeout(settingsTest, 10000);
    
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
}




function printBrowserLogs(){
    var count =0;
    tab.manage().logs().get('performance').then(function (entries) {
        entries.forEach(function(entry) {

            //console.log(entry.toJSON);
            if(entry.message.includes("Manifest?start=LIVE&end=END") && entry.message.includes("Network.responseReceived") ){
                count++;

               
                
            
            }
         
          });
    });
    if(count>0){
        //console.log("Live TV working fine.")
    }
    else{
       // console.log("Live TV test failed. Please check the logs.");
    }

    
}