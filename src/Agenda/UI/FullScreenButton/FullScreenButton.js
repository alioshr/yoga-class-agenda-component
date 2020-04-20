import React, { useState, useEffect } from "react";
import classes from "./FullScreenButton.module.css";

export default function FullScreenButton(props) {
    const [fullScreen, setFullScreen] = useState(false);
    const [boxLeftTop, setBoxLeftTop] = useState();
    const [boxLeftBottom, setBoxLeftBottom] = useState();
    const [boxRightTop, setBoxRightTop] = useState();
    const [boxRightBottom, setBoxRightBottom] = useState();

    const fullScreenToggleHandler = () => {
        setFullScreen(!fullScreen);
        props.callbackFullScreen(!fullScreen);
    };

    useEffect(() => {
        if (fullScreen) {
            setBoxLeftTop(classes.BoxLeftTopOnFullScreen);
            setBoxLeftBottom(classes.BoxLeftBottomOnFullScreen);
            setBoxRightTop(classes.BoxRightTopOnFullScreen);
            setBoxRightBottom(classes.BoxRightBottomOnFullScreen);
        }
        if (!fullScreen) {
            setBoxLeftTop(classes.BoxLeftTopOffFullScreen);
            setBoxLeftBottom(classes.BoxLeftBottomOffFullScreen);
            setBoxRightTop(classes.BoxRightTopOffFullScreen);
            setBoxRightBottom(classes.BoxRightBottomOffFullScreen);
        }
    }, [fullScreen]);

    return (
        <div className={classes.ButtonWrapper} onClick={fullScreenToggleHandler}>
            <div className={boxLeftTop} />
            <div className={boxLeftBottom} />
            <div className={boxRightTop} />
            <div className={boxRightBottom} />
        </div>
    );
}
