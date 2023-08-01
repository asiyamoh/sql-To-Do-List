$(document).ready(onReady);

function onReady() {
   console.log('inside the onReady function');
   getTask();
   $('#submit-btn').on('click', handleSumbit);
   $('#taskList').on('click','.delete-btn', handleDelete);
   $('#taskList').on('click','.complete-btn', handleIsComplete)

}

function handleSumbit(){
   //get the value from the input field
   let task = { 
      task: $('#task').val(),
      isComplete: $('#isItComplete').val()

   }
   console.log('the  inputs are:', task.task,task.isComplete)

   addTask(task);

   //empty the  input field
   $('#task').val('');
   $('#isItComplete').val('');
}

function getTask(){
   $('#taskListBody').empty();

   $.ajax({
      method: 'GET',
      url: '/todo'
   }).then((response)  => {
      render(response)
   }).catch((error) => {
      console.log('Error with the GET', error)
   })
}

function render(response){
      // append data to the DOM
      for (let i = 0; i < response.length; i++) {
         // let results
         let newRow = $(`
             <tr>
                 <td>${response[i].task}</td>
                 <td>${response[i].isComplete} </td>
                  <td>${isComplete(response)}
                  </td>
                 <td>
                     <button class="delete-btn">
                         Delete
                     </button>
                 </td>
             </tr>
         `)

         // setter
         newRow.data('id',response[i].id)
         $('#taskList').append(newRow);
      }

}

function addTask(task){
   $.ajax({
      method:'POST',
      url: '/todo',
      data: task
   }).then((response) => {
      getTask();
   }).catch((error) => {
      console.log('Error on the POST', error);
   })
}

function handleDelete(){
   const deleteId = $(this).parent().parent().data("id");
   console.log('the id is:', deleteId)

   $.ajax({
      method:'DELETE',
      url:`/todo/${deleteId}`
   }).then((response) => {
      getTask()
   }).catch((error) => {
      console.log('Error with the Delete', error);
   })
}

function handleIsComplete(id){
   const isCompleteId = $(this).parent().data('id');
   console.log('the id is:', isCompleteId);

   $.ajax({
      method: 'PUT',
      url:`/todo/${isCompleteId}`
   }).then((response) => {
      getTask()
   }).catch((error) => {
      console.log('Error with the PUT', error);
   })
}

function isComplete(toDo){
   console.log('inside the isComplete', toDo);
   if(toDo.isComplete){
      return '<button class="complete-btn">Mark Incomplete</button>';
   }
   else {
      return `<button class="complete-btn">Mark Complete</button>`;
    }

}





// function isComplete(){
//    const isCompleteId = $(this).parent().data('id');
//    console.log('update the  complete status with id:', isCompleteId );
//    $.ajax({
//       method:'PUT',
//       url:`todo/${isCompleteId}`
//    }).then((response) => {
//       getTask();
//    }).catch((error) => {
//       console.log(error)
//    })
// }

// function sumbit(){
//    let taskListObject = {
//       task : $('#task').val(),
//       isComplete : $('#isItComplete').val()
//    }
//    $.ajax({
//       type:'POST',
//       url: '/todo',
//       data: taskListObject
//    }).then((response) => {
//       getTask();
//    }).catch((error) => {
//       console.log('Error on the POST', error);
//    })
// }

// function getTask(){
//    $('#taskListBody').empty();
//    // console.log('inside getTask');
//    $.ajax({
//       type: 'GET',
//       url: '/todo'
//    }).then((response) =>  {
//       // console.log('inside GET', response);
//       // append data to the DOM
//       for (let i = 0; i < response.length; i++) {
//          // let results
//          let newRow = $(`
//              <tr>
//                  <td>${response[i].task}</td>
//                  <td>${response[i].isComplete} 
//                   </td>
//                   <td class = "isComplete">
//                   </td>
//                  <td>
//                      <button class="delete-btn">
//                          Delete
//                      </button>
//                  </td>
//              </tr>
//          `)

//          // setter
//          newRow.data('id',response[i].id)
//          $('#taskList').append(newRow);
//          if(JSON.stringify(response[i].isComplete) == 'false'){
//             $('.isComplete').empty();
//             $('.isComplete').append(`
//                <button class ="complete-btn">
//                   complete
//                </button>
//             `)
//          };
//      }
    
//    }).catch((error) => {
//       console.log('Error in the GET', error);
//    })
// }
