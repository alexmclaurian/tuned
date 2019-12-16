import React from "react";
import { Piano } from "react-piano";

const DURATION_UNIT = 0.2;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

class PianoWithRecording extends React.Component {
  static defaultProps = {
    notesRecorded: false
  };

  state = {
    keysDown: {},
    noteDuration: DEFAULT_NOTE_DURATION,
    clock: 0,
    clock1: 0,
    started: false,
    done: false,
    midiNum: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.done && this.state.done) {
      console.log(
        prevState.clock,
        prevState.clock1,
        this.state.clock,
        this.state.clock1
      );

      this.recordNotes(
        this.state.midiNum,
        Math.round(this.state.clock1 - this.state.clock) / 1000
      );
      // this.recordNotes(
      //   this.state.midiNumbers,
      //   this.state.clock1 - this.state.clock
      // );
      this.setState({ done: false });
    }
  }

  onPlayNoteInput = midiNumber => {
    if (!this.state.started) {
      this.setState({
        notesRecorded: false,
        clock: performance.now(),
        started: true
      });
    }
  };

  onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    if (this.state.notesRecorded === false) {
      // this.recordNotes(prevActiveNotes, this.state.noteDuration);
      this.setState({
        notesRecorded: true,
        noteDuration: DEFAULT_NOTE_DURATION,
        clock1: performance.now(),
        started: false,
        done: true,
        midiNum: prevActiveNotes
      });
    }
  };

  // midiNumbers: midi number for keys pressed. duration: how long keys were pressed
  recordNotes = (midiNumbers, duration) => {
    const noteString = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B"
    ];
    var noteOctaves = [];
    // midiNumbers.map(num => {
    //   const octave = parseInt(num / 12 - 1);
    //   const noteIndex = num % 12;
    //   const note = noteString[noteIndex];
    //   const noteOctave = note + octave;
    //   noteOctaves.push(noteOctave);
    // });

    if (this.props.recording.mode !== "RECORDING") {
      return;
    }
    const newEvents = midiNumbers.map(midiNumber => {
      // console.log(duration);
      const octave = parseInt(midiNumber / 12 - 1);
      const noteIndex = midiNumber % 12;
      const note = noteString[noteIndex];
      const noteOctave = note + octave;
      noteOctaves.push(noteOctave);
      return {
        noteOctave,
        midiNumber,
        time: this.props.recording.currentTime,
        // time: this.state.clock1,
        // duration: Math.round(this.state.clock1 - this.state.clock) / 1000
        duration: duration
      };
    });
    this.props.setRecording({
      allNotes: this.props.recording.allNotes.concat([noteOctaves]),
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration
      // totalTime: this.state.clock1 - this.state.clock
    });
  };

  render() {
    const {
      playNote,
      stopNote,
      recording,
      setRecording,
      ...pianoProps
    } = this.props;

    const { mode, currentEvents } = this.props.recording;
    const activeNotes =
      mode === "PLAYING" ? currentEvents.map(event => event.midiNumber) : null;
    return (
      <div>
        <Piano
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={activeNotes}
          {...pianoProps}
        />
      </div>
    );
  }
}

export default PianoWithRecording;
