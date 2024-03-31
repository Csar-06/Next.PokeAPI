import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div>
            <ReactLoading type={'bubbles'} color={'#f33907'} height={100} width={100} />
        </div>
    );
}

export default Loading;
