import React, { useState } from 'react';
import { useData } from '../../ContextAPI';

export function Machines() {
  const { machines, cartItems, setCartItems } = useData();
  const [error, setError] = useState(null);

  const getImagePath = (imageName) => {
    return require(`../../resource/machines/${imageName}`);
  };

  const addToCart = (itemName) => {
    //Item kiválasztása
    const selectedItem = machines.find(item => item.name === itemName);

    //Kosárhoz adás
    const updatedCart = { ...cartItems };

    if(selectedItem && (!updatedCart[itemName] || updatedCart[itemName] < selectedItem.quantity) && selectedItem.quantity > 0){
        updatedCart[itemName] = (updatedCart[itemName] || 0) + 1;
        setCartItems(updatedCart);
    }
    else if (selectedItem && updatedCart[itemName] >= selectedItem.quantity){
        setError(`A "${itemName}" elfogyott`);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

    return (
    <>
    <h2 style={{ fontSize: '50px' }}>Gépek</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {machines.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '20px',
              marginRight: '20px',
              width: '800px',
              padding: '10px',
            }}
          >
            <img
              key={index}
              src={getImagePath(item.img)}
              alt={item.name}
              style={{ width: '350px', marginRight: '20px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '30px', marginTop: '0' }}>{item.name}</h3>
                <p style={{ color: 'red', marginBottom: '5px' }}>Ár: {item.price} Ft</p>
                <p style={{ fontSize: '20px', marginBottom: '5px' }}>Darabszám: {item.quantity} db</p>
                <p>{item.description}</p>
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                <button
                  onClick={() => addToCart(item.name)}
                  style={{
                    color: 'white',
                    backgroundColor: '#cc3333',
                    height: '50px',
                    width: '100px',
                    fontSize: '20px',
                    border: '3px solid white',
                    borderRadius: '10px',
                  }}
                >
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    {error && (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: 'grey', zIndex: '999', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={handleCloseError}>Bezárás</button>
      </div>
    )}
    </>
      );
};
