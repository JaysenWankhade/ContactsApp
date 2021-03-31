export default function getAllContacts() {
    return fetch("https://reqres.in/api/users").then(res => res.json()).then((result) => {
        return result;
    });
}

export function getContactDetails(contactId) {
    return fetch("https://reqres.in/api/users/" + contactId).then(res => res.json()).then((result) => {
        return result;
    });
}