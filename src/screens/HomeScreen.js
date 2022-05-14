import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export default function HomeScreen({ isAuth }) {
    const [postList, setPostList] = useState([]);
    const postCollectionRef = collection(db, 'Datas');

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            setPostList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getPosts();
    });

    const deletePost = async (id) => {
        const postDoc = doc(db, 'Datas', id);
        await deleteDoc(postDoc);
    };

    return (
        <div className="homePage">
            {postList.map((post) => {
                return (
                    <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1>{post.name}</h1>
                            </div>
                            <div className="deletePost">
                                {isAuth &&
                                    post.author.id === auth.currentUser.uid && (
                                        <button
                                            onClick={() => {
                                                deletePost(post.id);
                                            }}
                                        >
                                            x
                                        </button>
                                    )}
                            </div>
                        </div>
                        <div className="postTextContainer">
                            Standard : {post.standard}
                        </div>
                        <div className="postTextContainer">
                            Section : {post.section}
                        </div>
                        <div className="postTextContainer">
                            Fee : {post.fee}
                        </div>
                        <h5>@Students Data Added by - {post.author.name}</h5>
                    </div>
                );
            })}
        </div>
    );
}
