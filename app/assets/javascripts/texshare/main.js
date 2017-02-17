$(document).ready(function(){
$("body").on("drop",function(e){
  e.preventDefault();
});

$(".dnd").on("drop",function(e){
  e.preventDefault();
  var file = e.originalEvent.dataTransfer.files[0];
  var fileName = file.name.replace(/(.text|.txt)/g , "");
  var fileUrl = nowTextDate();
  var fileType = file.type;
  if(fileType.match(/text.*/)){
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      var text = encodeString(event.target.result);
      $.ajax({
        url: "texshare/upload",
        type: "POST",
        data: {name:fileUrl,title: fileName ,text:text},
        success:function(){
          $(".tes").append("<a href='/page/" + fileUrl + "'>" + fileName + "</a><br>");
        }
      });
    }
    fileReader.readAsArrayBuffer(file);
  }else{
    alert("textファイルのみ");

  }
});

$("body").on("dragover",function(e){
  e.preventDefault();
});
});


//文字コード変換関数
function encodeString(str){
  var array = new Uint8Array(str);
  //UTF16と32は別の配列変換をかける 
  switch (Encoding.detect(array)) {
    case 'UTF16':  
      array = new Uint16Array(str);
      break;
    case 'UTF32':
      array = new Uint32Array(str);
      break;
  }
  //Unicodeへ変換
  var unicodeArray = Encoding.convert(array, 'UNICODE');
  //文字列へ変換
  var text = Encoding.codeToString(unicodeArray);
  return text;
}

//ファイル名用の日時
function nowTextDate(){
  var now = new Date();
  timeText = sprintf("{0}{1}{2}{3}", [
      paddingLeft((String)(now.getHours()), 2),
      paddingLeft((String)(now.getMinutes()), 2),
      paddingLeft((String)(now.getSeconds()), 2),
      paddingLeft((String)(now.getMilliseconds()), 3),
      ]);
  return timeText;
}

//パディング
function paddingLeft(text, figure) {
  var ret = String(text);

  while (true) {
    if (ret.length >= figure) {
      break;
    }
    ret = "0" + ret;
  }
  return ret;
}

//簡易sprintf
function sprintf(text, values) {
  var ret = text;

  for (var i = 0;i < values.length;i++) {
    ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
  }

  return ret;
}
