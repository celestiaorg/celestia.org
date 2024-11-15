import Container from "@/components/Container/Container";

const Introduction = ({ children, className, ...props }) => {
  return (
    <section {...props}>
      <Container size={"lg"}>
        <div className={`pb-40 lg:flex ${className}`}>
          <div className="hidden lg:block w-1/3"></div>
          <div className=" w-full lg:w-2/3">{children}</div>
        </div>
      </Container>
    </section>
  );
};

export default Introduction;
