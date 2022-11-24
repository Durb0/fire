var request = new XMLHttpRequest();


//create a function to get the data from https://randomuser.me/api/
//return a promise, the name of the user generated
export async function getName(){
    return new Promise((resolve, reject) => {
        request.open('GET', 'https://randomuser.me/api/', true);
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                resolve(data.results[0].name.first);
            } else {
                reject('error');
            }
        }
        request.send();
    });
}