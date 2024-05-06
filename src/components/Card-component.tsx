// Card component
import React, { useEffect, useState } from "react";
import { Review } from "../App";
import '../styles/card.css';
import imgGen from '@dudadev/random-img';
import EditMessage from "./Edit-card-components";

interface CardProps {
    review: Review;
    onDelete: (e) => void;
    onEdit: (e: Review) => void;
    editMessage: number;
    setEditMessage: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ review, onDelete, onEdit, editMessage, setEditMessage }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    useEffect(() => {
        generateAvatar();
    }, []);

    const handleEdit = () => {
        if (review.id) {
            setEditMessage(review.id);
        }
    }

    const generateAvatar = () => {
        imgGen({ gender: 'men', id: review.id }).then(avatarURL => {
            setAvatarURL(avatarURL);
        }).catch(error => {
            console.error('Error generating avatar:', error);
        });
    }

    useEffect(() => {
        setEditMessage(0);
    },[onEdit])

    return (
        <div className="card-container">
            <div className="card-row">
                <div className="card-col">
                    <div className="card">
                        <div className="card-info">
                            <div className="avatar-comment"> {/* Wrap the avatar with this div and apply the class name */}
                                <img src={avatarURL ? avatarURL : ''} alt="user-avatar" />
                            </div>
                            <div className="buttons">
                                <button onClick={() => onDelete(review.id)}>Delete</button>
                                <button onClick={handleEdit}>Edit</button>
                            </div>
                            {editMessage === review.id ? <EditMessage key={review.id} review={review} onEdit={onEdit} 
                            reset={() => setEditMessage(0)} /> :
                                <div key={review.id}>
                                    <span>user : {review.userName}</span>
                                    <div>
                                        text : {review.review}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
