import React, { Fragment } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';

function Confeti() {
    const { width, height } = useWindowSize();
    console.log(useWindowSize())
    return (
        <Confetti
            width={width > 1000 ? width-100 : width}
            height={height}
        />
    )
}

export default Confeti
