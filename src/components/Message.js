import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt=null,
    text='',
    displayName='',
    photoURL='',
}) => {
    return <div>
        {
            photoURL? (
                <img src={photoURL} alt='photo de profil' width='50' height='50'/>
            ) : null
        }
        {displayName ? <p>{displayName}</p> : null}
        {createdAt ? (<span>
            {formatRelative (new Date(createdAt.seconds * 1000), new Date() )}
        </span>) : null}
        <p>{text}</p>
    </div>
}

export default Message;
