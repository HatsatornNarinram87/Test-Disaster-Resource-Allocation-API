import { redisClient } from "../configs/redis_config.js";

export class RedisModel {

static async connect() {
    if (redisClient.isOpen) {
        console.log("⚡ Redis already connected");
        return;
    }

    try {
        await redisClient.connect();
        console.log("✅ Redis connected");
    } catch (err) {
        console.error("❌ Redis connect failed:", err.message);
    }
}โ

    static async insert(key, value, ...args) {
        try {
            const data = JSON.stringify(value);
            await redisClient.set(key, data, ...args);
            return true;
        } catch (err) {
            console.error("Insert error:", err);
            return false;
        }
    }

    static async get(key) {
        try {
            const data = await redisClient.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("Get error:", err);
            return null;
        }
    }

    static async delete(key) {
        try {
            await redisClient.del(key);
            return true;
        } catch (err) {
            console.error("Delete error:", err);
            return false;
        }
    }

    static async update(key, value) {
        try {
            const exists = await redisClient.exists(key);
            if (!exists) return false;

            const data = JSON.stringify(value);
            await redisClient.set(key, data);
            return true;
        } catch (err) {
            console.error("Update error:", err);
            return false;
        }
    }
}