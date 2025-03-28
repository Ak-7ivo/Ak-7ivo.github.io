let productos = [];

document.getElementById('addProductButton').addEventListener('click', abrirModal);
document.getElementById('generateListButton').addEventListener('click', generarListaCompras);

function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productUnit').value = '';
    document.getElementById('productStock').value = '';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

function guardarProducto() {
    const nombre = document.getElementById('productName').value;
    const cantidad = document.getElementById('productQuantity').value;
    const unidad = document.getElementById('productUnit').value;
    const stockMinimo = document.getElementById('productStock').value;

    if (!nombre || !cantidad || !unidad || !stockMinimo) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    productos.push({ nombre, cantidad: parseFloat(cantidad), unidad, stockMinimo: parseFloat(stockMinimo) });
    actualizarTabla();
    cerrarModal();
}

function actualizarTabla() {
    const tableBody = document.getElementById('stockList');
    tableBody.innerHTML = '';

    productos.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.unidad}</td>
            <td>${producto.stockMinimo}</td>
            <td><button class="delete" onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarTabla();
}

function filtrarLista() {
    const filtro = document.getElementById('search').value.toLowerCase();
    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro)
    );
    const tableBody = document.getElementById('stockList');
    tableBody.innerHTML = '';

    filteredProductos.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.unidad}</td>
            <td>${producto.stockMinimo}</td>
            <td><button class="delete" onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function generarListaCompras() {
    let listaCompra = 'Productos a comprar:\n';
    productos.forEach(producto => {
        if (producto.cantidad < producto.stockMinimo) {
            listaCompra += `${producto.nombre}: ${producto.cantidad} ${producto.unidad} (mínimo ${producto.stockMinimo})\n`;
        }
    });
    alert(listaCompra || 'No hay productos para comprar.');
}
