console.log($('h1.title').addClass('big-title'));
$('button').css('color', 'red');
$('body .b1').css('color', 'black');
$('h1.title').removeClass('big-title');
console.log($('h1.title').hasClass('big-title'));
console.log($('h1.title').toggleClass('big-title'));

// event
$('button').click(function(){
    console.log($(this).toggleClass('big-title'));
});
text = ''
$('input').keydown(function(event){
    text += event.key
    $('button').text(text)
});