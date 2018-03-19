import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

songs: AngularFireList<any>;
songs: Observable<any[]>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afDB: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
	  this.songsList = this.afDB.list('/songs');
	  this.songs = this.songsList.valueChanges();
  }

addSong(){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
	  text: 'Save',
	  handler: data => {
	  	console.log('Save clicked');
	    const newSongRef = this.songsList.push({});
	    newSongRef.set({
	      id: newSongRef.key,
	      title: data.title
	    });
	  }
	}
    ]
  });
  prompt.present();
}

showOptions(songId, songTitle) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Song',
        role: 'destructive',
        handler: () => {
          this.removeSong(songId);
        }
      },{
        text: 'Update title',
        handler: () => {
          this.updateSong(songId, songTitle);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

updateSong(songId, songTitle){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Update the name for this song",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: songTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.update(songId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

}
