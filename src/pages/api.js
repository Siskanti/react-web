import React, { useState, useEffect } from 'react';
import '../../src/App.css';

const Api = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 10));
        } else {
          throw new Error('Data products is not an array.');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        throw new Error('Gagal menghapus produk.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Product successfully updated in the API, update local product state
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === id ? data : product))
        );
      } else {
        throw new Error('Error updating product.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setRating(product.rating);
    setStock(product.stock);
    setBrand(product.brand);
    setCategory(product.category);
    setThumbnail(product.thumbnail);
    setImages(product.images);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    resetForm();
    setIsEditMode(false);
  };

  const handleUpdate = (id) => {
    const updatedProduct = {
      title: title,
      description: description,
      price: price,
      rating: rating,
      stock: stock,
      brand: brand,
      category: category,
      thumbnail: thumbnail,
      images: images,
    };

    updateProduct(id, updatedProduct);
    handleCancelEdit();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setRating(0);
    setStock(0);
    setBrand('');
    setCategory('');
    setThumbnail('');
    setImages([]);
  };

  const addProduct = async (
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images
  ) => {
    const newProduct = {
      title: title,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      rating: rating,
      stock: stock,
      brand: brand,
      category: category,
      thumbnail: thumbnail,
      images: images,
    };

    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Product successfully added to the API, update local product state
        setProducts((prevProducts) => [data, ...prevProducts]);

        // Reset the input fields
        setTitle('');
        setDescription('');
        setPrice(0);
        setRating(0);
        setStock(0);
        setBrand('');
        setCategory('');
        setThumbnail('');
        setImages([]);
      } else {
        throw new Error('Error adding product.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdate(editingProduct.id);
    } else {
      addProduct(
        title,
        description,
        price,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images
      );
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const fileList = Array.from(e.target.files);
    const imagesArray = fileList.map((file) => URL.createObjectURL(file));
    setImages(imagesArray);
  };

  return (
    <div>
 <div className="products-container">
        {products.map((product) => {
          const isEditing = editingProduct && editingProduct.id === product.id;
          return (
            <div className="product-card" key={product.id}>
              <div className="thumbnail">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="title">{product.title}</div>
              <div className="description">{product.description}</div>
              <div className="price">Price: ${product.price}</div>
              <div className="rating">Rating: {product.rating}</div>
              <div className="stock">Stock: {product.stock}</div>
              <div className="brand">Brand: {product.brand}</div>
              <div className="category">Category: {product.category}</div>
              {/* <div className="thumbnail">
                <img src={product.thumbnail} alt={product.title} />
              </div> */}
              {/* <div className="images">
                {product.images.map((image, index) => (
                  <img src={image} alt={product.title} key={index} />
                ))}
              </div> */}
              <div className="button">
                {isEditing ? (
                  <>
                    <button onClick={() => handleUpdate(product.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product)}>Edit</button>
                )}
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="add-product-container">
        <form id="frmsubmit" onSubmit={handleSubmit}>
          <h2><b><u>ADD PRODUCT</u></b></h2>
          
          <label>Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Description</label>
          <textarea
            name=""
            className="form-control"
            id="description"
            cols="10"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <label>Price</label>
          <input
            id="price"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <br />
          {/* <label>Discount Percentage</label>
          <input
            id="discountPercentage"
            type="number"
            className="form-control"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
          />
          <br /> */}
          <label>Rating</label>
          <input
            id="rating"
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
          />
          <br />
          <label>Stock</label>
          <input
            id="stock"
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
          <br />
          <label>Brand</label>
          <input
            id="brand"
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <br />
          <label>Category</label>
          <input
            id="category"
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label>Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {thumbnail && (
            <div className="thumbnail-preview">
              <img src={thumbnail} alt="Thumbnail Preview" />
            </div>
          )}
          <br />
          <label>Images</label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
          />
          {images.length > 0 && (
            <div className="images-preview">
              {images.map((image, index) => (
                <img src={image} alt={`${index}`} key={index} />
              ))}
            </div>
          )}
          <button type="submit">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Api;