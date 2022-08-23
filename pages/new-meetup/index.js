import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  function onAddMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={onAddMeetupHandler} />;
}

export default NewMeetup;
