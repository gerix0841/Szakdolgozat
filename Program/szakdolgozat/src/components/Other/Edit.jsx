import React, { useCallback, useEffect,useState } from 'react';
import { useData } from '../../ContextAPI';
import { useNavigate, useParams } from 'react-router-dom';

export function Edit() {
    const navigate = useNavigate();
    const { supplements, machines, additionals, setSupplements, setMachines, setAdditionals } = useData();
    const { itemName } = useParams();
    const [itemData, setItemData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    });

    const findSelectedItem = useCallback((itemName) => {
        let selectedItem = supplements.find(item => item.name === itemName);
        if (!selectedItem) {
            selectedItem = machines.find(item => item.name === itemName);
        }
        if (!selectedItem) {
            selectedItem = additionals.find(item => item.name === itemName);
        }
        return selectedItem;
    }, [ supplements, machines, additionals ]);

    useEffect(() => {
        const selectedItem = findSelectedItem(itemName);

        if(selectedItem){
            setItemData({
                name: selectedItem.name,
                price: selectedItem.price.toString(),
                quantity: selectedItem.quantity.toString(),
                description: selectedItem.description
            });
        }
    }, [findSelectedItem, itemName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const updateItemInCategory = (category, selectedItem) => {
        const updatedCategory = category.map(item => {
            if (item.name === itemName) {
                return {
                    ...item,
                    name: itemData.name,
                    price: Number(itemData.price),
                    quantity: Number(itemData.quantity),
                    description: itemData.description
                };
            }
            return item;
        });

        return updatedCategory;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let updatedSupplements = supplements;
        let updatedMachines = machines;
        let updatedAdditionals = additionals;

        if(findSelectedItem(itemName)) {
            updatedSupplements = updateItemInCategory(supplements, findSelectedItem(itemName));
            setSupplements(updatedSupplements); // Frissítés a kontextusban
        }
        else if(findSelectedItem(itemName)) {
            updatedMachines = updateItemInCategory(machines, findSelectedItem(itemName));
            setMachines(updatedMachines); // Frissítés a kontextusban
        }
        else if(findSelectedItem(itemName)) {
            updatedAdditionals = updateItemInCategory(additionals, findSelectedItem(itemName));
            setAdditionals(updatedAdditionals); // Frissítés a kontextusban
        }

        navigate('/Admin');
    };

    return (
        <>
        <div>
            <h2>{itemName} szerkesztése</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Név:
                <input
                    type="text"
                    name="name"
                    value={itemData.name}
                    onChange={handleChange}
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
                    Ár:
                    <input
                        type="number"
                        name="price"
                        value={itemData.price}
                        onChange={handleChange}
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
                    Darabszám:
                    <input
                        type="number"
                        name="quantity"
                        value={itemData.quantity}
                        onChange={handleChange}
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
                    Leírás:
                    <textarea
                        name="description"
                        value={itemData.description}
                        onChange={handleChange}
                        style={{
                            backgroundColor: 'lightgrey',
                            border: '2px solid red',
                            marginBottom: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            width: '200px',
                            height: '100px'
                          }}
                    />
                </label>
                <br />
                <button type="submit" style={{ marginTop: '20px',color: 'white',backgroundColor: '#cc3333',height: '50px',width: '100px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px' }}>Mentés</button>
            </form>
        </div>
        </>
    );
};
