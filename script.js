//Font Awesome CSS - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
//Bootstrap CSS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css
//JQuery JS - https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
//Bootstrap JS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js


/*
-Pomodoro Clock - Javascript implementation
-Blue = break time
-Green = work time

- Visually representated by bars proportional to the ratio of work/break.
- Possible future improvement - Add option to change duration without stopping clock. - Probably just a user preference to toggle.
*/

var workSessionLength =25;
var breakSessionLength =5;

var timeLeft = workSessionLength * 60;
var paused=true;
var stopped = true;
var timingWork=true;

var timer;

$(document).ready(function()
{
	stop();

});

function play()
{
	if (stopped)
	{
		timeLeft = workSessionLength * 60;
	}
	if (paused)
	{
		$('#playIcon').css("color", "DarkGreen");
		$('#pauseIcon').css("color", "Black");
		$('#stopIcon').css("color", "Black");
		paused = false;
		stopped = false;
		timer = setInterval(countDown, 1000);
	}
}

function pause()
{
	if (!paused)
	{
		$('#playIcon').css("color", "Black");
		$('#pauseIcon').css("color", "DarkOrange");
		$('#stopIcon').css("color", "Black");		
		paused = true;
		clearInterval(timer);
		
	}	
}

function stop()
{
	$('#playIcon').css("color", "Black");
	$('#pauseIcon').css("color", "Black");
	$('#stopIcon').css("color", "DarkRed");		
	timeLeft = workSessionLength * 60;
	paused=true;
	stopped	= true;
	clearInterval(timer);	
	$('#timingBreakBar').css("width", '0%');	
	$('#timingWorkBar').css("width", '0%');
	$('#clock').css("color", 'Green');	
	$('#timerWorkBar').css("width", '0%');
	$('#timerBreakBar').css("width", '0%');
	updateClock();
}

function resetAll()
{
	clearInterval(timer);
	$('#playIcon').css("color", "Black");
	$('#pauseIcon').css("color", "Black");
	$('#stopIcon').css("color", "Black");		
	timeLeft = 25 * 60;
	paused=true;
	adjustWorkLength(0);
	adjustBreakLength(0);
	timingWork=true;	
	$('#clock').css("color", 'Green');	
	$('#timerWorkBar').css("width", '0%');
	$('#timerBreakBar').css("width", '0%');	
	updateClock();	
}

function adjustWorkLength(change)
{
	//stop();
	if (change==0)
	{
		workSessionLength = 25;		
	}
	else
	{
		workSessionLength = workSessionLength + change;
		if (workSessionLength<1)
		{
			workSessionLength = 1;	
		}
	}
	$('#workMinutes').empty();
	$('#workMinutes').append('<h4>' + workSessionLength +' minutes</h4>');
	adjustBarSize();
	if (timingWork)
	{
		timeLeft= workSessionLength*60;		
	}	
	updateClock();	
}

function adjustBreakLength(change)
{
	//stop();
	if (change==0)
	{
		breakSessionLength = 5;		
	}
	else
	{
		breakSessionLength = breakSessionLength + change;
		if (breakSessionLength<1)
		{
			breakSessionLength = 1;	
		}
	}
	$('#breakMinutes').empty();
	$('#breakMinutes').append('<h4>' + breakSessionLength +' minutes</h4>');
	adjustBarSize();
	if (!timingWork)
	{
		timeLeft= breakSessionLength*60;		
	}
	updateClock();
}

function adjustBarSize()
{

	var maxwidth = 100;
	var temp=maxwidth + '%';
	if (workSessionLength>breakSessionLength)
	{
		$('#workBar').css("width", temp);
		temp =  (Math.round(maxwidth * breakSessionLength / workSessionLength)).toString() + '%';
		//console.log(Math.round(100 * breakSessionLength / workSessionLength));
		$('#breakBar').css("width", temp);
	}
	else
	{
		$('#breakBar').css("width", temp);
		temp =  (Math.round(maxwidth * workSessionLength / breakSessionLength)).toString() + '%';
		//console.log(Math.round(100 * breakSessionLength / workSessionLength));
		$('#workBar').css("width", temp);		
	}
	//console.log(temp);
	
}


function countDown()
{
	//console.log(timeLeft);
	--timeLeft;
	var maxwidth = 100;
	var temp;
	if (timeLeft <0)
	{
		if (timingWork)
		{
			
			timeLeft = breakSessionLength * 60;			
			timingWork=false;
			$('#clock').css("color", 'Blue');
			$('#timerBreakBar').css("width", '0%');
		}	
		else
		{
			timeLeft = workSessionLength * 60;
			timingWork=true;	
			$('#clock').css("color", 'Green');
			$('#timerWorkBar').css("width", '0%');
		}
	}
	else
	{
		if (timingWork)
		{
			if (workSessionLength >= breakSessionLength)
			{
				maxWidth = 100;
			}
			else
			{
				maxWidth = Math.round(maxWidth * workSessionLength / breakSessionLength);
			}
			temp = (maxWidth-Math.round(maxWidth * timeLeft / (workSessionLength*60))).toString() + '%';

			$('#timerWorkBar').css("width", temp);
		}
		else
		{
			if (breakSessionLength >= workSessionLength)
			{
				maxWidth = 100;
			}
			else
			{
				maxWidth = Math.round(maxWidth * breakSessionLength / workSessionLength);
			}			
			temp = (maxWidth-Math.round(maxWidth * timeLeft / (breakSessionLength*60))).toString() + '%';

			$('#timerBreakBar').css("width", temp);			
		}
	}	
	updateClock();
	


	
}

function updateClock()
{
	var minutes = 0;	
	var seconds = 0;
	var remaining ='';	

	minutes = Math.floor(timeLeft / 60);	
	seconds = Math.floor(timeLeft % 60);
	remaining = minutes + ':';
	if (seconds <10)
	{
		remaining += '0';
	}
	remaining += seconds;
	$('#clock').empty();
	$('#clock').append('<h2>' + remaining + '</h2>');		
	//console.log(timeLeft,minutes,seconds);
}

/*
<i class="fa fa-pause-circle-o" aria-hidden="true"></i> //Pause - Not Paused
<i class="fa fa-pause-circle" aria-hidden="true"></i>  // Pause - Currently Paused
<i class="fa fa-play-circle" aria-hidden="true"></i>  //Play  - Currently Playing
<i class="fa fa-play-circle-o" aria-hidden="true"></i> //Play - Not Playing
<i class="fa fa-stop-circle-o" aria-hidden="true"></i> //Stop - Not stopped
<i class="fa fa-stop-circle" aria-hidden="true"></i> // Stop - Currently stopped
<i class="fa fa-refresh" aria-hidden="true"></i> // Reset to defaults
*/
