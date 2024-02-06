import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Image from "../components/imageComponent";

import { FooterBoxes } from "../datas/resources/content";
import Layout from "../components/layout";
// import FeaturedLearn from "../components/modules/featured-learn";
import TocGroup from "../components/modules/toc-groups";
import { Helmet } from "react-helmet";
import ToC from "../components/modules/toc";

const toc = require("./markdown-pages/learn/_toc.json");

export default function Template({
	data,
	props, // this prop will be injected by the GraphQL query below.
}) {
	const { markdownRemark } = data; // data.markdownRemark holds your post data

	const { frontmatter, html, headings } = markdownRemark;

	const [showTocCategories, setShowTocCategories] = useState(false);

	const enableSidebar = frontmatter.path === "/learn/" || (frontmatter.path !== "/learn/" && frontmatter.sidemenu === "true") ? true : false;

	return (
		<Layout footerBoxes={FooterBoxes}>
			<Helmet>
				<body className='resources-body' />
				<title>Celestia - {frontmatter.title}</title>
			</Helmet>
			<div className='resources-page'>
				<main>
					<div className={"container"}>
						<div className='blog-post new-blog' id={"blog-post"}>
							<div className={"inner small"}>
								<h1 className={"h2"}>{frontmatter.title}</h1>

								{frontmatter.path.includes("learn") && (
									<nav aria-label='breadcrumb'>
										<ol className='breadcrumb'>
											<Link to={frontmatter.path}>
												<li className='breadcrumb-item ps-0 pb-0 mb-0'>
													{frontmatter.path.includes("resources") ? "Resources" : "Learn modular"}
													<i className={"icon-dropdown"} />
												</li>
											</Link>
											<li className='breadcrumb-item active ps-0 ps-md-4 pb-0 mb-0' aria-current='page'>
												{frontmatter.title}
											</li>
										</ol>
									</nav>
								)}

								{frontmatter.author && (
									<div className={"author"}>
										<div className={"authorImage"}>
											<Image alt={frontmatter.author.name} filename={frontmatter.author.avatar} />
										</div>
										By <strong> {frontmatter.author.name}</strong>
									</div>
								)}
								{frontmatter.date && frontmatter.path === "/resources/" && (
									<div className={"date"}>
										Published on: <strong>{frontmatter.date}</strong>
									</div>
								)}
								<div className={"clear"} />
							</div>

							{frontmatter.image && (
								<div className={"main-image"}>
									<Image alt={frontmatter.title} filename={frontmatter.image} />
								</div>
							)}

							<div className={"row sticky-row"}>
								{enableSidebar && (
									<div className={"sticky-container col-lg-4"}>
										<div className={"toc"}>
											<div
												className={`mobile-toc ${showTocCategories && "show"}`}
												onClick={() => setShowTocCategories(!showTocCategories)}
												onKeyDown={(event) => {
													if (event.key === "Enter") {
														setShowTocCategories(!showTocCategories);
													}
												}}
												tabIndex={0}
												role='button'
											>
												{frontmatter.path === "/learn/" ? "Select category" : "Jump to..."}
												<svg id={"mobile-category"} viewBox='0 0 22 22' version='1.1' xmlns='http://www.w3.org/2000/svg'>
													<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
														<g transform='translate(-485.000000, -1044.000000)'>
															<g transform='translate(227.000000, 410.000000)'>
																<g transform='translate(269.000000, 645.000000) rotate(-90.000000) translate(-269.000000, -645.000000) translate(258.000000, 634.000000)'>
																	<rect fill='#EDEDED' x='0' y='0' width='22' height='22' rx='4' />
																	<polyline
																		stroke='#000000'
																		strokeWidth='1.5'
																		strokeLinecap='round'
																		transform='translate(10.694444, 11.152778) rotate(-270.000000) translate(-10.694444, -11.152778) '
																		points='7.94444444 9.77777778 10.6944444 12.5277778 13.4444444 9.77777778'
																	/>
																</g>
															</g>
														</g>
													</g>
												</svg>
											</div>

											{frontmatter.path === "/learn/" && (
												<div className={"toc-inner"}>
													<div className={`category-menu ${showTocCategories && "show"}`}>
														{toc.map((group, groupIndex) => {
															return (
																<TocGroup
																	key={groupIndex}
																	markdownRemark={markdownRemark}
																	group={group}
																	headings={headings}
																	frontmatter={frontmatter}
																/>
															);
														})}
													</div>
												</div>
											)}

											{frontmatter.path !== "/learn/" && enableSidebar && (
												<div className={"toc-inner"}>
													<div className={`category-menu ${showTocCategories && "show"}`}>
														<ToC headings={headings} frontmatter={frontmatter} />
													</div>
												</div>
											)}

											{data.markdownRemark.frontmatter.edit && (
												<a
													href={data.markdownRemark.frontmatter.edit}
													className={"d-none d-lg-flex suggest-button pl-0 ps-lg-4"}
													target={"_blank"}
													rel={"noreferrer"}
												>
													<i className={"icon-edit"} />
													SUGGEST AN EDIT
												</a>
											)}
										</div>
									</div>
								)}
								<div className={`col-12 ${enableSidebar ? "col-lg-8 ps-lg-5" : "col-lg-12"}`}>
									<div className='blog-post-content' dangerouslySetInnerHTML={{ __html: html }} />

									{data.markdownRemark.frontmatter.edit && (
										<a
											href={data.markdownRemark.frontmatter.edit}
											className={"d-lg-none suggest-button pl-0 ps-lg-4"}
											target={"_blank"}
											rel={"noreferrer"}
										>
											<i className={"icon-edit"} />
											SUGGEST AN EDIT
										</a>
									)}
								</div>
							</div>

							{/* <FeaturedLearn withArrow={true} current={frontmatter.slug}/> */}
						</div>
					</div>
				</main>
			</div>
		</Layout>
	);
}

export const pageQuery = graphql`
	query ($id: String!) {
		allMarkdownRemark(sort: { frontmatter: { order: ASC } }, filter: { fileAbsolutePath: { regex: "/learn/" } }) {
			group(field: { frontmatter: { category: SELECT } }) {
				edges {
					node {
						id
						frontmatter {
							title
							order
							slug
							category
							subcategory
						}
					}
				}
				group(field: { frontmatter: { subcategory: SELECT } }) {
					edges {
						node {
							id
							frontmatter {
								title
								order
								category
								subcategory
								slug
							}
						}
					}
				}
			}
		}
		markdownRemark(id: { eq: $id }) {
			html
			id
			headings {
				value
				id
				depth
			}
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				path
				edit
				slug
				title
				category
				subcategory
				sidemenu
				image
				author {
					name
					avatar
				}
			}
		}
	}
`;
