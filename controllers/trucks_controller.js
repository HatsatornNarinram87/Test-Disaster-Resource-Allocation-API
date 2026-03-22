
import TrucksService from '../services/trucks_service.js';

class TrucksController {
    static async addTruck(req, res) {
        console.log("req.body", JSON.stringify(req.body, null, 2));
        const result = await TrucksService.addTruck(req.body);
        if (result.success) {
            res.json({ message: "Trucks created successfully" });
        } else {
            res.json({ error: result.error });
        }
    }
    static getTrucks(req, res) {
        res.send('Get trucks');
    }
}

export default TrucksController;