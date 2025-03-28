let products = JSON.parse(localStorage.getItem("products")) || [];
let currentEditIndex = -1;

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    
    let lowStockFound = false;

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.classList.toggle("low-stock", product.quantity <= product.minStock);

        if (product.quantity <= product.minStock) {
            lowStockFound = true;
        }

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.unit}</td>
            <td>${product.minStock}</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
                <button class="use" onclick="useProduct(${index})">Usar</button>
            </td>
        `;
        productList.appendChild(row);
    });

    const lowStockAlert = document.getElementById("lowStockAlert");
    if (lowStockFound) {
        lowStockAlert.style.display = "block";
    } else {
        lowStockAlert.style.display = "none";
    }
}

function searchProduct() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    filteredProducts.forEach((product, index) => {
        const row = document.createElement("tr");
        row.classList.toggle("low-stock", product.quantity <= product.minStock);

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.unit}</td>
            <td>${product.minStock}</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
                <button class="use" onclick="useProduct(${index})">Usar</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

function openEditModal() {
    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalTitle").textContent = "Agregar Producto";
    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productUnit").value = "";
    document.getElementById("productMinStock").value = "";
    currentEditIndex = -1;
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveProduct() {
    const name = document.getElementById("productName").value;
    const quantity = parseFloat(document.getElementById("productQuantity").value);
    const unit = document.getElementById("productUnit").value;
    const minStock = parseFloat(document.getElementById("productMinStock").value);

    if (!name || !quantity || !unit || !minStock) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (currentEditIndex === -1) {
        products.push({ name, quantity, unit, minStock });
    } else {
        products[currentEditIndex] = { name, quantity, unit, minStock };
    }

    localStorage.setItem("products", JSON.stringify(products)); // Guarda los datos en LocalStorage
    closeEditModal();
    displayProducts();
}

function editProduct(index) {
    const product = products[index];
    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalTitle").textContent = "Editar Producto";
    document.getElementById("productName").value = product.name;
    document.getElementById("productQuantity").value = product.quantity;
    document.getElementById("productUnit").value = product.unit;
    document.getElementById("productMinStock").value = product.minStock;
    currentEditIndex = index;
}

function deleteProduct(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products)); // Guarda los cambios en LocalStorage
        displayProducts();
    }
}

function useProduct(index) {
    const product = products[index];
    const usedQuantity = prompt(`¿Cuántas unidades de "${product.name}" usaste?`, 1);

    if (usedQuantity && !isNaN(usedQuantity) && usedQuantity > 0) {
        product.quantity -= parseFloat(usedQuantity);
        localStorage.setItem("products", JSON.stringify(products)); // Guarda los cambios en LocalStorage
        displayProducts();
    } else {
        alert("Cantidad no válida.");
    }
}

// Mensaje de alerta para productos con stock bajo
window.onload = function() {
    displayProducts();
}
