// import React, { useState } from 'react';

// import {
//     Field,
//     SmallField,
//     SmallSelect
// } from "../../lib/style/generalStyles"

// const AutocompleteInput = ({ options, onSelect }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');

//     const filteredOptions = options.filter((option) =>
//         option.toLowerCase().includes(inputValue.toLowerCase())
//     );

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//         setIsOpen(true);
//     };

//     const handleSelectOption = (option) => {
//         setInputValue(option);
//         setIsOpen(false);
//         setSelectedOption(option);
//         onSelect(option);
//     };

//     const handleBlur = () => {
//         setIsOpen(false);
//     };

//     return (
//         <div style={{ position: "relative" }}>
//             <SmallField
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onFocus={() => setIsOpen(true)}
//                 onBlur={handleBlur}
//                 placeholder="Search for a category"
//             // style={{ position: "absolute", zIndex: "1" }}
//             />
//             <SmallSelect
//             // style={{ position: "absolute" }}

//             >
//                 {filteredOptions.map((option, index) => (
//                     <option
//                         key={index}
//                         onClick={() => handleSelectOption(option)}
//                         className={option === selectedOption ? 'selected' : ''}
//                     >
//                         {option}
//                     </option>
//                 ))}
//             </SmallSelect>
//         </div>
//     );
// };

// export default AutocompleteInput;


import React, { useState, useEffect, useRef } from 'react';

import {
    Field,
    SmallField,
    SmallSelect
} from "../../lib/style/generalStyles"

const AutocompleteInput = ({ options, onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isSelectActive, setIsSelectActive] = useState(false);
    const fieldRef = useRef(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsOpen(true);
    };

    const handleSelectOption = (option) => {
        setInputValue(option);
        setIsOpen(false);
        setSelectedOption(option);
        onSelect(option);
    };

    const handleBlur = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (fieldRef.current && !fieldRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsSelectActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFieldClick = () => {
        setIsSelectActive(true);
        setIsOpen(true);
    };

    return (
        <div style={{ position: "relative" }}>
            <SmallField
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={fieldRef}
                placeholder="Search for a category"
                onClick={handleFieldClick}
            />
            <SmallSelect className={isSelectActive ? 'active' : ''}>
                {filteredOptions.map((option, index) => (
                    <option
                        key={index}
                        onClick={() => handleSelectOption(option)}
                        className={option === selectedOption ? 'selected' : ''}
                    >
                        {option}
                    </option>
                ))}
            </SmallSelect>
            <select autoFocus accessKey='a'>
                {filteredOptions.map((option, index) => (
                    <option

                        key={index}
                        onClick={() => handleSelectOption(option)}
                        className={option === selectedOption ? 'selected' : ''}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AutocompleteInput;
