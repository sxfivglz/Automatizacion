require('dotenv').config();
const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const PORT = process.env.PORT_APP;
const URL = `http://localhost:${PORT}/Categories/index.html`;
const SELECTORS = {
    loader: '.loader',
    categoryName: '/html/body/div/form/div/div[1]/input',
    categoryDescription: '/html/body/div/form/div/div[2]/input',
    submitButton: '#app > form > button',
    editButton: 'a.text-warning',
    deleteButton: 'a.text-danger',
    deleteModal: '#deleteModal',
    confirmButton: '#deleteModal .btn-danger',
    editModal: '#editModal',
    editCategoryName: '#editCategoryName',
    editCategoryDescription: '#editCategoryDescription',
    alertMessage: '.alert',
};

const newCategory = {
    name: 'Categoría de prueba',
    description: 'Descripción de prueba',
};

// Función para esperar un tiempo determinado
async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

// Espera hasta que aparezca una alerta
async function waitForAlert(driver, timeout = 10000) {
    try {
        const alertElement = await driver.wait(
            until.elementLocated(By.css(SELECTORS.alertMessage)),
            timeout // Tiempo de espera extendido
        );
        await driver.wait(until.elementIsVisible(alertElement), timeout); // Esperar a que sea visible
        return alertElement;
    } catch (error) {
        console.error('No se encontró el mensaje de alerta:', error);
        return null;
    }
}

// Espera hasta que la alerta desaparezca
async function waitForAlertToDisappear(driver, timeout = 10000) {
    try {
        await driver.wait(
            until.stalenessOf(driver.findElement(By.css(SELECTORS.alertMessage))),
            timeout // Tiempo extendido para esperar que desaparezca
        );
    } catch (error) {
        console.error('El mensaje de alerta no desapareció:', error);
    }
}

// Espera hasta que el loader desaparezca
async function waitForLoader(driver, timeout = 15000) { // Incrementando el tiempo de espera
    let visibleLoader = true;
    const endTime = Date.now() + timeout; // Tiempo máximo para esperar el loader
    while (visibleLoader && Date.now() < endTime) {
        try {
            await driver.findElement(By.css(SELECTORS.loader));
            await sleep(2000); // Incrementar la espera entre intentos
        } catch (error) {
            visibleLoader = false;
        }
    }
    if (visibleLoader) {
        console.warn("El loader no desapareció dentro del tiempo esperado");
    }
}

// Función para crear el driver de Selenium
async function createDriver() {
    let driver;
    try {
        const service = new chrome.ServiceBuilder(chromedriver.path);
        const options = new chrome.Options();
        options.addArguments('--headless=new', '--headless', '--no-sandbox', '--window-size=1920x1080'); 
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

describe('Pruebas de UI para Categorías', () => {
    let driver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('Debería crear una nueva categoría', async () => {
        try {
            await waitForLoader(driver);
            const name = await driver.findElement(By.xpath(SELECTORS.categoryName));
            const description = await driver.findElement(By.xpath(SELECTORS.categoryDescription));
            await name.sendKeys(newCategory.name);
            await description.sendKeys(newCategory.description);
            await driver.findElement(By.css(SELECTORS.submitButton)).click();
            const alertElement = await waitForAlert(driver); 
            const message = await alertElement.getText();
            console.log('Mensaje recibido:', message);
            expect(message).toContain('Categoría creada');
            await waitForAlertToDisappear(driver); 
        } catch (error) {
            console.error('Error en la prueba de creación de categoría:', error);
            throw error;
        }
    });

    it('Debería mostrar un error si el nombre de la categoría ya existe', async () => {
        try {
            await waitForLoader(driver, 15000);
    
            const name = await driver.findElement(By.xpath(SELECTORS.categoryName));
            const description = await driver.findElement(By.xpath(SELECTORS.categoryDescription));               
            await name.sendKeys(newCategory.name);  
            await description.sendKeys(newCategory.description);
            await driver.findElement(By.css(SELECTORS.submitButton)).click();    

            const alertElement = await waitForAlert(driver, 15000); // Espera más larga
            const message = await alertElement.getText();
            console.log('Mensaje de error recibido:', message);
            expect(message).toContain('Error al crear la categoría');
            await waitForAlertToDisappear(driver, 15000); // Espera más larga
        } catch (error) {
            console.error('Error en la prueba de nombre duplicado:', error);
            throw error;
        }
    });

    it('Debería actualizar una categoría existente', async () => {
        try {
            await waitForLoader(driver);

            const categoryRow = await driver.findElement(By.xpath(`//tr[td[normalize-space(text())='${newCategory.name}']]`));
            const categoryName = await categoryRow.findElement(By.xpath('td[2]')).getText();
            expect(categoryName).toBe(newCategory.name);

            await categoryRow.findElement(By.css(SELECTORS.editButton)).click();
            const modal = await driver.wait(
                until.elementIsVisible(driver.findElement(By.css(SELECTORS.editModal))),
                10000
            );
            await sleep(1000);          
            await driver.findElement(By.css(SELECTORS.editCategoryName)).clear();
            await driver.findElement(By.css(SELECTORS.editCategoryName)).sendKeys('Categoría editada');
            await driver.findElement(By.css(SELECTORS.editCategoryDescription)).clear();
            await driver.findElement(By.css(SELECTORS.editCategoryDescription)).sendKeys('Descripción editada');
            await driver.findElement(By.css(`${SELECTORS.editModal} button[type="submit"]`)).click();
            await waitForAlert(driver);
            const alertElement = await driver.findElement(By.css(SELECTORS.alertMessage));
            const message = await alertElement.getText();
            console.log('Mensaje recibido:', message);
            expect(message).toContain('Categoría actualizada');
            await waitForAlertToDisappear(driver); 
        } catch (error) {
            console.error('Error en la prueba de actualización de categoría:', error);
            throw error;
        }
    });

    it('Debería eliminar una categoría', async () => {
        try {
            await waitForLoader(driver);
            
            const categoryRow = await driver.findElement(By.xpath(`//tr[td[normalize-space(text())='Categoría editada']]`));
            await categoryRow.findElement(By.css(SELECTORS.deleteButton)).click();
            const deleteModal = await driver.wait(
                until.elementIsVisible(driver.findElement(By.css(SELECTORS.deleteModal))),
                10000
            );
            
            await driver.sleep(1000);
            await driver.findElement(By.css(SELECTORS.confirmButton)).click();
            const alertElement = await waitForAlert(driver); 
            const message = await alertElement.getText();
            console.log('Mensaje recibido:', message);
            expect(message).toContain('Categoría eliminada');
            await waitForAlertToDisappear(driver); 
        } catch (error) {
            console.error('Error en la prueba de eliminación de categoría:', error);
            throw error;
        }
    });

    it('Debería mostrar un error si el nombre supera los 50 caracteres', async () => {
        try {
            await waitForLoader(driver);    
            const nameElement = await driver.findElement(By.xpath(SELECTORS.categoryName));
            const descriptionElement = await driver.findElement(By.xpath(SELECTORS.categoryDescription));        
            const longName = 'Categoría con más de cincuenta caracteres en su nombre'.substring(0, 51);
            await nameElement.sendKeys(longName); 
            await descriptionElement.sendKeys(newCategory.description);
            await driver.findElement(By.css(SELECTORS.submitButton)).click();
            const alertElement = await waitForAlert(driver, 15000); // Espera más larga
            const message = await alertElement.getText();
            console.log('Mensaje de error recibido:', message);
            expect(message).toContain('Error al crear la categoría');
            await waitForAlertToDisappear(driver, 15000); // Espera más larga
        } catch (error) {
            console.error('Error en la prueba de longitud del nombre:', error);
            throw error;
        }
    });
});
