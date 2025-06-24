import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faReply,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import './Comment.css';
import Avatar from "../Avatar";

const Comment = ({ comment, level = 0 }) => {
    const { name, message, response = [], time = "now" } = comment;

    return (
        <div className="comment" style={{ marginLeft: `${level * 24}px` }}>
            <Avatar name="Mochamad Irfani" />
            <div className="comment-content">
            <div className="comment-name">{name}</div>
            <div className="comment-time">{time}</div>
            <div className="comment-message" dangerouslySetInnerHTML={{ __html: message }}></div> 
            <div className="comment-actions">
                <FontAwesomeIcon icon={faReply} title="Reply" />
                <FontAwesomeIcon icon={faPenToSquare} title="Edit" />
            </div>
    
            {response.length > 0 && (
                <div className="comment-replies">
                {response.map((reply) => (
                    <Comment key={reply.id} comment={reply} level={level + 1} />
                ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Comment;
