import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Etihad_Stadium.jpg/1920px-Etihad_Stadium.jpg",
    Address: " Some address 5, 12345 Manchester",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Etihad_Stadium.jpg/1920px-Etihad_Stadium.jpg",
    Address: " Some address 5, 12345 Barcelona",
    description: "This is the second meetup",
  },
];

function HomePage() {
  return (
    <Layout>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </Layout>
  );
}

export default HomePage;
