let products = [];
let currentEditIndex = -1;

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    
    let lowStockFound = false; // Variable para verificar si hay productos con stock bajo

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.classList.toggle("low-stock", product.quantity <= product.minStock);

        if (product.quantity <= product.minStock) {
            lowStockFound = true; // Si el stock de un producto está bajo, se activa el aviso
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

    // Mostrar el mensaje de aviso si hay productos con stock bajo
    const lowStockAlert = document.getElementById("lowStockAlert");
    if (lowStockFound) {
        lowStockAlert.style.display = "block"; // Muestra el mensaje de alerta si hay productos con stock bajo
    } else {
        lowStockAlert.style.display = "none"; // Oculta el mensaje si no hay productos con stock bajo
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
        displayProducts();
    }
}

function useProduct(index) {
    const product = products[index];
    const usedQuantity = prompt(`¿Cuántas unidades de "${product.name}" usaste?`, 1);

    if (usedQuantity && !isNaN(usedQuantity) && usedQuantity > 0) {
        product.quantity -= parseFloat(usedQuantity);
        displayProducts();
    } else {
        alert("Cantidad no válida.");
    }
}

// Mensaje de alerta para productos con stock bajo
window.onload = function() {
    displayProducts();
}
