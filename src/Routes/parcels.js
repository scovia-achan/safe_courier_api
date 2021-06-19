const express = require("express")
const router = express.Router()
const {createParcel, getParcels, getOneParcel, updateDestination, updateStatus} = require("../Controllers/parcels")
const { checkPermissions, authMiddleware } = require("../middlewares")

router.post("/parcels", [checkPermissions.can("create_delivery_order"),createParcel])
router.get("/parcels", [checkPermissions.can("get_all_parcels"), getParcels])
router.get("/parcels/:id", [checkPermissions.can("get_single_parcel"), getOneParcel])
router.put("/parcels/:id/destination",[checkPermissions.can("update_destination")], updateDestination)
router.put("/parcels/:id/status",[checkPermissions.can("update_status")], updateStatus)


module.exports = router;
