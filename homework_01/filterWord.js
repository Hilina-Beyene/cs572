window.onload = function() {
    String.prototype.filterWords = function(ignore){
        let theString = this;
    
        const stringArray = theString.split(" ");
    
        stringArray.map((x)=> {
                if (ignore.includes(x)) {
                    theString =  theString.replace(x, "***")
                }
            }
        );
        let features = document.getElementById('features');
        features.textContent = "Using Features:   " + theString;
    };
    "This house is nice !".filterWords(["house","nice"]);
    
    
    //Using promise
    String.prototype.filterWords= function(ignore){
        var theString = this;
        const stringArray = theString.split(" ");
        return new Promise(function (resolve) {
    
            stringArray.map((x)=> {
                    if (ignore.includes(x)) {
                        theString =  theString.replace(x, "***")
                    }
                }
            );
            resolve (theString);
    
        })
    };
    let promise = document.getElementById('promise');
    "This house is nice !".filterWords(["house","nice"]).then(data=>promise.textContent = "Using Promises:   " + data);
    
    //using Async/Await
    let asynch_await = document.getElementById('asynch_await');
    String.prototype.filterWords =async function (ignore) {
        var theString = this;
        const stringArray = theString.split(" ");
        try{
            let ret = await filter(stringArray,ignore,theString);
            asynch_await.textContent = "Using Asynch/Await:   " + ret;
    
        }catch (e) {
            asynch_await.textContent = "Using Asynch/Await:   " + e;
        }
    }
    
    function filter(stringVal,ignore,whole) {
        return new Promise(function (resolve) {
    
            stringVal.map((x)=> {
                    if (ignore.includes(x)) {
                       whole  =  whole.replace(x, "***")
                    }
                }
            );
            resolve (whole);
    
        })
    
    }
    "This house is nice !".filterWords(["house","nice"]);
    
    
    //Using observables
    let observables = document.getElementById('observables');
    String.prototype.filterWords= function(ignore){
        const theString = this;
        //const {from} = rxjs;
    
    
        const stringArray = theString.split(" ");
    
    
    let myPromise = filter(stringArray , ignore,theString);
    Rx.Observable.from(myPromise)
        .subscribe((obj)=> observables.textContent = "Using Observables:   " +  obj),
    
    
        function filter(stringVal,ignore,whole) {
            return new Promise(function (resolve) {
    
                stringVal.map((x)=> {
                        if (ignore.includes(x)) {
                            whole  =  whole.replace(x, "***")
                        }
                    }
                );
                resolve (whole);
    
            })
    
        }
    };

    "This house is nice !".filterWords(["house","nice"]);
}