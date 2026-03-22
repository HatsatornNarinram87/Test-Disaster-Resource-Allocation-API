// redis model
import { redisClient } from "../configs/redis_config.js";

export class RedisModel {

    static async connect() {
        try {
            await redisClient.connect();
            console.log("✅ Redis connected");
        } catch (err) {
            console.error("❌ Redis connect failed:", err);
        }
    }
    static async disconnect() {
        try {
            await redisClient.disconnect();
            console.log("✅ Redis disconnected");
        } catch (err) {
            console.error("❌ Redis disconnect failed:", err);
        }
    }
    static async insert(key, value, ...args) {
        try {
            await this.connect();
            const data = JSON.stringify(value);
            await redisClient.set(key, data, ...args);
            await this.disconnect();
            return true;
        } catch (err) {
            console.error("Insert error:", err);
            return false;
        }
    }

    static async get(key) {
        try {
            await this.connect();
            const data = await redisClient.get(key);
            await this.disconnect();
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("Get error:", err);
            return null;
        }
    }

    static async delete(key) {
        try {
            await this.connect();
            await redisClient.del(key);
            await this.disconnect();
            return true;
        } catch (err) {
            console.error("Delete error:", err);
            return false;
        }
    }
    
    static async update(key, value) {
        try {
            await this.connect();
            const exists = await redisClient.exists(key);
            if (!exists) return false;

            const data = JSON.stringify(value);
            await redisClient.set(key, data);
            await this.disconnect();
            return true;
        } catch (err) {
            console.error("Update error:", err);
            return false;
        }
    }
}