import * as React from "react"
import { Link } from "gatsby"
import {Helmet} from "react-helmet";

import logo from '../images/celestia-logo.svg'
import Image from "./imageComponent";

const navigation = [
    {
        text: "Developers",
        url: "",
        submenus: [
            {
                text: "Build on testnet",
                subtext: "Testnet",
                url: "https://docs.celestia.org/",
                icon: "menu/devnet.svg",
                type: 'external'
            },
            {
                text: "Read our docs",
                subtext: "Celestia Docs",
                url: "https://docs.celestia.org/",
                icon: "menu/documentation.svg",
                type: 'external'
            },
            {
                text: "View our GitHub repos",
                subtext: "GitHub repositories",
                url: "https://github.com/celestiaorg",
                icon: "menu/github.svg",
                type: 'external'
            },
            {
                text: "Read the original research paper",
                subtext: "Research paper",
                url: "https://arxiv.org/pdf/1905.09274.pdf",
                icon: "menu/research.svg",
                type: 'external'
            },
            {
                text: "Read the contributors guide",
                subtext: "Contribute",
                url: "/resources/contribute/",
                icon: "menu/briefcase.svg",
                type: 'internal'
            },
        ]
    },{
        text: "Learn",
        url: "/resources/",
        type: 'internal',
        submenus: [
            {
                text: "What is Celestia",
                subtext: "Start here",
                url: "/what-is-celestia/",
                icon: "menu/logo.svg",
                type: 'internal'
            },
            {
                text: "FAQ",
                subtext: "Learn",
                url: "/faq/",
                icon: "menu/faq.svg",
                type: 'internal'
            },
            {
                text: "Technology",
                subtext: "Tech",
                url: "/technology/",
                icon: "menu/technology-svg.svg",
                type: 'internal'
            },
            {
                text: "Learn Modular",
                subtext: "Dive deep",
                url: "/learn/",
                icon: "menu/books.svg",
                type: 'internal'
            },
            {
                text: "Glossary",
                subtext: "Explore",
                url: "/glossary/",
                icon: "menu/search.svg",
                type: 'internal'
            },
            {
                text: "Videos, Podcasts, Whitepapers",
                subtext: "Resources",
                url: "/resources/",
                icon: "menu/resources.svg",
                type: 'internal'
            },
            {
                text: "Podcast",
                subtext: "Listen",
                url: "https://podcast.celestia.org/",
                icon: "menu/mic.svg",
                type: 'external'
            }
        ]
    },{
        text: "Community",
        url: "",
        submenus: [
            {
                text: "Join our Discord Channel",
                subtext: "Discord",
                url: "https://discord.com/invite/YsnTPcSfWQ",
                icon: "menu/discord.svg",
                type: 'external'
            },
            {
                text: "Join our Telegram group",
                subtext: "Telegram",
                url: "https://t.me/CelestiaCommunity",
                icon: "menu/telegram.svg",
                type: 'external'
            },
            {
                text: "Follow us on twitter",
                subtext: "Twitter",
                url: "https://twitter.com/CelestiaOrg",
                icon: "menu/twitter.svg",
                type: 'external'
            },
            {
                text: "Join our Forum",
                subtext: "Forum",
                url: "https://forum.celestia.org",
                icon: "menu/forum.svg",
                type: 'external'
            },
            {
                text: "Watch our YouTube videos",
                subtext: "YouTube",
                url: "https://www.youtube.com/channel/UCLlvAEzXBFZ-P3zS6BF2Bjg",
                icon: "menu/resources.svg",
                type: 'external'
            },
            {
                text: "Join our subreddit",
                subtext: "Reddit",
                url: "https://www.reddit.com/r/CelestiaNetwork/",
                icon: "menu/reddit.svg",
                type: 'external'
            }
        ]
    },{
        text: "Team",
        url: "",
        submenus: [
            {
                text: "Meet the team",
                subtext: "Team",
                url: "/team/",
                icon: "menu/team.svg",
                type: 'internal'
            },
            {
                text: "View our job postings",
                subtext: "Careers",
                url: "/careers/",
                icon: "menu/careers.svg",
                type: 'internal'
            }
        ]
    },{
        text: "Blog",
        url: "https://blog.celestia.org",
        type: 'external'
    },
]

class Header extends React.Component {
    componentDidMount() {
        window.addEventListener("scroll", this.toggleHeaderClass);
        this.toggleHeaderClass();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.toggleHeaderClass);
    }

    toggleHeaderClass = () => {
        if (window.scrollY > 130) {
            document.getElementById("header").classList.add("blur");
        } else if(window.scrollY < 80) {
            document.getElementById("header").classList.remove("blur");
        }
    };


    toggleMenu = () => {
        if (document.getElementById("hamburger").classList.contains('is-active')) {
            document.getElementById("header").classList.remove("menu-opened");
            document.getElementById("hamburger").classList.remove("is-active");
        }else{
            document.getElementById("hamburger").classList.add("is-active");
            document.getElementById("header").classList.add("menu-opened");
        }
    }

    render() {
        return (
            <>
            <header id={'header'}>
                <Helmet>
                    <title>Celestia</title>
                </Helmet>
                <div className={'blurry'}/>
                <div className={'container'}>
                    <button id={'hamburger'} className="hamburger hamburger--slider" type="button" onClick={this.toggleMenu}>
                      <span className="hamburger-box">
                        <span className="hamburger-inner"/>
                      </span>
                    </button>
                    <div className={'logo'}>
                        <Link to="/"><img src={logo} alt="Celestia"/></Link>
                    </div>
                    <nav>
                        <ul>
                            {navigation.map((link, index) => (
                                <li key={index}>
                                    {link.submenus ? <div className={'hasSubmenu'}>{link.text} <i className={'icon-dropdown'}/></div> : link.type === 'external' ?
                                        <a href={link.url} target={'_blank'} rel={'noreferrer'}>{link.text}</a> : <Link to={`${link.url}`} activeClassName="active">{link.text} {link.submenus && <i className={'icon-dropdown'}/>}</Link>}
                                    {link.submenus &&
                                        <div className={'submenu'}>
                                            <ul>
                                                {link.submenus.map((submenu, index) => (
                                                    <li key={index}>
                                                        {submenu.type === 'external' ?
                                                            (<a href={submenu.url} target={'_blank'} rel="noreferrer">
                                                            <div className={'row d-table w-100'}>
                                                                <div className={'col-2 align-middle d-table-cell'}>
                                                                    <div className={'icon'}>
                                                                        <Image alt={submenu.text} filename={submenu.icon} />
                                                                    </div>
                                                                </div>
                                                                <div className={'col-10 align-middle d-table-cell'}>
                                                                    <div className={'subtitle'}>{submenu.subtext}</div>
                                                                    <div className={'title'}>{submenu.text}</div>
                                                                </div>
                                                            </div>
                                                        </a>)
                                                            :
                                                            (<Link to={submenu.url} >
                                                            <div className={'row d-table w-100'}>
                                                                <div className={'col-2 align-middle d-table-cell'}>
                                                                    <div className={'icon'}>
                                                                        <Image alt={submenu.text} filename={submenu.icon} />
                                                                    </div>
                                                                </div>
                                                                <div className={'col-10 align-middle d-table-cell'}>
                                                                    <div className={'subtitle'}>{submenu.subtext}</div>
                                                                    <div className={'title'}>{submenu.text}</div>
                                                                </div>
                                                            </div>
                                                        </Link>)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }

                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={'clear'}/>
                </div>
            </header>
                </>
        );
    }
}

export default Header
