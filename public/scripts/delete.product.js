function deleteProduct(pid) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      fetch(`/products/:pid`, {
        method: 'DELETE', // Enviar una solicitud DELETE al servidor
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Product deleted") {
          alert("Producto eliminado exitosamente");
          location.reload(); // Recargar la página después de eliminar el producto
        } else {
          alert("Error al eliminar el producto");
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }