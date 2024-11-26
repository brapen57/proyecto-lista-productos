import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import ProductItem from './ProductItem';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebaseConfig';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.description) newErrors.description = 'La descripción es obligatoria';
    else if (formData.description.length < 10)
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const docRef = await addDoc(collection(db, 'products'), formData);
      setProducts((prev) => [...prev, { id: docRef.id, ...formData }]);
      setFormData({ name: '', description: '' });
      setErrors({});
      console.log('Producto guardado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      alert('Hubo un problema al guardar el producto.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Productos</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre del Producto:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-danger mt-1">{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p className="text-danger mt-1">{errors.description}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Agregar Producto</button>
      </form>

      <h2 className="text-center mt-5">Lista de Productos</h2>
      <ul className="list-group">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Usuario autenticado:', result.user);
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
  }
};

<button className="btn btn-secondary mb-3" onClick={loginWithGoogle}>
  Iniciar sesión con Google
</button>

const handleFileUpload = async (file) => {
  const storageRef = ref(storage, `products/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    console.log('Archivo subido:', file.name);
  } catch (error) {
    console.error('Error al subir archivo:', error);
  }
};

<div className="mb-3">
  <label htmlFor="file" className="form-label">Subir Imagen:</label>
  <input
    type="file"
    className="form-control"
    id="file"
    onChange={(e) => handleFileUpload(e.target.files[0])}
  />
</div>

export default ProductList;