const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { Select } = require('selenium-webdriver');

const URL = 'http://localhost:3000/Products/index.html';
const SELECTORS = {
    loader: '.loader',
    productName: '/html/body/div/form/div[1]/div[1]/input',
    productPrice: '/html/body/div/form/div[1]/div[2]/input',
    productStock: '/html/body/div/form/div[2]/div[1]/input',
    productCategory: '/html/body/div/form/div[2]/div[2]/select',
    submitButton: '#app > form > button',
    alertMessage: '.alert',  
    editButton: 'a.text-warning',
    deleteButton: 'a.text-danger',
    deleteModal: '#deleteModal',
    confirmButton: '#deleteModal .btn-danger',
    editModal: '#editModal',
    editProductName: '#editProductName',
    editProductPrice: '#editProductPrice',
    editProductStock: '#editProductStock',
    editProductCategory: '#editProductCategory',

};

const newProduct = {
    name: 'Producto de prueba',
    price: '100',
    stock: '10',
};

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

async function waitForAlert(driver) {
    try {
        const alertElement = await driver.wait(
            until.elementIsVisible(driver.findElement(By.css(SELECTORS.alertMessage))),
            8000
        );
        return alertElement;
    } catch (error) {
        console.error('No se encontró el mensaje de alerta:', error);
        return null;
    }
}

async function createDriver() {
    let driver;
    try {
        const service = new chrome.ServiceBuilder(chromedriver.path);
        const options = new chrome.Options();
        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeService(service)
            .setChromeOptions(options)
            .build();
        await driver.get(URL);
        await driver.manage().window().maximize();
        await waitForLoader(driver);
        return driver;
    } catch (error) {
        console.error('Error al iniciar Selenium:', error.message);
        console.error('Stack Trace:', error.stack);
    }
}

async function waitForLoader(driver) {
    let visibleLoader = true;
    while (visibleLoader) {
        try {
            await driver.findElement(By.css(SELECTORS.loader));
            await sleep(1000);
        } catch (error) {
            visibleLoader = false;
        }
    }
}

describe('Pruebas de UI de Productos', () => {

    let driver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('Debería poder crear un producto', async () => {
        try {
            await waitForLoader(driver);
            await driver.findElement(By.xpath(SELECTORS.productName)).sendKeys(newProduct.name);
            await driver.findElement(By.xpath(SELECTORS.productPrice)).sendKeys(newProduct.price);
            await driver.findElement(By.xpath(SELECTORS.productStock)).sendKeys(newProduct.stock);

            const productCategorySelect = await driver.findElement(By.xpath(SELECTORS.productCategory));
            const selectCategory = new Select(productCategorySelect);
            await selectCategory.selectByIndex(1); // Selecciona la segunda opción

            await driver.findElement(By.css(SELECTORS.submitButton)).click();  
            await waitForAlert(driver); // Esperar el mensaje de alerta
            const alertElement = await driver.findElement(By.css(SELECTORS.alertMessage));
           
            const message = await alertElement.getText();
            await sleep(2000);
            console.log('Mensaje de alerta:', message);
            expect(message).toContain('Producto creado');
        } catch (error) {
            console.error('Error en la prueba de creación de producto:', error);
            throw error;
        }
    });
    it('Debería actualizar un producto existente', async () => {
        try {
            await waitForLoader(driver);
    
            // Localizar la fila correspondiente al producto que se quiere actualizar
            const productRow = await driver.findElement(By.xpath(`//tr[td[normalize-space(text())='${newProduct.name}']]`));
           
            const productName = await productRow.findElement(By.xpath('td[2]')).getText();
            expect(productName).toBe(newProduct.name);
           
            await productRow.findElement(By.css(SELECTORS.editButton)).click();
    
            const modal = await driver.wait(until.elementIsVisible(driver.findElement(By.css(SELECTORS.editModal))), 10000);
    
            await sleep(1000);
    
          
            await driver.findElement(By.css(SELECTORS.editProductName)).clear();
            await driver.findElement(By.css(SELECTORS.editProductName)).sendKeys('Producto actualizado');
            await driver.findElement(By.css(SELECTORS.editProductPrice)).clear();
            await driver.findElement(By.css(SELECTORS.editProductPrice)).sendKeys('150');
            await driver.findElement(By.css(SELECTORS.editProductStock)).clear();
            await driver.findElement(By.css(SELECTORS.editProductStock)).sendKeys('20');
            
       
            await driver.findElement(By.css(`${SELECTORS.editModal} button[type="submit"]`)).click();

        
            await waitForAlert(driver);
      
            const alertElement = await driver.findElement(By.css(SELECTORS.alertMessage));
           
        
            const message = await alertElement.getText();
            await sleep(2000);
            console.log('Mensaje recibido:', message);
            expect(message).toContain('Producto actualizado');
    
      
            
        } catch (error) {
            console.error('Error en la prueba de actualización de producto:', error);
            throw error;
        }
    });
    it('Debería eliminar un producto', async () => {
        try {
            await waitForLoader(driver);
            
            // Localizar la fila correspondiente al producto que se quiere eliminar
            const productRow = await driver.findElement(By.xpath(`//tr[td[normalize-space(text())='Producto actualizado']]`));
            
            // Hacer clic en el botón de eliminar para ese producto
            await productRow.findElement(By.css(SELECTORS.deleteButton)).click();
            
            // Esperar que el modal de confirmación de eliminación sea visible
            const deleteModal = await driver.wait(
                until.elementIsVisible(driver.findElement(By.css(SELECTORS.deleteModal))),
                10000
            );
            console.log("Modal de eliminación visible");
            
            // Confirmar la eliminación
            await driver.sleep(1000);
            await driver.findElement(By.css(SELECTORS.confirmButton)).click();
            
            // Esperar el mensaje de alerta
            await waitForAlert(driver); 
            const alertElement = await driver.findElement(By.css(SELECTORS.alertMessage));
            const message = await alertElement.getText();
            console.log('Mensaje recibido:', message);
            expect(message).toContain('Producto eliminado');
        } catch (error) {
            console.error('Error en la prueba de eliminación de producto:', error);
            throw error;
        }
    });
    
    
});
