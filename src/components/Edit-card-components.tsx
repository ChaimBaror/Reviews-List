import React, { useState } from "react";
import '../styles/reviews.css'
import { Review } from "../App";

interface MessageReviewsProps {
    onEdit: (e: Review) => void;
    review: Review,
    reset: () => void
}

const EditMessage: React.FC<MessageReviewsProps> = ({ review, onEdit, reset }) => {
    const [reviews, setReviews] = useState<string>(review.review);
    const [userName, setUserName] = useState<string>(review.userName);

    const handleReviews = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "user") {
            setUserName(e.target.value);
        } else if (e.target.name === "reviews") {
            setReviews(e.target.value);
        }
    };

    const addReviews = () => {
        if (userName && reviews) {
            onEdit({ id: review.id, userName: userName, review: reviews });
            reset();
        }
    };


    return (
        <div className="reviews-edit">
            <label>User : 
            <input
                className="form-control"
                type="text"
                onChange={handleReviews}
                name="user"
                value={userName}
                placeholder="Enter username"
            /></label>
            <label>Comment : 
            <input
                type="textarea"
                onChange={handleReviews}
                name="reviews"
                value={reviews}
                placeholder="Enter comments"
            /></label>
            <button type="button"
                disabled={!userName || !reviews}
                className="btn-add btn-edit"
                onClick={addReviews}>
                Edit review
            </button>
            <div className="close" onClick={reset}>close</div>

        </div>
    );
};

export default EditMessage;
