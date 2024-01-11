import React from 'react';
import lottiAnim1 from "../anim/anim-p1.json";
import lottiAnim2 from "../anim/anim-p2.json";
import TwoColumnH2 from "./sections/two-column-h2";

const LottieVersion3 = () => {
    return (
        <div className={'container'}>
            <TwoColumnH2
                direction={"ltr"}
                title={"Access abundance"}
                text={`
								<p>Tap into the abundant throughput enabled by <a href='https://celestia.org/what-is-celestia/#what-is-data-availability-sampling' target='_blank' rel='noopener noreferrer'>Data Availability Sampling (DAS)</a>, the first architecture that securely scales with the number of users.</p>
								<p>Anyone can directly verify and contribute to Celestia by <a href='https://celestia.org/run-a-light-node/' target='_blank' rel='noopener noreferrer'>running a light node</a>.</p>
							`}
                image={"graph-scale.png"}
                buttonPrimaryTitle={"Learn Celestia"}
                buttonPrimaryUrl={"/what-is-celestia/"}
                anim={lottiAnim1}
            />
            <TwoColumnH2
                direction={"rtl"}
                title={"Build whatever"}
                text={`
								<p>Deploy fast. Launch a blockchain with leading Ethereum rollup frameworks or transform nearly any VM into your own sovereign chain.</p>
								<p>With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.</p>
							`}
                image={"graph-ecosystem.png"}
                buttonPrimaryTitle={"Build modular"}
                buttonPrimaryUrl={"/build/"}
                buttonSecondaryTitle={"Deploy"}
                buttonSecondaryUrl={"/build#deploy"}
                anim={lottiAnim2}
            />
        </div>
    );
};

export default LottieVersion3;