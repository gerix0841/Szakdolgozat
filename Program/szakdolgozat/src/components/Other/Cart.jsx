import React, { useContext } from 'react';
import { DataContext } from '../../ContextAPI';
import { useNavigate } from 'react-router-dom';

export function Cart() {
  const navigate = useNavigate();
  const { cartItems, supplements, machines, additionals, setCartItems, loggedIn } = useContext(DataContext);

  //Ár kiszámítása
  const getPriceByName = (itemName) => {
    const allProducts = [...supplements, ...machines, ...additionals];
    const product = allProducts.find((item) => item.name === itemName);
    return product ? product.price : 0;
  };

  const totalAmount = Object.keys(cartItems).reduce((total, itemName) => {
    const pricePerItem = getPriceByName(itemName);
    const quantity = cartItems[itemName];
    return total + pricePerItem * quantity;
  }, 0);

  //Termék eltávolítása
  const removeFromCart = (itemName) => {
    const updatedCart = { ...cartItems };

    if (updatedCart[itemName] > 0) {
      updatedCart[itemName]--;

      setCartItems(updatedCart);
    }
  };

  //Fizetés
  const handlePayment = (e) => {
    if (Object.keys(cartItems).length === 0) {
      alert('A kosár üres!');
    }
    else if(!loggedIn) {
      alert('Először be kell jelentkezned!');
    }
    else {
      navigate(`/pay`);
    }
  };

    return (
      <>
        <h2>Kosár</h2>
        <div>
          <p style={{ color: 'red', fontSize: '35px' }}>Összes ár: {totalAmount} Ft</p>
          <button onClick={handlePayment} style={{ color: 'white',backgroundColor: '#cc3333',height: '50px',width: '100px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px' }}>Fizetés</button>
          <ol style={{ fontSize:"40px" }}>
            {Object.keys(cartItems).map((itemName, index) => (
                <li key={index}>
                    {itemName} - {cartItems[itemName]} db
                    <button onClick={() => removeFromCart(itemName)} style={{ color: 'white',backgroundColor: '#cc3333',height: '50px',width: '150px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px' }}>Visszavonás</button>
                </li>
            ))}
          </ol>
        </div>
      </>

      );
};
