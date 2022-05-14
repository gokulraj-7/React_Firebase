import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function PostScreen({ isAuth }) {
    const [name, setName] = useState('');
    const [standard, setStandard] = useState('');
    const [section, setSection] = useState('');
    const [fee, setFee] = useState('');

    const postCollectionRef = collection(db, 'Datas');
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionRef, {
            name,
            standard,
            section,
            fee,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
        });
        navigate('/');
    };

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Add Data</h1>
                <div className="inputGp">
                    <lable>Student Name: </lable>
                    <input
                        placeholder="Name...!"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Standard:</label>
                    <input
                        placeholder="Standard...!"
                        onChange={(event) => {
                            setStandard(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Section:</label>
                    <input
                        placeholder="Section...!"
                        onChange={(event) => {
                            setSection(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Fee:</label>
                    <input
                        placeholder="PAID or NOT-PAID "
                        onChange={(event) => {
                            setFee(event.target.value);
                        }}
                    />
                </div>

                <button onClick={createPost}>Sumbit</button>
            </div>
        </div>
    );
}
