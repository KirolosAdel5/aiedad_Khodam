// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAmYkXZoT78vux45Yi1dX_TmP8qz6WmxYs",
  authDomain: "aiedadkhodamresults4.firebaseapp.com",
  projectId: "aiedadkhodamresults4",
  storageBucket: "aiedadkhodamresults4.appspot.com",
  messagingSenderId: "72865583516",
  appId: "1:72865583516:web:b83bdcd1249d7a091f7859"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Set database variable
var database = firebase.database()

const verse = document.getElementById('verse')
const results = document.getElementById('res')
const results2 = document.getElementById('res2')
const results3 = document.getElementById('res3')
const thxmassage = document.getElementById('thx')
const smBtn = document.getElementById('smt-btn')

var verses = ["به ينتهي إلى النجاح، وبكلمته يقوم الجميع",
"رُبَّ نجاح يكون لأذى صاحبه",
"أَمَّا الْحِكْمَةُ فَنَافِعَةٌ لِلإِنْجَاحِ","إِلهَ السَّمَاءِ يُعْطِينَا النَّجَاحَ، وَنَحْنُ عَبِيدُهُ نَقُومُ وَنَبْنِي"
,"كَانَ الرَّبُّ مَعَ يُوسُفَ فَكَانَ رَجُلًا نَاجِحًا",
"أَرُومُ أَنْ تَكُونَ نَاجِحًا وَصَحِيحًا، كَمَا أَنَّ نَفْسَكَ نَاجِحَةٌ"];


function save() {
  var name = document.getElementById('name').value
  var id = document.getElementById('id').value
  var grade1 = document.getElementById('grade1').value
  var grade2 = document.getElementById('grade2').value
  var grade3 = document.getElementById('grade3').value

  database.ref('users/' + id).set({
    name : name,
    id : id,
    grade1 : grade1,
    grade2 : grade2,
    grade3 : grade3
  })

  alert('Saved')
}
document.getElementById('smt-btn').addEventListener('click', function() {
  
  // Call the desired function here
  get();
});
function get() {
  var code = document.getElementById('code').value;

  var user_ref = database.ref('users/' + code);
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val();

    // Store student data in localStorage
    localStorage.setItem('name', data.name);
    localStorage.setItem('grade1', data.grade1 );
    localStorage.setItem('grade2', data.grade2);
    localStorage.setItem('grade3', data.grade3);
    localStorage.setItem('grade4', data.grade4);
    localStorage.setItem('P', data.P);
    localStorage.setItem('L', data.L);
    localStorage.setItem('VL', data.VL);
    localStorage.setItem('U', data.U);
    localStorage.setItem('E', data.E);
    localStorage.setItem('att_grade', data.att_grade);
    localStorage.setItem('exam_grade', data.exam_grade);
    localStorage.setItem('melodies_grade', data.melodies_grade);

    // Redirect to next page (e.g., 'next-page.html')
    window.location.href = 'singelPage.html';
  });
}




$(".Click-here").on('click', function() {
    $(".custom-model-main").addClass('model-open');
  }); 
  $(".close-btn, .bg-overlay, .btn-danger").click(function(){
    $(".custom-model-main").removeClass('model-open');
  });
  $('.btn-success').on('click', function(event) {
      event.preventDefault(); // To prevent following the link (optional)
      location.href="https://api.whatsapp.com/send?phone=201289022985&text=welcome";
    });


// smBtn.addEventListener("click", function() {
    
//     const name = document.getElementById('code').value;
//     for(let i = 0; i < data.length; i++){
//         if(data[i].name.toLowerCase() == name.toLowerCase()){
//             verse.innerHTML = "''"+verses[Math.floor(Math.random()*verses.length)]+"''";
//             console.log(data[i].marks1)
//             results.innerHTML =data[i].marks1 +" / 50 ";
//             results2.innerHTML =data[i].marks2 +" / 50 " ; 

//             const [first, last] = document.getElementById('name').value.split(' ');
//             thxmassage.innerHTML = " شكرا ليك يا" +" "+ first
//             return;
//         }
//     }    
//     results.innerHTML =  "<h4 style='color:#d43f3a'>"+" تاكد من معلوماتك مرة اخرى و اعد المحاولة"+"<br>" + "اذا كنت تواجه مشكلة اضغط بالاسفل على هل يوجد مشكلة ؟"+"</h4>"
// })
