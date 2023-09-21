import React from 'react';

const BackButton = () => {
    const handleGoBack = () => {
    window.history.back();
    };

    return (
        <button
            onClick={handleGoBack}
            style={{width: "67px", margin: "5px 5px 5px 7px"}}
            className="heightNorm"
        >
            Back
        </button>
    );
};

export default BackButton;
