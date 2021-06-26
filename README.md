# SAFE COURIER API 

This is the backend for the safe courier web application

## Usage

All responses will have the form

```json
{
    "data": "Mixed type holding the content of the response",
    "msg": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the `data field`

### List all parcels

**Definition**

`GET /api/v1/parcels`
dem
**Response**

- `200 OK` on success

```json
[
    {
        "_id": "wh49rfh3qw4i",
        "parcelname": "Some parcel",
        "weight": "45",
        "currentLocation": "0.36552072539839126,32.59925336767217",
        "destination": "0.3694688557776991,32.588846397110544",
        "status": "delivering",
    }
]
```
