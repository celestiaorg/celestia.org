import Container from "../Container/Container";

const Introduction = ({ children }) => {
  return (
    <section>
      <Container size={"lg"}>
        <div className="pb-40 lg:flex">
          <div className="hidden lg:block w-1/3"></div>
          <div className=" w-full lg:w-2/3">{children}</div>
        </div>
      </Container>
    </section>
  );
};

export default Introduction;
