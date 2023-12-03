import React from 'react'
import moment from "moment"

const Format = () => {

    const timestamp = Date.now();

    // const formattedDate = moment(timestamp).fromNow();
    const formattedDate = moment(timestamp).startOf('minute').fromNow();
    return (
        <>
            <span className="date">
                {formattedDate}
            </span>
        </>
    )
}

export default Format
