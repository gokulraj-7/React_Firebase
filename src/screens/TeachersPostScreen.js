import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function TeachersPostScreen({ isAuth }) {
    const [name, setName] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');

    const postCollectionRef = collection(db, 'Teachers-Datas');
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postCollectionRef, {
            name,
            qualification,
            experience,
            salary,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
        });
        navigate('/teacherpostshow');
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
                    <lable>Staff Name: </lable>
                    <input
                        placeholder="Name...!"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Qualification:</label>
                    <input
                        placeholder="Qualification...!"
                        onChange={(event) => {
                            setQualification(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Experience:</label>
                    <input
                        placeholder="Experience...!"
                        onChange={(event) => {
                            setExperience(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Salary:</label>
                    <input
                        placeholder="Salary...! "
                        onChange={(event) => {
                            setSalary(event.target.value);
                        }}
                    />
                </div>

                <button onClick={createPost}>Sumbit</button>
            </div>
        </div>
    );
}
