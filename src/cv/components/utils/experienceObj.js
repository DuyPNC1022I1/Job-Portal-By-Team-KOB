import uniqid from "uniqid";

let exId = uniqid();
const createExpItm = () => {
    const expItem = {
        [exId] : {
            position: {
                value: '',
                placeholder: 'Position',
                id: uniqid(),
            },
            organisation: {
                value: '',
                placeholder: 'Organisation',
                id: uniqid(),
            },
            location: {
                value: '',
                placeholder: 'Location',
                id: uniqid(),
            },
            from: {
                value: '',
                placeholder: 'From',
                id: uniqid(),
            },
            to: {
                value: '',
                placeholder: 'To',
                id: uniqid(),
            }
        }
    }
    return expItem[exId];
}

export { createExpItm };

