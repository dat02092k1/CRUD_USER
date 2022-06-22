


function start() {
    getStudents(renderList); 
    
}

// start();
getStudents(renderList); 
function getStudents(callback) {
    fetch('http://localhost:3000/students')
        .then(function(response) {
            return response.json();
        }) 
        .then(callback);  
}

var listStudents = document.querySelector('.tbody-render');

function renderList(students) {   
    
    var htmls = students.map(function(student) {
        return ` 
        <tr>
        <th>${student.id}</th>
        <th>${student.user_name}</th>
        <th>${student.full_name}</th>
        <th>${student.email}</th>
        <th>${student.birthday}</th>  
        
        <th><button class="button2" id="edit_btn" onclick="preUpdate(${student.id})" >Edit</button></th>
        <th><button class="button2" id="delete_btn" onclick="deleteInfo(${student.id})">Delete</button></th>
        </tr>
        `;
    });

    listStudents.innerHTML = htmls.join('');
}

function handleSaveInfo() {  
    // var saveBtn = document.querySelector('#save_btn'); 
    // saveBtn.onclick = function() {
        var userName = document.querySelector('input[name="username').value; 
        var fullName = document.querySelector('input[name="fullname"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var birthday = document.querySelector('input[name="birthdate"]').value;
        
        var formStudent = {
            user_name: userName,
            full_name: fullName,
            email: email,
            birthday: birthday
        }; 
        saveInfo(formStudent, function() {
            getStudents(renderList);
        });
    
} 

function saveInfo(data, callback) { 
    fetch('http://localhost:3000/students', 
    {
    method: 'POST',
    body: JSON.stringify(data),  
    headers: { 
    'Content-Type': 'application/json'
  }
})             
    .then(function(response) {
        response.json();
    })   
    .then(callback);
}

function resetInfo() {
    document.getElementById('user_name').value = "";
    document.getElementById('full_name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('birthdate').value = ""; 
}

function deleteInfo(id) { 
    fetch(`http://localhost:3000/students/${id}`, 
    {
    method: 'DELETE',
    headers: { 
    'Content-Type': 'application/json'
  }
})
    .then(function(response) {
        response.json();
    })
    .then(function(){
       // location.reload();
       getStudents(renderList);
    });
}

             
function validateForm() {
    let x = document.forms["userName"]["username"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }

const preUpdate = (id) => {
    fetch(`http://localhost:3000/students/${id}`, {
    method: 'GET',
    
    })
    .then(res => {
        return res.json();
    }).then(res => {
        // console.log(res.user_name);
        document.getElementById('user_name').value = res.user_name;
        document.getElementById('full_name').value = res.full_name;
        document.getElementById('email').value = res.email;
        document.getElementById('birthdate').value = res.birthday; 
        document.getElementById('save_btn').innerHTML = 'Update';
        document.getElementById('save_btn').value = 'edit';   
        document.getElementById('save_btn').setAttribute('valueID', id);
    })                  

  }  

function handleEditInfo(id, data) { 
    fetch(`http://localhost:3000/students/${id}`,           
    {
    method: 'PATCH',
    body: JSON.stringify(data),  
    headers: { 
    'Content-Type': 'application/json'
  }
})                                                                                        
.then(function(response) {
    response.json();
})
.then(response => {
    document.getElementById('save_btn').innerHTML = 'Save';
    document.getElementById('save_btn').value = 'save';
}); 
}  

function handleUpdate() {
    const action = document.getElementById('save_btn').innerHTML;
    
    console.log(action);
    if (action == "Save") {
     console.log("dcm")
        handleSaveInfo();
        
    }else if(action == "Update") {
        var userName = document.querySelector('input[name="username').value; 
        var fullName = document.querySelector('input[name="fullname"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var birthday = document.querySelector('input[name="birthdate"]').value;
       // console.log(userName);  
        var formStudent = {
            user_name: userName,
            full_name: fullName,
            email: email,
            birthday: birthday
        }; 
        //  console.log(formStudent)
        const id = document.getElementById('save_btn').getAttribute("valueID");
        
        handleEditInfo(id,formStudent);
        location.reload();
        
      }
}