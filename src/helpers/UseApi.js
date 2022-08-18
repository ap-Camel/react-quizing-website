

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

    switch(res.status) {
        case 200:
           // alert("action was successful");
            const text = await res.json();
            callback(text);
        break;
        case 201:
            alert("created successfully")
            callback(text);
        break;
        case 204:
            alert("delete / update was successful");
            // text ? callback(text) : callback() ;
        break;
        case 400:
            try {
                const object = (await res.json()).errors;
                const messages = Object.values(object);
                alert(messages);
            } catch (error) {
                alert((await res.text()));
            }
            
        break;
        case 401:
            alert("please login again");
        break;
        case 404:
            alert((await res.text()));
        break;
        case 409:
            alert((await res.text()));
        break;
        case 500:
            alert("something went wrong, please try again later or contact our support staff");
        break;
        default:
            alert(`status code: ${res.status}`);
        break;
    }
}