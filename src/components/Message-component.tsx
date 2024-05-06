import React, { useState } from "react";
import '../styles/reviews.css';

interface MessageReviewsProps {
    sendReviews: (userName: string, reviews: string) => void;
}

const MessageReviews: React.FC<MessageReviewsProps> = ({ sendReviews }) => {
    const [reviews, setReviews] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    const handleReviews = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "user") {
            setUserName(e.target.value);
        } else if (e.target.name === "reviews") {
            setReviews(e.target.value);
        }
    };

    const addReviews = () => {
        if (userName && reviews) {
            sendReviews(userName, reviews);
            reset();
        }
    };

    const reset = () => {
        setUserName("");
        setReviews("");
    }

    return (
        <div className="reviews">
            <div className="card-reviews">
                <input className="form-control" type="text" onChange={handleReviews} name="user" value={userName} placeholder="Enter username" />
                <input type="textarea" onChange={handleReviews} name="reviews" value={reviews} placeholder="Enter comments" />
                <button type="button"
                    disabled={!userName || !reviews}
                    className="btn-add"
                    onClick={addReviews}>Add review</button>
            </div>
        </div>
    );
};

export default MessageReviews;
