import { useState, useEffect } from 'react';
import api from '../api/axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer les produits
  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await api.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Mettre à jour un produit
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await api.put(`/api/products/${updatedProduct.id}`, updatedProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">GESTION DES PRODUITS</h1>
  
    <div className="flex flex-wrap justify-start gap-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="min-w-[250px] max-w-[300px] sm:min-w-[300px] sm:max-w-[320px] md:min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 
                     bg-white rounded-lg shadow-md border border-black p-4 hover:shadow-lg transition-shadow"
        >
          {/* En-tête de la carte */}
          <div className="mb-2 border-b border-black pb-2">
            <h2 className="text-lg font-bold text-black truncate">{product.name}</h2>
            <p className="text-gray-600 text-xs">{product.category}</p>
          </div>
  
          {/* Image du produit */}
          {product.image_url && (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-32 object-cover mb-2 rounded-md"
            />
          )}
  
          {/* Détails du produit */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Prix:</span>
              <span>{product.price} DH</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Taille:</span>
              <span>{product.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantité:</span>
              <span>{product.quantity}</span>
            </div>
            <div className="mt-1">
              <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
            </div>
          </div>
  
          {/* Actions */}
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => setEditingProduct(product)}
              className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="px-3 py-1.5 border border-black text-black rounded-md hover:bg-gray-100 transition text-sm"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  
    {/* Formulaire de modification */}
    {editingProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-xl mx-4">
          <h2 className="text-xl font-bold mb-4">Modifier le produit</h2>
          {/* Formulaire de modification */}
          <button
            onClick={() => setEditingProduct(null)}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
          >
            Fermer
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default ProductManager;