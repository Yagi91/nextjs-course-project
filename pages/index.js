import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
// import { useEffect, useState } from "react";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Etihad_Stadium.jpg/1920px-Etihad_Stadium.jpg",
    address: " Some address 5, 12345 Manchester",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Etihad_Stadium.jpg/1920px-Etihad_Stadium.jpg",
    address: " Some address   10, 12345 Barcelona",
    description: "This is the second meetup",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  // //send http request
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content=" Browse a huge list of highly active meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://user1:00user_1@cluster0.tv88fbg.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return{
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export default HomePage;
