window.onload= function() {
    let todayDate = new Date();
    let day = todayDate.getDay();
    let isWeekend = document.getElementById('isWeekend');
    Rx.Observable.of(day).filter(n => n == 0 || n == 6).map(n => n = 'Weekend')
                         .subscribe(n => isWeekend.textContent = 'Output:  ' + n);

    Rx.Observable.of(day).filter(n => n >= 1 && n <= 5).map(n => n = 'Weekday')
                         .subscribe(n => isWeekend.textContent = 'Output:  ' + n);
}