// function submitted(e){
//     e.preventDefault();

//     let namee = document.forms["id"]["name"].value;
//     sessionStorage.setItem("name", namee);
// }


// function submitForm() {
//     updateUserName();
//     // Submit the form or perform other actions
//   }


// function submitForm() {
//     let nameInput = document.getElementById("name").value;
//     sessionStorage.setItem("name", nameInput);
//     // // Redirect to the other page
//     // window.location.href = "otherpage.html";
// }


// function submitForm() {
//     let nameInput = document.getElementById("name").value;
//     sessionStorage.setItem("name", nameInput);
// }

//  // Redirect to the other page
//  window.location.href = "quiz.html";


// function hideButton() {
//     const inputValue = document.getElementById("your-input-id").value;
//     if (inputValue.trim() !== "") {
//         document.querySelector(".btn").style.display = "none";
//     }
// }



function saveName() {
    var name = document.getElementById("nameInput").value;
    sessionStorage.setItem("userName", name);
    window.location.href = "quiz.html"; // Redirect to the other page
}
