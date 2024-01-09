import React from 'react';
import Lottie from "lottie-react";
import lottiAnim from "../anim/anim.json";

const LottieVersion1 = () => {
    return (
        <section>
            <div className={'container'}>
                <div className={'row align-items-center'}>
                    <div className={'col-6'}>
                        <h3>Build whatever</h3>
                        <p>
                            Launch a blockchain with leading Ethereum rollup frameworks.
                        </p>

                        <a href="">
                            <button className={'button button-simple'}>Build modular</button>
                        </a>
                    </div>
                    <div className={'col-6'}>
                        <Lottie animationData={lottiAnim} loop={false} autoplay={true}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LottieVersion1;