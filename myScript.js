// uhyguyg

function buttonColor(flag) {
    if (flag == 1) {
        document.querySelector("Button").style.backgroundColor = "Black";
    } else {
        document.querySelector("Button").style.backgroundColor = "hsl(259, 100%, 65%)";
    }
}

function boxColor(flag, e) {
    if (e.style.borderColor != 'rgb(255, 87, 87)') {
        if (flag == 1) {
            e.style.borderColor = "hsl(259, 100%, 65%)";
        } else {
            e.style.borderColor = "hsl(0, 0%, 86%)";
        }
    }
}

try {

    function validate() {
        let day = document.querySelector("#day").value;
        let month = document.querySelector("#month").value;
        let year = document.querySelector("#year").value;
        let error = false;

        var e = document.querySelectorAll(".error");
        var c = document.querySelectorAll("input");
       // Found bug when entering month and year as 0 and its showing current year as age.
        if (day === '' && month === '' && year === '') {
            throwError("This field is required");
            return;
        } else {
            for (let i = 0; i < 3; i++) {
                e[i].style.visibility = "hidden";
                c[i].style.borderColor = "hsl(0, 0%, 86%)";
            }
        }

        if (day === '') {
            throwError("This field is required", 0);
            error = true;
        }
        if (month === '') {
            throwError("This field is required", 1);
            error = true;
        }
        if (year === '') {
            throwError("This field is required", 2);
            error = true;
        }

        if (error) {
            document.querySelectorAll(".nums")[0].classList.remove("yyyy");
            return;
        }

        const date = new Date(year, month);
        date.setDate(0);
        const totalDays = date.getDate();


        if (day > totalDays || day < 1) {
            throwError("Enter a valid day", 0);
            error = true;
        } else {
            e[0].style.visibility = "hidden";
            c[0].style.borderColor = "hsl(0, 0%, 86%)";
        }

        if (month < 0 || month > 12) {
            throwError("Enter a valid month", 1);
            error = true;
        } else {
            e[1].style.visibility = "hidden";
            c[1].style.borderColor = "hsl(0, 0%, 86%)";
        }

        if (year > 0 && year < 1000) {
            throwError("min year: 1000", 2);
            error = true;
        } else if (year >= new Date().getFullYear()) {
            throwError("must be in past", 2);
            error = true;
        } else {
            e[2].style.visibility = "hidden";
            c[2].style.borderColor = "hsl(0, 0%, 86%)";
        }

        if (error) {
            document.querySelectorAll(".nums")[0].classList.remove("yyyy");
            return;
        }

        document.querySelectorAll(".nums")[0].classList.add("yyyy");

        ageCalculator(year, month, day);
    }

    function throwError(msg, n) {
        const e = document.querySelectorAll(".error");
        const c = document.querySelectorAll("input");
        if (n == undefined) {
            for (let i = 0; i < 3; i++) {
                e[i].style.visibility = "visible";
                e[i].innerHTML = msg;
                c[i].style.borderColor = "hsl(0, 100%, 67%)";
            }
        } else {
            e[n].style.visibility = "visible";
            e[n].innerHTML = msg;
            c[n].style.borderColor = "hsl(0, 100%, 67%)"
        }
        document.querySelector("h1.yyyy").innerHTML = "-- ";
        document.querySelector("h1.mm").innerText = "-- ";
        document.querySelector("h1.dd").innerText = "-- ";
    }

    function ageCalculator(year, month, day) {
        month -= 1;
        var years = new Date().getFullYear() - year;
        if (new Date().getMonth() >= month) {
            var months = new Date().getMonth() - month;
        } else {
            var months = Math.abs(new Date().getMonth() - month);
            years = years - 1;
            months = 12 - months;
        }
        var days = new Date().getDate();
        if (months == 0) {
            if (days == day) {
                days = 0;
            } else if (days > day) {
                days -= day;
            }
        }
        document.querySelector("h1.yyyy").innerHTML = years + " ";
        document.querySelector("h1.mm").innerText = months + " ";
        document.querySelector("h1.dd").innerText = days + " ";
    }
} catch (err) {
    alert(err.message);
}
