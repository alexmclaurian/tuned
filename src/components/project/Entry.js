import React from "react";
import _ from "lodash";
import MidiWriter from "midi-writer-js";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// Piano
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
// Sounds for piano
// import DimensionsProvider from "../../util/piano/DimensionsProvider";
import SoundfontProvider from "../../util/piano/SoundfontProvider";
import PianoWithRecording from "../../util/piano/PianoWithRecording";
// icons
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
// redux
import { connect } from "react-redux";
import { postMidi } from "../../redux/actions/dataActions";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f5")
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
      // totalTime: 0,
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
    this.setState({
      recording: Object.assign({}, this.state.recording, value)
    });
  };

  // https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
  dataURItoBlob = dataURI => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
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
    const track = new MidiWriter.Track();
    this.state.recording.events.forEach(evt => {
      // create midi track
      track.addEvent(
        [
          new MidiWriter.NoteEvent({
            pitch: [evt.noteOctave],
            // duration: evt.duration.toString()
            duration: "1"
          })
        ],
        (evt, idx) => ({
          sequential: true
        })
      );
      // write midi track
    });
    var write = new MidiWriter.Writer(track);
    // Finished midi file

    const formData = new FormData();
    const midiFile = write.dataUri();
    const blob = this.dataURItoBlob(midiFile);

    // datauri into blob for formdata and busboy
    formData.append("midi", blob);
    this.props.postMidi(formData);

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
    // const evts = this.state.recording.events;
    // const times = this.state.recording;
    const mapped = tell.map(notes => notes.toString());
    const notes = mapped.map((event, i) => <div key={i}>{event}</div>);
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          <Typography variant="h2">Play Piano</Typography>
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
        </Grid>
        <Grid item sm={8} xs={12}>
          <Tooltip title="Play">
            <Button
              aria-label="Play"
              color="primary"
              onClick={this.onClickPlay}
            >
              <PlayArrowRoundedIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Stop">
            <Button
              aria-label="Stop"
              color="primary"
              onClick={this.onClickStop}
            >
              <StopRoundedIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Clear">
            <Button
              aria-label="Clear"
              color="primary"
              onClick={this.onClickClear}
            >
              <ClearRoundedIcon />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item sm={8} xs={12}>
          <strong>Recorded notes</strong>
          {notes}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { postMidi })(Entry);
