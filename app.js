const {Builder, By, Key, until} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

let driver = new webdriver.Builder()
.forBrowser('chrome')
.setChromeOptions()
//.setFirefoxOptions(/* ... */)
.build();

let timeout = async(time=1)=>{
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{resolve();}, time*1000);
	})
}

(async function example() {
	//let driver = await new Builder().forBrowser('firefox').build();
	try {
		await driver.get('http://app.stg.cloudhms.io/ats-authentication/login');
		
		await driver.findElement(By.name('orgCode')).sendKeys('alpha');
		await driver.findElement(By.className('btn-cyan')).click();
		
		await driver.findElement(By.name('username')).sendKeys('v.nguyentvk@cloudhms.net');
		await driver.findElement(By.name('password')).sendKeys('hms@123456');
		await driver.findElement(By.className('btn-primary')).click();
		
		//delay  after login
		await timeout(10);
		
		//select Applications
		try{
			let curUrl =await driver.getCurrentUrl();
			await driver.navigate().to(curUrl);
			
			let subLinks = await driver.findElements(By.css('.subtitle-medium.hms-title-menu__title-link'));
			for(let link of subLinks){
				let textValue = await link.getText();
				if(textValue.indexOf("Applications")>=0){
					await link.click();
					break;
				}
			}
		}catch(e) {
			console.error(e);
		}
		
		
		//select rate service
		await timeout(3);
		try{
			let subApps = await driver.findElements(By.css('.menu-content'));
			for(let app of subApps){
				let textValue = await app.getText();
				//console.info("app name: " + textValue);
				if(textValue.indexOf("Rate Service Management")>=0){
					await app.click();
					break;
				}
			}
		}catch(e) {
			console.error(e);
		}
		
		
		//select rate query
		await timeout(3);
		try{
			let subLinks = await driver.findElements(By.css('.subtitle-medium.hms-title-menu__title-link'));
			for(let link of subLinks){
				let textValue = await link.getText();
				//console.info("link name: " + textValue);
				if(textValue.indexOf("Rate Query")>=0){
					await link.click();
					break;
				}
			}
		}catch(e) {
			console.error(e);
		}
		
		
		//select Property
		await timeout(3);
		try{
			await driver.findElement(By.className("select-property")).click();
			await timeout(1);
			let options = await driver.findElements(By.css('.ng-option-label'));
			for(let link of options){
				let textValue = await link.getText();
				console.info("link name: " + textValue);
				if(textValue.indexOf("VCTHT - Vinpearl Hotel Cần Thơ")>=0){
					await link.click();
					break;
				}
			}
		}catch(e) {
			console.error(e);
		}
		
		
		//select DC
		await timeout(3);
		try{
			let ngDropdowns = await driver.findElements(By.css(".ng-select-container .ng-value-container .ng-placeholder"));
			for(let dropDown of ngDropdowns){
				let textValue = await dropDown.getText();
				console.info("link name: " + textValue);
				if(textValue.toUpperCase().indexOf("SELECT DISTRIBUTION") >= 0){
					let parent = await dropDown.findElement(By.xpath(".."));
					await parent.findElement(By.tagName("input")).click();
					break;
				}
			}
			await timeout(2);
			let options = await driver.findElements(By.css('.ng-option-label'));
			for(let link of options){
				let textValue = await link.getText();
				console.info("link name: " + textValue);
				if(textValue.indexOf("ADAYROI")>=0){
					await link.click();
					break;
				}
			}
			
			await timeout(3);
			let btnSearchs = await driver.findElements(By.css('.btn.btn-primary.pull-right')); //btn btn-primary pull-right
			for(let btnSearch of btnSearchs){
				let textValue = await btnSearch.getText(); console.info("link name: " + textValue);
				if(textValue.toLowerCase().indexOf("search")>=0){
					await btnSearch.click();
					break;
				}
			}
			await timeout(30);
		}catch(e) {
			console.error(e);
		}
		
	}catch(e){
		console.error(e);
	} finally {
		console.info(`finally`);
		await driver.quit().catch(e=>{
			console.error(e);
		});
	}
})();