

export default async function UseApi(url, method, body, callback) {
    const res = await fetch(url, {
        method: method,
        headers: {
            'accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': `bearer ${localStorage.getItem("JWT")}`
        },
        body: body
    });

    let text;
    let response = "";
    try {
        response = await res.clone().json();
    } catch (error) {
        response = "";
    }

    switch(res.status) {
        case 200:
           // alert("action was successful");
            text = await res.json();
            callback(text);
        break;
        case 201:
            alert("created successfully")
            text = await res.json();
            callback(text);
        break;
        case 204:
            alert("delete / update was successfully ");
            callback(text);
        break;
        case 400:
            try {
                const object = (await res.json()).errors;
                const messages = Object.values(object);
                alert(messages);
            } catch (error) {
                alert(response);
            }
            
        break;
        case 401:
            alert("please log in again");
        break;
        case 404:
            alert((await res.text()));
        break;
        case 409:
            alert((await res.text()));
        break;
        case 500:
            alert("something went wrong, please try again later or contact out support staff");
        break;
        default:
            alert(`status code: ${res.status}`);
        break;
    }
}