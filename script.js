

  


  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, doc, addDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore-lite.js';


const firebaseConfig = {
  apiKey: "AIzaSyDzEVHKK7AmwXjvpNJSm8QLuNikNCzzNVc",
  authDomain: "final-project-c4ad0.firebaseapp.com",
  databaseURL: "https://final-project-c4ad0-default-rtdb.firebaseio.com",
  projectId: "final-project-c4ad0",
  storageBucket: "final-project-c4ad0.appspot.com",
  messagingSenderId: "1042995673438",
  appId: "1:1042995673438:web:f04d7a75cd4fb9be87f7cf",
  measurementId: "G-V998Z5CFVX"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'profiles');



  var resultView = new Vue({
    el: '#app',
    data: {
      artist1: './img/1.jpg',
      artist2: './img/2.jpg',
      searchResultNum: 0,
      buttonSet: new Set(),
      artistArray: [],
      fullArray: [],
      copyArray: [],
      copyGenreArtistArray: [],
      emptyArray: [],
      genreArray: [],
      url: 'home',
      sw: false,
      sx: false,

      displayUsers: [],

      showAll: true,
      buttonAllPressCount: 0,

      showNewAge: false,
      buttonNewAgePressCount: 0,

      showHipHopRap: false,
      buttonHipHopRapPressCount: 0,

      showPop: false,
      buttonPopPressCount: 0,

      showAlternative: false,
      buttonAlternativePressCount: 0,

      showElectronic: false,
      buttonElectronicPressCount: 0,

      showDance: false,
      buttonDancePressCount: 0,

      maleGenderButton: 'btn btn-light dropdown-item',
      femaleGenderButton: 'btn btn-light dropdown-item',
      otherGenderButton: 'btn btn-light dropdown-item',
      freshmanYearButton: 'btn btn-light dropdown-item',
      sophomoreYearButton: 'btn btn-light dropdown-item',
      juniorYearButton: 'btn btn-light dropdown-item',
      seniorYearButton: 'btn btn-light dropdown-item',
      graduatestudentYearButton: 'btn btn-light dropdown-item',

      baseballSoftballActivitiesButton: 'btn btn-light dropdown-item',
      basketballActivitiesButton: 'btn btn-light dropdown-item',
      bowlingActivitiesButton: 'btn btn-light dropdown-item',
      fieldHockeyActivitiesButton: 'btn btn-light dropdown-item',
      footballActivitiesButton: 'btn btn-light dropdown-item',
      gymCardioActivitiesButton: 'btn btn-light dropdown-item',
      gymWeightsActivitiesButton: 'btn btn-light dropdown-item',
      gymnasticsActivitiesButton: 'btn btn-light dropdown-item',
      iceHockeyActivitiesButton: 'btn btn-light dropdown-item',
      lacrosseActivitiesButton: 'btn btn-light dropdown-item',
      rowingActivitiesButton: 'btn btn-light dropdown-item',
      runningActivitiesButton: 'btn btn-light dropdown-item',
      soccerActivitiesButton: 'btn btn-light dropdown-item',
      swimmingDivingActivitiesButton: 'btn btn-light dropdown-item',
      tableTennisActivitiesButton: 'btn btn-light dropdown-item',
      tennisActivitiesButton: 'btn btn-light dropdown-item',
      volleyballActivitiesButton: 'btn btn-light dropdown-item',
      walkingActivitiesButton: 'btn btn-light dropdown-item',
      wrestlingActivitiesButton: 'btn btn-light dropdown-item',
      noResults: true,

      addedText: '',
      collectionNameButton: 'btn btn-light dropdown-item',
      priceButton: 'btn btn-light dropdown-item',

      entryPageShow: true,
      signUpPageShow: false,
      signInPageShow: false,
      signOutPageShow: false,
      updatePageShow: false,
      searchPageShow: false,
      reportPageShow: false,
      genderFiltPicked: "false",
      activitiesFiltPicked: "false",
      yearFiltPicked: "false",

      signInEmail: "",
      signInPass: "",


      email: "",
      password: "",
      name: "",
      gender: "",
      activity1: "",
      activity2: "",
      activity3: "",
      year: "",
      image: null,
      id: "",

      signedIn: true,

      selectedGenders: [],
      selectedYears: [],
      selectedActivities: [],
      missingSignUpComponents: [],

      //all the users in our database
      userInfoArray: [
      ["mock", "mock", "mock", "mock", "mock", "mock", "mock", "img/0.jpg"],
      ["Shankari Ravithas", "Female", "Walking", "Running", "Football", "Junior", "sravitha@umich.edu", "img/0.jpg"],
      ["Pranav Ramesh", "Male", "Tennis", "Bowling", "Soccer", "Senior", "rameshpr@umich.edu", "img/1.jpg"],
      ["Vincent Tai", "Male", "Football", "Gym - cardio", "Volleyball", "Sophomore", "vitai@umich.edu", "img/2.jpg"],
      ["Ian Mascarenhas", "Male", "Rowing", "Running", "Swimming/Diving", "Senior", "ianmasc@umich.edu", "img/3.jpg"],
      ["Vidyuth Suresh", "Male", "Wrestling", "Field hockey", "Football", "Senior", "vidsuresh@umich.edu", "img/4.jpg"],
      ["Megan Schaller", "Other", "Gym - weights", "Tennis", "Lacrosse", "Freshman", "megansch@umich.edu", "img/5.jpg"],
      ["John Cho", "Male", "Tennis", "Bowling", "Soccer", "Graduate Student", "johncho@umich.edu", "img/6.jpg"],
      ["Taz E", "Male", "Football", "Gym - cardio", "Volleyball", "Freshman", "taze@umich.edu", "img/7.jpg"],
      ["Evan Griffith", "Male", "Tennis", "Running", "Swimming/Diving", "Senior", "evangriff@umich.edu", "img/8.jpg"],
      ["Ashka Pujara", "Female", "Baseball/Softball", "Running", "Ice hockey", "Senior", "ashkapuj@umich.edu", "img/9.jpg"],
      ["Meghana Kowsika", "Female", "Bowling", "Tennis", "Rowing", "Sophomore", "meghanakow@umich.edu", "img/10.jpg"],
      ["Ken Dowling", "Male", "Volleyball", "Tennis", "Table tennis", "Junior", "kendowling@umich.edu", "img/11.jpg"],
      ["Samarth Somani", "Male", "Gym - weights", "Tennis", "Lacrosse", "Freshman", "samarthsom@umich.edu", "img/12.jpg"],
      ["Sohil Jain", "Male", "Gym - cardio", "Soccer", "Swimming/Diving", "Graduate Student", "sohiljain@umich.edu", "img/13.jpg"],
      ["Ben Stefadu", "Male", "Gym - cardio", "Lacrosse", "Running", "Freshman", "benstef@umich.edu", "img/14.jpg"],
      ["David Bacdayan", "Male", "Gym - cardio", "Lacrosse", "Running", "Junior", "davidbac@umich.edu", "img/15.jpg"],
      ["Josh Galbreath", "Male", "Walking", "Tennis", "Table tennis", "Junior", "joshgal@umich.edu", "img/16.jpg"],
      ["Lakshmi Meyyappan", "Female", "Football", "Ice hockey", "Field hockey", "Sophomore", "lakmeyy@umich.edu", "img/17.jpg"],
      ],

      //has the users we will display
      userArray:[],

    },
    methods: {
      searchButton: function() {
        //filtering output based on filters chosen by users

        
        let usersFirebase = []
        this.userInfoArray = [];
        getDocs(colRef)
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              usersFirebase.push({ ...doc.data(), id: doc.id})
            })
          })
          .catch(err => {
            console.log("Firestore Error");
          })
          .finally(() => {
            for (var i = 0; i < usersFirebase.length; i++) {
              this.userInfoArray.push([usersFirebase[i].Name, usersFirebase[i].Gender, usersFirebase[i].Activity1, usersFirebase[i].Activity2, usersFirebase[i].Activity3, usersFirebase[i].Year, usersFirebase[i].Email, usersFirebase[i].Image]);
            
              let genderUsers = [];
        let activitiesUsers = [];
        let yearUsers = [];
        for (let i = 0; i < this.userInfoArray.length; ++i) {
              if (this.selectedGenders.includes(this.userInfoArray[i][1])) {
                  genderUsers.push(this.userInfoArray[i]);
              }
              if (this.selectedActivities.includes(this.userInfoArray[i][2]) || this.selectedActivities.includes(this.userInfoArray[i][3]) || this.selectedActivities.includes(this.userInfoArray[i][4])) {
                  activitiesUsers.push(this.userInfoArray[i]);
              }
              if (this.selectedYears.includes(this.userInfoArray[i][5])) {
                  yearUsers.push(this.userInfoArray[i]);
              }
        }



        this.userArray = genderUsers;
        if (this.selectedGenders.length > 0) {
              this.noResults = false;
        }
        if (this.selectedActivities.length > 0) {
          this.noResults = false;
          if (this.selectedGenders.length == 0) {
              this.userArray = activitiesUsers;
          }
          else {

              this.userArray = _.intersection(this.userArray, activitiesUsers);
          }
        }
        if (this.selectedYears.length > 0) {
          this.noResults = false;
          if (this.selectedGenders.length == 0 && this.selectedActivities.length == 0) {
              this.userArray = yearUsers;
          }
          else {

              this.userArray = _.intersection(this.userArray, yearUsers);
          }
        }


        if (this.selectedGenders.length == 0 && this.selectedActivities.length == 0 && this.selectedYears.length == 0 ) {
          this.userArray = this.userInfoArray;
        }

        //console.log(this.userArray);


        this.showAll = true;
        this.genreArray = [];
        for(let i = 0; i < this.searchResultNum; ++i){
          break2 = false;
          for(let l = 0; l < this.genreArray.length; ++l){
            if(this.genreArray[l][0] == this.fullArray[i].primaryGenreName){
              break2 = true;
              break;
            }
          }
          if(break2 == false){
            this.genreArray.push([this.fullArray[i].primaryGenreName, false]);
          }
        }
            }
          });
          



        

      },
      
      setGender: function(genderVar){
        if (this.gender == genderVar) {
            this.gender = "";

        }
        else {
            this.gender = genderVar;
        }
      },
      setActivity: function(activityVar){
        if ((this.activity1 != activityVar) && (this.activity2 != activityVar) && (this.activity3 != activityVar)) {
            if (this.activity1 == "") {
              this.activity1 = activityVar;
            }
            else if (this.activity2 == "") {
              this.activity2 = activityVar;
            }
            else if (this.activity3 == "") {
              this.activity3 = activityVar;
            }
        }
        else if (this.activity1 == activityVar) {
            this.activity1 = "";
        }
        else if (this.activity2 == activityVar) {
          this.activity2 = "";
        }
        else if (this.activity3 == activityVar) {
          this.activity3 = "";
        }
      },
      setYear: function(yearVar) {
        if (this.year == yearVar) {
            this.year = "";
        }
        else {
            this.year = yearVar;
        }
      },
      signOut: function() {
        this.name = "";
        this.year = "";
        this.email = "";
        this.password = "";
        this.gender = "";
        this.activity1 = "";
        this.activity2 = "";
        this.activity3 = "";
        this.year = "";
        this.image = "";
        this.signInEmail = "";
        this.signInName = "";
        this.signInPassword = "";
        this.returnHome();
        
      },
      sendEmail: function(){
        alert("Email Sending...");
        setTimeout(function(){ alert("Email Sent!"); }, 1000);

        this.reportPageShow = false;
        this.searchPageShow = true; 
      },
      
      signIn: function() {
        if (document.getElementById("email").value != "") {
          this.signInEmail = document.getElementById("email").value;
        }
        if (document.getElementById("password").value != "") {
          this.signInPass = document.getElementById("password").value;
        }
        if(this.signInEmail!="" && this.signInPass!="")
        {
          //this.userInfoArray[0] = [this.name, this.gender, this.activity1, this.activity2, this.activity3, this.year, this.email, "test-folder/" + this.image.name];
          const q = query(colRef, where("Email", "==", this.signInEmail));

          let b = [];
          getDocs(q)
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                b.push({ ...doc.data(), id: doc.id})
              })   
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              if (b.length == 0) {
                window.alert("Wrong Email and/or Password");
              }
              
              else {
                console.log(b);
                if (b[0].Password == this.signInPass) {
                  this.signInPageShow = false;
                  this.searchPageShow = true;
                  this.searchButton();
                  this.sw = true;
                  this.sx = true;
                  this.signedIn = false;
                  
                  this.name = b[0].Name;
                  this.gender = b[0].Gender;
                  this.year = b[0].Year;
                  this.email = b[0].Email;
                  this.password = b[0].Password;
                  this.activity1 = b[0].Activity1;
                  this.activity2 = b[0].Activity2;
                  this.activity3 = b[0].Activity3;
                  this.image = b[0].Image;
                  this.id = b[0].id;
                } 
                else {
                  window.alert("Wrong Email and/or Password");
                }
              }
              
            });
        }
        else{
          window.alert("Fill all components");
        }
      },
      returnHome: function(){
        this.entryPageShow = true;
        this.signUpPageShow = false;
        this.updatePageShow = false;
        this.signInPageShow = false;
        this.searchPageShow = false;
        this.reportPageShow = false;
        this.signOutPageShow = false;
        this.sw = false;
        this.sx = false;
      },
      returnToSearch: function(){
        this.entryPageShow = false;
        this.signUpPageShow = false;
        this.updatePageShow = false;
        this.signInPageShow = false;
        this.searchPageShow = true;
        this.reportPageShow = false;
        this.signOutPageShow = false;
        this.sw = true;
      },
          signUp: function() {
            this.missingSignUpComponents = [];
            if (document.getElementById("emailTextBox").value != "") {
              this.email = document.getElementById("emailTextBox").value;
            }
            if (this.email == "") {
              this.missingSignUpComponents.push("E-mail");
            }
            if (document.getElementById("passwordTextBox").value != "") {
              this.password = document.getElementById("passwordTextBox").value;
            }
            if (this.password == "") {
              this.missingSignUpComponents.push("Password");
            }
            if (document.getElementById("nameTextBox").value != "") {
              this.name = document.getElementById("nameTextBox").value;
            }
            if (this.name == "") {
              this.missingSignUpComponents.push("Name");
            }
            if(this.email != "" && this.name != "" && this.password != "" && this.gender != "" && this.activity1 != ""
            && this.activity2 != "" && this.activity3 != "" && this.year !="" && this.image != null)
            {
              const q = query(colRef, where("Email", "==", this.email));
              let b = [];
              getDocs(q)
                .then((snapshot) => {
                  snapshot.docs.forEach((doc) => {
                    b.push({ ...doc.data(), id: doc.id})
                  })   
                })
                .catch(err => {
                  console.log(err);
                })
                .finally(() => {
                   if (Object.keys(b).length == 0) {
                    addDoc(colRef, {
                      Name: this.name,
                      Gender: this.gender,
                      Year: this.year, 
                      Email: this.email,
                      Activity1: this.activity1,
                      Activity2: this.activity2,
                      Activity3: this.activity3,
                      Password: this.password,
                      Image: "test-folder/" + this.image.name,
                    })
                    .then((id) => {
                      this.signUpPageShow = false;
                      this.searchPageShow = true;
                      this.sw = true;
                      this.sx = true;
                      this.searchButton();
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                   } else{
                    window.alert("This email already exists");
                  }
                });
            }
            else{
              if(this.gender == ""){
                this.missingSignUpComponents.push("Gender");
              }
              if(this.activity1 == "" || this.activity2 == "" || this.activity3 == ""){
                this.missingSignUpComponents.push("3 Activities");
              }
              if(this.year == ""){
                this.missingSignUpComponents.push("Year");
              }
              if(this.image == null){
                this.missingSignUpComponents.push("Profile Picture");
              }
              var stringToPrint = "";
              for (var i = 0; i < this.missingSignUpComponents.length; i++) {
                if(i != this.missingSignUpComponents.length - 1){
                stringToPrint +=  this.missingSignUpComponents[i] + ", ";
                }
                else if(i ==  this.missingSignUpComponents.length - 1 && 1 !=  this.missingSignUpComponents.length){
                  stringToPrint +=  "and " + this.missingSignUpComponents[i] + " ";
                }
                else{
                  stringToPrint +=   this.missingSignUpComponents[i] + " ";
                }
              }
              window.alert("The " + stringToPrint + "component(s) are missing");
            }


          },
          updateInfo: function() {
            this.missingSignUpComponents = [];
            
            if (document.getElementById("passwordTextBox").value != "") {
              this.password = document.getElementById("passwordTextBox").value;
            }
            if (this.password == "") {
              this.missingSignUpComponents.push("Password");
            }
            if (document.getElementById("nameTextBox").value != "") {
              this.name = document.getElementById("nameTextBox").value;
            }
            if (this.name == "") {
              this.missingSignUpComponents.push("Name");
            }
            if(this.email != "" && this.name != "" && this.password != "" && this.gender != "" && this.activity1 != ""
            && this.activity2 != "" && this.activity3 != "" && this.year !="" && this.image != null)
            {
              const dRef = doc(db, 'profiles', this.id);
              updateDoc(dRef, {
                Name: this.name, 
                Password: this.password,
                Gender: this.gender, 
                Activity1: this.activity1,
                Activity2: this.activity2, 
                Activity3: this.activity3,
                Year: this.year,
                Image: this.image
              })
              .then(() => {
                this.searchButton();
                this.sx = true;
                this.searchPageShow = true;
                this.updatePageShow = false;
              })
              
            }
            else{
              if(this.gender == ""){
                this.missingSignUpComponents.push("Gender");
              }
              if(this.activity1 == "" || this.activity2 == "" || this.activity3 == ""){
                this.missingSignUpComponents.push("3 Activities");
              }
              if(this.year == ""){
                this.missingSignUpComponents.push("Year");
              }
              if(this.image == null){
                this.missingSignUpComponents.push("Profile Picture");
              }
              var stringToPrint = "";
              for (var i = 0; i < this.missingSignUpComponents.length; i++) {
                if(i != this.missingSignUpComponents.length - 1){
                stringToPrint +=  this.missingSignUpComponents[i] + ", ";
                }
                else if(i ==  this.missingSignUpComponents.length - 1 && 1 !=  this.missingSignUpComponents.length){
                  stringToPrint +=  "and " + this.missingSignUpComponents[i] + " ";
                }
                else{
                  stringToPrint +=   this.missingSignUpComponents[i] + " ";
                }
              }
              window.alert("The " + stringToPrint + "component(s) are missing");
            }


          },
          onPickFile: function () {
              this.$refs.fileInput.click();
          },
          onFilePicked:function (event) {
              const files = event.target.files
              let filename = files[0].name
              const fileReader = new FileReader()
              fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
              })
              fileReader.readAsDataURL(files[0])
              this.image = files[0]
              console.log(this.image);
          },
          setGenderFilter:function(genderFilter) {
            if (this.selectedGenders.includes(genderFilter)) {
                this.selectedGenders = this.selectedGenders.filter(e => e !== genderFilter)

                // used for drop toggle filter button color change //
                if(this.selectedGenders.length == 0){
                  this.genderFiltPicked = "false";
                }


            if (genderFilter == 'Male') {
              this.maleGenderButton = 'btn btn-light dropdown-item';
            }
            else if (genderFilter == 'Female') {
              this.femaleGenderButton = 'btn btn-light dropdown-item';
            }
            else if (genderFilter == 'Other') {
              this.otherGenderButton = 'btn btn-light dropdown-item';
            }

            return false;
        }
        else {
            this.selectedGenders.push(genderFilter);

            // used for drop toggle filter button color change //
            if(this.selectedGenders.length != 0){
              this.genderFiltPicked = "true";
            }

            if (genderFilter == 'Male') {
              this.maleGenderButton = 'btn btn-info dropdown-item';
            }
            else if (genderFilter == 'Female') {
              this.femaleGenderButton = 'btn btn-info dropdown-item';
            }
            else if (genderFilter == 'Other') {
              this.otherGenderButton = 'btn btn-info dropdown-item';
            }
            return true;
        }
      },

      setActivitiesFilter:function(activitiesFilter){
        if (this.selectedActivities.includes(activitiesFilter)) {
          this.selectedActivities = this.selectedActivities.filter(e => e !== activitiesFilter)

          // used for drop toggle filter button color change //
          if(this.selectedActivities.length == 0){
            this.activitiesFiltPicked = "false";
          }

          if (activitiesFilter == 'Baseball/Softball') {
            this.baseballSoftballActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Basketball') {
            this.basketballActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Bowling') {
            this.bowlingActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Field hockey') {
            this.fieldHockeyActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Football') {
            this.footballActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Gym - cardio') {
            this.gymCardioActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Gym - weights') {
            this.gymWeightsActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Gymnastics') {
            this.gymnasticsActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Ice hockey') {
            this.iceHockeyActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Lacrosse') {
            this.lacrosseActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Rowing') {
            this.rowingActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Running') {
            this.runningActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Soccer') {
            this.soccerActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Swimming/Diving') {
            this.swimmingDivingActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Table tennis') {
            this.tableTennisActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Tennis') {
            this.tennisActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Volleyball') {
            this.volleyballActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Walking') {
            this.walkingActivitiesButton = 'btn btn-light dropdown-item';
          }
          else if (activitiesFilter == 'Wrestling') {
            this.wrestlingActivitiesButton = 'btn btn-light dropdown-item';
          }

          return false;
        }
        else {
          this.selectedActivities.push(activitiesFilter);

          // used for drop toggle filter button color change //
          if(this.selectedActivities.length != 0){
            this.activitiesFiltPicked = "true";
          }

          if (activitiesFilter == 'Baseball/Softball') {
            this.baseballSoftballActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Basketball') {
            this.basketballActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Bowling') {
            this.bowlingActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Field hockey') {
            this.fieldHockeyActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Football') {
            this.footballActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Gym - cardio') {
            this.gymCardioActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Gym - weights') {
            this.gymWeightsActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Gymnastics') {
            this.gymnasticsActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Ice hockey') {
            this.iceHockeyActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Lacrosse') {
            this.lacrosseActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Rowing') {
            this.rowingActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Running') {
            this.runningActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Soccer') {
            this.soccerActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Swimming/Diving') {
            this.swimmingDivingActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Table tennis') {
            this.tableTennisActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Tennis') {
            this.tennisActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Volleyball') {
            this.volleyballActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Walking') {
            this.walkingActivitiesButton = 'btn btn-info dropdown-item';
          }
          else if (activitiesFilter == 'Wrestling') {
            this.wrestlingActivitiesButton = 'btn btn-info dropdown-item';
          }
          return true;
        }
      },

      setYearFilter:function(yearFilter) {
        if (this.selectedYears.includes(yearFilter)) {
            this.selectedYears = this.selectedYears.filter(e => e !== yearFilter)

            // used for drop toggle filter button color change //
          if(this.selectedYears.length == 0){
            this.yearFiltPicked = "false";
          }

            if (yearFilter == 'Freshman') {
              this.freshmanYearButton = 'btn btn-light dropdown-item';
            }
            else if (yearFilter == 'Sophomore') {
              this.sophomoreYearButton = 'btn btn-light dropdown-item';
            }
            else if (yearFilter == 'Junior') {
              this.juniorYearButton = 'btn btn-light dropdown-item';
            }
            else if (yearFilter == 'Senior') {
              this.seniorYearButton = 'btn btn-light dropdown-item';
            }
            else if (yearFilter == 'Graduate Student') {
              this.graduatestudentYearButton = 'btn btn-light dropdown-item';
            }

            return false;
        }
        else {
            this.selectedYears.push(yearFilter);

            // used for drop toggle filter button color change //
          if(this.selectedYears.length != 0){
            this.yearFiltPicked = "true";
          }

            if (yearFilter == 'Freshman') {
              this.freshmanYearButton = 'btn btn-info dropdown-item';
            }
            else if (yearFilter == 'Sophomore') {
              this.sophomoreYearButton = 'btn btn-info dropdown-item';
            }
            else if (yearFilter == 'Junior') {
              this.juniorYearButton = 'btn btn-info dropdown-item';
            }
            else if (yearFilter == 'Senior') {
              this.seniorYearButton = 'btn btn-info dropdown-item';
            }
            else if (yearFilter == 'Graduate Student') {
              this.graduatestudentYearButton = 'btn btn-info dropdown-item';
            }
            return true;
        }
      }

    }
})