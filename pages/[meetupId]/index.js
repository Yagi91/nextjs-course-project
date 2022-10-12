import MeetupDetail from "../../components/meetups/MeetupDetail";
// import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        alt="a stadium with people standing in front"
        description={props.meetupData.description}
        address={props.meetupData.address}
        title={props.meetupData.title}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://user1:00user_1@cluster0.tv88fbg.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://user1:00user_1@cluster0.tv88fbg.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export default MeetupDetails;
