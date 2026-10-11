import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop", description: "Calming scent.", cost: "$18" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729800077-ac55601b1231?q=80&w=1000&auto=format&fit=crop", description: "Sweet floral fragrance.", cost: "$20" }
      ]
    }
  ];

  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div onClick={() => setShowCart(true)} style={{ cursor: 'pointer', fontSize: '20px' }}>
          🛒 Cart ({calculateTotalQuantity()})
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, pIndex) => {
                  const isInCart = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={pIndex} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '200px' }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p><strong>{plant.cost}</strong></p>
                      <button 
                        disabled={isInCart}
                        onClick={() => handleAddToCart(plant)}
                        style={{ backgroundColor: isInCart ? '#ccc' : '#4CAF50', color: 'white', border: 'none', padding: '8px 12px', cursor: isInCart ? 'not-allowed' : 'pointer' }}
                      >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
