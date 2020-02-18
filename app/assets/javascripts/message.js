$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__messages__message__chat-history" data-message-id=${message.id}>
         <div class="chat-main__messages__message__chat-history__upper-info">
           <div class="chat-main__messages__message__chat-history__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="chat-main__messages__message__chat-history__upper-info__time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__messages__message__chat-history__show">
           <p class="chat-main__messages__message__chat-history__show__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__messages__message__chat-history" data-message-id=${message.id}>
         <div class="chat-main__messages__message__chat-history__upper-info">
           <div class="chat-main__messages__message__chat-history__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="chat-main__messages__message__chat-history__upper-info__time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__messages__message__chat-history__show">
           <p class="chat-main__messages__message__chat-history__show__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__messages').append(html);   
    $('form')[0].reset();
    $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});   
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('.chat-main__form__btn').prop('disabled', false);
  })
})
});