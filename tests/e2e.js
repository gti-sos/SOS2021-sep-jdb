const puppeteer = require('puppeteer');
const screenshotPath = './tests/e2e_screenshoots/';
var counter=0;
(async () => {
  const browser = await puppeteer.launch({
    headless: true, 
    slowMo: 1000, // delay de 1 segundo.
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await browser.newPage();
  await page.setViewport({ width: 3688, height: 1768 });

  //llamada a la pagina principal
  console.log("home ");
  await page.goto('http://sos2021-sep-jdb.herokuapp.com/');
  
  await page.screenshot({ path: 'screenshots/home.png' });

  
  //pagina informacion
  console.log("info ");
  await page.click("#informacion > div > div > div.d-grid.gap-2.d-md-flex.justify-content-md-center > a:nth-child(1) > button" );
   
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/info.png' });
 
 

  //tabla
  await page.click("#SvelteApp > main > main > div:nth-child(9) > div > div > div.card-body > a:nth-child(4)" );

  await page.waitForTimeout(1000);
  


  await page.screenshot({ path: 'screenshots/tabla.png' });

 //añadir todos los datos
 console.log("datos iniciales");
 await page.focus('#SvelteApp > main > main > main > button.btn.btn-outline-primary');
 await page.click("#SvelteApp > main > main > main > button.btn.btn-outline-primary");

 await page.screenshot({ path: 'screenshots/tabla2.png' });


 //anyadir datos
  console.log("Depresion en españa");
  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(1) > input');
  await page.keyboard.type("Spain_Catalunya");

  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(2) > input');
  await page.keyboard.type("2010");

  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(3) > input');
  await page.keyboard.type("10.1");

  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(4) > input');
  await page.keyboard.type("15.0");

  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(5) > input');
  await page.keyboard.type("30.1");

  console.log("datos rellaneados");

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/tabla3.png' });

  console.log("datos insertados");
  
  await page.focus('#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(6) > button');
  await page.click("#SvelteApp > main > main > main > table > tbody > tr:nth-child(1) > td:nth-child(6) > button");
  
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/tabla4.png' });
  //eliminar un dato

  console.log("eliminar un dato");

  await page.click("#SvelteApp > main > main > main > table > tbody > tr:nth-child(7) > td:nth-child(6) > button"),
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshots/tabla5.png' });

  //eliminar todos los datos

  console.log("eliminar todos");
  await page.waitForTimeout(1000);
  await page.click("#SvelteApp > main > main > main > button:nth-child(11)"),
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshots/tabla6.png' });
  //cargamos los datos para que las tablas puedan verse
  await page.focus('#SvelteApp > main > main > main > button.btn.btn-outline-primary');
  await page.click("#SvelteApp > main > main > main > button.btn.btn-outline-primary");


  //vuelta a la pagina principal
  console.log("vuelta a la pagina principal");
  await page.click("#SvelteApp > main > main > main > button.btn.btn-outline-secondary" );



  //pagina integraciones
  console.log("integrations");
  await page.click("#SvelteApp > main > main > ul > li:nth-child(2) > a");
  await page.screenshot({ path: 'screenshots/integrations.png' });
  
  //primera grafica
  console.log(" primera grafica");
  await page.click("#SvelteApp > main > main > div > div:nth-child(1) > div > div.card-body > a:nth-child(4) > button" );
   
  await page.waitForTimeout(1000);
 
  await page.screenshot({ path: 'screenshots/grafica1.png' });

  await page.waitForTimeout(1000);

  await page.click("#SvelteApp > main > main > button" );



   //primera integracion
   console.log(" segunda grafica");
   await page.click("#SvelteApp > main > main > div > div:nth-child(2) > div > div.card-body > a:nth-child(3) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'screenshots/integracion1.png' });
 
   await page.waitForTimeout(1000);
 
   await page.click("#SvelteApp > main > main > button" );



   //segunda integracion
   console.log(" tercera grafica");
   await page.click("#SvelteApp > main > main > div > div:nth-child(2) > div > div.card-body > a:nth-child(4) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'screenshots/integracion2.png' });
 
   await page.waitForTimeout(1000);
 
   await page.click("#SvelteApp > main > main > button" );


   //tercera integracion
   console.log(" tercera grafica");
   await page.click("#SvelteApp > main > main > div > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'screenshots/integracion3.png' });
 
   await page.waitForTimeout(1000);
 
   await page.click("#SvelteApp > main > main > button" );


   // integracion externa 1
   console.log("integracion externa 1");
   await page.click("#SvelteApp > main > main > div > div:nth-child(2) > div > div.card-body > a:nth-child(6) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'screenshots/integracionExterna1.png' });
 
   await page.waitForTimeout(1000);
 
   await page.click("#SvelteApp > main > main > button" );


   // integracion externa 2
   console.log("integracion externa 2");
   await page.click("#SvelteApp > main > main > div > div:nth-child(2) > div > div.card-body > a:nth-child(7) > button" );
    
   await page.waitForTimeout(1000);
  
   await page.screenshot({ path: 'screenshots/integracionExterna2.png' });
 
   await page.waitForTimeout(1000);
 
   await page.click("#SvelteApp > main > main > button" );


  //pagina video
  console.log("video page");
  await page.click("#SvelteApp > main > main > ul > li:nth-child(4) > a")

  await page.screenshot({ path: 'screenshots/video.png' });





  await page.close();
  await browser.close();
})();
