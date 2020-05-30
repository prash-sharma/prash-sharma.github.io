function myGrades(curMarks, totalMarks) {
    let gradePc = (curMarks * 100)/totalMarks;
    
    let myGrade = '';

    if (gradePc >= 90) {
        myGrade = 'A'
    } else if (gradePc >= 80) {
        myGrade = 'B' 
    } else if (gradePc >= 70) {
        myGrade = 'C'
    } else if (gradePc >=60) {
        myGrade = 'D'
    } else {
        myGrade = "Fail";
    }
    
    return (`Grade % is ${gradePc} and grade is ${myGrade}`);
    
}

console.log(myGrades(55, 100));
