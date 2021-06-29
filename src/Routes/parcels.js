const express = require("express")
const router = express.Router()
const {createParcel, getParcels, getOneParcel, updateDestination, updateStatus, presentLocation, deleteParcel} = require("../Controllers/parcels")
const { checkPermissions, isAuth } = require("../middlewares")

router.post("/parcels",isAuth, [checkPermissions.can("create_delivery_order"),createParcel])
router.get("/parcels", [checkPermissions.can("get_all_parcels"), getParcels])
router.get("/parcels/:id",isAuth, [checkPermissions.can("get_single_parcel"), getOneParcel])
router.put("/parcels/:parcelId/location", isAuth,[checkPermissions.can("update_currentLocation"), presentLocation])
// router.put("/parcels/:parcelId/status", isAuth,[checkPermissions.can("update_status"), updateStatus])
// router.delete("/parcels/:id", deleteParcel)


module.exports = router;
