// Array to hold the lecture items
const lectures = [
    {
        title: "Lecture 1",
        file: "assets/lectures_PDF/لماذا-وكيف-ندرس-الكتاب-المقدس_111330.pdf"
    },
    {
        title: "Lecture 2",
        file: "https://drive.google.com/file/d/10o3vTschLgoWLVjvieXg6O_LGqibygvD/view"
    },
    // Add more lecture items as needed
];

// Function to create the lecture list
function createLectureList() {
    const lectureListDiv = document.getElementById("lecture-list");

    lectures.forEach(lecture => {
        const lectureItem = document.createElement("div");
        lectureItem.innerHTML = `
            <h3>${lecture.title}</h3>
            <button onclick="viewLecture('${lecture.file}')">View</button>
            <button onclick="downloadLecture('${lecture.file}', '${lecture.title}')">Download</button>
        `;
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
