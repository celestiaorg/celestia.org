import Container from "@/components/Container/Container";
import MediaRow from "./MediaRow";

const AlternatingMediaRows = ({ rows, id }) => {
  return (
    <section className={"bg-white-pure"} id={id}>
      <Container size={"xl"} padding={false}>
        {rows.map((row, index) => {
          return (
            <MediaRow
              key={index}
              title={row.title}
              body={row.body}
              buttons={row.buttons}
              videoSrc={row.videoSrc}
              className={`w-full lg:flex lg:place-items-stretch ${
                index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
              index={index}
              totalRows={rows.length}
            />
          );
        })}
      </Container>
    </section>
  );
};

export default AlternatingMediaRows;
