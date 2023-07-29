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
  
  const code = document.getElementById('code').value;

  const apiKey = 'AIzaSyDr_TALrhqEKa9To7YtDnNOmEiH8m4mFSc'; // Replace with your Google Sheets API key
  const spreadsheetId = '1yp_eVf06efyM8jJE63T2gb6AP-u4oZeb4xJInHsjMxQ'; // Replace with your Google Sheets spreadsheet ID
  const range = `Exams!A2:O`; // Adjust the range to include all data rows from your sheet

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;


  fetch(url)
  .then(response => response.json())
  .then(data => {
      const rows = data.values;
      const filteredRow = rows.find(row => row[0] === code);

      if (filteredRow) {
          // Create an object to store the data
          const dataToSend = {
              name: filteredRow[1],
              grade1: filteredRow[2],
              grade2: filteredRow[3],
              grade3: filteredRow[4],
              grade4: filteredRow[5],
              P: filteredRow[6],
              L: filteredRow[7],
              VL: filteredRow[8],
              U: filteredRow[10],
              E: filteredRow[9],
              att_grade: filteredRow[11],
              exam_grade: filteredRow[12],
              melodies_grade: filteredRow[13],
              spiritual_note: filteredRow[14],
          };

          // Store the student data in localStorage
          localStorage.setItem('studentData', JSON.stringify(dataToSend));

          // Redirect to singelPage.html
          window.location.href = 'singelPage.html';
      } else {
          document.getElementById('data-table').innerHTML = 'Code not found!';
      }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Refresh the page on error
    window.location.reload();
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
