const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../database/db.json');

async function readFile() {
    let data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function getProducts() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return await readFile();
}

async function getProductById(id) {
    const products = await getProducts();
    return products.find((prod) => prod.id == id);
}

module.exports = {
    getProducts,
    getProductById
};