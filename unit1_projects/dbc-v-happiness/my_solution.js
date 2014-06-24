// Mission Description
/*
Mission Objective: navigate through DBC with your Happy Points intact

Entities:
1. mindBody -> main player

Requirements:
__Actions__
1. choose weapon
2. choose phase0 workload
3. choose yoga
4. choose hours
5. choose sleep
6. choose motivation
*/

// Pseudocode
/*
Create the main player object with the variable name "mindBody"
1. Start Screen
2. Start Button Click ->
    3. Name
    4. Happy Level Points ->
        5. Weapon of Choice Screen
        6. Weapon Choice Submit ->
            6'. IF windows THEN windowsdeathscreen
                6'a. Start Over Button Click ->
                    1'. Start Screen
            6''. IF macintosh THEN afterweaponmacscreen
            6'''. IF ubuntu THEN afterweaponubuntuscreen
        7. Phase 0 Workload Screen
        8. Phase 0 Workload Choice Submit ->
            8a. IF working during Phase 0 THEN afterworkscreen -2 points
            8b. IF NOT working during Phase 0 THEN afterworkscreen +2 points
        8. Yoga Screen
        9. Yoga Choice Submit ->
            9a. IF true during Phase 0 THEN afteryogascreen -1 point
            9b. IF false during Phase 0 THEN afteryogascreen +1 point
        10. Hours at DBC Screen
        11. Hours at DBC Choice Submit ->
            11a. IF true THEN afterfullHoursscreen +2 points
            11b. IF false THEN afterfullHoursscreen -2 points
        12. Sleep Screen
        13. Sleep Choice Submit ->
            13a. IF true THEN aftersleepscreen +2 points
            13b. IF false THEN aftersleepscreen -2 points
        14. Motivation Screen
        15. Motivation Choice Submit ->
            15a. IF true THEN aftermotivationscreentrue +WIN
            15b. IF false THEN aftermotivationscreenfalse +LOSE
        16. Full Report / End of Game Screen
*/

// Initial Code
var mindBody = {}; // player object

$(function() {
    // Intro Screen Setup
    $( "#namedialog" ).dialog({ autoOpen: false });
    $( "#happyleveldialog" ).dialog({ autoOpen: false });
    $('#gameframewrapper').addClass('animated bounceInDown');
    $('#gameframediv').addClass('animated bounceInLeft');
    $('#vs').addClass('animated flipInX');

    // Start Game Button Click
    $('#startgamebtn').on('click', function() {
        $('#namedialog').dialog('open');
        $('#contentwrapper').addClass('modaloverlay');
        $('#startgamebtn').hide();
    });

    // Submit Name Button Click
    $('#submitname').on('click', function() {
        $('#namedialog').dialog('close');
        $('#contentwrapper').removeClass('modaloverlay');
        $('#namelabel').html($('#name').val());
        player = mindBody.name = $('#name').val();
        $('nav').toggleClass('display');
        $('#happyleveldialog').dialog('open');
        $('#contentwrapper').addClass('modaloverlay');
    });
    $('#submithappylevelanswer').on('click', function() {
        hp = mindBody.happypoints = Number($('#happylevelanswer').val());
        $('#happyleveldialog').dialog('close');
        $('#contentwrapper').removeClass('modaloverlay');
        $('#happylevellabel').append('  -  Happy Level: ' + hp);
        $('#introscreen').hide('slow');
        $('#weaponscreen').show('slow');
    });
    $('#weaponofchoice').on('click', function() {
        weaponanswer = $('#answerentryinputvalue').val();
        if (weaponanswer == "this.weapon = 'Macintosh';" || weaponanswer == 'this.weapon = "Macintosh";' || weaponanswer == "this.weapon='Macintosh';" || weaponanswer == 'this.weapon="Macintosh";') {
            hp += 1;
            finalweapon = mindBody.weapon = "Macintosh";
            // Show Next Screen
            $('#weaponscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterweaponmacscreen').show('slow');
        } else if (weaponanswer == "this.weapon = 'Windows';" || weaponanswer == 'this.weapon = "Windows";' || weaponanswer == "this.weapon='Windows';" || weaponanswer == 'this.weapon="Windows";') {
            // Show Screen of Death and Start Over button
            hp = 0;
            finalweapon = mindBody.weapon = "Windows";
            $('#windowsdeathscreen').show('slow');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#weaponscreen').hide('fast');
        } else if (weaponanswer == "this.weapon = 'Ubuntu';" || weaponanswer == 'this.weapon = "Ubuntu";' || weaponanswer == "this.weapon='Ubuntu';" || weaponanswer == 'this.weapon="Ubuntu";') {
            hp = 1;
            finalweapon = mindBody.weapon = "Ubuntu";
            // Show Next Screen
            $('#weaponscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterweaponubuntuscreen').show('slow');
        } else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });
    $('#jobchoice').on('click', function() {
        jobanswer = $('#jobentryinputvalue').val();
        if (jobanswer == "this.work = true;" || jobanswer == "this.work=true;") {
            hp -= 2;
            working = mindBody.work = true;

            // Show Next Screen
            $('#afterweaponmacscreen').hide('fast');
            $('#afterweaponubuntuscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterjobscreentrue').show('slow');
        } else if (jobanswer == "this.work = false;" || jobanswer == "this.work=false;") {
            hp += 2;
            working = mindBody.work = false;
            // Show Next Screen
            $('#afterweaponmacscreen').hide('fast');
            $('#afterweaponubuntuscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterjobscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });
    $('#jobchoice2').on('click', function() {
        jobanswer = $('#jobentryinputvalue2').val();
        if (jobanswer == "this.work = true;" || jobanswer == "this.work=true;") {
            hp -= 2;
            working = mindBody.work = true;

            // Show Next Screen
            $('#afterweaponmacscreen').hide('fast');
            $('#afterweaponubuntuscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterjobscreentrue').show('slow');
        } else if (jobanswer == "this.work = false;" || jobanswer == "this.work=false;") {
            hp += 2;
            working = mindBody.work = false;

            // Show Next Screen
            $('#afterweaponmacscreen').hide('fast');
            $('#afterweaponubuntuscreen').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterjobscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    // Yoga
    $('#yogachoice').on('click', function() {
        yogaanswer = $('#yogaentryinputvalue').val();
        if (yogaanswer == "this.yoga = true;" || yogaanswer == "this.yoga=true;") {
            hp += 1;
            yogaing = mindBody.yoga = true;

            // Show Next Screen
            $('#afterjobscreentrue').hide('fast');
            $('#afterjobscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afteryogascreentrue').show('slow');
        } else if (yogaanswer == "this.yoga = false;" || yogaanswer == "this.yoga=false;") {
            hp -= 1;
            yogaing = mindBody.yoga = false;

            // Show Next Screen
            $('#afterjobscreentrue').hide('fast');
            $('#afterjobscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afteryogascreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    $('#yogachoice2').on('click', function() {
        yogaanswer = $('#yogaentryinputvalue2').val();
        if (yogaanswer == "this.yoga = true;" || yogaanswer == "this.yoga=true;") {
            hp += 1;
            yogaing = mindBody.yoga = true;

            // Show Next Screen
            $('#afterjobscreentrue').hide('fast');
            $('#afterjobscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afteryogascreentrue').show('slow');
        } else if (yogaanswer == "this.yoga = false;" || yogaanswer == "this.yoga=false;") {
            hp -= 1;
            yogaing = mindBody.yoga = false;

            // Show Next Screen
            $('#afterjobscreentrue').hide('fast');
            $('#afterjobscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afteryogascreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    // More than 70+ hours at DBC a week on average
    $('#fullHourschoice').on('click', function() {
        fullHoursanswer = $('#fullHoursentryinputvalue').val();
        if (fullHoursanswer == "this.fullHours = true;" || fullHoursanswer == "this.fullHours=true;") {
            hp += 2;
            fullHoursing = mindBody.fullHours = true;

            // Show Next Screen
            $('#afteryogascreentrue').hide('fast');
            $('#afteryogascreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterfullHoursscreentrue').show('slow');
        } else if (fullHoursanswer == "this.fullHours = false;" || fullHoursanswer == "this.fullHours=false;") {
            hp -= 2;
            fullHoursing = mindBody.fullHours = false;

            // Show Next Screen
            $('#afteryogascreentrue').hide('fast');
            $('#afteryogascreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterfullHoursscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    $('#fullHourschoice2').on('click', function() {
        fullHoursanswer = $('#fullHoursentryinputvalue2').val();
        if (fullHoursanswer == "this.fullHours = true;" || fullHoursanswer == "this.fullHours=true;") {
            hp += 2;
            fullHoursing = mindBody.fullHours = true;

            // Show Next Screen
            $('#afteryogascreentrue').hide('fast');
            $('#afteryogascreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterfullHoursscreentrue').show('slow');
        } else if (fullHoursanswer == "this.fullHours = false;" || fullHoursanswer == "this.fullHours=false;") {
            hp -= 2;
            fullHoursing = mindBody.fullHours = false;

            // Show Next Screen
            $('#afteryogascreentrue').hide('fast');
            $('#afteryogascreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#afterfullHoursscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    // Sleep more than 6 hours a night on average
    $('#sleepchoice').on('click', function() {
        sleepanswer = $('#sleepentryinputvalue').val();
        if (sleepanswer == "this.sleep = true;" || sleepanswer == "this.sleep=true;") {
            hp += 2;
            sleeping = mindBody.sleep = true;

            // Show Next Screen
            $('#afterfullHoursscreentrue').hide('fast');
            $('#afterfullHoursscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftersleepscreentrue').show('slow');
        } else if (sleepanswer == "this.sleep = false;" || sleepanswer == "this.sleep=false;") {
            hp -= 2;
            sleeping = mindBody.sleep = false;

            // Show Next Screen
            $('#afterfullHoursscreentrue').hide('fast');
            $('#afterfullHoursscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftersleepscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    $('#sleepchoice2').on('click', function() {
        sleepanswer = $('#sleepentryinputvalue2').val();
        if (sleepanswer == "this.sleep = true;" || sleepanswer == "this.sleep=true;") {
            hp += 2;
            sleeping = mindBody.sleep = true;

            // Show Next Screen
            $('#afterfullHoursscreentrue').hide('fast');
            $('#afterfullHoursscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftersleepscreentrue').show('slow');
        } else if (sleepanswer == "this.sleep = false;" || sleepanswer == "this.sleep=false;") {
            hp -= 2;
            sleeping = mindBody.sleep = false;

            // Show Next Screen
            $('#afterfullHoursscreentrue').hide('fast');
            $('#afterfullHoursscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftersleepscreenfalse').show('slow');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    // Motivated beyond imagination
    $('#motivationchoice').on('click', function() {
        motivationanswer = $('#motivationentryinputvalue').val();
        if (motivationanswer == "this.motivation = true;" || motivationanswer == "this.motivation=true;") {
            hp += 2;
            motivationing = mindBody.motivation = true;

            // Show Next Screen
            $('#aftersleepscreentrue').hide('fast');
            $('#aftersleepscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftermotivationscreentrue').show('slow');
            if (hp > 10) {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + '<h3>You might be TOO happy</h3>'
                    );
            } else if (hp <= 10 && hp > 5) {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + "<h3>You conquered ... DBC can't touch your happiness</h3>"
                    );
            } else {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + "<h3>You made it through ... but DBC conquered your happiness</h3>"
                    );
            };
            $('#finalreport').append("<div><p><em>Weapon of Choice: </em><strong>" + finalweapon + "</strong></p><p><em>Working during Phase 0: </em><strong>" + working + "</strong></p><p><em>Doing Yoga throughout DBC: </em><strong>" + yogaing + "</strong></p><p><em>Working 70+ hours per week at DBC: </em><strong>" + fullHoursing + "</strong></p><p><em>Sleeping more than 6 hours per night: </em><strong>" + sleeping + "</strong></p></div>");

        } else if (motivationanswer == "this.motivation = false;" || motivationanswer == "this.motivation=false;") {
            hp -= 2;
            motivationing = mindBody.motivation = false;

            // Show Next Screen
            $('#aftersleepscreentrue').hide('fast');
            $('#aftersleepscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftermotivationscreenfalse').show('slow');
            $('#bootcrush').addClass('animated bounceIn');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

    $('#motivationchoice2').on('click', function() {
        motivationanswer = $('#motivationentryinputvalue2').val();
        if (motivationanswer == "this.motivation = true;" || motivationanswer == "this.motivation=true;") {
            hp += 2;
            motivationing = mindBody.motivation = true;

            // Show Next Screen
            $('#aftersleepscreentrue').hide('fast');
            $('#aftersleepscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftermotivationscreentrue').show('slow');
            if (hp > 10) {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + '<h3>You might be TOO happy</h3>'
                    );
            } else if (hp <= 10 && hp > 5) {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + "<h3>You conquered ... DBC can't touch your happiness</h3>"
                    );
            } else {
                $('#finalreport').append(
                    '<div><p><em>Final Happiness out of 10: </em><strong>' + hp + ' </strong></p></div>' + "<h3>You made it through ... but DBC conquered your happiness</h3>"
                    );
            };
            $('#finalreport').append("<div><p><em>Weapon of Choice: </em><strong>" + finalweapon + "</strong></p><p><em>Working during Phase 0: </em><strong>" + working + "</strong></p><p><em>Doing Yoga throughout DBC: </em><strong>" + yogaing + "</strong></p><p><em>Working 70+ hours per week at DBC: </em><strong>" + fullHoursing + "</strong></p><p><em>Sleeping more than 6 hours per night: </em><strong>" + sleeping + "</strong></p></div>");

        } else if (motivationanswer == "this.motivation = false;" || motivationanswer == "this.motivation=false;") {
            hp -= 2;
            motivationing = mindBody.motivation = false;

            // Show Next Screen
            $('#aftersleepscreentrue').hide('fast');
            $('#aftersleepscreenfalse').hide('fast');
            $('#happylevellabel').html('  -  Happy Level: ' + hp);
            $('#aftermotivationscreenfalse').show('slow');
            $('#bootcrush').addClass('animated bounceIn');
        }
        else {
            // Catch Error and Reprompt
            alert("You have chubby fingers ... read the command options and try again!");
        };
    });

});

// Refactored Code
/*
NONE -- not because I think the above solution is perfect, but because I have completely run out of time by going too in-depth with this solo challenge. In order to keep up with the new week's challenges, I am not going to refactor the ridiculous spaghetti code above.

That being said, if I **was** to refactor the above solution, I would do the following:
- clean up the global namespace
- separate view / logic concerns
- DRY up all the repetitive jQuery methods by rolling them up into their own reusable methods
- rename the variables that I was too lazy to name properly the first time
- add form validations to catch errors
- add a less flat directory structure
*/

// Reflection
/*
Using jQuery as my main tool to manipulate HTML elements throughout the game was a successful strategy, however it also led to some pretty unreadable/repetitive code. I also found an open-source library called "animate.css" that was very helpful for quickly adding little animations without a ton of overhead.

I had a lot of JS syntax questions (particularly jQuery syntax), and most of them were solved by researching on http://api.jquery.com/. Also, I was confused about the difference between the 'append' and 'html' jQuery methods, which I learned about from the jQuery API documentation as well.

I feel pretty confident about the Learning Competencies, though I could have solidified my memory of JS/jQuery syntax more. Overall, especially at the conceptual level, I feel well about the Learning Competencies.

I enjoyed this whole challenge, though I liked the architecture/design planning and the high-level implementation phases the most.
*/
