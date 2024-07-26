"use client";
import { Body, Heading } from "@/macros/Copy";

import footerData from "@/data/global/footer";
import "./Footer.scss";

import Container from "@/components/Container/Container";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { isInternalLink } from "@/utils/isInternalLink";

const Footer = () => {
  const columns = footerData();
  const copywriteYear = new Date().getFullYear();
  return (
    <footer
      className={`bg-black w-full rounded-tl-3xl rounded-tr-3xl py-5 text-white`}
    >
      <div className={`px-4`}>
        <div
          className={`h-[400px] block w-full rounded-2xl bg-white overflow-hidden z-0 relative`}
        >
          <VideoPlayer src={"/videos/footer.mp4"} />
        </div>
      </div>
      <div className={`px-4 mb-8`}>
        <Container
          size={`lg`}
          className={`pt-10 pb-6 px-8 lg:pt-[6.25rem] lg:px-[6.25rem] lg:pb-20 rounded-2xl z-10 relative frosted-contaier -mt-10 lg:-mt-[100px]`}
        >
          <div className="relative z-10  lg:flex">
            <div className="pb-12 lg:pb-0 w-full lg:1/2">
              <Heading size="lg" className={`mb-12`}>
                Discover the first modular blockchain network.
              </Heading>
              placeholder for form
            </div>
            <div
              className={`flex flex-wrap lg:flex-nowrap w-full lg:1/2 lg:gap-6 lg:justify-end ml-auto mr-0`}
            >
              {columns.map((column, index) => {
                return (
                  <ul
                    key={index}
                    className={`block w-1/2 lg:w-1/5 ${
                      index === columns.length - 1 ? "" : "mb-10 lg:mb-0"
                    }`}
                  >
                    {column.links.map((link, linkIndex) => {
                      const isInternal = isInternalLink(link.url);
                      return (
                        <li key={`col-${index}-link-${linkIndex}`}>
                          <Link
                            href={link.url}
                            key={linkIndex}
                            className={`flex items-center group mb-4`}
                          >
                            <Body className={`mr-1`} size={"md"}>
                              {link.title}
                            </Body>
                            <Icon
                              border={false}
                              transparentBg
                              size={"xs"}
                              Icon={<div className={"block h-4 w-4"}></div>}
                              hover
                              HoverIcon={<ArrowLongSVG />}
                              direction={isInternal ? "down-right" : "up-right"}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
      <Container
        size="lg"
        className={`lg:flex lg:justify-between px-4 lg:mb-3`}
      >
        <div className="text-center lg:text-left w-full mb-2 ">
          <Link href={"/privacy"} className={`inline-block mr-2`}>
            <Body size="sm">Privacy Policy</Body>
          </Link>
          ·
          <Link href={"/tos"} className={`inline-block ml-2`}>
            <Body size="sm">Terms of Service</Body>
          </Link>
        </div>
        <div className={`w-full`}>
          <Body size="sm" className={`text-center lg:text-right`}>
            © {copywriteYear} Celestia Labs
          </Body>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
