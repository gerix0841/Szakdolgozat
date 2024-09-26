import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../ContextAPI';

export function Pay() {
    const navigate = useNavigate();
    const { cartItems, setCartItems, supplements, machines, additionals, setSupplements, setMachines, setAdditionals } = useContext(DataContext);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [address, setAddress] = useState('');

    const handleSuccessfulPurchase = () => {
      //Összes elem eltávolítása a kosárból
      setCartItems({});

      //Termékek mennyiségének csökkentése
      Object.keys(cartItems).forEach((itemName) => {
        const item = findItem(itemName);
        if (item) {
          const updatedItem = { ...item };
          updatedItem.quantity -= cartItems[itemName];
          updateItem(updatedItem);
        }
      });

      navigate('/');
      alert('Köszönjük vásárlását!');
    };

    const findItem = (itemName) => {
      const allItems = [...supplements, ...machines, ...additionals];
      return allItems.find((item) => item.name === itemName);
    };

    const updateItem = (updatedItem) => {
      const updatedSupplements = supplements.map((item) => (item.name === updatedItem.name ? updatedItem : item));
      const updatedMachines = machines.map((item) => (item.name === updatedItem.name ? updatedItem : item));
      const updatedAdditionals = additionals.map((item) => (item.name === updatedItem.name ? updatedItem : item));

      setSupplements(updatedSupplements);
      setMachines(updatedMachines);
      setAdditionals(updatedAdditionals);
    };

    const isCardNameValid = (cardName) => {
      //Csak betűk
      return /[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű]/.test(cardName) && /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű\s]+$/.test(cardName);
    };

    const isCardNumberValid = (cardNumber) => {
      //16 számjegy
      return /^[0-9]{16}$/.test(cardNumber);
    };

    const isExpirationDateValid = (expirationDate) => {
      //4 egymás követő szám,helyes hónap/nap
      return /^(0[1-9]|1[0-2])([0-9]{2})$/.test(expirationDate);
    };

    const isCVVValid = (cvv) => {
      //3 számjegy
      return /^[0-9]{3}$/.test(cvv);
    };

    const isAddressValid = (address) => {
      //Betűk,pont,számok
      return /[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű0-9]/.test(address) && /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű0-9.\s]+$/.test(address);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      //Sikeres fizetés
      if (isCardNameValid(cardName) && isCardNumberValid(cardNumber) && isExpirationDateValid(expirationDate) && isCVVValid(cvv) && isAddressValid(address)) {
        handleSuccessfulPurchase();
      } else {
        //Nincs minden mező kitöltve
        alert('Kérlek, tölts ki minden mezőt helyesen!');

        if(!isCardNameValid(cardName)) {
          setCardName('');
        }
        if(!isCardNumberValid(cardNumber)) {
          setCardNumber('');
        }
        if(!isExpirationDateValid(expirationDate)) {
          setExpirationDate('');
        }
        if(!isCVVValid(cvv)) {
          setCVV('');
        }
        if(!isAddressValid(address)) {
          setAddress('');
        }
      }
    };

    return (
      <>
        <h2>Fizetés</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Kártyán szereplő név:
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            style={{
              backgroundColor: 'lightgrey',
              border: '2px solid red',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        </label>
        <br></br>
        <label>
          Bankkártya száma:
          <input
            type="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{
              backgroundColor: 'lightgrey',
              border: '2px solid red',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        </label>
        <br></br>
        <label>
          Lejárati dátum:
          <input
            type="number"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            style={{
              backgroundColor: 'lightgrey',
              border: '2px solid red',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        </label>
        <br></br>
        <label>
          CVV:
          <input
            type="number"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            style={{
              backgroundColor: 'lightgrey',
              border: '2px solid red',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        </label>
        <br></br>
        <label>
          Szállítási cím:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              backgroundColor: 'lightgrey',
              border: '2px solid red',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
          ></input>
        </label>
        <br></br>
        <br></br>
        <button type="submit" style={{ color: 'white',backgroundColor: '#cc3333',height: '50px',width: '100px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px' }}>Fizetés</button>
      </form>
      </>

      );
};
