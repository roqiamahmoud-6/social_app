import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, cert } from "firebase-admin/app";
import { readFileSync } from "node:fs";
import { join } from "node:path";
class NotificationService {
    client;
    constructor() {
        const serviceAccount = JSON.parse(readFileSync(join(process.cwd(), "src/config/social-app-d04bd-firebase-adminsdk-fbsvc-101ba86fec.json"), "utf8"));
        this.client = initializeApp({
            credential: cert(serviceAccount),
        });
    }
    async sendNotification({ token, data, }) {
        return await getMessaging(this.client).send({
            token,
            notification: {
                title: data.title,
                body: data.body,
            },
        });
    }
}
export default new NotificationService();
//# sourceMappingURL=notification.service.js.map