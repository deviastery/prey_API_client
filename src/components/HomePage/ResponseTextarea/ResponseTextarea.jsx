import { getResponse } from '../../../utils/getResponse';

import PropTypes from 'prop-types';
import styles from './ResponseTextarea.module.css';
import { useState, useEffect } from 'react';

const ResponseTextarea = ({ request }) => {
    const [text, setText] = useState('')
    
    useEffect(() => {
        
        if (request) {

            (async () => {
                const res = await getResponse(request);
                if (!(Array.isArray(res))) {
                    let futureText = [];
                    futureText.push(res);
                    setText(futureText);
                    return;
                }
                setText(res);
            })()
        }
        }, [request]);

    return (
        <>
            <textarea name="response" id="" cols="70" rows="30"
                value={Array.isArray(text) ? text.map((item) => {
                    delete item._id;
                    return JSON.stringify(item, null, 4)
                }).join(',\n') : ''}
                readOnly
            >
            </textarea>
        </>
    )
}

ResponseTextarea.propTypes = {
    request: PropTypes.string
}

export default ResponseTextarea;