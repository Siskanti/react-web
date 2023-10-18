import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../../src/App.css';
import React, { useState, useEffect } from 'react';


function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

	return (
    <div>

		<header>
			<h3>SiskaShop</h3>
			<nav ref={navRef}>
				<a href="/toko">Home</a>
				<a href="/detailtoko">Detail Toko</a>
				<a href="/api">API</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
        {/* <a href="/login">Login</a> */}
			</nav>

      
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
    <div className='container'>
      
    
      </div>
       <div className="products-container">
        {products.map((product) => {
          if (product.isDeleted) {
            return null; // Skip deleted products
          }

          return (

            
            <div className="product-card" key={product.id}>
               <div className="thumbnail">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="title">{product.title}</div>
              <div className="price">IDR {product.price},000</div>
            
             
             

              {/* <div className="button">
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </div> */}
            </div>
            
          );
        })}
      </div>
    </div>
    
	);
}

export default Navbar;