import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import config from '../_helpers/config';
import CommentForm from './CommentForm';
import ErrorBoundary from './ErrorBoundary';

export default function App() {


    return (
        <>
            <div className="h-screen bg-gradient-to-br from-pink-50 to-indigo-100 grid place-items-center">
                <div className="w-6/12 mx-auto rounded border">
                    <CommentForm />
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

