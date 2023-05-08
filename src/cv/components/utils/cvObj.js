import uniqid from "uniqid";


    const cvObj = {

        pInfo: {
            firstName: {
                value: '',
                placeholder: 'First Name',
                id: uniqid(),
            },
            secondName: {
                value: '',
                placeholder: 'Surname',
                id: uniqid(),
            },
            title: {
                value: '',
                placeholder: 'Title',
                id: uniqid(),
            },
            address: {
                value: '',
                placeholder: 'Address',
                id: uniqid(),
            },
            email: {
                value: '',
                placeholder: 'Email',
                id: uniqid(),
            },
            telephone: {
                value: '',
                placeholder: 'Telephone',
                id: uniqid(),
            },
            description: {
                value: '',
                placeholder: 'Description',
                id: uniqid(),
            },
            photo: {
                value: '',
                placeholder: '',
                id: uniqid(),
            }
        },
        experience: {
            [uniqid()]: {
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
        },
        education: {
            [uniqid()]: {
                institution: {
                    value: '',
                    placeholder: 'Institution',
                    id: uniqid(),
                },
                city: {
                    value: '',
                    placeholder: 'City',
                    id: uniqid(),
                },
                qualification: {
                    value: '',
                    placeholder: 'Qualification',
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
    }



    const createCVItm = (props) => {
        console.log(props);
        cvObj.pInfo.firstName.value = props.account?.name ;
        cvObj.pInfo.address.value = props.address ;
        cvObj.pInfo.email.value = props.account?.email ;
        cvObj.pInfo.telephone.value = props.phoneNumber ;
        cvObj.pInfo.photo.value = props.imagePath;
        let cvObj1={...cvObj}
        return cvObj1;
    };



export { cvObj, createCVItm };