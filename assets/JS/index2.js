const form = document.getElementById("idForm");
const nameField = document.getElementById("name");
const idField = document.getElementById("nationalId");
const messageField = document.getElementById("error-message");
const checkButton = document.getElementById("checkButton");

// إعداد Google Sheets API
const apiKey = 'AIzaSyBReJ_2F6krOAcrZIdD5QJ4eDHN24EBYpY'; // Replace with your Google Sheets API key
const spreadsheetId = '1YN4Pt8N5G4sDTohLvs2VVyQRoiynDWR1TfZaKJGdlXU'; // New Google Sheets spreadsheet ID
// Replace with your Google Sheets spreadsheet ID
const range = `Exam2!A1:G`; // Adjust the range to include all data rows from your sheet

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

async function checkNationalId() {
  const nationalId = idField.value.trim();
  if (!nationalId) {
    messageField.innerHTML = "الرجاء إدخال الرقم القومي";
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rows = data.values;
    
    let found = false;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][2] === nationalId) { // الرقم القومي في العمود الأول
        found = true;
        const score = parseInt(rows[i][3]); // الدرجة في العمود الثاني
        if (score >= 3) {
          window.location.href = `form2.html?national_id=${nationalId}`; // الانتقال للفورم الثاني مع رقم الهوية
        } else {
          messageField.textContent ="عذرًا، غير مسموح لك بدخول الامتحان. لتخطي نسبة الغياب!!🥲"
          // alert("🥲عذرًا، غير مسموح لك بدخول الامتحان. لتخطي نسبة الغياب!!");
        }
        break;
      }
    }

    if (!found) {
      messageField.textContent = "الرقم القومي غير موجود. الرجاء التحقق.";
    }
  } catch (error) {
    console.error(error);
    messageField.textContent = "حدث خطأ أثناء التحقق. الرجاء المحاولة لاحقًا.";
  }
}

checkButton.addEventListener("click", checkNationalId);
