const { response } = require("express");

$(document).ready(onReady);

function onReady() {
   console.log('inside the onReady function');
   $('#submit-btn').on('click', sumbit);
   $('.isComplete').on('click', '.complete-btn', isComplete);

}
function isComplete(){
   const isCompleteId = $(this).parent().data('id');
   console.log('update the  complete status with id:', isCompleteId );
   $.ajax({
      method:'PUT',
      url:`todo/${isCompleteId}`
   }).then((response) => {
      getTask();
   }).catch((error) => {
      console.log(error)
   })
}

function sumbit(){
   let taskListObject = {
      task : $('#task').val(),
      isComplete : $('#isItComplete').val()
   }
   $.ajax({
      type:'POST',
      url: '/todo',
      data: taskListObject
   }).then((response) => {
      getTask();
   }).catch((error) => {
      console.log('Error on the POST', error);
   })
}

function getTask(){
   $('#taskListBody').empty();
   // console.log('inside getTask');
   $.ajax({
      type: 'GET',
      url: '/todo'
   }).then((response) =>  {
      // console.log('inside GET', response);
      // append data to the DOM
      for (let i = 0; i < response.length; i++) {
         // let results
         let newRow = $(`
             <tr>
                 <td>${response[i].task}</td>
                 <td>${response[i].isComplete} 
                  </td>
                  <td class = "isComplete">
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
         if(JSON.stringify(response[i].isComplete) == 'false'){
            $('.isComplete').empty();
            $('.isComplete').append(`
               <button class ="complete-btn">
                  complete
               </button>
            `)
         };
     }
    
   }).catch((error) => {
      console.log('Error in the GET', error);
   })
}
