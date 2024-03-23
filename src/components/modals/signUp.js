import * as React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp";
import Success from "./success";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            developer: this.props.modalType === 'developer' ? true : false,
            operator: this.props.modalType === 'operator' ? true : false,
            newsletter: true,
            success: false,
            popupTitle: 'Thank you',
            msg: '',
        };
    }

    mailchimp(url){
        addToMailchimp(this.state.email, this.state.listFields, url) // listFields are optional if you are only capturing the email address.
            .then(data => {
                this.setState({msg:data.msg});
                if(data.result === 'error' && data.msg.includes("is already subscribed")){
                    this.setState({success:true});
                    this.setState({popupTitle:'Thank you!'});
                    this.setState({msg:'Thank you for subscribing!'});
                }else{
                    if(data.result === 'success'){
                        this.setState({success:true});
                        this.setState({popupTitle:'Thank you!'});
                        this.setState({'Thank you for subscribing!'});
                    }else{
                        this.setState({popupTitle:'Error'});
                    }
                }
                //console.log(data)
            })
            .catch(() => {
            })
    }

    _handleSubmit = e => {
        e.preventDefault();
        const listFields = {};

        if(this.state.newsletter){listFields['group[57543][1]'] = 1}
        if(this.state.developer){listFields['group[57543][2]'] = 2}
        if(this.state.operator){listFields['group[57543][4]'] = 4}

        this.setState(prevState => ({
                listFields
        }),()=> {
            if(this.state.email){
                this.mailchimp('https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&amp;id=8d165e36d3')
            }
        })


    }
    change = (e) => {
        e.preventDefault();
        this.setState({ [e.target.id] : e.target.value })
    };
    changeCheckbox = (e) => {
        this.setState({ [e.target.id] : e.target.checked})
    };
    render() {

        return <div className={'modal-content-inner'}>
            {this.state.msg ? <Success title={this.state.popupTitle} text={this.state.msg}/> :
                <div className={'row'}>
                    <div className={'col-12'}>
                        <h3>Sign up to be the first to try our limited-access developer beta or validate on our testnet.</h3>
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <div className={'form-group'}>
                                <label htmlFor="email">Email</label>
                                <input type="text" id={'email'} name={'email'} required onChange={(e) => this.change(e)}/>
                            </div>
                            <div className={'form-group'}>
                                <label>Add me to waitlist</label>
                                <div className={'row'}>
                                    <div className={'col col-auto'}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="developer" checked={this.state.developer} onChange={(e) => this.changeCheckbox(e)}/>
                                            <label className="form-check-label" htmlFor="developer">Developer beta</label>
                                        </div>
                                    </div>
                                    <div className={'col col-auto'}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="operator" checked={this.state.operator} onChange={(e) => this.changeCheckbox(e)}/>
                                            <label className="form-check-label" htmlFor="operator">Run a node on testnet</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <label>Subscribe me to</label>
                                <div className={'row'}>
                                    <div className={'col col-auto'}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="newsletter" checked={this.state.newsletter} onChange={(e) => this.changeCheckbox(e)}/>
                                            <label className="form-check-label" htmlFor="newsletter">Newsletter</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <button type={'submit'} className={'button button-simple'}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    }
}
