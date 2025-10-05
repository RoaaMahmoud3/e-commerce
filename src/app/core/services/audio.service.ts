import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private noteSound = new Audio('audio/note-25867.mp3');
  private removeSound = new Audio('audio/remove2.mp3');

  constructor(){
    this.setVolume(1.0);
  }
  setVolume(volume: number){
    [this.noteSound,this.removeSound].forEach(a => a.volume = volume);
  }
  private playForDuration(audio: HTMLAudioElement, durationSeconds: number){
    audio.currentTime=0;
    audio.play().then(()=>{
      setTimeout(() => {
        audio.pause();
      }, durationSeconds * 1000);
    })
    .catch(err => console.error('Audio play error:', err));
  }

  playNote(durationSeconds: number = 3){
    this.playForDuration(this.noteSound,durationSeconds);
  }
  playRemove(durationSeconds: number = 3){
    this.playForDuration(this.removeSound,durationSeconds);
  }
}
