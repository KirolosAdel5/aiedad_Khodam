const form = document.getElementById("idForm");
const idField = document.getElementById("nationalId");
const messageField = document.getElementById("error-message");
const checkButton = document.getElementById("checkButton");

const apiKey = 'AIzaSyBReJ_2F6krOAcrZIdD5QJ4eDHN24EBYpY'; 
const spreadsheetId = '1YN4Pt8N5G4sDTohLvs2VVyQRoiynDWR1TfZaKJGdlXU'; 
const id_range = `Exam3Interview!A1:E30`; 
const date_time_range = `TimeSheet!A1:D`; 

const id_url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${id_range}?key=${apiKey}`;
const date_time_url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${date_time_range}?key=${apiKey}`;
const sheetDB_url = "https://sheetdb.io/api/v1/31gznj8wmvijh"; // رابط SheetDB

async function checkNationalId() {
  const nationalId = idField.value.trim();
  if (!nationalId) {
      messageField.innerHTML = "الرجاء إدخال الرقم القومي";
      return;
  }

  try {
      const response_ids = await fetch(id_url);
      const data = await response_ids.json();

      if (!data.values || data.values.length === 0) {
          messageField.textContent = "تعذر تحميل البيانات. الرجاء المحاولة لاحقًا.";
          return;
      }

      // البحث عن الرقم القومي
      const foundEntry = data.values.find(row => row[0] === nationalId);
      
      if (foundEntry) {
          const userName = foundEntry[1]; // استخراج اسم المستخدم
          const existingDate = foundEntry[2]; // تاريخ محفوظ مسبقًا
          const existingStartTime = foundEntry[3];
          const existingEndTime = foundEntry[4];

          if (existingDate) {
            alert(`مرحبا بك يا ${userName} 👋🏻 \n لديك بالفعل موعد محجوز:\n📅 يوم الجمعة: ${existingDate} \n⏰الساعة: ${existingStartTime} - ${existingEndTime} مساءا`);
          } else { 
              fetchFirstAvailableSlot(nationalId, userName); // تمرير الاسم للوظيفة التالية
          }
      } else {
          messageField.textContent = "الرقم القومي غير موجود. الرجاء التحقق.";
      }
  } catch (error) {
      console.error("Error fetching data:", error);
      messageField.textContent = "حدث خطأ أثناء التحقق. الرجاء المحاولة لاحقًا.";
  }
}

async function fetchFirstAvailableSlot(nationalId, userName) {
  try {
      const response = await fetch(date_time_url);
      const data = await response.json();

      if (!data.values || data.values.length === 0) {
          alert("لم يتم العثور على مواعيد متاحة.");
          return;
      }

      // البحث عن أول موعد متاح
      const firstAvailable = data.values.find(row => row[3] === "متاح");

      if (firstAvailable) {
          const selectedDate = firstAvailable[0];
          const startTime = firstAvailable[1];
          const endTime = firstAvailable[2];

          alert(`شكرا ليك يا ${userName} 🙏\nميعاد مقابلتك سيكون الجمعة ${selectedDate} \n ⏰ الساعة : ${startTime} - ${endTime} مساءً \n📍 المكان:الكنيسة فوق البلكونة`);

          // تحديث الموعد في SheetDB
          await updateAppointmentInSheetDB(nationalId, selectedDate, startTime, endTime);

          // تحديث حالة الموعد إلى "محجوز"
          await updateTimeSlotStatus(selectedDate, startTime, endTime);
      } else {
          alert("لا توجد مواعيد متاحة في الوقت الحالي.");
      }
  } catch (error) {
      console.error("Error fetching time slots:", error);
      alert("حدث خطأ أثناء تحميل المواعيد.");
  }
}


async function updateAppointmentInSheetDB(nationalId, date, startTime, endTime) {
    const updateData = { 
        "التاريخ": date,
        "وقت البداية": startTime,
        "وقت النهاية": endTime
    };

    try {
        const response = await fetch(`${sheetDB_url}/national_id/${nationalId}?sheet=Exam3Interview`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error("Error updating sheet");
        }
        
    } catch (error) {
        console.error("Error updating SheetDB:", error);
        alert("❌ حدث خطأ أثناء حفظ الموعد.");
    }
}

async function updateTimeSlotStatus(date, startTime) {
  const updateData = { "Status": "محجوز" }; // تأكد أن اسم العمود مطابق لما في SheetDB

  try {
      
      const fullDateTime = `${date} ${startTime}`;
      const url = `${sheetDB_url}/Full_date/${encodeURIComponent(fullDateTime)}?sheet=TimeSheet`;

      const response = await fetch(url, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error updating time slot: ${errorText}`);
      }

  } catch (error) {
      console.error("❌ خطأ أثناء تحديث TimeSheet:", error);
      alert(`❌ حدث خطأ: ${error.message}`);
  }
}


checkButton.addEventListener("click", checkNationalId);
