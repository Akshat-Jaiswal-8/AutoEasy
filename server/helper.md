# User

## http://localhost:8000/user/create :-

To create a passenger account, make a request to this account after the user registers himself as a passenger.

-   type: post

-   Required while requesting :-

```js
body: {
	passenger:true,
	name:"Arjun Varshney",
	email:"Test@gmail.com",
	password:"password"
}
```

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": {
        "passenger": true,
        "name": "Arjun Varshney",
        "email": "test@gmail.com",
        "password": "password",
        "_id": "63b14cf71765e46a6c4cba91",
        "__v": 0
    }
}
```

## http://localhost:8000/user/get :-

To get the details of a single user on the basis of his email and password after login.

-   type: post

-   Required while requesting :-

```js
body: {
  email:"test@gmail.com",
  password:"password"
}
```

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": {
        "_id": "63b14cf71765e46a6c4cba91",
        "passenger": true,
        "name": "Arjun Varshney",
        "email": "test@gmail.com",
        "password": "password",
        "__v": 0
    }
}
```

# Driver

## http://localhost:8000/driver/create

To create a driver account, make a request with the required details after the user registers himself as a driver.

-   type: post

-   Required while requesting :-

```js
body: {
  passenger:false,
  email:"diver@gmail.com",
  password:"iamadriver",
  vehicle:"UP 32 AB 123"
}
```

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": {
        "passenger": false,
        "name": "MehrotrajiDriving",
        "email": "mehrotrajidriving@gmail.com",
        "password": "iamadriver",
        "vehicle": "UP 32 AB 5678",
        "_id": "63b166eb6b4f89046ad9d6d7",
        "__v": 0
    }
}
```

## http://localhost:8000/driver/get

To get the details of a driver after he logins into his account, make a request to this endpoint.

-   type: post

-   Required while requesting :-

```js
body: {
  email:"mehrotrajidriving@gmail.com",
  password:"iamadriver"
}
```

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": {
        "_id": "63b166eb6b4f89046ad9d6d7",
        "passenger": false,
        "name": "MehrotrajiDriving",
        "email": "mehrotrajidriving@gmail.com",
        "password": "iamadriver",
        "vehicle": "UP 32 AB 5678",
        "__v": 0
    }
}
```

# Location

## http://localhost:8000/location/addlocation

To add or update location of any person you may use this endpoint, if the location is not updated for 5 minutes, then the user will be remove from the Active user database.

-   type: post

-   Required while posting :-

```js
body:{
  userid:"63b14454ce98237cac63a289",
  x:17,
  y:89,
  driver:false
}
```

-   sample response:-

((If no error occurs :-))

After adding a user into the active user database :-

```json
{
    "success": true,
    "data": {
        "userid": "63b14454ce98237cac63a289",
        "x": 17,
        "y": 89,
        "driver": false,
        "_id": "63b2c88b9daac02bb286fb54",
        "createdAt": "2023-01-02T12:05:31.214Z",
        "updatedAt": "2023-01-02T12:05:31.214Z",
        "__v": 0
    }
}
```

After updating a user's location :-

```json
{
    "success": true,
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

## http://localhost:8000/location/delete

To get all the active passengers from the data base.

-   type: get

-   sample response:-

## http://localhost:8000/location/passenger

To get all the active passengers from the data base.

-   type: get

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": [
        {
            "_id": "63b2c88b9daac02bb286fb54",
            "userid": "63b14454ce98237cac63a289",
            "x": 23,
            "y": 69,
            "driver": false,
            "createdAt": "2023-01-02T12:05:31.214Z",
            "updatedAt": "2023-01-02T12:06:27.542Z",
            "__v": 0
        },
        {
            "_id": "63b2c9839daac02bb286fb66",
            "userid": "63b14535a60e9fa5ab2db179",
            "x": 23,
            "y": 69,
            "driver": false,
            "createdAt": "2023-01-02T12:09:39.398Z",
            "updatedAt": "2023-01-02T12:09:39.398Z",
            "__v": 0
        }
    ]
}
```

## http://localhost:8000/location/driver

To get all the active drivers from the data base.

-   type: get

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": [
        {
            "_id": "63b2ca3c9daac02bb286fb73",
            "userid": "63b1644d98bdae002594abb9",
            "x": 23,
            "y": 69,
            "driver": true,
            "createdAt": "2023-01-02T12:12:44.466Z",
            "updatedAt": "2023-01-02T12:12:44.466Z",
            "__v": 0
        },
        {
            "_id": "63b2ca4b9daac02bb286fb78",
            "userid": "63b166eb6b4f89046ad9d6d7",
            "x": 63,
            "y": 99,
            "driver": true,
            "createdAt": "2023-01-02T12:12:59.122Z",
            "updatedAt": "2023-01-02T12:12:59.122Z",
            "__v": 0
        }
    ]
}
```

## http://localhost:8000/location/getall

To get all the active passengers from the data base.

-   type: get

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": [
        {
            "_id": "63b2c9839daac02bb286fb66",
            "userid": "63b14535a60e9fa5ab2db179",
            "x": 23,
            "y": 69,
            "driver": false,
            "createdAt": "2023-01-02T12:09:39.398Z",
            "updatedAt": "2023-01-02T12:09:39.398Z",
            "__v": 0
        },
        {
            "_id": "63b2ca3c9daac02bb286fb73",
            "userid": "63b1644d98bdae002594abb9",
            "x": 23,
            "y": 69,
            "driver": true,
            "createdAt": "2023-01-02T12:12:44.466Z",
            "updatedAt": "2023-01-02T12:12:44.466Z",
            "__v": 0
        },
        {
            "_id": "63b2ca4b9daac02bb286fb78",
            "userid": "63b166eb6b4f89046ad9d6d7",
            "x": 63,
            "y": 99,
            "driver": true,
            "createdAt": "2023-01-02T12:12:59.122Z",
            "updatedAt": "2023-01-02T12:12:59.122Z",
            "__v": 0
        }
    ]
}
```

## http://localhost:8000/location/getinrange?x={latitude}&y={longitude}

To get drivers and passengers withing 5 kms radius of the current user.

-   type: get

-   sample response :-

((if no error occurs :-))

```json
{
    "success": true,
    "data": [
        {
            "_id": "63b4dc27214485b1414ccc3b",
            "userid": "63b2de20cd8aca88f5c37fe7",
            "x": 63.001,
            "y": 99.0002,
            "driver": false,
            "createdAt": "2023-01-04T01:53:43.047Z",
            "updatedAt": "2023-01-04T01:53:43.047Z",
            "__v": 0
        },
        {
            "_id": "63b4dc4b214485b1414ccc42",
            "userid": "63b14454ce98237cac63a289",
            "x": 63.002,
            "y": 99.0004,
            "driver": false,
            "createdAt": "2023-01-04T01:54:19.523Z",
            "updatedAt": "2023-01-04T01:54:19.523Z",
            "__v": 0
        }
    ]
}
```

# Contact

## http://localhost:8000/contact/message

To save messages in the data base.

-   type: post

-   Required while requesting :-

```js
body: {
  userid:"63b14535a60e9fa5ab2db179",
  sender_name:"Akshat Jaiswal",
  sender_email:"varshneyarjun49@gmail.com",
  sender_message:"This is a test message."
}
```

-   sample response:-

((If no error occurs :-))

```json
{
    "success": true,
    "data": {
        "userid": "63b14535a60e9fa5ab2db179",
        "sender_name": "Akshat Jaiswal",
        "sender_email": "varshneyarjun49@gmail.com",
        "sender_message": "This is a test message.",
        "_id": "63b535afdec88c434d959d84",
        "createdAt": "2023-01-04T08:15:43.890Z",
        "updatedAt": "2023-01-04T08:15:43.890Z",
        "__v": 0
    }
}
```
