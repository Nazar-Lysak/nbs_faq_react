import React, { useState } from "react";
import parse from 'html-react-parser';

const Accordion = ({ list }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            {list && list.length > 0 && (
                <ul className="faq-list">
                    {list.map((item, index) => (
                        <li key={index} className={`faq-list-item ${openIndex === index ? 'is-open' : ''}`}>
                            <button 
                                className="faq-question"
                                onClick={() => toggleItem(index)}
                            >
                                <h3>{parse(item.subtitle)}</h3>
                                <span className="faq-icon"/>
                            </button>
                            <div className="faq-answer">
                                {parse(item.body)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Accordion;