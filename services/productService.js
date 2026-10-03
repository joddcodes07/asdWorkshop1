const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../database/db.json');

async function readFile() {
    let data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function getProducts() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return await readFile();
}

async function getProductById(id) {
    const products = await getProducts();
    return products.find((prod) => prod.id == id);
}

async function createProduct(productData) {
    const products = await readFile();
    //generating a new id
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    
    products.push(newProduct);
    await writeFile(products);
    return newProduct;
}

async function updateProduct(id, productData, isPatch = false) {
    const products = await readFile();
    const index = products.findIndex((prod) => prod.id == id);
    
    if (index === -1) return null; // Product not found

    if (isPatch) {
        // PATCH: Merge existing data with new partial data
        products[index] = { ...products[index], ...productData };
    } else {
        // PUT: Completely replace the item (keeping the ID)
        products[index] = { id: Number(id), ...productData };
    }
    await writeFile(products);
    return products[index];
}

async function deleteProduct(id) {
    const products = await readFile();
    const index = products.findIndex((prod) => prod.id == id);
    
    if (index === -1) return false;

    products.splice(index, 1); 
    await writeFile(products);
    return true;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};