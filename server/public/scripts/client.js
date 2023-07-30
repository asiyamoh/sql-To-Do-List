const { response } = require("express");

$(document).ready(onReady);

function onReady() {
   console.log('inside the onReady function');
   $('#submit-btn').on('click', sumbit);

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
   $('#taskList').empty();
   $.ajax({
      type: 'GET',
      url: '/todo'
   }).then((response) =>  {
      console.log('inside GET', response);
      // append data to the DOM
      for (let i = 0; i < response.length; i++) {
         let newRow = $(`
             <tr>
                 <td>${response[i].task}</td>
                 <td>${response[i].isComplete}</td>
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
   }).catch((error) => {
      console.log('Error in the GET', error);
   })
}



