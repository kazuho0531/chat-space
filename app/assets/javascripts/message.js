$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="chat-main__messages__message" data-message-id=${message.id}>
                    <div class="chat-main__messages__message__chat-history">
                      <div class="chat-main__messages__message__chat-history__upper-info">
                        <div class="chat-main__messages__message__chat-history__upper-info__talker">
                          ${message.user_name}
                        </div>
                        <div class="chat-main__messages__message__chat-history__upper-info__time">
                          ${message.created_at.strftime("%Y年%m月%d日 %H時%M分")}
                        </div>
                      </div>
                      <div class="chat-main__messages__message__chat-history__show">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        <img src="${message.image}" class="lower-message__image" onerror='this.style.display = "none"'>
                      </div>
                    </div>
                  </div>`
    } else if (message.content) {
        //同様に、data-idが反映されるようにしている
      var html = `<div class="chat-main__messages__message" data-message-id=${message.id}>
                    <div class="chat-main__messages__message__chat-history">
                      <div class="chat-main__messages__message__chat-history__upper-info">
                        <div class="chat-main__messages__message__chat-history__upper-info__talker">
                          ${message.user_name} 
                        </div>
                        <div class="chat-main__messages__message__chat-history__upper-info__time">
                          ${message.created_at} 
                        </div>
                      </div>
                      <div class="chat-main__messages__message__chat-history__show">
                        <p class="lower-message__content">
                          ${message.content} 
                        </p>
                        <img src="${message.image}" class="lower-message__image" onerror='this.style.display = "none"'>
                      </div>
                    </div>
                  </div>`
    } else if (message.image) {
        //同様に、data-idが反映されるようにしている
      var html = `<div class="chat-main__messages__message" data-message-id=${message.id}>
                    <div class="chat-main__messages__message__chat-history">
                      <div class="chat-main__messages__message__chat-history__upper-info">
                        <div class="chat-main__messages__message__chat-history__upper-info__talker">
                          ${message.user_name}
                        </div>
                        <div class="chat-main__messages__message__chat-history__upper-info__time">
                          ${message.created_at} 
                        </div>
                      </div>
                      <div class="chat-main__messages__message__chat-history__show">
                        <p class="lower-message__content">
                          ${message.content} 
                        </p>
                        <img src="${message.image}" class="lower-message__image" onerror='this.style.display = "none"'>
                      </div>
                    </div>
                  </div>`
    };
      return html;
  };
  

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



  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.chat-main__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: 'json',
      data: {id: last_message_id}
    })
     .done(function(messages) {
       if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__messages').append(insertHTML);
          $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
        }
     })
     .fail(function() {
       console.log('alert');
     });
  };
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
     setInterval(reloadMessages, 7000);
   }
});
