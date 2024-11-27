import haversine from "haversine-distance";
import { checkData, getAllSchools, insertData } from "../utils/globalUtil.js";

const addSchoolService = async (data, res, next) => {
  try {
    const { name, address, latitude, longitude } = data;

    const selectQuery = `SELECT name, address, latitude, longitude FROM school_details WHERE name = ? AND address = ?`;
    const rows = await checkData(selectQuery, [name, address], next);

    if (rows && rows.length > 0) {
      return res.status(400).json({ message: "School already exists" });
    }

    const insertQuery = `INSERT INTO school_details (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const result = await insertData(
      insertQuery,
      [name, address, latitude, longitude],
      next
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "School added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add school" });
    }
  } catch (error) {
    next(error);
  }
};

const listSchoolService = async (req, res, next) => {
  try {
    const { latitude: userLat, longitude: userLon } = req.query;

    if (!userLat || !userLon) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required" });
    }

    const query = `SELECT name, address, latitude, longitude FROM school_details`;
    const schools = await getAllSchools(query, next);

    if (schools && schools.length > 0) {
      const sortedSchools = schools
        .map((school) => ({
          ...school,
          distance: haversine(
            { lat: parseFloat(userLat), lon: parseFloat(userLon) },
            {
              lat: parseFloat(school.latitude),
              lon: parseFloat(school.longitude),
            }
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      return res.status(200).json({ schools: sortedSchools });
    }

    return res.status(404).json({ message: "No Schools Found!" });
  } catch (error) {
    next(error);
  }
};

export default {
  addSchoolService,
  listSchoolService,
};
