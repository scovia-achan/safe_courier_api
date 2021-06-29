module.exports = {
    admin : {
        update_status: true,
        get_all_parcels: true,
        update_currentLocation: true,
        get_all_users: true,
        get_single_parcel: true
        
    },
    user : {
        get_parcels: false,
        update_destination: true,
        get_single_parcel: true,
        create_delivery_order: true,
        update_currentLocation: false,
        get_all_users: false
    }
}