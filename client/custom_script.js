function apiRequest()
{
    console.log("This method has been triggred");
    fetch('http://dummy.restapiexample.com/api/v1/employees', {
    headers: new Headers({
        'User-agent': 'Mozilla/4.0 Custom User Agent'
    })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data)
    })
    .catch(error => console.error(error))

}
