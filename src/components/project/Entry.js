import React from "react";
import _ from "lodash";
// MUI
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Piano
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
// Sounds for piano
// import DimensionsProvider from "../../util/piano/DimensionsProvider";
import SoundfontProvider from "../../util/piano/SoundfontProvider";
import PianoWithRecording from "../../util/piano/PianoWithRecording";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4")
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

class Entry extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [],
      allNotes: [],
      currentTime: 0,
      currentEvents: []
    }
  };

  constructor(props) {
    super(props);

    this.scheduledEvents = [];
  }

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map(event => event.time + event.duration)
    );
  };

  setRecording = value => {
    // console.log(value.allNotes);
    this.setState({
      recording: Object.assign({}, this.state.recording, value)
    });
  };

  onClickPlay = () => {
    this.setRecording({
      mode: "PLAYING"
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, event => [
        event.time,
        event.time + event.duration
      ])
    );
    startAndEndTimes.forEach(time => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter(event => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach(scheduledEvent => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: []
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
      allNotes: []
    });
  };

  render() {
    const tell = this.state.recording.allNotes;
    const evts = this.state.recording.events;
    const mapped = tell.map(notes => notes.toString());

    console.log(mapped);
    const notes = mapped.map((event, i) => <div key={i}>{event}</div>);
    return (
      <div>
        <Typography variant="h2">Play Piano</Typography>
        <div className="mt-5">
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <PianoWithRecording
                recording={this.state.recording}
                setRecording={this.setRecording}
                noteRange={noteRange}
                width={400}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        </div>
        <div className="mt-5">
          <button onClick={this.onClickPlay}>Play</button>
          <button onClick={this.onClickStop}>Stop</button>
          <button onClick={this.onClickClear}>Clear</button>
        </div>
        <div className="mt-5">
          <strong>Recorded notes</strong>
          {/* <div>{JSON.stringify(this.state.recording.events)}</div> */}
          {/* <div>{this.state.recording.events}</div> */}
          {/* {tell} */}
          {notes}
        </div>
      </div>
    );
  }
}

export default Entry;
