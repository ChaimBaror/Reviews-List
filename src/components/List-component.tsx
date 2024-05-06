// List component
import React, { useEffect, useState } from "react";
import { Review } from "../App";
import Card from "./Card-component";
import '../styles/card.css';

interface Props {
    list: Review[];
    onDelete: (e) => void;
    onEdit: (e) => void;
}

const List: React.FC<Props> = ({ list, onDelete, onEdit }) => {
    const [listItems, setListItems] = useState<Review[]>([]);
    const [editMessage, setEditMessage] = useState(0);

    useEffect(() => {
        setListItems(list);
    }, [list]);

    return (
        <div className="list-container">
            <div className="list-header">
                <h2>Reviews List : {listItems.length}</h2>
            </div>
            <div className="list-row">
                <div className="list-col">
                    {listItems.length > 0 ? (
                        <div>
                            {listItems.map((item) => (
                                <Card
                                    key={item.id}
                                    review={item}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                    editMessage={editMessage}
                                    setEditMessage={setEditMessage}
                                />
                            ))}
                        </div>
                    ) : (
                        "Nothing reviews to show"
                    )}
                </div>
            </div>
        </div>
    );
};

export default List;
