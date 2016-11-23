function IsMatch(target, str) {
  var r = new RegExp(str, 'i');
  return target.match(r);
};

function IsHide(target, searchKey) {
  for (var i = 0; i < target.length; i++) {
    if (IsMatch(target[i], searchKey)) return false;
  }
  return true;
};

$(function () {
    $('#search').focus();
    var trList = $('tr', '#item_table tbody');

    $('#search').keypress(function (e) {

      if ( e.which == 13 ){
      $("body").css("cursor", "wait");
      // 全角スペースも検索ワードセパレータとする
      var searchKey = this.value.replace(" ", " ");
      if (searchKey.match(/ $/)) return true;

      var keys = searchKey.split(" ");
      $.each(trList, function () {
        var ary = [];
        if(nisilove){
          ary.push($('td:nth-child(4)', $(this)).text());
          ary.push($('td:nth-child(5)', $(this)).text());
        }else{
          ary.push($('td:nth-child(2)', $(this)).text());
          ary.push($('td:nth-child(3)', $(this)).text());
        }

        if (IsHide(ary, keys[0])) {
        $(this).hide();
        } else {
        $(this).show();
        if (keys.length > 1) {
        for (var idx = 1; idx < keys.length; idx++) {
        if (IsHide(ary, keys[idx])) {
        $(this).hide();
        }
        }
        }
        }
        });
      $("body").css("cursor", "auto");
      return false;
      }
    });
});
