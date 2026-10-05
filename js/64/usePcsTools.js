const potus = $('#potus');
potus.css('color', 'orange');
potus.click(() => console.log('potus was clicked'));
potus.on('mouseenter', () => potus.css('backgroundColor', 'blue'));
potus.on('mouseleave', () => potus.css('backgroundColor', 'white'));
console.log(potus.css('fontFamily'));
potus.css('position', 'absolute');
potus.css('bottom', 0);
$('h1').css('fontSize', '3em');