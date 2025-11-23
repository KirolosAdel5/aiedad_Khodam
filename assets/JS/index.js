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
  var grade4 = document.getElementById('grade4').value

  database.ref('users/' + id).set({
    name : name,
    id : id,
    grade1 : grade1,
    grade2 : grade2,
    grade3 : grade3,
    grade4 : grade4
  })

  alert('Saved')
}
document.getElementById('smt-btn').addEventListener('click', function() {
  
  // Call the desired function here
  get();
});
function get() {
  
  const code = document.getElementById('code').value;
  
  if (!code) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerHTML = 'الرجاء ادخال الرقم القومي';
    return; // Exit the function if the code is empty
  }

  const apiKey = 'AIzaSyBReJ_2F6krOAcrZIdD5QJ4eDHN24EBYpY'; // Replace with your Google Sheets API key
  const spreadsheetId = '1YN4Pt8N5G4sDTohLvs2VVyQRoiynDWR1TfZaKJGdlXU'; // New Google Sheets spreadsheet ID
  // Replace with your Google Sheets spreadsheet ID
  const range = `Exams!A2:Q`; // Adjust the range to include all data rows from your sheet

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;


  fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    const filteredRow = rows.find(row => row[2] === code);

    if (filteredRow) {
      // Create an object to store the data
      const dataToSend = {
        name: filteredRow[1],
        grade1: filteredRow[3],
        bonus1: filteredRow[4],
      };

      // // If followup1 is not equal to 1, set grade1 to "لم تقدم ورقة فولو اب"
      // if (dataToSend.followup1 !== '1') {
      //   dataToSend.grade1 = 'لم تقدم ورقة فولو اب';
      // }

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
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerHTML = 'حدث خطاء ما اماانك تكون غير مسجل فالفورم او انك تكتب الرقم القومي بشكل خاطئ';
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


