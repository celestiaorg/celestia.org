import * as React from "react"
// import Image from "../imageComponent";

export default class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            banner : true
        }
    }
    closeBanner = () => {
        const self = this;
        document.getElementById("banner").classList.add("hide");
        setTimeout(function (){
            localStorage.setItem('modular-fellows-banner', 'true')
            self.setState({banner:false})
        },600);
    };

    componentDidMount() {
        if (localStorage.getItem('modular-fellows-banner')) {
            this.setState({banner:false})
        }
    }

    render() {

        return this.state.banner === true ? <div id={'banner'} className="banner">
            <div className={'container'}>
                <div className={'close-banner'} onClick={this.closeBanner}><i className={'icon-close'}></i></div>
                <div className={'row w-lg-80 align-items-center justify-content-center'}>
                    {/* <div className={'col-2 position-relative d-none d-md-flex'}>
                        <Image alt={'Modular Summit'} filename={'modular-summit.svg'} />
                    </div> */}
                    <div className={'col-auto'}>The first Celestia hackathon is here! Infinite Space Bazaar begins on April 2 <div style={{fontSize: `32px`, display: `inline-block`, transform: `translateY(4px)` }}>☄️</div></div>

                    <a className={'col-auto mt-3 mt-sm-0'} href="https://genesis.celestia.org" target={'_blank'} rel={'noreferrer'}>
                        <div>
                            <button className={'button-simple'}>Register now</button>
                        </div>
                    </a>
                </div>
            </div>
        </div> : ''
    }
}
