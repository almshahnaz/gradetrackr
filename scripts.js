var rowCount = 6;
var courseCount = 3;
const addRowBtn = document.querySelector("#add-row");
const addCourseBtn = document.querySelector("#add-course");
const scaleShown = document.querySelector("#scale");

function updateGradeDropdowns() {
    const rows = document.querySelectorAll("#gpa-table tbody tr");
    let grades = [];

    if (scaleShown && scaleShown.value === "plus-scale") {
        grades = ['', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
    } else {
        grades = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
    }

    rows.forEach((row, index) => {
        const gradeCell = row.cells[1]; 
        gradeCell.innerHTML = ""; 

        const gradeSelect = document.createElement("select");
        gradeSelect.classList.add("grade-input");

        grades.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
        });

        gradeCell.appendChild(gradeSelect);
    });
}

document.addEventListener("DOMContentLoaded", updateGradeDropdowns);

if (scaleShown){
    const plusScaleTable = document.querySelector("#plus-scale-table");
    const plusMinusScaleTable = document.querySelector("#plus-minus-scale-table");
    
    scaleShown.addEventListener("change", function(){
        
        if (scaleShown.value === "plus-scale"){

            plusScaleTable.classList.remove("hidden-table");
            plusMinusScaleTable.classList.add("hidden-table");
        
        } else if (scaleShown.value === "plus-minus-scale"){

            plusScaleTable.classList.add("hidden-table");
            plusMinusScaleTable.classList.remove("hidden-table");
        
        }

        updateGradeDropdowns();
    });
}

if (addRowBtn){
    addRowBtn.addEventListener("click", function(){
        rowCount++;
        const table = document.querySelector("#grade-table");
        const tBody = table.querySelector("tbody");
        
        const newRow = tBody.insertRow();
        

        const assignmentCell = newRow.insertCell();
        const assignmentInput = document.createElement("input");
        assignmentInput.type = "text";
        assignmentInput.classList.add("assignment-input");
        assignmentInput.name = "row" + rowCount + "-assignment";
        assignmentInput.id = "row" + rowCount + "-assignment";
        assignmentCell.appendChild(assignmentInput);

        const gradeCell = newRow.insertCell();
        const gradeInput = document.createElement("input");
        gradeInput.type = "number";
        gradeInput.classList.add("grade-input");
        gradeInput.name = "row" + rowCount + "-grade";
        gradeInput.id = "row" + rowCount + "-grade";
        gradeInput.min = 0;
        gradeInput.max = 100;
        gradeCell.appendChild(gradeInput);

        const weightCell = newRow.insertCell();
        const weightInput = document.createElement("input");
        weightInput.type = "number";
        weightInput.classList.add("weight-input");
        weightInput.name = "row" + rowCount + "-weight";
        weightInput.id = "row" + rowCount + "-weight";
        weightInput.min = 0;
        weightInput.max = 100;
        weightInput.step = 0.1;
        weightCell.appendChild(weightInput);
        
    });
}

if (document.querySelector("#get-grade")){
    document.querySelector("#get-grade").addEventListener("click", calculateGrade);
}

function calculateGrade(){
    const rows = document.querySelectorAll("#grade-table tbody tr");
    var sumofWeights = 0;
    var sumOfWeightedGrades = 0;
    for (var i = 0; i < rows.length; i++){
        var grade = parseFloat(rows[i].querySelector(".grade-input").value) || 0;
        var weight = parseFloat(rows[i].querySelector(".weight-input").value) || 0;

        sumofWeights += weight;
        sumOfWeightedGrades += (grade * weight);
    }

    var weightedAverage = sumOfWeightedGrades / sumofWeights;
    if (!isNaN(weightedAverage)){
        document.querySelector("#grade-title").innerHTML = "Average Grade: " + weightedAverage.toFixed(2);
    }
}

if (document.querySelector("#get-final")){
    document.querySelector("#get-final").addEventListener("click", function(){
        
        var currentGrade = parseFloat(document.querySelector("#current-grade").value);
        var targetGrade = parseFloat(document.querySelector("#target-grade").value);
        var finalWeight = parseFloat(document.querySelector("#final-weight").value);
        var decimalFinalWeight = finalWeight / 100;

        var finalGrade = (targetGrade - ((1 - decimalFinalWeight) * currentGrade)) / decimalFinalWeight;
        document.querySelector("#final-heading").innerHTML = "Grade Needed on Final: " + finalGrade.toFixed(2);
    });
}

if (addCourseBtn){
    addCourseBtn.addEventListener("click", function(){
        courseCount++;
        const table = document.querySelector("#gpa-table");
        const tBody = table.querySelector("tbody");
        
        const newRow = tBody.insertRow();
        var grades = [];

        const courseCell = newRow.insertCell();
        const courseInput = document.createElement("input");
        courseInput.type = "text";
        courseInput.classList.add("course-input");
        courseInput.name = "row" + courseCount + "-course";
        courseInput.id = "row" + courseCount+ "-course";
        courseCell.appendChild(courseInput);

        const gradeCell = newRow.insertCell();
        const gradeInput = document.createElement("select");
        gradeInput.classList.add("grade-input");

        if (scaleShown.value === "plus-scale"){
            gradeInput.id = "plus-grade";
            grades = ['', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
        } else if (scaleShown.value === "plus-minus-scale"){
            gradeInput.id = "plus-minus-grade";
            grades = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
        }

        for (var i = 0; i < grades.length; i++){
            const option = document.createElement("option");
            option.value = grades[i];
            option.textContent = grades[i];
            gradeInput.appendChild(option);
        }

        gradeCell.appendChild(gradeInput);


        const creditCell = newRow.insertCell();
        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.classList.add("credit-input");
        creditInput.name = "row" + courseCount + "-credit";
        creditInput.id = "row" + courseCount + "-credit";
        creditInput.min = 0;
        creditInput.max = 100;
        creditCell.appendChild(creditInput);
        
    });
}

if (document.querySelector("#calculate-gpa")){
    document.querySelector("#calculate-gpa").addEventListener("click", calculateGPA);
}
function calculateGPA(){

    const rows = document.querySelectorAll("#gpa-table tbody tr");
    const currentGPA = parseFloat(document.querySelector("#current-gpa").value);
    const creditsEarned = parseFloat(document.querySelector("#credits-earned").value);
    
    var sumOfCredits = 0;
    var sumOfWeightedGradePoints = 0;
    var gpa = 0;
    var cumulativeGPA;
    
    if ( scaleShown && scaleShown.value === "plus-scale"){
        
        for (var i = 0; i < rows.length; i++){
            
            var grade = rows[i].querySelector(".grade-input").value;
            var gradePoint = getPlusGradePoint(grade);
            var credit = parseFloat(rows[i].querySelector(".credit-input").value) || 0;

            sumOfWeightedGradePoints += (credit * gradePoint);
            sumOfCredits += credit;
            
            
        }

        gpa = (sumOfWeightedGradePoints / sumOfCredits);
    } else if (scaleShown && scaleShown.value === "plus-minus-scale"){

        for (var i = 0; i < rows.length; i++){
            var grade = rows[i].querySelector(".grade-input").value;
            var gradePoint = getPlusMinusGradePoint(grade);
            var credit = parseFloat(rows[i].querySelector(".credit-input").value) || 0;

            sumOfWeightedGradePoints += (credit * gradePoint);
            sumOfCredits += credit;
        }

        gpa = (sumOfWeightedGradePoints / sumOfCredits);
    }

    if (!isNaN(currentGPA) && !isNaN(creditsEarned) && !isNaN(gpa)){

        cumulativeGPA = ((creditsEarned * currentGPA) + (sumOfCredits * gpa)) / (creditsEarned + sumOfCredits);
        document.querySelector("#gpa-title").innerHTML = "Semester GPA: " + gpa.toFixed(2) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cumulative GPA: " + cumulativeGPA.toFixed(2);
    } else if (!isNaN(gpa)){

        document.querySelector("#gpa-title").innerHTML = "Semester GPA: " + gpa.toFixed(2);
    }
}

function getPlusGradePoint (grade){

    switch (grade) {
        case 'A': return 4.0;
        case 'B+': return 3.5;
        case 'B': return 3.0;
        case 'C+': return 2.5;           
        case 'C': return 2.0;         
        case 'D+': return 1.5;
        case 'D': return 1.0; 
        case 'F': return 0.0; 
        default: return null;
            
    }
}

function getPlusMinusGradePoint (grade){

    switch (grade) {
        case 'A+': return 4.0;
        case 'A': return 4.0;
        case 'A-': return 3.7;
        case 'B+': return 3.3;
        case 'B': return 3.0;
        case 'B-': return 2.7;
        case 'C+': return 2.3;
        case 'C': return 2.0;
        case 'C-': return 1.7;
        case 'D+': return 1.3;
        case 'D': return 1.0;
        case 'F': return 0;
        default: return null; 
    }
}

document.querySelector(".navbar-toggler").addEventListener("click", function(){
    
    document.querySelector(".navbar-menu").classList.toggle("active");
    
    document.querySelector(".navbar-toggler").classList.toggle("open");
    console.log(document.querySelector(".navbar-toggler").classList);
});

if (document.querySelector("#required-gpa")){
    document.querySelector("#required-gpa").addEventListener("click", calculateMinRequiredGPA);
}

function calculateMinRequiredGPA (){

    const cumGPA = parseFloat(document.querySelector("#cumulative-gpa").value);
    const totalCredits = parseFloat(document.querySelector("#total-credits").value);
    const targetGPA = parseFloat(document.querySelector("#target-gpa").value);
    const creditsRemaining = parseFloat(document.querySelector("#credits-remaining").value);

    var minimumRequiredGPA = ((targetGPA * (totalCredits + creditsRemaining)) - (cumGPA * totalCredits)) / creditsRemaining;

    if (!isNaN(minimumRequiredGPA)){
        const sentence = document.querySelector(".target-gpa-container p");
        sentence.innerHTML = "Minimum GPA required for remaining semesters: " + minimumRequiredGPA.toFixed(2);
    }
}



