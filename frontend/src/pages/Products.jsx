import { useState } from 'react';
import api from '../api/axios';
import { span } from 'framer-motion/client';
export default function Products() {
    const [message,setMessage]=useState(null);
    const [erreur,setErreur]=useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    size: '',
    image: null,
    category: ''
  });

  const categories = ['Vêtements', 'Chaussures', 'Accessoires', 'Équipement'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/api/products', formData);
        console.log('Produit ajouté:', response.data);
        setMessage("Produit ajouté");
      } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        setErreur('Erreur lors de l\'ajout du produit');
      }

  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
    }));
};

  return (
    <div className="min-h-full bg-white p-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">AJOUTER UN PRODUIT</h1>
      <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Sélectionner une catégorie</option>
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
              min={0}
              name="price"
              value={formData.price}
              onChange={handleChange}
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
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Sélectionner une taille</option>
              {sizes.map(size => (
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
              min={0}
              value={formData.quantity}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full file:px-4 file:py-2 file:border file:border-black file:rounded-lg file:bg-white file:text-black hover:file:bg-gray-100"
              accept="image/*"
              required
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
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black h-32"
            />
        </div>
        <div className="w-full">
  {message && <span className="block text-center text-black mb-1">{message}</span>}
  {erreur && <span className="block text-center text-black mb-1">{erreur}</span>}
</div>
        {/* Bouton de soumission */}
        <div className='flex justify-center' >

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
          Ajouter le produit
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}
