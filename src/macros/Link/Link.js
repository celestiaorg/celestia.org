import { Link as NextLink } from "next/link";

const Link = ({ children, href }) => {
  return (
    <NextLink href={href} target={"_blank"} prefetch={true}>
      {children}
    </NextLink>
  );
};

export default Link;
