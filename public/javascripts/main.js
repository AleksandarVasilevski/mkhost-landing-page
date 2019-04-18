validate();

// Smooth scrolling to all links
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

//Form validation
function validate(){
  document.getElementById("inputSent").addEventListener("click", function(event){
    var name = document.forms["contact"]["name"].value;
    var email = document.forms["contact"]["email"].value;
    var message = document.forms["contact"]["message"].value;

    const parentAlert = document.querySelector("#alert-contact");
    const alert = document.createElement("div");
    parentAlert.appendChild(alert);
    if(name == "" || name == null){
      alert.className = "alert alert-warning";
      alert.textContent = "Треба да внесете име";
    }else if(email == "" || email == null){
      alert.className = "alert alert-warning";
      alert.textContent = "Треба да внесете е-адреса";
    }else if(message == "" || message == null){
      alert.className = "alert alert-warning";
      alert.textContent = "Треба да внесете порака";
    }else{
      //Send message
      var formArray = [name, email, message];
      sendForm(formArray);
    }
    removeAlert(alert);
  });
}

//Sent form to node js
function sendForm(formArray){
  $.ajax({
    type: "POST",
    url: "/contact",
    data: {
      name: formArray[0],
      email: formArray[1],
      message: formArray[2]
    },
    success: function( result ) {
      const parentAlert = document.querySelector("#alert-contact");
      const alert = document.createElement("div");
      parentAlert.appendChild(alert);
      if (result.status == 200) {
        alert.className = "alert alert-success";
        alert.textContent = "Пораката е пратена.";
      } else {
        alert.className = "alert alert-warning";
        alert.textContent = "Пораката не е пратена";
      }
      removeAlert(alert);
    }
  });
}

//Remove form alert
function removeAlert(alert){
  const parentAlert = document.querySelector("#alert-contact");
  //remove alert after 3sec
  setTimeout(function(){
    parentAlert.removeChild(alert);
    },3000);
}