import {initializeApp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getFirestore,doc,getDoc,setDoc,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
var c=window.FIREBASE_CONFIG||{};
var enabled=!!(c.apiKey&&String(c.apiKey).indexOf('YOUR_')!==0&&c.projectId&&String(c.projectId).indexOf('YOUR_')!==0);
var FB={enabled:enabled};
if(enabled){
  var app=initializeApp(c),db=getFirestore(app),auth=getAuth(app);
  FB.load=function(){return getDoc(doc(db,'site','content')).then(function(s){
    if(!s.exists())return null;var d=s.data();
    return {json:d.json,updated:(d.updatedAt&&d.updatedAt.toDate)?d.updatedAt.toDate():null};
  })};
  FB.save=function(json){return setDoc(doc(db,'site','content'),{json:json,updatedAt:serverTimestamp()})};
  FB.saveImage=function(id,data){return setDoc(doc(db,'images',id),{data:data,updatedAt:serverTimestamp()})};
  FB.getImage=function(id){return getDoc(doc(db,'images',id)).then(function(s){return s.exists()?s.data().data:null})};
  FB.login=function(e,p){return signInWithEmailAndPassword(auth,e,p)};
  FB.logout=function(){return signOut(auth)};
  FB.reset=function(e){return sendPasswordResetEmail(auth,e)};
  FB.onAuth=function(cb){onAuthStateChanged(auth,cb)};
}
window.FB=FB;
window.dispatchEvent(new Event('fbready'));
