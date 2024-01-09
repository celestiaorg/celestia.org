import React, {useEffect, useRef, useState} from 'react';
import Lottie from "lottie-react";
import lottiAnim from "../anim/anim.json";
import ArrowIcon from "./modules/arrow-icon";
import {ArrowLeft} from "../../.cache/fast-refresh-overlay/helpers/keys";
import {LeftArrow, RightArrow} from "react-multi-carousel/lib/Arrows";

const LottieVersion2 = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [content, setContent] = useState(0);
    const [status, setStatus] = useState('show');
    const lottieRef = useRef();

    function setSegment(direction){
        switch(currentStep){
            case 0:
                return direction === 1 ? [0,122] : [122,0];

            case 1:
                return direction === 1 ? [123,380] : [380,123];

            case 2:
                return direction === 1 ? [381,550] : [550,381];

            case 3:
                return direction === 1 ? [551,698] : [698,551];

            case 4:
                return direction === 1 ? [699,814] : [814,699];

            case 5:
                return direction === 1 ? [815,945] : [945,815];
        }

    }
    function setSegmentReverse(direction){
        switch(currentStep){
            case 1:
                return direction === 1 ? [0,122] : [122,0];

            case 2:
                return direction === 1 ? [123,380] : [380,123];

            case 3:
                return direction === 1 ? [381,550] : [550,381];

            case 4:
                return direction === 1 ? [551,698] : [698,551];

            case 5:
                return direction === 1 ? [699,814] : [814,699];

            case 6:
                return direction === 1 ? [815,945] : [945,815];
        }

    }

    function nextStep(){


        if(currentStep < 6){
            setCurrentStep(prevState => currentStep+1);
        }

        if(currentStep <= 5){
            if(content < 6 ) {
                setStatus('exit');
                setTimeout(function () {
                    setStatus('enter');
                    setContent(prevState => content + 1);
                }, 500, function () {
                    setStatus('show')
                })

                playAnim(1);
            }
        }
    }

    function prevStep(){

        if(currentStep > 1){
            setCurrentStep(prevState => currentStep - 1);
        }

        if(currentStep > 1) {
            if(content >= 1){
                setStatus('exit');
                setTimeout(function(){
                    setStatus('enter');
                    setContent(prevState => content-1);
                },500, function (){
                    setStatus('show')
                })

                playAnim(-1);
            }
        }

    }

    function playAnim(direction){
        //lottieRef.current.setDirection(direction)
        if(direction === -1){
            lottieRef.current.playSegments(setSegmentReverse(direction), true);
        }else{
            lottieRef.current.playSegments(setSegment(direction), true);
        }
    }

    useEffect(() => {
        nextStep();
    }, []);


    return (
        <section>
            <div className={'container'}>
                <div className={'row align-items-center'}>
                    <div className={'col-5'}>

                        <div className={`steps ${status}`}>
                            {content  === 1 && <div id={'step1'}>
                                <h3>Build whatever step 1</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 2 && <div id={'step2'}>
                                <h3>Build whatever step 2</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 3 && <div id={'step3'}>
                                <h3>Build whatever step 3</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 4 && <div id={'step4'}>
                                <h3>Build whatever step 4</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 5 && <div id={'step5'}>
                                <h3>Build whatever step 5</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 6 && <div id={'step6'}>
                                <h3>Build whatever step 6</h3>
                                <p>
                                    Launch a blockchain with leading Ethereum rollup frameworks.
                                </p>

                                <a href="">
                                    <button className={'button button-simple'}>Build modular</button>
                                </a>
                            </div>}
                            {content === 7 && <div id={'step7'}>
                                <h3>7</h3>
                            </div>}
                        </div>

                        <div className={'arrows row mt-5'}>
                            <div className={'col-auto'}>
                                <div
                                    className={
                                        currentStep === 1
                                            ? "button button button-left button-icon disable"
                                            : "button button button-left button-icon"
                                    }
                                    onClick={() => prevStep()}
                                >
                                    <i className={"icon-carousel-left"} aria-label={"next"} />
                                </div>
                            </div>
                            <div className={'col-auto'}>
                                <div
                                    className={
                                        currentStep === 6
                                            ? "button button button-right button-icon disable"
                                            : "button button button-right button-icon"
                                    }
                                    onClick={() => nextStep()}
                                >
                                    <i className={"icon-carousel-right"} aria-label={"next"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-7'}>
                        <Lottie lottieRef={lottieRef} animationData={lottiAnim} loop={false} autoplay={false}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LottieVersion2;