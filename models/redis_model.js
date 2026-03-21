// redis model
import { redisConfig } from "../configs/redis_config.js";

export class RedisModel {

    static async connect() {
        try {
            await redisConfig.connect();
            console.log("✅ Redis connected");
        } catch (err) {
            console.error("❌ Redis connect failed:", err);
        }
    }
    static async disconnect() {
        try {
            await redisConfig.disconnect();
            console.log("✅ Redis disconnected");
        } catch (err) {
            console.error("❌ Redis disconnect failed:", err);
        }
    }
    static async insert(key, value) {
        try {
            await this.connect();
            const data = JSON.stringify(value);
            await redisConfig.set(key, data);
            return true;
        } catch (err) {
            console.error("Insert error:", err);
            return false;
        }
    }

    static async get(key) {
        try {
            await this.connect();
            const data = await redisConfig.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("Get error:", err);
            return null;
        }
    }

    static async delete(key) {
        try {
            await this.connect();
            await redisConfig.del(key);
            return true;
        } catch (err) {
            console.error("Delete error:", err);
            return false;
        }
    }
    
    static async update(key, value) {
        try {
            await this.connect();
            const exists = await redisConfig.exists(key);
            if (!exists) return false;

            const data = JSON.stringify(value);
            await redisConfig.set(key, data);
            return true;
        } catch (err) {
            console.error("Update error:", err);
            return false;
        }
    }
}