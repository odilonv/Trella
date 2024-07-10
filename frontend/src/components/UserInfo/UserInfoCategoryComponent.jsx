import React from 'react';

function UserInfoCategoryComponent({ entryLabel, icon }) {
    const handleClick = () => {
        const anchor = document.getElementById(entryLabel);
        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth" });
        }
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        if (entryLabel === 'Préférences') {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            document.querySelector("#root").scrollBy(0, -0.202 * vh);
        }
    };

    return (
        <div className="user-category" onClick={handleClick}>
            {icon}
            <div className="user-category-label">{entryLabel}</div>
        </div>
    );
}

export default UserInfoCategoryComponent;