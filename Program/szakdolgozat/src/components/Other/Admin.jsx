import React from 'react';
import { useData } from '../../ContextAPI';
import { useNavigate } from 'react-router-dom';

export function Admin() {
    const navigate = useNavigate();
    const { supplements, machines, additionals, setSupplements, setMachines, setAdditionals } = useData();

    const handleDelete = (type, index, itemName) => {
        let newData = [];

        switch (type) {
            case 'Supplements':
                newData = [...supplements];
                newData.splice(index, 1);
                setSupplements(newData);
                break;
            case 'Machines':
                newData = [...machines];
                newData.splice(index, 1);
                setMachines(newData);
                break;
            case 'Additionals':
                newData = [...additionals];
                newData.splice(index, 1);
                setAdditionals(newData);
                break;
            default:
                break;
        }
    };

    const buttonStyle = {
        color: 'white',
        backgroundColor: '#cc3333',
        height: '50px',
        width: '100px',
        fontSize: '20px',
        border: '3px solid white',
        borderRadius: '10px',
        margin: '10px',
    };

    return (
        <>
            <div>
                <h2>Admin oldal</h2>
                <button onClick={() => navigate('/AddItem')} style={{ ...buttonStyle, width: '150px', height: '60px' }}>Új termék hozzáadása</button>
                <div style={{ marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '30px', margin: '10px' }}>Táplálékkiegészítők</h3>
                        <ul>
                            {supplements.map((item, index) => (
                                <li key={index} style={{ fontSize: '25px', margin: '10px' }}>
                                    {item.name}
                                    <div>
                                        <button onClick={() => handleDelete('Supplements', index, item.name)} style={buttonStyle}>
                                            Törlés
                                        </button>
                                        <button onClick={() => navigate(`/Edit/${item.name}`)} style={{ ...buttonStyle, width: '150px' }}>
                                            Szerkesztés
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '30px', margin: '10px' }}>Gépek</h3>
                        <ul>
                            {machines.map((item, index) => (
                                <li key={index} style={{ fontSize: '25px', margin: '10px' }}>
                                    {item.name}
                                    <div>
                                        <button onClick={() => handleDelete('Machines', index, item.name)} style={buttonStyle}>
                                            Törlés
                                        </button>
                                        <button onClick={() => navigate(`/Edit/${item.name}`)} style={{ ...buttonStyle, width: '150px' }}>
                                            Szerkesztés
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '30px', margin: '10px' }}>Kiegészítők</h3>
                        <ul>
                            {additionals.map((item, index) => (
                                <li key={index} style={{ fontSize: '25px', margin: '10px' }}>
                                    {item.name}
                                    <div>
                                        <button onClick={() => handleDelete('Additionals', index, item.name)} style={buttonStyle}>
                                            Törlés
                                        </button>
                                        <button onClick={() => navigate(`/Edit/${item.name}`)} style={{ ...buttonStyle, width: '150px' }}>
                                            Szerkesztés
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
