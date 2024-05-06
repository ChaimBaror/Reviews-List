import React, { useEffect, useState } from 'react';
import './App.css';
import MessageReviews from './components/Message-component';
import List from './components/List-component';

export interface Review {
  id?: number;
  userName: string;
  review: string;
}

function App() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      try {
        setReviewsList(JSON.parse(storedReviews));
      } catch (error) {
        console.error('Error parsing stored reviews:', error);
        setReviewsList([]);
      }
    }
  }, []);

  const handleReviews = (userName: string, review: string) => {
    const newReview: Review = { id: Date.now(), userName, review };
    setReviewsList(prevReviews => [...prevReviews, newReview]);
    localStorage.setItem('reviews', JSON.stringify([...reviewsList, newReview]));
  };

  const onDelete = (id: number) => {
    setReviewsList(prevReviews => prevReviews.filter(review => review.id !== id));
    localStorage.setItem('reviews', JSON.stringify(reviewsList.filter(review => review.id !== id)));
  };

  const onEdit = (review: Review) => {
    console.log("review", review);
    
    setReviewsList(prevReviews => prevReviews.map(r => r.id === review.id ? review : r));
    localStorage.setItem('reviews', JSON.stringify(reviewsList.map(r => r.id === review.id ? review : r)));
  };

  return (
    <div className="App">
      <MessageReviews sendReviews={handleReviews} />
      <List list={reviewsList} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
