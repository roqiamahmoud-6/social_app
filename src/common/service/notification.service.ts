import { getMessaging } from "firebase-admin/messaging";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { initializeApp, cert, App } from "firebase-admin/app";

class NotificationService {
    private client: App;

    constructor() {
        this.client = initializeApp({
            credential: cert(
                JSON.parse(
                    readFileSync(join(__dirname, "../../config/social-app-48-monday-firebase-adminsdk-fbsvc-78c93...json"), "utf8")
                )
            ),
        })
    }

    async sendNotification({ token, data }: { token: string; data: { title: string; body: string } }) {
        return await getMessaging(this.client).send({
            token,
            data,
        })
    }
}

export default new NotificationService();