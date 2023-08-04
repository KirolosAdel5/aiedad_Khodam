// Array to hold the lecture items
const lectures = [
    {
        title: "لماذا وكيف نصلي و نصوم",
        file: "assets/lectures_PDF/لماذا وكيف نصلي و نصوم.pdf"
    },
    {
        title: "لماذا وكيف ندرس الكتاب المقدس",
        file: "assets/lectures_PDF/لماذا-وكيف-ندرس-الكتاب-المقدس_111330.pdf"
    },
    {
        title: "مقدمة في العقيدة (ابونا اسحق)",
        file: "https://drive.google.com/file/d/1gzXXhgKKYyyr1--Sqa1O3wqTLDsve7uW/view"
    },
    {
        title: "الاسفار القانونية التانية وقانونيتها (سيدنا الانبا اكسيوس)",
        file: "https://drive.google.com/file/d/16o0IXLd5btI1tsinjCtydk7kxaQWNg90/view"
    }
    // Add more lecture items as needed
];

// Function to create the lecture list
function createLectureList() {
    const lectureListDiv = document.getElementById("lecture-list");

    lectures.forEach((lecture,index) => {
        const lectureItem = document.createElement("div");
        lectureItem.classList.add("single_media_card");
        
        lectureItem.style.gridColumn = "span 2";
        lectureItem.innerHTML = `		
        <span>
        <span class="iconify" data-icon="mdi:bible" style="width: 24px; height: 24px;"></span>

        <h3 id="p" style="font-family: 'Cairo'; font-size: 15px">${lecture.title}</h3>
        </span>
        <h3 id="vl"> ${index+1}</h3>
        <br>

         <div class="buttonContainer">
           <button class="acceptButton" onclick="viewLecture('${lecture.file}')" >معاينة</button>
            <button class="declineButton" onclick="downloadLecture('${lecture.file}', '${lecture.title}')">تحميل</button>
         </div>
         
       
       
        `;

        lectureItem.onclick = function() {
            viewLecture(lecture.file);
          };
          
        lectureListDiv.appendChild(lectureItem);
    });
}

// Function to view the lecture in a new tab
function viewLecture(file) {
    window.open(file, '_blank');
}

// Function to download the lecture
function downloadLecture(file, title) {
    const link = document.createElement("a");
    link.href = file;
    link.download = title;
    link.click();
}

// Call the function to create the lecture list when the page loads
document.addEventListener("DOMContentLoaded", createLectureList);
