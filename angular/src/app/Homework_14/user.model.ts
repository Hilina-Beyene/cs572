
export class User {
    results: [{
        gender: string,
        name: {
            title: string,
            first: string,
            last: string
        },
        login: {
            uuid: string,
            username: string,
            password: string,
            salt: string,
            md5: string,
            sha1: string,
            sha256: string
        },
        location: {
            street: string,
            city: string,
            state: string,
            postcode: Number,
            coordinates: {
                latitude: string,
                longitude: string,
                timezone: {
                    offset: string,
                    description: string
                }
        },
        email: string,
        dob: {date: string, age: Number},
        registered: {date: string, age: Number},
        phone: string,
        cell: string,
        id: {name: string, value: string},
        picture: {
            large: string,
            medium: string,
            thumbnail: string
        },
        nat: string
        }
    }]
}

/*export class UserArray {
    results = new Array<User["Person"]>();
}



 = {
    "gender":"male",
    "name":{"title":"mr","first":"میلاد","last":"گلشن"},
    "location":{"street":"3535 خالد اسلامبولی","city":"بیرجند","state":"البرز","postcode":70256,"coordinates":{"latitude":"26.9827","longitude":"-101.9862"},"timezone":{"offset":"-7:00","description":"Mountain Time (US & Canada)"}},
    "email":"میلاد.گلشن@example.com",
    "login":{"uuid":"ef35342a-ddca-4e83-a7f5-035467906ba3",
    "username":"yellowfrog141",
    "password":"inter",
    "salt":"21XP3HoO",
    "md5":"e79840ef20f3e9f81a506d3d8756e6b1",
    "sha1":"bc5c2595957d5a5458bc9debe7c8ae56f6c0889b",
    "sha256":"3adb0fc7b872b1203dea7734fd7f8e5ddc9f93171999940b5d31c4b1ceaf824a"},
    "dob":{"date":"1955-02-06T18:23:04Z","age":64},
    "registered":{"date":"2008-01-19T06:18:40Z","age":11},
    "phone":"044-50476189","cell":"0925-212-5951",
    "id":{"name":"","value":null},
    "picture":{"large":"https://randomuser.me/api/portraits/men/25.jpg",
    "medium":"https://randomuser.me/api/portraits/med/men/25.jpg",
    "thumbnail":"https://randomuser.me/api/portraits/thumb/men/25.jpg"},
    "nat":"IR"
}*/