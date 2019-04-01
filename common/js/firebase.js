// Initialize Firebase
var config = {
    apiKey: "AIzaSyAvpiP1YkPW0jtQogJhb70zCo1j2tkzrxA",
    authDomain: "dev1-f8dbd.firebaseapp.com",
    databaseURL: "https://dev1-f8dbd.firebaseio.com",
    projectId: "dev1-f8dbd",
    storageBucket: "dev1-f8dbd.appspot.com",
    messagingSenderId: "744400182897"
};
firebase.initializeApp(config);
var db = firebase.firestore();
function createUser(userName,password,callback,callError) {
    firebase.auth().createUserWithEmailAndPassword(userName, password).then(callback).catch(function(error) {
        callError(error.code)
    });

}

function sendEmailVerification(callback) {
    var user = firebase.auth().currentUser;
    if (user) {
        user.sendEmailVerification().then(function() {
            callback(user)
        }).catch(function(error) {
            console.log(error)
        });
    }
}

function addStudent(id,use,callback) {
    db.collection("students").doc(id).set(use)
        .then(function() {
            callback()
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}
function sendPasswordResetEmail(email,callback,callError) {
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        callback()
    }).catch(function(error) {
        callError(error.code)
    });

}
function getUse() {
    var user = firebase.auth().currentUser;
    if(user){
        return user
    }
}