import Container from "@/components/Container/Container";

const ExploreCardsContainer = ({ children, id }) => {
  return (
    <section className={`bg-black`} id={id}>
      <Container size={"lg"} padding={false}>
        <div className="overflow-x-scroll flex w-full lg:overflow-auto gap-6 py-10 lg:py-20 lg:gap-7 px-4 md:px-10">
          {children}
        </div>
      </Container>
    </section>
  );
};

export default ExploreCardsContainer;
