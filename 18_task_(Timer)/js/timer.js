// Conctant
MAX_MS = 999;
MAX_SEC = 59;
MAX_MIN = 59;
KEY_CODE_START = 83;
KEY_CODE_LAP = 76;
KEY_CODE_RESET = 82;


// constructor Timer
function Timers(node) {
	this.rootNode = node;
	this.timerHour = 0;
	this.timerMinut = 0;
	this.timerSecond = 0;
	this.timerMillisecond = 0;
	this.timerID;
	this.timerIsRuning = false;
	this.timerActive = false;
	this.rootNode.appendChild(this.createWidgetTimer());
	this.rootNode.querySelector('.btn-primary').addEventListener('click', this.startStopTimer.bind(this), false);
	this.rootNode.querySelector('.btn-danger').addEventListener('click', this.resetTimer.bind(this), false);
	this.rootNode.querySelector('.btn-info').addEventListener('click', this.rememperLapTime.bind(this), false);
	this.rootNode.querySelector('.stopwatch-laps').addEventListener('click', this.removeInfoLap.bind(this), false);
	document.documentElement.addEventListener('keyup', this.keyControl.bind(this), false);
	document.documentElement.addEventListener('mouseover', this.detectTimerActive.bind(this), false);
}

Timers.prototype.countTime = function() {
	// debugger
	this.timerMillisecond += 16;

	if (this.timerMillisecond >= MAX_MS) {
		this.timerMillisecond = this.timerMillisecond - MAX_MS;
		this.timerSecond += 1;

	}
	// console.log(this.timerHour, this.timerMinut, this.timerSecond, this.timerMillisecond);
	if (this.timerSecond === MAX_SEC) {
		this.timerSecond = 0;
		this.timerMinut += 1;

	}
	if (this.timerMinut === MAX_MIN) {
		this.timerMinut = 0;
		this.timerHour += 1;
	}
	this.rootNode.querySelector('.stopwatch-current').textContent = this.formattingTime();
}

Timers.prototype.startStopTimer = function() {
	if (this.timerIsRuning === false) {
		this.timerID = setInterval(this.countTime.bind(this), 16);
		this.rootNode.querySelector('.btn-primary').textContent = 'Stop';
		this.timerIsRuning = true;
	} else {
		clearInterval(this.timerID);
		this.rootNode.querySelector('.btn-primary').textContent = 'Start';
		this.timerIsRuning = false;
	}
}

Timers.prototype.resetTimer = function() {
	if (this.timerIsRuning === true) {
		clearInterval(this.timerID);
		this.rootNode.querySelector('.btn-primary').textContent = 'Start';
		this.timerIsRuning = false;
	}
	this.timerHour = 0;
	this.timerMinut = 0;
	this.timerSecond = 0;
	this.timerMillisecond = 0;
	this.rootNode.querySelector('.stopwatch-current').textContent = this.formattingTime();
	while (this.rootNode.querySelector('.stopwatch-laps').childNodes[0]) {
		this.rootNode.querySelector('.stopwatch-laps').removeChild(this.rootNode.querySelector('.stopwatch-laps').childNodes[0]);
	}
}


Timers.prototype.rememperLapTime = function() {
	var infoLap = document.createElement('div');
	infoLap.className = 'alert alert-info';
	infoLap.textContent = this.formattingTime();
	var labelDanger = document.createElement('span');
	labelDanger.className = 'label label-danger';
	labelDanger.textContent = 'x'
	infoLap.appendChild(labelDanger);
	this.rootNode.querySelector('.stopwatch-laps').appendChild(infoLap);
}

Timers.prototype.removeInfoLap = function(event) {
	var targetLabelDanger = event.target;
	var targerInfoLab = targetLabelDanger.parentNode;

	if (targetLabelDanger.classList.contains('label-danger')) {
		targerInfoLab.parentNode.removeChild(targerInfoLab);
	}
}

Timers.prototype.keyControl = function(event) {
	var keyEvent = event.keyCode;
	if (this.timerActive === true) {
		if (keyEvent === KEY_CODE_START) {
			this.startStopTimer();
		}
		if (keyEvent === KEY_CODE_LAP) {
			this.rememperLapTime();
		}
		if (keyEvent === KEY_CODE_RESET) {
			this.resetTimer();
		}
	}
}

Timers.prototype.detectTimerActive = function(event) {
	var target = event.target;
	console.dir(target);
	while (target && target !== document.body) {
		if (target.className === 'container') {
			break;
		}
		target = target.parentNode;
	}
	if (target === this.rootNode.querySelector('.container')) {
		this.timerActive = true;
	} else {
		if (target.className === 'container') {
			this.timerActive = false;
		}
	}
}


Timers.prototype.createWidgetTimer = function() {
	var widgetTimer = document.createElement('div');
	widgetTimer.className = 'container';
	var widgetTimerRow = document.createElement('div');
	widgetTimerRow.className = 'row';
	widgetTimer.appendChild(widgetTimerRow);
	var widgetTimerCol = document.createElement('div');
	widgetTimerCol.className = 'col-xs-4';
	widgetTimerRow.appendChild(widgetTimerCol);
	var stopwatch = document.createElement('h2');
	stopwatch.className = 'stopwatch-current';
	stopwatch.textContent = this.formattingTime();
	widgetTimerCol.appendChild(stopwatch);
	var stopwatch_laps = document.createElement('div');
	stopwatch_laps.className = 'stopwatch-laps';
	widgetTimerCol.appendChild(stopwatch_laps);

	// stopwotch control
	var widgetTimerControl = document.createElement('div');
	widgetTimerControl.className = 'col-xs-4 stopwatch-controls';
	widgetTimerRow.appendChild(widgetTimerControl);
	var widgetTimerStartLap = document.createElement('div');
	widgetTimerStartLap.className = 'btn-group btn-group-lg';
	widgetTimerControl.appendChild(widgetTimerStartLap);
	var widgetTimerStart = document.createElement('button');
	widgetTimerStart.className = 'btn btn-primary';
	widgetTimerStart.textContent = 'Start';
	widgetTimerStartLap.appendChild(widgetTimerStart);
	var widgetTimerLap = document.createElement('button');
	widgetTimerLap.className = 'btn btn-info';
	widgetTimerLap.textContent = 'Lap';
	widgetTimerStartLap.appendChild(widgetTimerLap);
	var widgetTimerReset = document.createElement('button');
	widgetTimerReset.className = 'btn btn-danger btn-sm';
	widgetTimerReset.textContent = 'Reset';
	widgetTimerControl.appendChild(widgetTimerReset);
	return widgetTimer;
}

Timers.prototype.formattingTime = function() {
	var res = '';
	if (this.timerHour < 10) {
		res += '0' + this.timerHour;
	} else {
		res += this.timerHour;
	}
	if (this.timerMinut < 10) {
		res += ':0' + this.timerMinut;
	} else {
		res += ':' + this.timerMinut;
	}
	if (this.timerSecond < 10) {
		res += ':0' + this.timerSecond;
	} else {
		res += ':' + this.timerSecond;
	}
	if (this.timerMillisecond < 10) {
		res += ':00' + this.timerMillisecond;
	} else {
		if (this.timerMillisecond < 100) {
			res += ':0' + this.timerMillisecond;
		} else {
			res += ':' + this.timerMillisecond;
		}
	}
	return res;
}