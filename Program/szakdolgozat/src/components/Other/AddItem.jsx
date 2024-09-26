import React, { useState } from 'react';
import { useData } from '../../ContextAPI';

export function AddItem() {
    const { supplements, setSupplements, machines, setMachines, additionals, setAdditionals } = useData();

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemType, setItemType] = useState('Supplement');

    const handleAddItem = () => {
        const newItem = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            description: itemDescription,
            img: ''
        };

        if(itemName && itemPrice && itemQuantity && itemDescription){
            switch (itemType) {
                case 'Supplement':
                    setSupplements([...supplements, newItem]);
                    break;
                case 'Machine':
                    setMachines([...machines, newItem]);
                    break;
                case 'Additional':
                    setAdditionals([...additionals, newItem]);
                    break;
                default:
                    break;
            }
    
            setItemName('');
            setItemPrice('');
            setItemQuantity('');
            setItemDescription('');
            setItemType('Supplement');

            alert('Az új termék hozzáadásra került!')
        }
    };

    return (
        <>
        <div>
            <h2>Új termék hozzáadása</h2>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddItem();
                }}>
                    <label>
                        Termék neve:
                        <input type="text" value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                          }}
                        />
                    </label>
                    <br />
                    <label>
                        Termék ára:
                        <input type="number" value={itemPrice} 
                        onChange={(e) => setItemPrice(e.target.value)}
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                          }}
                        />
                    </label>
                    <br />
                    <label>
                        Termék darabszáma:
                        <input type="number" value={itemQuantity} 
                        onChange={(e) => setItemQuantity(e.target.value)}
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                          }}
                        />
                    </label>
                    <br />
                    <label>
                        Termék leírása:
                        <textarea type="text" value={itemDescription} 
                        onChange={(e) => setItemDescription(e.target.value)} 
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            marginLeft: '10px'
                          }}
                        />
                    </label>
                    <br />
                    <label>
                        Termék típusa:
                        <select value={itemType} 
                        onChange={(e) => setItemType(e.target.value)}
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            marginLeft: '10px'
                          }}
                        >
                            <option value="Supplement">Supplement</option>
                            <option value="Machine">Machine</option>
                            <option value="Additional">Additional</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit" style={{ marginTop: '20px',color: 'white',backgroundColor: '#cc3333',height: '50px',width: '150px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px' }}>Hozzáadás</button>
                </form>
        </div>
        </>
    );
};
