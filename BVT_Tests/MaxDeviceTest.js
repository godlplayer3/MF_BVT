const { Key } = require('selenium-webdriver');

var data, tab, swd, browser, caps, env;


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`What's your name?`, name => {
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




//var data = ["./ConfigurationFiles/tgn_data.json", "./ConfigurationFiles/ccx_data.json"];





async function loginTest(){
// Include selenium webdriver
  
if(env=="1"){
    data=  require("./ConfigurationFiles/tgn_data.json");
}
else if(env=="2"){
    data=  require("./ConfigurationFiles/ccx_data.json");
}
else if(env=="3"){
    data =require("./ConfigurationFiles/tlx_data.json");
}
// Step 1 - Opening the reach client sign in page
let tabToOpen =tab.get(data.login.url);
tabToOpen
    .then(function () {
  
        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 20000, // 10 seconds
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
        let promiseClickSignIn = signInBtn.submit();
        return promiseClickSignIn;
        
    })
    .then(function () {
        
        console.log("Checking credentials...");
        setTimeout(checkCredentialTest, 25000);
        
    })
    
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });

}




//loginTest();
//identityTest();

async function checkCredentialTest(){
    var url = tab.getCurrentUrl();

    url.then((text) => {
        
        if(text.includes(data.login.checkUrl)){
            console.log("invalid credentials");
            //setTimeout(identityTest,20000);
        }
        else{
            console.log("login successful");
            if(env=="1" || env=="3"){
                setTimeout(identityTest,20000);
            }
            else if(env=="2"){
                setTimeout(userAccountTest,20000);
            }
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
    setTimeout(settingsTest,5000);
    
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


