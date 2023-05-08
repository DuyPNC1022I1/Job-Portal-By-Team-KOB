import uniqid from "uniqid";
import avatar from '../../resources/cuong-avatar.jpg'



const exampleCV = {


    pInfo: {
        firstName: {
            value: 'Dang Van',
            placeholder: 'First Name',
            id: uniqid(),
        },
        secondName: {
            value: 'Cuong',
            placeholder: 'Surname',
            id: uniqid(),
        },
        title: {
            value: 'Backend Developer',
            placeholder: 'Title',
            id: uniqid(),
        },
        address: {
            value: 'TP Thai Nguyen, Thai Nguyen',
            placeholder: 'Address',
            id: uniqid(),
        },
        email: {
            value: 'cuong98@gmail.com',
            placeholder: 'Email',
            id: uniqid(),
        },
        telephone: {
            value: '(+84) 999 9999999',
            placeholder: 'Phone',
            id: uniqid(),
        },
        description: {
            value : 'Ve ngoai hinh: Dep trai nhat xom \n' +
                'Tinh cach: Vui ve, than thien, hai huoc, nhay cam, coi mo',
            placeholder: 'Description',
            id: uniqid(),
        },
        photo: {
            value: avatar,
            placeholder: '',
            id: uniqid(),
        }
    },
    experience: {
        [uniqid()] : {
            position: {
                value: 'Web Developer',
                placeholder: 'Position',
                id: uniqid(),
            },
            organisation: {
                value: 'Apocryphal',
                placeholder: 'Organisation',
                id: uniqid(),
            },
            location: {
                value: 'HOME',
                placeholder: 'Location',
                id: uniqid(),
            },
            from: {
                value: '2019',
                placeholder: 'From',
                id: uniqid(),
            },
            to: {
                value: 'Present',
                placeholder: 'To',
                id: uniqid(),
            }
        },
        [uniqid()] : {
            position: {
                value: 'Web Developer',
                placeholder: 'Position',
                id: uniqid(),
            },
            organisation: {
                value: 'Spurious Limited',
                placeholder: 'Organisation',
                id: uniqid(),
            },
            location: {
                value: 'Son Cam',
                placeholder: 'Location',
                id: uniqid(),
            },
            from: {
                value: '2016',
                placeholder: 'From',
                id: uniqid(),
            },
            to: {
                value: '2019',
                placeholder: 'To',
                id: uniqid(),
            }
        }
    },
    education: {
        [uniqid()] : {
            institution: {
                value: 'High school',
                placeholder: 'Institution',
                id: uniqid(),
            },
            city: {
                value: 'Thai Nguyen',
                placeholder: 'City',
                id: uniqid(),
            },
            qualification: {
                value: 'Student',
                placeholder: 'Qualification',
                id: uniqid(),
            },
            from: {
                value: '2014',
                placeholder: 'From',
                id: uniqid(),
            },
            to: {
                value: '2015',
                placeholder: 'To',
                id: uniqid(),
            }
        },
        [uniqid()] : {
            institution: {
                value: 'Secondary school',
                placeholder: 'Institution',
                id: uniqid(),
            },
            city: {
                value: 'Thai Nguyên City',
                placeholder: 'City',
                id: uniqid(),
            },
            qualification: {
                value: 'Student',
                placeholder: '',
                id: uniqid(),
            },
            from: {
                value: '2011',
                placeholder: 'From',
                id: uniqid(),
            },
            to: {
                value: '2014',
                placeholder: 'To',
                id: uniqid(),
            }
        }
    }
}

export default exampleCV;