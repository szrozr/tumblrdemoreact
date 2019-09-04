import React, { PureComponent } from 'react';

import './ColoredLine.style.scss';

class ColoredLine extends PureComponent {
    render () {
        return (
            <React.Fragment>
                <hr
                    className="ColoredLine"
                />
            </React.Fragment>
        );
    }
}

export default ColoredLine;

