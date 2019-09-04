/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import ColoredLine from '../../common/ColoredLine';
import Data from '../../assets/data';
import './MainPage.style.scss';

// eslint-disable-next-line no-undef
const dateSet = new Set();
const properties = [
    "quote-text",
    "quote-source",
    "photo-url-500",
    "photo-caption",
    "link-text",
    "link-description",
    "conversation",
    "audio-caption",
    "regular-title",
    "regular-body"
];
const renderData = [];
let counter = 0;

class MainPage extends Component {
    fetchDatas = () => {
        Data[0].posts.forEach(post => dateSet.add(post.date.substr(0, 16)));
        dateSet.forEach(date => {
            const element = {};
            Data[0].posts.forEach(post => {
                if (post.date.substr(0, 16) === date) {
                    element.date = date;
                    properties.forEach(property => {
                        console.log("property: ", property);
                        if (post.hasOwnProperty(property)) {
                            element[property] = post[property];
                        }
                    });
                    console.log("renderData: ", renderData);
                }
            });
            renderData.push(element);
        });
    }

        ordinalSuffix = (i) => {
            let j = i % 10;
            let k = i % 100;
            if (j === 1 && k !== 11) {
                return i + "ST";
            }
            if (j === 2 && k !== 12) {
                return i + "ND";
            }
            if (j === 3 && k !== 13) {
                return i + "RD";
            }
            return i + "TH";
        }

        render () {
            this.fetchDatas();
            return (
                <React.Fragment>
                    <div className="MainPage_Container">
                        <NavLink
                            to={"/"}
                            id="Home"
                            className="MainPage_Header"
                        >
                        Demo
                        </NavLink>
                        <ColoredLine />
                        {
                            renderData.map((data, index) => {
                                return (
                                    <div className="MainPage_InlineContainer" key={index}>
                                        <div className="MainPage_InlineDate">
                                            <div className="MainPage_Day">
                                                {data.date.substr(0, 3).toUpperCase()}
                                            </div>
                                            <div className="MainPage_Month">
                                                <div>
                                                    {data.date.substr(8, 3)}
                                                </div>
                                                <div>
                                                    {
                                                        `${this.ordinalSuffix(parseInt(data.date.substr(5, 2), 10))}`
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="MainPage_InlineContext">
                                            {
                                                properties.map((property, index) => {
                                                    if (data.hasOwnProperty(property)) {
                                                        return (
                                                            <div>
                                                                {
                                                                    property === 'link-text' ?
                                                                        <div className={`MainPage_${property}`} key={index}>
                                                                            <a href="#" target="_blank">{data[property]}</a>
                                                                            &nbsp;&nbsp;&nbsp;property-türü: {property}
                                                                        </div> :
                                                                        property === 'audio-caption' ?
                                                                            <div className={`MainPage_${property}`} key={index}>
                                                                                <div className="MainPage_Listen">
                                                                                    Listen
                                                                                </div>
                                                                                {ReactHtmlParser(data[property])}
                                                                                &nbsp;&nbsp;&nbsp;&nbsp;property-türü: {property}
                                                                            </div> :
                                                                            (property !== 'photo-url-500' && property !== 'conversation' && property !== 'audio-caption') ?
                                                                                <div className={`MainPage_${property}`} key={index}>
                                                                                    <span>
                                                                                        {property === 'quote-source' ? '— ' : ''}
                                                                                    </span>
                                                                                    {ReactHtmlParser(typeof (data[property]) === 'string' ? data[property] : '')}
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;property-türü: {property}
                                                                                </div> :
                                                                                property === 'conversation' ?
                                                                                    <div className={`MainPage_${property}`} key={index}>
                                                                                        {
                                                                                            data[property].map((item, index) => {
                                                                                                counter++;
                                                                                                return (
                                                                                                    <div
                                                                                                        key={index}
                                                                                                        className={counter % 2 === 0 ? 'conversation_gray' : 'conversation_lightgray'}
                                                                                                    >
                                                                                                        <span
                                                                                                            className={counter % 2 === 0 ? 'conversation_blue' : 'conversation_red'}
                                                                                                        >
                                                                                                            {`${item.name}: `}
                                                                                                        </span>
                                                                                                        <span>
                                                                                                            {item.phrase}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;property-türü: {property}
                                                                                    </div> :
                                                                                    property === 'photo-url-500' ?
                                                                                        <img src={data[property]} className="MainPage_photo-url-500" /> : ''
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className="MainPage_InlineRightmost">
                                            { index === 0 ?
                                                <div>
                                                    <input type="text" />
                                                    <button type="submit" className="MainPage_Button">
                                               Search
                                                    </button>
                                                    <div className="MainPage_RightmostText">
                                           Lorem ipsum dolor
                                                        <br />
                                           sit amet,
                                                        <br />
                                           consectetuer
                                                        <br />
                                           adipiscing elit, sed
                                                        <br />
                                           diam nonummy nibh
                                                        <br />
                                           euismod tincidunt ut
                                                        <br />
                                           laoreet dolore
                                                        <br />
                                           magna aliquam erat
                                                        <br />
                                           volutpat
                                                    </div>
                                                </div> : ''
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </React.Fragment>
            );
        }
}

export default MainPage;
