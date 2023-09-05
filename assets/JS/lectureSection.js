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


const burgerIcon = document.querySelector('.burger-icon');
const closeIcon = document.querySelector('.close-icon');
const menu = document.querySelector('nav ul.menu');

burgerIcon.addEventListener('click', function () {
    burgerIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    menu.style.display = 'block'; // Show the menu
});

closeIcon.addEventListener('click', function () {
    burgerIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    menu.style.display = 'none'; // Hide the menu
    burgerMenu.classList.remove('open'); // Close the menu

});

// Get all the radio buttons and their corresponding content divs
const radioButtons = document.querySelectorAll('input.slide-toggle');
const contentDivs = document.querySelectorAll('div[id^="content-"]');
const emptyState = document.getElementById('emptyState');

// Add event listeners to radio buttons
radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        // Hide all content divs
        contentDivs.forEach((contentDiv) => {
            contentDiv.style.display = 'none';
        });

        // Show the corresponding content div
        contentDivs[index].style.display = 'block';
        emptyState.style.display = 'none';

    });
});

function toggleContent(showContentId, hideContentId) {
    const showContentDiv = document.getElementById(showContentId);
    const hideContentDiv = document.getElementById(hideContentId);

    showContentDiv.style.display = 'block';
    hideContentDiv.style.display = 'none';
    
}

const videos = document.querySelectorAll('.video');

videos.forEach((video) => {
    video.addEventListener('play', function () {
        // Pause all other videos when one starts playing
        videos.forEach((v) => {
            if (v !== video && !v.paused) {
                v.pause();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Find the button by its id
    const goToPageButton = document.getElementById('allLectures');

    // Add a click event listener to the button
    goToPageButton.addEventListener('click', function () {
        // Specify the URL of the HTML page you want to navigate to
        const targetPageUrl = './allLectures.html';

        // Use window.location to navigate to the target page
        window.location.href = targetPageUrl;
    });
});
