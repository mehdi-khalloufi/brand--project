import { useState, useEffect } from 'react';
import api from '../api/axios';
import { LifeLine } from "react-loading-indicators";
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message,setMessage]=useState(null);
    const [erreur,setErreur]=useState(null);
  const categories = ['Vêtements', 'Chaussures', 'Accessoires', 'Équipement'];
  const sizeees = ['S', 'M', 'L', 'XL', 'XXL'];
  
  
  const handleEditChange = (e) => {
    console.log(editingProduct);
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditingProduct(prev => ({
      ...prev,
      image: file
    }));
  };

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErreur(null);
  
    try {
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('description', editingProduct.description || ''); 
      formData.append('price', String(editingProduct.price)); 
      formData.append('quantity', String(editingProduct.quantity));
      formData.append('size', editingProduct.size);
      formData.append('category', editingProduct.category);
  
      if (editingProduct.image instanceof File) {
        formData.append('image', editingProduct.image);
      }
  
      const response = await api.post(`/api/products/${editingProduct.id}`, formData); 
      
      console.log("Produit modifié :", response.data);
      setMessage("Produit modifié avec succès !");
      setEditingProduct(null);
      setMessage(null);
      fetchProducts();
    } catch (error) {
      console.error("Erreur détaillée :", error.response?.data);
      setErreur(error.response?.data?.errors || "Erreur inconnue");
    }
  };
  

  if (loading) return  <div className="fixed inset-0 bg-opacity-70 z-50 flex items-center justify-center">
          <LifeLine color="#ee2b2b" size="medium" text="" textColor="" />
        </div>;

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
    <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4">
      <h1 className="text-3xl font-bold text-center text-black mb-8">MODIFIER LE PRODUIT</h1>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Catégorie
            </label>
            <select
              name="category"
              value={editingProduct.category}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white focus:ring-2 focus:ring-black"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Prix (DH)
            </label>
            <input
              type="number"
              min="0"
              name="price"
              value={editingProduct.price}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Taille */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Taille
            </label>
            <select
              name="size"
              value={editingProduct.size}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white focus:ring-2 focus:ring-black"
              required
            >
              
              {sizeees.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Quantité */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Quantité
            </label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={editingProduct.quantity}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Image du produit
            </label>
            <input
              type="file"
              name="image"
              onChange={handleEditImageChange}
              className="w-full file:px-4 file:py-2 file:border file:border-black file:rounded-lg file:bg-white file:text-black hover:file:bg-gray-100"
              accept="image/*"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={editingProduct.description}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black h-32"
          />
        </div>

        {/* Messages */}
        <div className="w-full">
          {message && <span className="block text-center text-black mb-1">{message}</span>}
          {erreur && <span className="block text-center text-red-600 mb-1">{erreur}</span>}
        </div>

        {/* Boutons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="px-8 py-3 border border-black text-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
)}
  </div>
  );
};

export default ProductManager;