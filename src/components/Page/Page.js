import React from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';

const Page = (props) => {
    return (
        <div
            ref={props.ref}
        >
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            {props.children}
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;
