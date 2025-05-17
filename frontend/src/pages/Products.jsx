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
      image: null,
      category: '',
      sizes: [] // Liste d'objets { size: 'M', quantity: 10 }
    });
  const categories = ['Vêtements', 'Chaussures', 'Accessoires', 'Équipement'];
  const sizeees = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErreur(null);
  
    const { name, description, price, image, category, sizes } = formData;
  
    if (!sizes.length) {
      setErreur("Veuillez sélectionner au moins une taille avec sa quantité.");
      return;
    }
  
    try {
      for (const s of sizes) {
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('category', category);
        data.append('image', image);
        data.append('size', s.size);
        data.append('quantity', s.quantity);
  
        const response = await api.post('/api/products', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log(`Produit ajouté pour taille ${s.size}:`, response.data);
      }
  
      setMessage("Produit(s) ajouté(s) avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout des produits:", error);
      setErreur("Une erreur s'est produite lors de l'ajout.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
    }));
};
const handleSizeChange = (size) => {
  setFormData(prev => {
    const exists = prev.sizes.find(s => s.size === size);
    if (exists) {
      return {
        ...prev,
        sizes: prev.sizes.filter(s => s.size !== size) // décocher = supprimer
      };
    } else {
      return {
        ...prev,
        sizes: [...prev.sizes, { size, quantity: 1 }] // cocher = ajouter avec quantité 1 par défaut
      };
    }
  });
};

const handleQuantityChange = (size, quantity) => {
  setFormData(prev => ({
    ...prev,
    sizes: prev.sizes.map(s =>
      s.size === size ? { ...s, quantity: Number(quantity) } : s
    )
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
        {/* Tailles et Quantités */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-black mb-2">
    Tailles et Quantités
  </label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {sizeees.map(size => {
      const selected = formData.sizes.find(s => s.size === size);
      return (
        <div key={size} className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={!!selected}
            onChange={() => handleSizeChange(size)}
            className="h-4 w-4"
          />
          <span className="w-10">{size}</span>
          {selected && (
            <input
              type="number"
              min={0}
              value={selected.quantity}
              onChange={(e) => handleQuantityChange(size, e.target.value)}
              className="w-24 px-2 py-1 border border-black rounded"
              placeholder="Quantité"
              required
            />
          )}
        </div>
      );
    })}
  </div>
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
