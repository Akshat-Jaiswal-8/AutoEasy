import Location from "../Models/LocationModel.js";
import User from "../Models/UserModel.js";
import Driver from "../Models/DriverModel.js";

// for getting all the active users in the datebase
export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        if (!locations || locations.length <= 0) {
            res.status(400).json({
                success: false,
                reason: "No one acitve",
            });
            return;
        }
        res.json({
            success: true,
            data: locations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            reason: error.message,
        });
    }
};

// for adding an active user on request
export const addLocation = async (req, res) => {
    try {
        const locParams = req.body;
        let person;

        if (locParams.driver) {
            person = await Driver.findById(locParams.userid);
        } else {
            person = await User.findById(locParams.userid);
        }

        if (!person) {
            res.status(400).json({
                success: false,
                reason: "Not found in the database",
            });
            return;
        }

        // if the person is already active then update its location
        person = await Location.findOne({ userid: locParams.userid });
        if (person) {
            const updatedUser = await Location.updateOne(person, locParams);
            if (!updatedUser) {
                res.status(500).json({
                    success: false,
                    reason: "Could not update location!",
                });
                return;
            }
            res.json({
                success: true,
                data: updatedUser,
            });
            return;
        }

        const newActiveUser = new Location(locParams);
        const createdActiveUser = await newActiveUser.save();

        if (!createdActiveUser) {
            res.status(400).json({
                success: false,
                reason: "Not able to save the location in the database !",
            });
            return;
        }

        res.json({
            success: true,
            data: createdActiveUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            reason: error.message,
        });
    }
};

// for getting all the drivers that are active
export const getDrivers = async (req, res) => {
    try {
        const drivers = await Location.find({ driver: true });

        if (!drivers || drivers.length <= 0) {
            res.status(400).json({
                success: "false",
                reason: "No driver found online",
            });
            return;
        }
        res.json({
            success: true,
            data: drivers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            reason: error.message,
        });
    }
};

// for getting all the passengers that are active
export const getPassengers = async (req, res) => {
    try {
        const passengers = await Location.find({ driver: false });
        if (!passengers || passengers.length <= 0) {
            res.status(400).json({
                success: "false",
                reason: "No passenger found online",
            });
            return;
        }
        res.json({
            success: true,
            data: passengers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            reason: error.message,
        });
    }
};

const distance = (lat1, lat2, lon1, lon2) => {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;

    return c * r;
};

export const getWithinField = async (req, res) => {
    try {
        const query = req.query;

        const lat1 = query.x;
        const lon1 = query.y;

        let result = [];

        const locations = await Location.find();

        if (!locations || locations.length <= 0) {
            res.status(400).json({
                success: false,
                reason: "No one active",
            });
            return;
        }

        locations.forEach((location) => {
            let lat2 = location.x;
            let lon2 = location.y;
            if (distance(lat1, lat2, lon1, lon2) <= 5) result.push(location);
        });

        if (result.length <= 0) {
            res.status(400).json({
                success: false,
                reason: "No one found in range",
            });
            return;
        }

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            reason: error.message,
        });
    }
};

// for updating the database every 5 min, to remove all the inactive users
export const UpdateActive = async () => {
    try {
        const curDate = new Date();
        curDate.setTime(curDate.getTime() - 1000 * 60 * 5);
        await Location.deleteMany({ updatedAt: { $lte: curDate } });
    } catch (error) {
        setTimeout(() => {
            UpdateActive();
        }, 10000);
    }
};
